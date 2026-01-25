
import { GoogleGenAI } from "@google/genai";

// Cache for image results to save quota
const CACHE_PREFIX = "unforbidden_img_cache_";

const getCachedImage = (key: string): string | null => {
  try {
    return localStorage.getItem(CACHE_PREFIX + btoa(key).slice(0, 32));
  } catch {
    return null;
  }
};

const setCachedImage = (key: string, data: string) => {
  try {
    localStorage.setItem(CACHE_PREFIX + btoa(key).slice(0, 32), data);
  } catch (e) {
    // Clear cache if full
    localStorage.clear();
  }
};

// Simple Queue to prevent concurrent hits
class GeminiQueue {
  private queue: (() => Promise<void>)[] = [];
  private processing = false;

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    const task = this.queue.shift();
    if (task) {
      await task();
      // Add a small delay between requests to be safe
      await new Promise(r => setTimeout(r, 1000));
    }
    this.processing = false;
    this.process();
  }
}

const queue = new GeminiQueue();

const fetchWithRetry = async (fn: () => Promise<any>, retries = 3, delay = 2000): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    // Check for 429 Rate Limit
    if (retries > 0 && (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED'))) {
      console.warn(`Rate limit hit. Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(r => setTimeout(r, delay));
      return fetchWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const generateCinematicImage = async (prompt: string, aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16" = "16:9"): Promise<string | null> => {
  // Check Cache First
  const cacheKey = `${prompt}_${aspectRatio}`;
  const cached = getCachedImage(cacheKey);
  if (cached) return cached;

  return queue.add(async () => {
    try {
      if (!process.env.API_KEY) {
        console.warn("API_KEY not found. Skipping image generation.");
        return null;
      }

      const result = await fetchWithRetry(async () => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        return await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: `High-end cinematic film still, 35mm anamorphic. ${prompt}. Professional color grade, deep shadows, transcendental noir aesthetic, architectural lighting.`
              }
            ]
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio
            }
          }
        });
      });

      if (!result.candidates?.[0]?.content?.parts) return null;

      for (const part of result.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64 = `data:image/png;base64,${part.inlineData.data}`;
          setCachedImage(cacheKey, base64);
          return base64;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Gemini Image Generation Error:", error);
      return null;
    }
  });
};

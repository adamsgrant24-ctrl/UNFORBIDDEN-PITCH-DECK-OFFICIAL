
import { GoogleGenAI, Modality } from "@google/genai";

const CACHE_PREFIX = "unforbidden_img_v7_";
const AUDIO_CACHE_PREFIX = "unforbidden_audio_v6_";

const getCacheKey = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  return hash.toString(16);
};

const getCachedImage = (key: string): string | null => {
  try {
    return localStorage.getItem(CACHE_PREFIX + getCacheKey(key));
  } catch {
    return null;
  }
};

const setCachedImage = (key: string, data: string) => {
  try {
    localStorage.setItem(CACHE_PREFIX + getCacheKey(key), data);
  } catch (e) {
    console.warn("Storage full, evicting...");
    try {
      // Clear all unforbidden images to make space for the new ones
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(CACHE_PREFIX)) localStorage.removeItem(k);
      });
      localStorage.setItem(CACHE_PREFIX + getCacheKey(key), data);
    } catch {
      // If it still fails, just proceed without caching
    }
  }
};

export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

class GeminiQueue {
  private queue: { task: () => Promise<void>, priority: boolean }[] = [];
  private processing = false;
  private lastRequestTime = 0;
  private minInterval = 2500; 
  private globalCooldown = false;

  async add<T>(task: () => Promise<T>, priority = false): Promise<T> {
    return new Promise((resolve, reject) => {
      const wrappedTask = async () => {
        if (this.globalCooldown) {
          reject(new Error("QUOTA_COOLDOWN"));
          return;
        }
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      if (priority) {
        this.queue.unshift({ task: wrappedTask, priority });
      } else {
        this.queue.push({ task: wrappedTask, priority });
      }
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0 || this.globalCooldown) return;
    this.processing = true;

    const now = Date.now();
    const timeSinceLast = now - this.lastRequestTime;
    if (timeSinceLast < this.minInterval) {
      await new Promise(r => setTimeout(r, this.minInterval - timeSinceLast));
    }

    const item = this.queue.shift();
    if (item) {
      try {
        await item.task();
        this.lastRequestTime = Date.now();
      } catch (e: any) {
        const errorStr = String(e).toLowerCase();
        if (errorStr.includes('429') || errorStr.includes('resource_exhausted')) {
          this.globalCooldown = true;
          setTimeout(() => { this.globalCooldown = false; this.process(); }, 30000);
        }
      }
    }
    
    this.processing = false;
    if (!this.globalCooldown) this.process();
  }
}

const queue = new GeminiQueue();

const fetchWithRetry = async (fn: () => Promise<any>, retries = 2): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 2000));
      return fetchWithRetry(fn, retries - 1);
    }
    throw error;
  }
};

export const generateCinematicImage = async (
  prompt: string, 
  aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16" = "16:9",
  priority = false
): Promise<string | null> => {
  const cacheKey = `${prompt}_${aspectRatio}`;
  const cached = getCachedImage(cacheKey);
  if (cached) return cached;

  return queue.add(async () => {
    try {
      if (!process.env.API_KEY) return null;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const attemptGen = async (p: string, ar: any) => {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `Cinematic film still, high end photography. ${p}. 35mm film aesthetic.` }]
          },
          config: { imageConfig: { aspectRatio: ar } }
        });
        const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        return part?.inlineData?.data ? `data:image/png;base64,${part.inlineData.data}` : null;
      };

      let result = null;
      
      // Tier 1: Original
      try {
        result = await fetchWithRetry(() => attemptGen(prompt, aspectRatio), 1);
      } catch (e) { console.warn("Tier 1 Failed"); }

      // Tier 2: Safe Fallback
      if (!result) {
        try {
          console.warn("Attempting Tier 2 Fallback...");
          result = await fetchWithRetry(() => attemptGen("Modern minimalist architecture, dramatic blue lighting, cinematic", "1:1"), 1);
        } catch (e) { console.warn("Tier 2 Failed"); }
      }

      // Tier 3: Absolute Fallback
      if (!result) {
        try {
           console.warn("Attempting Tier 3 Fallback...");
           result = await attemptGen("Blue cinematic light in darkness", "1:1");
        } catch (e) {}
      }

      if (result) {
        setCachedImage(cacheKey, result);
        return result;
      }
      return null;
    } catch (error) {
      console.error("Image synthesis terminal error:", error);
      return null;
    }
  }, priority);
};

export const generateTrailerVoiceover = async (text: string): Promise<string | null> => {
  const cacheKey = AUDIO_CACHE_PREFIX + getCacheKey(text);
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  return queue.add(async () => {
    try {
      if (!process.env.API_KEY) return null;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await fetchWithRetry(() => ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Voice: Deep cinematic. Script: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
          },
        },
      }));
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        try { localStorage.setItem(cacheKey, base64Audio); } catch {}
        return base64Audio;
      }
      return null;
    } catch (error) {
      return null;
    }
  });
};

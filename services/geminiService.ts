import { GoogleGenAI, Modality } from "@google/genai";

const CACHE_PREFIX = "unforbidden_img_v3_";
const AUDIO_CACHE_PREFIX = "unforbidden_audio_v2_";

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
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(k);
        break; 
      }
    }
    try { localStorage.setItem(CACHE_PREFIX + btoa(key).slice(0, 32), data); } catch {}
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
  private queue: (() => Promise<void>)[] = [];
  private processing = false;
  private lastRequestTime = 0;
  private minInterval = 25000; // Increased to 25s to be extremely safe with free tier
  private globalCooldown = false;

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
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
      });
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

    const task = this.queue.shift();
    if (task) {
      try {
        await task();
        this.lastRequestTime = Date.now();
      } catch (e: any) {
        const errorStr = String(e).toLowerCase();
        if (errorStr.includes('429') || errorStr.includes('resource_exhausted')) {
          console.warn("Global Quota hit. Entering 90s cooldown.");
          this.globalCooldown = true;
          setTimeout(() => {
            this.globalCooldown = false;
            this.process();
          }, 90000);
        }
      }
    }
    
    this.processing = false;
    if (!this.globalCooldown) this.process();
  }
}

const queue = new GeminiQueue();

const fetchWithRetry = async (fn: () => Promise<any>, retries = 2, delay = 30000): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    const errorStr = String(error).toLowerCase();
    const isRateLimit = errorStr.includes('429') || errorStr.includes('resource_exhausted') || errorStr.includes('quota');
    
    if (retries > 0 && isRateLimit) {
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
      return fetchWithRetry(fn, retries - 1, delay * 1.5);
    }
    throw error;
  }
};

export const generateCinematicImage = async (prompt: string, aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16" = "16:9"): Promise<string | null> => {
  const cacheKey = `${prompt}_${aspectRatio}`;
  const cached = getCachedImage(cacheKey);
  if (cached) return cached;

  return queue.add(async () => {
    try {
      if (!process.env.API_KEY) return null;
      const response = await fetchWithRetry(async () => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        return await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `High-end cinematic film still, 35mm anamorphic. ${prompt}. Professional color grade, deep shadows, transcendental noir aesthetic, architectural lighting.` }]
          },
          config: {
            imageConfig: { aspectRatio }
          }
        });
      });
      const parts = response.candidates?.[0]?.content?.parts;
      if (!parts) return null;
      for (const part of parts) {
        if (part.inlineData) {
          const base64 = `data:image/png;base64,${part.inlineData.data}`;
          setCachedImage(cacheKey, base64);
          return base64;
        }
      }
      return null;
    } catch (error) {
      console.error("Gemini Image Synthesis Failed:", error);
      return null;
    }
  });
};

export const generateTrailerVoiceover = async (text: string): Promise<string | null> => {
  const cacheKey = AUDIO_CACHE_PREFIX + btoa(text).slice(0, 32);
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  return queue.add(async () => {
    try {
      if (!process.env.API_KEY) return null;
      const response = await fetchWithRetry(async () => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        return await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: `Speak in a deep, gravelly, cinematic noir narrator voice. Paced and dramatic: ${text}` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Charon' },
              },
            },
          },
        });
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        try { localStorage.setItem(cacheKey, base64Audio); } catch {}
        return base64Audio;
      }
      return null;
    } catch (error) {
      console.error("Gemini TTS Synthesis Failed:", error);
      return null;
    }
  });
};

import { GoogleGenAI } from "@google/genai";

const CACHE_PREFIX = "unforbidden_v9_";

const getCacheKey = (prompt, ratio) => {
  const clean = (prompt + ratio).replace(/[^a-z0-9]/gi, '').toLowerCase();
  return CACHE_PREFIX + clean.slice(0, 32);
};

const getCachedImage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setCachedImage = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (e) {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(k);
      }
    }
    try { localStorage.setItem(key, data); } catch { }
  }
};

const taskQueue = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || taskQueue.length === 0) return;
  isProcessing = true;
  
  while (taskQueue.length > 0) {
    const task = taskQueue.shift();
    if (task) {
      try {
        await task();
      } catch (err) {
        console.error("Queue Task Failure:", err);
      }
      await new Promise(r => setTimeout(r, 4500));
    }
  }
  
  isProcessing = false;
};

function enqueue(task) {
  return new Promise((resolve, reject) => {
    taskQueue.push(async () => {
      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
    processQueue();
  });
}

const fetchWithRetry = async (fn, retries = 2, delay = 6000) => {
  try {
    return await fn();
  } catch (error) {
    const errorStr = String(error).toLowerCase();
    const isRateLimit = errorStr.includes('429') || errorStr.includes('resource_exhausted');

    if (retries > 0 && isRateLimit) {
      await new Promise(r => setTimeout(r, delay));
      return fetchWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const generateCinematicImage = async (prompt, aspectRatio = "1:1") => {
  const cacheKey = getCacheKey(prompt, aspectRatio);
  const cached = getCachedImage(cacheKey);
  if (cached) return cached;

  return enqueue(async () => {
    try {
      const response = await fetchWithRetry(async () => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        return await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{
              text: `Cinematic film still, 35mm anamorphic. ${prompt}. High contrast, deep noir shadows, atmospheric.`
            }]
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
      console.error("Gemini Image Gen failed:", error);
      return null;
    }
  });
};

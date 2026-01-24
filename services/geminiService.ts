
import { GoogleGenAI } from "@google/genai";

export const generateCinematicImage = async (prompt: string, aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16" = "16:9"): Promise<string | null> => {
  try {
    if (!process.env.API_KEY) {
      console.warn("API_KEY not found. Skipping image generation.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
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

    if (!response.candidates?.[0]?.content?.parts) return null;

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    return null;
  }
};

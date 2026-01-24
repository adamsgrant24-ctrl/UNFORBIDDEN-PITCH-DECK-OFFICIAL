
import { GoogleGenAI } from "@google/genai";

export const generateCinematicImage = async (prompt: string): Promise<string | null> => {
  try {
    // Only proceed if the API key is present to avoid runtime initialization errors in the browser
    if (!process.env.API_KEY) {
      console.warn("API_KEY environment variable is not defined. AI image generation skipped.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Cinematic 35mm anamorphic film frame. ${prompt}. Professional color grade, high dynamic range, architectural photography style.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    if (!response || !response.candidates || response.candidates.length === 0) {
      return null;
    }

    const parts = response.candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Language } from "../types";

// Helper to debug key issues without exposing the full key
const debugKey = (key: string | undefined) => {
  if (!key) return "MISSING";
  if (key.length < 10) return "INVALID_SHORT";
  return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
};

const apiKey = process.env.API_KEY || '';
console.log("Gemini API Key Status:", debugKey(apiKey));

// Initialize with fallback
const ai = new GoogleGenAI({ apiKey: apiKey });

export const getHealthAdvice = async (
  query: string,
  language: Language,
  contextData: string
): Promise<string> => {
  // Runtime check for API Key
  if (!process.env.API_KEY) {
    console.error("CRITICAL ERROR: API_KEY is missing from environment variables.");
    console.error("If on Netlify: Go to Site Settings > Environment Variables > Add 'API_KEY'.");
    
    return language === Language.AMHARIC 
      ? "የAI አገልግሎት ቁልፍ (API Key) አልተሞላም። እባክዎ አስተዳዳሪውን ያናግሩ።" 
      : "Configuration Error: API Key is missing. Please set the API_KEY environment variable in Netlify.";
  }

  try {
    const langInstruction = language === Language.AMHARIC 
      ? "Answer in Amharic (Ethiopian language). Be encouraging and supportive like a kind doctor." 
      : "Answer in English. Be encouraging and supportive like a kind doctor.";

    const systemInstruction = `
      You are Doctor JD, a supportive weight loss coach for women in Ethiopia.
      ${langInstruction}
      Keep answers concise (under 100 words) and practical.
      Context about the user: ${contextData}
    `;

    // Ensure we use the correct model for text generation
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm here to support you. Please try asking again.";
  } catch (error: any) {
    console.error("Gemini API Error Details:", error);
    
    // Check for specific 400 error which usually means invalid key or model
    if (error.toString().includes("400") || error.toString().includes("API key not valid")) {
       return language === Language.AMHARIC 
        ? "የAPI Key ችግር አለ። እባክዎ በትክክል መሞላቱን ያረጋግጡ።"
        : "API Key Error: The key provided is invalid or expired. Please check Netlify settings.";
    }

    return language === Language.AMHARIC 
      ? "ይቅርታ፣ ችግር አጋጥሟል። እባክዎ እንደገና ይሞክሩ።" 
      : "Sorry, I encountered an issue. Please try again.";
  }
};
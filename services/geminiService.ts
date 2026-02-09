import { GoogleGenerativeAI } from "@google/generative-ai";
import { Language } from "../types";

// 1. USE THE CORRECT VITE ENV VARIABLE
// Cast to 'any' to bypass the TypeScript check
const API_KEY = (import.meta as any).env.VITE_GOOGLE_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

export const getHealthAdvice = async (
  query: string,
  language: Language,
  contextData: string
): Promise<string> => {
  if (!API_KEY) {
    console.error("CRITICAL ERROR: VITE_GOOGLE_API_KEY is missing.");
    return "Configuration Error: API Key is missing. Check Netlify settings.";
  }

  try {
    const langInstruction =
      language === Language.AMHARIC
        ? "Answer in Amharic (Ethiopian language). Be encouraging and supportive like a kind doctor."
        : "Answer in English. Be encouraging and supportive like a kind doctor.";

    const systemInstruction = `
      You are Doctor JD, a supportive weight loss coach for women in Ethiopia.
      ${langInstruction}
      Keep answers concise (under 100 words) and practical.
      Context about the user: ${contextData}
    `;

    // ✅ UPDATED TO GEMINI 2.5 PRO
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // This is the model you asked for
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(query);
    const response = await result.response;
    
    return response.text();

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Specific error handling for Quota limits (429)
    if (error.message?.includes("429") || error.message?.includes("Quota")) {
       return language === Language.AMHARIC
        ? "በጣም ብዙ ጥያቄዎች ስለተላኩ እባክዎ ትንሽ ይጠብቁ።"
        : "Traffic is high. Please wait a minute and try again.";
    }

    return language === Language.AMHARIC
      ? "ይቅርታ፣ ችግር አጋጥሟል። እባክዎ እንደገና ይሞክሩ።"
      : "Sorry, I encountered an issue. Please try again.";
  }
};
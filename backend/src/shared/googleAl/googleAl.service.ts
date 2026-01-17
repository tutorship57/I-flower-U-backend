import { GoogleGenAI } from "@google/genai";

const gooleAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

export { gooleAI };
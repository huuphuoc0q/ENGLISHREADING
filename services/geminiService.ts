import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent } from '../types';

const schema = {
  type: Type.OBJECT,
  properties: {
    title: { 
      type: Type.STRING,
      description: "A concise and relevant title for the text in English."
    },
    english_text_segments: {
      type: Type.ARRAY,
      description: "An array of objects representing the English text, broken down into meaningful chunks or phrases. Each object has a 'text' and a 'highlight' property.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: {
            type: Type.STRING,
            description: "A segment of the English paragraph."
          },
          highlight: {
            type: Type.BOOLEAN,
            description: "Set to true if this segment is a key phrase that should be highlighted for learning."
          }
        },
        required: ['text', 'highlight']
      }
    },
    vietnamese_text: { 
      type: Type.STRING,
      description: "The full and accurate Vietnamese translation of the entire English text as a single string."
    }
  },
  required: ['title', 'english_text_segments', 'vietnamese_text']
};

export async function generateBilingualText(
  ieltsBand: string, 
  wordCount: number, 
  topic: string,
  apiKey: string
): Promise<GeneratedContent> {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as an expert English language teacher specializing in IELTS preparation.
    Your task is to generate a cohesive English paragraph suitable for a student at an IELTS band level of ${ieltsBand}.
    The total word count should be approximately ${wordCount} words.
    The topic of the text should be: "${topic || 'a topic of general interest'}".

    You must structure your response strictly as a JSON object that conforms to the provided schema. Do not add any text before or after the JSON object.
    
    Instructions for JSON content:
    1.  Create a single JSON object.
    2.  "title": A concise and relevant title for the text in English.
    3.  "english_text_segments": Break the entire English paragraph down into an array of meaningful phrases or "chunks". For each chunk, create an object with "text" and "highlight" properties. Set "highlight" to true for the most important phrases that a student should focus on. The combined text of all segments should form the complete, original paragraph.
    4.  "vietnamese_text": A full, natural-sounding Vietnamese translation for the ENTIRE English paragraph as a single string.
  `;
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
          temperature: 0.8,
        },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    if (!parsedJson.title || !Array.isArray(parsedJson.english_text_segments) || !parsedJson.vietnamese_text) {
        throw new Error("Invalid JSON structure received from API.");
    }
    
    return parsedJson as GeneratedContent;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Throw a generic, user-friendly error. The App component will handle clearing the key.
    throw new Error("Failed to generate content. Please check your API key and network connection.");
  }
}
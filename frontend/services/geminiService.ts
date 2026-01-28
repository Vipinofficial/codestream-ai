
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, SolutionAnalysis, Challenge, SecurityEvent, CodeSnapshot, MCQ } from "../types";

export const getAIHint = async (problemDescription: string, currentCode: string, history: ChatMessage[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are an AI programming tutor. Help the user with a challenge.
        Problem: ${problemDescription}
        Current Code: ${currentCode}
        Previous Context: ${JSON.stringify(history)}
        Provide a helpful hint without giving away the full solution immediately.`,
  });
  return response.text;
};

export const detectCheating = async (code: string, securityEvents: SecurityEvent[], history: CodeSnapshot[]): Promise<{ flag: boolean; reasoning: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this coding session for signs of cheating (e.g., sudden jumps in code completion, suspicious tab switching, or logic that looks like it was pasted from an LLM).
    Code: ${code}
    Security Events: ${JSON.stringify(securityEvents)}
    History Samples: ${JSON.stringify(history.slice(-10))}
    
    Return JSON: { "flag": boolean, "reasoning": string }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          flag: { type: Type.BOOLEAN },
          reasoning: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{"flag": false, "reasoning": "Inconclusive"}');
};

export const generatePerformanceSummary = async (data: any, type: 'student' | 'teacher' | 'admin'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following technical performance data for a ${type} report. 
    Provide a concise 3-sentence executive summary highlighting key strengths and areas for improvement.
    
    Data: ${JSON.stringify(data)}`,
  });
  return response.text || "Summary unavailable.";
};

export const translateChallenge = async (description: string, targetLanguage: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the following technical coding problem description into ${targetLanguage}. Maintain technical terms in English where appropriate (e.g., "array", "function"), but ensure the logic and requirements are clear in ${targetLanguage}.
    
    Description: "${description}"`,
  });
  return response.text || description;
};

export const generateChallengeFromJD = async (jdText: string): Promise<Partial<Challenge>> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a senior technical recruiter. Based on this Job Description, generate a single unique coding challenge that would effectively screen a candidate.
    JD: "${jdText}"
    
    Return a JSON object with: title, difficulty (Easy/Medium/Hard), category, description, initialCode, and testCases (array of {input, expectedOutput}).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          category: { type: Type.STRING },
          description: { type: Type.STRING },
          initialCode: { type: Type.STRING },
          testCases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                input: { type: Type.STRING },
                expectedOutput: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateMCQs = async (role: string, level: string, category: string, count: number = 5): Promise<MCQ[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate ${count} multiple choice questions for a technical interview.
    Role: ${role}
    Experience Level: ${level}
    Skill Category: ${category}
    
    Return JSON array of objects with: id, question, options (array of 4 strings), correctAnswer (index 0-3), and explanation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswer"]
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const analyzeSolution = async (problemDescription: string, userCode: string): Promise<SolutionAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the following coding solution for the problem: "${problemDescription}".
    User Code:
    ${userCode}
    
    Return the analysis in JSON format with properties: score (0-100), timeComplexity, spaceComplexity, feedback (detailed string), and optimizations (array of strings).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          timeComplexity: { type: Type.STRING },
          spaceComplexity: { type: Type.STRING },
          feedback: { type: Type.STRING },
          optimizations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["score", "timeComplexity", "spaceComplexity", "feedback", "optimizations"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

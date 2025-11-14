
import { GoogleGenAI } from "@google/genai";
import { Question } from '../types.ts';

// Fix: Use process.env.API_KEY to access the environment variable as per the guidelines.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  // Fix: Updated error message to reflect the correct environment variable name.
  throw new Error("API_KEY não foi definida. Por favor, configure-a nas variáveis de ambiente.");
}

const ai = new GoogleGenAI({ apiKey });

export const getExplanation = async (question: Question, userAnswer: string, correctAnswer: string): Promise<string> => {
  const prompt = `
    A um estudante foi feita a seguinte pergunta de matemática:
    Pergunta: "${question.question}"
    Opções: [${question.options.join(', ')}]

    O estudante respondeu: "${userAnswer}".
    A resposta correta é: "${correctAnswer}".

    Por favor, explique de forma simples e clara, em português, por que a resposta do estudante está incorreta e por que a resposta correta é a certa.
    Seja didático e use uma linguagem fácil de entender para um estudante. Não use markdown.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating explanation with Gemini API:", error);
    return "Desculpe, não foi possível gerar uma explicação neste momento. Por favor, tente novamente mais tarde.";
  }
};
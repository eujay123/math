
import { GoogleGenAI } from "@google/genai";
import { Question } from '../types';

// Assume process.env.API_KEY is configured in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

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
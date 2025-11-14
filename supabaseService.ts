import { Question } from '../types.ts';

const questions: Question[] = [
  // Teoria de Conjuntos
  { id: 1, question: "Dados os conjuntos A = {1, 2, 3, 4} e B = {3, 4, 5, 6}, qual é o conjunto A ∩ B (interseção)?", options: ["{3, 4}", "{1, 2, 5, 6}", "{1, 2, 3, 4, 5, 6}", "{}"], correctAnswer: "{3, 4}", points: 5 },
  { id: 2, question: "Se A = {a, b, c} e B = {c, d, e}, qual é o conjunto A ∪ B (união)?", options: ["{c}", "{a, b, d, e}", "{a, b, c, d, e}", "{a, b, c}"], correctAnswer: "{a, b, c, d, e}", points: 5 },
  { id: 3, question: "Considere os conjuntos U = {0, 1, 2, 3, 4, 5} e V = {0, 2, 4}. Qual é o conjunto U - V (diferença)?", options: ["{0, 2, 4}", "{1, 3, 5}", "{0, 1, 2, 3, 4, 5}", "{}"], correctAnswer: "{1, 3, 5}", points: 5 },

  // Expressões Quadráticas Paramétricas
  { id: 4, question: "Para que valor de 'k' a equação x² - 6x + k = 0 tem duas raízes reais e iguais?", options: ["k = 3", "k = 6", "k = 9", "k = 12"], correctAnswer: "k = 9", points: 5 },
  { id: 5, question: "Na equação x² + (m+2)x + 2m = 0, uma das raízes é 2. Qual é o valor de 'm'?", options: ["m = -2", "m = 0", "m = 2", "m = 4"], correctAnswer: "m = -2", points: 5 },

  // Equações Biquadráticas
  { id: 6, question: "Quais são as raízes reais da equação biquadrática x⁴ - 5x² + 4 = 0?", options: ["{1, 4}", "{1, 2}", "{-1, 1, -2, 2}", "{-1, 1}"], correctAnswer: "{-1, 1, -2, 2}", points: 5 },
  { id: 7, question: "A soma das raízes da equação x⁴ - 13x² + 36 = 0 é:", options: ["13", "36", "5", "0"], correctAnswer: "0", points: 5 },
  { id: 8, question: "Quantas raízes reais tem a equação x⁴ + 10x² + 9 = 0?", options: ["4", "2", "1", "0"], correctAnswer: "0", points: 5 },

  // Função Quadrática
  { id: 9, question: "A altura h (em metros) de um projétil é dada por h(t) = -5t² + 40t. Qual é a altura máxima atingida?", options: ["40 m", "60 m", "80 m", "100 m"], correctAnswer: "80 m", points: 5 },
  { id: 10, question: "Um agricultor quer cercar uma área retangular com 200 metros de cerca. Qual é a maior área que ele pode cercar?", options: ["2000 m²", "2500 m²", "3000 m²", "5000 m²"], correctAnswer: "2500 m²", points: 5 },
  { id: 11, question: "Quais são as raízes da função quadrática f(x) = x² - x - 6?", options: ["{2, 3}", "{-2, -3}", "{-2, 3}", "{2, -3}"], correctAnswer: "{-2, 3}", points: 5 },
  { id: 12, question: "Qual é o vértice da parábola representada pela função f(x) = x² - 4x + 3?", options: ["(2, 1)", "(-2, 1)", "(2, -1)", "(-2, -1)"], correctAnswer: "(2, -1)", points: 5 },
  
  // Função Exponencial
  { id: 13, question: "Qual das opções descreve o gráfico da função exponencial y = 2^x - 1?", options: ["Uma parábola com concavidade para cima", "Uma reta crescente", "Uma curva exponencial que corta o eixo y em (0,0)", "Uma curva exponencial que corta o eixo y em (0,1)"], correctAnswer: "Uma curva exponencial que corta o eixo y em (0,0)", points: 5 },
  { id: 14, question: "Resolva a equação exponencial: 3^(x+1) = 81.", options: ["x = 2", "x = 3", "x = 4", "x = 9"], correctAnswer: "x = 3", points: 5 },
  { id: 15, question: "A função f(x) = (0.5)^x + 3 é:", options: ["Crescente e passa pela origem", "Decrescente e tem assíntota em y=3", "Crescente e tem assíntota em y=3", "Decrescente e passa pela origem"], correctAnswer: "Decrescente e tem assíntota em y=3", points: 5 },
  
  // Logaritmo e Função Logarítmica
  { id: 16, question: "Qual é o valor de log₂(32)?", options: ["3", "4", "5", "16"], correctAnswer: "5", points: 5 },
  { id: 17, question: "Usando as propriedades dos logaritmos, simplifique log(5) + log(2). (Considere log base 10)", options: ["log(7)", "log(2.5)", "1", "10"], correctAnswer: "1", points: 5 },
  { id: 18, question: "Resolva a equação logarítmica: log₃(x - 1) = 2.", options: ["x = 7", "x = 8", "x = 9", "x = 10"], correctAnswer: "x = 10", points: 5 },

  // Estatística
  { id: 19, question: "Qual é a frequência absoluta da nota 8 no conjunto de dados: {7, 8, 5, 10, 8, 9, 7, 8, 6, 8}?", options: ["2", "3", "4", "5"], correctAnswer: "4", points: 5 },
  { id: 20, question: "Qual é a frequência relativa percentual da nota 8 no conjunto de dados: {7, 8, 5, 10, 8, 9, 7, 8, 6, 8}?", options: ["20%", "30%", "40%", "50%"], correctAnswer: "40%", points: 5 }
];

export const fetchQuestions = async (): Promise<Question[]> => {
  // Simula uma chamada de API para o Supabase
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(questions);
    }, 1000);
  });
};
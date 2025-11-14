
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface UserAnswer {
  [questionId: number]: string;
}

export interface Result {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
  explanation?: string;
}
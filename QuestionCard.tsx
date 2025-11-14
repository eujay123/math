import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  userAnswer: string | undefined;
  onAnswerChange: (questionId: number, answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, userAnswer, onAnswerChange, questionNumber, totalQuestions }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 md:p-8 mb-6 transition-shadow duration-300 hover:shadow-sm">
      <div className="flex justify-between items-start mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-[#3A3A3A] leading-tight">{question.question}</h2>
        <span className="text-sm font-medium text-slate-500 whitespace-nowrap ml-4">{`Questão ${questionNumber} de ${totalQuestions}`}</span>
      </div>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              userAnswer === option
                ? 'border-[#3A3A3A] bg-[#FBF9F6] ring-2 ring-offset-1 ring-[#3A3A3A]/50'
                : 'border-slate-300 bg-white hover:border-slate-400'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={userAnswer === option}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="h-5 w-5 text-[#3A3A3A] focus:ring-[#3A3A3A]/50 border-slate-400"
            />
            <span className="ml-4 text-lg text-slate-800">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
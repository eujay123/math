import React from 'react';
import { Result } from '../types.ts';
import { CheckIcon } from './icons/CheckIcon.tsx';
import { XIcon } from './icons/XIcon.tsx';

interface ResultsProps {
  results: Result[];
  totalScore: number;
  maxScore: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, totalScore, maxScore, onRestart }) => {
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3A3A3A] mb-2">Avaliação Concluída!</h1>
        <p className="text-lg text-slate-600 mb-8">Confira o seu desempenho abaixo.</p>
        <div className="bg-[#FBF9F6] rounded-xl p-6">
          <p className="text-xl font-semibold text-slate-700">Sua nota final é:</p>
          <p className="text-7xl font-extrabold text-[#3A3A3A] my-2">{percentage}<span className="text-4xl font-semibold text-slate-400">%</span></p>
          <p className="text-md text-slate-500">{`Você acertou ${results.filter(r => r.isCorrect).length} de ${results.length} questões (${totalScore} de ${maxScore} pontos).`}</p>
        </div>
      </div>

      <div className="space-y-6">
        {results.map((result) => (
          <div key={result.question.id} className={`bg-white border border-slate-200/80 p-6 rounded-xl border-l-4 ${result.isCorrect ? 'border-l-[#5A9C6A]' : 'border-l-[#D87C7C]'}`}>
            <h3 className="text-lg font-bold text-[#3A3A3A] mb-3">{result.question.id}. {result.question.question}</h3>
            <div className="flex items-center space-x-3 mb-4">
              {result.isCorrect ? <CheckIcon /> : <XIcon />}
              <p className={`text-md font-medium ${result.isCorrect ? 'text-[#5A9C6A]' : 'text-[#D87C7C]'}`}>
                {result.isCorrect ? `Você acertou: ${result.question.correctAnswer}` : `Sua resposta: ${result.userAnswer}`}
              </p>
            </div>
            {!result.isCorrect && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                 <p className="font-semibold text-slate-700 mb-2">Resposta Correta: <span className="font-normal text-[#5A9C6A]">{result.question.correctAnswer}</span></p>
                <p className="font-semibold text-[#3A3A3A] mb-1">Explicação da IA:</p>
                <p className="text-slate-600 leading-relaxed">
                  {result.explanation ? result.explanation : 'Carregando explicação...'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onRestart}
          className="bg-[#3A3A3A] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#2a2a2a] focus:outline-none focus:ring-4 focus:ring-[#3A3A3A]/30 transition-all duration-300 text-lg"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
};

export default Results;
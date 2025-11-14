import React, { useState, useEffect, useCallback } from 'react';
import { Question, UserAnswer, Result } from './types';
import { fetchQuestions } from './services/supabaseService';
import { getExplanation } from './services/geminiService';
import QuestionCard from './components/QuestionCard';
import Results from './components/Results';

const Loader: React.FC<{ message: string; subMessage?: string }> = ({ message, subMessage }) => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
            <svg className="mx-auto h-12 w-12 text-[#3A3A3A] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-[#3A3A3A]">{message}</h2>
            {subMessage && <p className="text-slate-500 mt-2">{subMessage}</p>}
        </div>
    </div>
);

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer>({});
  const [results, setResults] = useState<Result[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      setIsLoading(false);
    };
    loadQuestions();
  }, []);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleRestart = () => {
    setUserAnswers({});
    setResults(null);
    setIsSubmitting(false);
    window.scrollTo(0, 0);
  };

  const handleSubmit = useCallback(async () => {
    if (Object.keys(userAnswers).length !== questions.length) {
      alert("Por favor, responda a todas as perguntas antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    window.scrollTo(0, 0);

    const gradedResults = questions.map(question => {
      const userAnswer = userAnswers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      return {
        question,
        userAnswer,
        isCorrect,
      };
    });

    setResults(gradedResults);

    const explanationPromises = gradedResults
      .filter(result => !result.isCorrect)
      .map(result => 
        getExplanation(result.question, result.userAnswer, result.question.correctAnswer)
          .then(explanation => ({ questionId: result.question.id, explanation }))
      );

    const explanations = await Promise.all(explanationPromises);

    setResults(currentResults => {
      if (!currentResults) return null;
      return currentResults.map(result => {
        const foundExplanation = explanations.find(e => e.questionId === result.question.id);
        return foundExplanation ? { ...result, explanation: foundExplanation.explanation } : result;
      });
    });

    // A small delay to let the user perceive the state change before final content load
    setTimeout(() => setIsSubmitting(false), 500); 

  }, [userAnswers, questions]);

  const totalScore = results?.reduce((acc, result) => acc + (result.isCorrect ? result.question.points : 0), 0) ?? 0;
  const maxScore = questions.reduce((acc, q) => acc + q.points, 0);
  const allAnswered = Object.keys(userAnswers).length === questions.length;

  if (isLoading) {
    return <Loader message="Carregando avaliação..." />;
  }
  
  if (isSubmitting && !results) {
     return <Loader message="Corrigindo sua avaliação..." subMessage="A IA está preparando seu feedback. Isso pode levar alguns segundos." />;
  }

  return (
    <main className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {!results && (
          <header className="text-center mb-8 md:mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#3A3A3A]">Avaliação de Matemática</h1>
              <p className="mt-3 text-lg text-slate-600">Responda a todas as questões e verifique seu resultado.</p>
          </header>
        )}

        {results ? (
          <Results results={results} totalScore={totalScore} maxScore={maxScore} onRestart={handleRestart} />
        ) : (
          <div className="max-w-3xl mx-auto">
            {questions.map((q, index) => (
              <QuestionCard
                key={q.id}
                question={q}
                userAnswer={userAnswers[q.id]}
                onAnswerChange={handleAnswerChange}
                questionNumber={index + 1}
                totalQuestions={questions.length}
              />
            ))}
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                disabled={!allAnswered || isSubmitting}
                className="w-full sm:w-auto bg-[#3A3A3A] text-white font-bold py-4 px-12 rounded-lg shadow-md hover:bg-[#2a2a2a] disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-[#3A3A3A]/30 transition-all duration-300 text-xl"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Respostas'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
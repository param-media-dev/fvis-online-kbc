import React, { useState, useEffect } from 'react';
import { Question, GradeLevel } from '../types';
import { fetchQuestions, validateAnswer } from '../services/api';

interface QuizScreenProps {
  grade: GradeLevel;
  onComplete: (result: {
    answers: number[];
    score: number;
    total: number;
  }) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const QuizScreen: React.FC<QuizScreenProps> = ({ grade, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [validated, setValidated] = useState<boolean[]>([]);

  /* ================= FETCH QUESTIONS ================= */
  useEffect(() => {
    fetchQuestions(grade)
      .then((data) => {
        const formatted: Question[] = data.map((q: any) => ({
          id: q.id,
          question: q.question, // { en, hi }
          options: ['A', 'B', 'C', 'D'].map(
            (key) => q.options[key] // { en, hi }
          ),
        }));

        setQuestions(formatted);
        setAnswers(new Array(formatted.length).fill(-1));
        setValidated(new Array(formatted.length).fill(false));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load questions', err);
        setLoading(false);
      });
  }, [grade]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete({
            answers,
            score,
            total: questions.length,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, score, loading, onComplete, questions.length]);

  /* ================= ANSWER SELECTION ================= */
  const handleSelectOption = async (optionIndex: number) => {
    if (validated[currentIndex]) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);

    const questionId = questions[currentIndex].id;
    const selectedLetter = OPTION_LETTERS[optionIndex];

    try {
      const res = await validateAnswer(questionId, selectedLetter);

      if (res.correct) {
        setScore((prev) => prev + 1);
      }

      const newValidated = [...validated];
      newValidated[currentIndex] = true;
      setValidated(newValidated);
    } catch (err) {
      console.error('Validation failed', err);
    }
  };

  /* ================= NAVIGATION ================= */
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete({
        answers,
        score,
        total: questions.length,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 text-lg font-semibold">
        Loading questions...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center flex-1 text-red-600">
        No questions found for this grade.
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  /* ================= UI ================= */
  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            {grade}
          </span>
          <h3 className="text-sm font-semibold text-slate-700">
            Question {currentIndex + 1} of {questions.length}
          </h3>
        </div>

        <div
          className={`px-4 py-2 rounded-full font-mono text-lg font-bold ${
            timeLeft < 60
              ? 'bg-red-100 text-red-600 animate-pulse'
              : 'bg-blue-100 text-blue-600'
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-1 bg-slate-100">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="p-8 flex-1 flex flex-col">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2">
          {currentQuestion.question.en}
        </h2>

        <p className="text-lg text-slate-500 mb-8">
          ({currentQuestion.question.hi})
        </p>

        <div className="space-y-3 flex-1">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={validated[currentIndex]}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                answers[currentIndex] === idx
                  ? 'bg-blue-50 border-blue-500'
                  : 'bg-white border-slate-100 hover:border-blue-300'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm bg-slate-100">
                {OPTION_LETTERS[idx]}
              </div>

              <div className="flex flex-col">
                <span className="text-lg text-slate-700">
                  {option.en}
                </span>
                <span className="text-sm text-slate-500">
                  ({option.hi})
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-xl font-semibold text-slate-600"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={answers[currentIndex] === -1}
          className="px-8 py-3 rounded-xl font-semibold bg-blue-600 text-white"
        >
          {currentIndex === questions.length - 1
            ? 'Finish Quiz'
            : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

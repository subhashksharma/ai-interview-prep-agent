'use client';

import React, { useState, useEffect } from 'react';
import { QuestionInterface } from '@/components/user-quiz-assessment/question-interface';
import { AssessmentProgress } from '@/components/user-quiz-assessment/assessment-progress';
import { Question, Answer, ConfidenceLevel } from '@/components/user-quiz-assessment/types';

interface QuickGeneralQuestionsProps {
  onComplete: (answers: Record<number, string>) => void;
  onExit: () => void;
}

// Simple questions for quick assessment using the same Question type as deep assessment
const quickAssessmentQuestions: Question[] = [
  {
    id: 'quick-1',
    question: 'What type of work environment do you thrive in?',
    type: 'single-choice',
    difficulty: 'beginner',
    timeEstimate: 60,
    category: 'career-preferences',
    options: [
      'Fast-paced startup with lots of autonomy',
      'Structured corporate environment with clear processes',
      'Remote-first with flexible schedule',
      'Collaborative team setting with regular interaction',
    ],
  },
  {
    id: 'quick-2',
    question: 'Which describes your ideal role responsibilities?',
    type: 'single-choice',
    difficulty: 'beginner',
    timeEstimate: 60,
    category: 'career-preferences',
    options: [
      'Building and coding technical solutions',
      'Managing projects and coordinating teams',
      'Analyzing data and creating insights',
      'Designing user experiences and interfaces',
    ],
  },
  {
    id: 'quick-3',
    question: 'What motivates you most in your career?',
    type: 'single-choice',
    difficulty: 'beginner',
    timeEstimate: 60,
    category: 'career-preferences',
    options: [
      'Solving complex technical challenges',
      'Making a meaningful impact on users',
      'Leading and mentoring team members',
      'Continuous learning and skill development',
    ],
  },
  {
    id: 'quick-4',
    question: 'How do you prefer to approach problems?',
    type: 'single-choice',
    difficulty: 'beginner',
    timeEstimate: 60,
    category: 'career-preferences',
    options: [
      'Break them down systematically and analyze',
      'Brainstorm creative solutions with others',
      'Research best practices and methodologies',
      'Experiment with different approaches quickly',
    ],
  },
  {
    id: 'quick-5',
    question: "What's most important to you in a role?",
    type: 'single-choice',
    difficulty: 'beginner',
    timeEstimate: 60,
    category: 'career-preferences',
    options: [
      'Opportunities for technical growth',
      'Work-life balance and flexibility',
      'Competitive compensation and benefits',
      'Company mission and values alignment',
    ],
  },
];

export default function QuickGeneralQuestions({ onComplete, onExit }: QuickGeneralQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentQuestion = quickAssessmentQuestions[currentQuestionIndex];
  const totalQuestions = quickAssessmentQuestions.length;

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Calculate confidence levels from answers
  const confidenceLevels = answers.reduce(
    (acc, ans) => {
      acc[ans.confidence]++;
      return acc;
    },
    { low: 0, medium: 0, high: 0 } as Record<ConfidenceLevel, number>
  );

  const handleAnswer = (answer: Answer) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === answer.questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = answer;
        return updated;
      }
      return [...prev, answer];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    // Convert answers to the format expected by onComplete
    const answersMap: Record<number, string> = {};
    answers.forEach((ans, index) => {
      const answerValue = Array.isArray(ans.answer) ? ans.answer[0] : ans.answer;
      answersMap[index + 1] = answerValue;
    });
    onComplete(answersMap);
  };

  const previousAnswer = answers.find((a) => a.questionId === currentQuestion.id);

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 p-2 sm:p-4 bg-slate-50'>
      {/* Main Question Area */}
      <div className='flex-1 min-w-0'>
        <QuestionInterface
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onFinish={handleFinish}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === totalQuestions - 1}
          previousAnswer={previousAnswer}
        />
      </div>

      {/* Sidebar Progress - Hidden on mobile, shown on large screens */}
      <div className='hidden lg:block lg:w-72 xl:w-80 lg:sticky lg:top-4 lg:self-start'>
        <AssessmentProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          answeredQuestions={answers.length}
          elapsedTime={elapsedTime}
          confidenceLevels={confidenceLevels}
        />
      </div>
    </div>
  );
}

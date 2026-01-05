'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { AssessmentModeSelector } from './assessment-mode-selector';
import { TopicBasedAssessment } from './topic-based-assessment';
import { CustomAssessment } from './custom-assessment';
import { QuestionInterface } from './question-interface';
import { AssessmentProgress } from './assessment-progress';
import {
  AssessmentMode,
  TopicOption,
  CustomAssessmentInput,
  DifficultyLevel,
  Question,
  Answer,
  AssessmentSession,
} from './types';

interface UserQuizAssessmentProps {
  onComplete?: (session: AssessmentSession) => void;
  onExit?: () => void;
}

export function UserQuizAssessment({ onComplete, onExit }: UserQuizAssessmentProps) {
  const [mode, setMode] = React.useState<AssessmentMode>(null);
  const [session, setSession] = React.useState<AssessmentSession | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [startTime] = React.useState(Date.now());
  const [elapsedTime, setElapsedTime] = React.useState(0);

  // Timer for elapsed time
  React.useEffect(() => {
    if (session?.status === 'in-progress') {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [session?.status, startTime]);

  const handleSelectMode = (selectedMode: AssessmentMode) => {
    setMode(selectedMode);
  };

  const handleStartTopicAssessment = async (topic: TopicOption, difficulty: DifficultyLevel) => {
    setIsGenerating(true);

    // Simulate API call to generate questions
    // In production, this would call your LLM backend
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockQuestions: Question[] = generateMockQuestions(topic, difficulty);

    const newSession: AssessmentSession = {
      id: `session-${Date.now()}`,
      mode: 'topic-based',
      topic,
      questions: mockQuestions,
      answers: [],
      currentQuestionIndex: 0,
      startTime: new Date(),
      status: 'in-progress',
      encouragementMessages: [],
    };

    setSession(newSession);
    setIsGenerating(false);
  };

  const handleStartCustomAssessment = async (input: CustomAssessmentInput) => {
    setIsGenerating(true);

    // Simulate API call to generate custom questions
    // In production, this would call your LLM backend with the custom input
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockQuestions: Question[] = generateCustomMockQuestions(input);

    const newSession: AssessmentSession = {
      id: `session-${Date.now()}`,
      mode: 'custom',
      customInput: input,
      questions: mockQuestions,
      answers: [],
      currentQuestionIndex: 0,
      startTime: new Date(),
      status: 'in-progress',
      encouragementMessages: [],
    };

    setSession(newSession);
    setIsGenerating(false);
  };

  const handleAnswer = (answer: Answer) => {
    if (!session) return;

    const updatedAnswers = [...session.answers];
    const existingIndex = updatedAnswers.findIndex((a) => a.questionId === answer.questionId);

    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = answer;
    } else {
      updatedAnswers.push(answer);
    }

    setSession({
      ...session,
      answers: updatedAnswers,
    });
  };

  const handleNext = () => {
    if (!session) return;
    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    if (!session) return;

    const completedSession: AssessmentSession = {
      ...session,
      status: 'completed',
    };

    setSession(completedSession);
    onComplete?.(completedSession);
  };

  const handleBack = () => {
    setMode(null);
    setSession(null);
    setCurrentQuestionIndex(0);
  };

  // Calculate confidence levels for progress
  const getConfidenceLevels = () => {
    if (!session) return { low: 0, medium: 0, high: 0 };

    return session.answers.reduce(
      (acc, answer) => {
        acc[answer.confidence]++;
        return acc;
      },
      { low: 0, medium: 0, high: 0 }
    );
  };

  // Render loading state
  if (isGenerating) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='text-center space-y-4'>
          <Loader2 className='w-12 h-12 animate-spin mx-auto text-primary' />
          <div>
            <h3 className='text-xl font-semibold mb-2'>Generating Your Assessment...</h3>
            <p className='text-muted-foreground'>
              Our AI is creating personalized questions just for you. This will only take a moment.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render assessment in progress
  if (session && session.status === 'in-progress') {
    const currentQuestion = session.questions[currentQuestionIndex];
    const previousAnswer = session.answers.find((a) => a.questionId === currentQuestion.id);

    return (
      <div className='w-full min-h-screen flex flex-col lg:flex-row gap-6 p-4'>
        {/* Main Content */}
        <div className='flex-1'>
          <QuestionInterface
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={session.questions.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFinish={handleFinish}
            isFirstQuestion={currentQuestionIndex === 0}
            isLastQuestion={currentQuestionIndex === session.questions.length - 1}
            previousAnswer={previousAnswer}
          />
        </div>

        {/* Sidebar Progress */}
        <div className='lg:w-80 lg:sticky lg:top-4 lg:self-start'>
          <AssessmentProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={session.questions.length}
            answeredQuestions={session.answers.length}
            elapsedTime={elapsedTime}
            confidenceLevels={getConfidenceLevels()}
          />
        </div>
      </div>
    );
  }

  // Render mode selection
  return (
    <AnimatePresence mode='wait'>
      {mode === null && <AssessmentModeSelector onSelectMode={handleSelectMode} />}

      {mode === 'topic-based' && (
        <TopicBasedAssessment
          onSelectTopic={handleStartTopicAssessment}
          onBack={handleBack}
        />
      )}

      {mode === 'custom' && (
        <CustomAssessment
          onStartCustomAssessment={handleStartCustomAssessment}
          onBack={handleBack}
        />
      )}
    </AnimatePresence>
  );
}

// Helper functions to generate mock questions
// In production, these would be replaced with actual API calls to your LLM backend

function generateMockQuestions(topic: TopicOption, difficulty: DifficultyLevel): Question[] {
  const baseQuestions: Question[] = [
    {
      id: 'q1',
      question: `Explain the core concepts of ${topic.name}`,
      type: 'open-ended',
      difficulty,
      timeEstimate: 300,
      category: topic.category,
      hints: ['Think about the fundamental principles', 'Consider practical examples'],
    },
    {
      id: 'q2',
      question: `What are the best practices when working with ${topic.name}?`,
      type: 'multiple-choice',
      difficulty,
      timeEstimate: 180,
      category: topic.category,
      options: [
        'Always optimize for performance first',
        'Focus on code readability and maintainability',
        'Use the latest features regardless of browser support',
        'Avoid documentation to save time',
      ],
    },
  ];

  return baseQuestions.slice(0, topic.questionCount);
}

function generateCustomMockQuestions(input: CustomAssessmentInput): Question[] {
  const mockQuestions: Question[] = [
    {
      id: 'custom-q1',
      question: `Describe your understanding of ${input.topic}`,
      type: 'open-ended',
      difficulty: input.difficulty,
      timeEstimate: 300,
      category: 'custom',
      hints: ['Break down the concept into smaller parts', 'Use examples from your experience'],
    },
  ];

  return mockQuestions.slice(0, input.questionCount);
}

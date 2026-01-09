'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Home } from 'lucide-react';

// Import types from shared location
import type { CareerPath, RoadmapStep, AssessmentSession } from '@/lib/types';

// Import data and utilities
import {
  journeyQuestions,
  generateCareerPaths,
  generateRoadmap,
  getCareerPathById,
} from '@/lib/career-data';

// Import step components
import Hub from '@/components/stepper/hub';
import Questions from '@/components/stepper/questions';
import Analyzing from '@/components/stepper/analyzing';
import CareerPathsView from '@/components/stepper/career-paths';
import RoadmapView from '@/components/stepper/roadmap';
import Quiz from '@/components/stepper/quiz';
import { UserQuizAssessment } from '@/components/user-quiz-assessment';
import AssessmentResults from '@/components/stepper/assessment-results';

// ============================================================
// Types
// ============================================================

type JourneyStage =
  | 'hub'
  | 'questions'
  | 'analyzing'
  | 'paths'
  | 'roadmap'
  | 'quiz'
  | 'enhanced-quiz';

// ============================================================
// Helper Functions
// ============================================================

function generateCareerPathsFromAssessment(session: AssessmentSession): CareerPath[] {
  const { topic, customInput, answers } = session;

  // Calculate performance score
  const totalAnswers = answers.length;
  const highConfidenceCount = answers.filter((a) => a.confidence === 'high').length;
  const mediumConfidenceCount = answers.filter((a) => a.confidence === 'medium').length;
  const performanceScore =
    totalAnswers > 0
      ? Math.round((highConfidenceCount * 100 + mediumConfidenceCount * 60) / totalAnswers)
      : 70;

  // Generate career paths based on topic
  const topicName = topic?.name || customInput?.topic || 'General';

  // Topic-to-career mapping
  const topicCareerMap: Record<string, string[]> = {
    'JavaScript Development': ['frontend-developer', 'software-engineer', 'backend-developer'],
    'React Development': ['frontend-developer', 'software-engineer', 'technical-lead'],
    'System Design': ['software-engineer', 'devops-engineer', 'technical-lead'],
    'Product Management': ['product-manager', 'technical-lead'],
    'Data Science': ['data-scientist', 'software-engineer'],
    DevOps: ['devops-engineer', 'backend-developer', 'security-engineer'],
    'QA Engineering': ['qa-engineer', 'software-engineer'],
    'UI/UX Design': ['ux-designer', 'frontend-developer'],
    default: ['software-engineer', 'product-manager', 'frontend-developer'],
  };

  const careerIds = topicCareerMap[topicName] || topicCareerMap.default;

  return careerIds
    .map((id) => getCareerPathById(id))
    .filter((path): path is CareerPath => path !== undefined)
    .map((path, index) => ({
      ...path,
      matchScore: Math.min(95 - index * 5, 70 + performanceScore / 3),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}

// ============================================================
// Main Component
// ============================================================

export default function JourneyWorkflow() {
  // State management
  const [stage, setStage] = useState<JourneyStage>('hub');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
  const [assessmentSession, setAssessmentSession] = useState<AssessmentSession | null>(null);

  // ============================================================
  // Event Handlers
  // ============================================================

  const handleStartJourney = (targetStage: JourneyStage) => {
    switch (targetStage) {
      case 'questions':
        setStage('questions');
        setCurrentQuestion(0);
        setAnswers({});
        break;
      case 'paths':
        // Show sample career paths
        const sampleAnswers = {
          1: 'option1',
          2: 'option2',
          3: 'option3',
          4: 'option4',
          5: 'option5',
        };
        setCareerPaths(generateCareerPaths(sampleAnswers));
        setStage('paths');
        break;
      case 'roadmap':
        // Show sample roadmap
        const samplePath = getCareerPathById('software-engineer');
        if (samplePath) {
          setSelectedPath(samplePath);
          setRoadmap(generateRoadmap('software-engineer'));
          setStage('roadmap');
        }
        break;
      case 'quiz':
      case 'enhanced-quiz':
        setStage(targetStage);
        break;
    }
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < journeyQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // All questions answered - analyze
      setStage('analyzing');
      setTimeout(() => {
        setCareerPaths(generateCareerPaths(newAnswers));
        setStage('paths');
      }, 2000);
    }
  };

  const handlePathSelect = (path: CareerPath) => {
    setSelectedPath(path);
    setStage('analyzing');
    setTimeout(() => {
      setRoadmap(generateRoadmap(path.id));
      setStage('roadmap');
    }, 1500);
  };

  const handleAssessmentComplete = (session: AssessmentSession) => {
    setAssessmentSession(session);
    setStage('analyzing');
    setTimeout(() => {
      setCareerPaths(generateCareerPathsFromAssessment(session));
      setStage('paths');
    }, 2000);
  };

  const handleReset = () => {
    setStage('hub');
    setCurrentQuestion(0);
    setAnswers({});
    setCareerPaths([]);
    setSelectedPath(null);
    setRoadmap([]);
    setAssessmentSession(null);
  };

  // ============================================================
  // Render
  // ============================================================

  return (
    <section
      id='journey'
      className='min-h-screen py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white'>
      {/* Background Elements */}
      <BackgroundDecoration />

      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header */}
        <JourneyHeader
          stage={stage}
          onReset={handleReset}
        />

        {/* Content */}
        <AnimatePresence mode='wait'>
          {stage === 'hub' && (
            <StageWrapper key='hub'>
              <Hub onStartJourney={handleStartJourney} />
            </StageWrapper>
          )}

          {stage === 'questions' && (
            <Questions
              currentQuestion={currentQuestion}
              onAnswerSelect={handleAnswerSelect}
            />
          )}

          {stage === 'analyzing' && <Analyzing />}

          {stage === 'paths' && (
            <StageWrapper key='paths'>
              {assessmentSession && <AssessmentResults session={assessmentSession} />}
              <CareerPathsView
                careerPaths={careerPaths}
                onPathSelect={handlePathSelect}
                onReset={handleReset}
              />
            </StageWrapper>
          )}

          {stage === 'roadmap' && selectedPath && (
            <RoadmapView
              selectedPath={selectedPath}
              roadmap={roadmap}
              onReset={handleReset}
            />
          )}

          {stage === 'quiz' && <Quiz onStartQuestions={() => setStage('questions')} />}

          {stage === 'enhanced-quiz' && (
            <StageWrapper key='enhanced-quiz'>
              <UserQuizAssessment
                onComplete={handleAssessmentComplete}
                onExit={() => setStage('hub')}
              />
            </StageWrapper>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================
// Sub-Components
// ============================================================

function BackgroundDecoration() {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      <div className='absolute top-20 left-10 w-72 h-72 bg-[#2dcbc5]/5 rounded-full blur-3xl' />
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#2dcbc5]/3 to-blue-500/3 rounded-full blur-3xl' />
    </div>
  );
}

function JourneyHeader({ stage, onReset }: { stage: JourneyStage; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='text-center mb-12 sm:mb-16 relative'>
      {stage !== 'hub' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onReset}
          className='absolute left-0 top-0 p-2.5 sm:p-3 rounded-2xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-[#2dcbc5]/30 transition-all group'>
          <Home
            size={20}
            className='text-slate-400 group-hover:text-[#2dcbc5] transition-colors'
          />
        </motion.button>
      )}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2dcbc5]/10 to-[#2ab7ca]/10 border border-[#2dcbc5]/20 mb-6'>
        <Sparkles
          size={16}
          className='text-[#2dcbc5]'
        />
        <span className='text-sm font-semibold text-[#2dcbc5]'>AI-Powered Career Guide</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='text-3xl md:text-4xl font-bold mb-4'>
        Your Career Journey
        <span className='block mt-1 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] bg-clip-text text-transparent'>
          Starts Here
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto'>
        Choose your path and let our AI guide you to your dream career
      </motion.p>
    </motion.div>
  );
}

function StageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full max-w-5xl mx-auto'>
      {children}
    </motion.div>
  );
}

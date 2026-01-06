'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Home } from 'lucide-react';

// Import types
import type { CareerPath, RoadmapStep, AssessmentSession } from '@/lib/types';

// Import utilities
import { generateCareerPaths, generateRoadmap, getCareerPathById } from '@/lib/career-data';

// Import components
import DiscoveryChoice from '@/components/stepper/discovery-choice';
import EnhancedQuestions from '@/components/journey/enhanced-questions';
import Analyzing from '@/components/stepper/analyzing';
import CareerPathsView from '@/components/stepper/career-paths-simple';
import Roadmap from '@/components/stepper/roadmap';
import { UserQuizAssessment } from '@/components/user-quiz-assessment';
import AssessmentResults from '@/components/stepper/assessment-results';

// ============================================================
// Types
// ============================================================

type DiscoveryStage =
  | 'choice'
  | 'quick-questions'
  | 'deep-assessment'
  | 'analyzing'
  | 'paths'
  | 'roadmap';

// ============================================================
// Helper Functions
// ============================================================

function generateCareerPathsFromAssessment(session: AssessmentSession): CareerPath[] {
  const { topic, customInput, answers } = session;

  const totalAnswers = answers.length;
  const highConfidenceCount = answers.filter((a) => a.confidence === 'high').length;
  const mediumConfidenceCount = answers.filter((a) => a.confidence === 'medium').length;
  const performanceScore =
    totalAnswers > 0
      ? Math.round((highConfidenceCount * 100 + mediumConfidenceCount * 60) / totalAnswers)
      : 70;

  const topicName = topic?.name || customInput?.topic || 'General';

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

export default function DiscoveryJourney() {
  const [stage, setStage] = useState<DiscoveryStage>('choice');
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
  const [assessmentSession, setAssessmentSession] = useState<AssessmentSession | null>(null);

  // ============================================================
  // Event Handlers
  // ============================================================

  const handleDiscoveryChoice = (path: 'questions' | 'enhanced-quiz') => {
    if (path === 'questions') {
      setStage('quick-questions');
    } else {
      setStage('deep-assessment');
    }
  };

  const handleQuestionsComplete = (answers: Record<number, string>) => {
    setStage('analyzing');
    setTimeout(() => {
      setCareerPaths(generateCareerPaths(answers));
      setStage('paths');
    }, 2000);
  };

  const handleAssessmentComplete = (session: AssessmentSession) => {
    setAssessmentSession(session);
    setStage('analyzing');
    setTimeout(() => {
      setCareerPaths(generateCareerPathsFromAssessment(session));
      setStage('paths');
    }, 2000);
  };

  const handlePathSelect = (path: CareerPath) => {
    setSelectedPath(path);
    setStage('analyzing');
    setTimeout(() => {
      setRoadmap(generateRoadmap(path.id));
      setStage('roadmap');
    }, 1500);
  };

  const handleReset = () => {
    setStage('choice');
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
          {stage === 'choice' && (
            <StageWrapper key='choice'>
              <DiscoveryChoice onSelectPath={handleDiscoveryChoice} />
            </StageWrapper>
          )}

          {stage === 'quick-questions' && (
            <StageWrapper key='quick-questions'>
              <EnhancedQuestions
                onComplete={handleQuestionsComplete}
                onExit={handleReset}
              />
            </StageWrapper>
          )}

          {stage === 'deep-assessment' && (
            <StageWrapper key='deep-assessment'>
              <UserQuizAssessment
                onComplete={handleAssessmentComplete}
                onExit={handleReset}
              />
            </StageWrapper>
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
            <Roadmap
              selectedPath={selectedPath}
              roadmap={roadmap}
              onReset={handleReset}
            />
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

function JourneyHeader({ stage, onReset }: { stage: DiscoveryStage; onReset: () => void }) {
  const showHomeButton = stage !== 'choice';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='text-center mb-12 sm:mb-16 relative'>
      {showHomeButton && (
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
        <span className='text-sm font-semibold text-[#2dcbc5]'>AI-Powered Career Discovery</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='text-3xl md:text-4xl font-bold mb-4'>
        Discover Your Career Path
        <span className='block mt-1 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] bg-clip-text text-transparent'>
          With AI Guidance
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto'>
        {stage === 'choice' && "Select how you'd like to discover your perfect career match"}
        {stage === 'quick-questions' &&
          'Answer thoughtfully for personalized career recommendations'}
        {stage === 'deep-assessment' && 'Complete the assessment for comprehensive career insights'}
        {stage === 'analyzing' && 'Our AI is analyzing your responses'}
        {stage === 'paths' && 'Here are your personalized career matches'}
        {stage === 'roadmap' && 'Your personalized career roadmap'}
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

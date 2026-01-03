'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Home } from 'lucide-react';
import { useState } from 'react';
import {
  journeyQuestions,
  generateCareerPaths,
  generateRoadmap,
  type CareerPath,
  type RoadmapStep,
} from '@/lib/journey-data';
import Hub from '@/components/stepper/hub';
import Questions from '@/components/stepper/questions';
import Analyzing from '@/components/stepper/analyzing';
import CareerPaths from '@/components/stepper/career-paths';
import Roadmap from '@/components/stepper/roadmap';
import Quiz from '@/components/stepper/quiz';

type JourneyStage = 'hub' | 'questions' | 'analyzing' | 'paths' | 'roadmap' | 'quiz';

export default function JourneyWorkflow() {
  const [stage, setStage] = useState<JourneyStage>('hub');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);

  const handleStartJourney = (targetStage: JourneyStage) => {
    if (targetStage === 'questions') {
      setStage('questions');
      setCurrentQuestion(0);
      setAnswers({});
    } else if (targetStage === 'paths') {
      const sampleAnswers = {
        1: 'option1',
        2: 'option2',
        3: 'option3',
        4: 'option4',
        5: 'option5',
      };
      const paths = generateCareerPaths(sampleAnswers);
      setCareerPaths(paths);
      setStage('paths');
    } else if (targetStage === 'roadmap') {
      const samplePath: CareerPath = {
        id: 'software-engineer',
        title: 'Software Engineer',
        description: 'Build innovative applications and solve complex technical challenges',
        matchScore: 95,
        skills: ['JavaScript', 'React', 'Node.js', 'Problem Solving'],
        salary: '$80k - $150k',
        demand: 'Very High',
        icon: '💻',
      };
      setSelectedPath(samplePath);
      const roadmapData = generateRoadmap('software-engineer');
      setRoadmap(roadmapData);
      setStage('roadmap');
    } else if (targetStage === 'quiz') {
      setStage('quiz');
    }
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < journeyQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setStage('analyzing');
      setTimeout(() => {
        const paths = generateCareerPaths(newAnswers);
        setCareerPaths(paths);
        setStage('paths');
      }, 2000);
    }
  };

  const handlePathSelect = (path: CareerPath) => {
    setSelectedPath(path);
    setStage('analyzing');
    setTimeout(() => {
      const roadmapData = generateRoadmap(path.id);
      setRoadmap(roadmapData);
      setStage('roadmap');
    }, 1500);
  };

  const handleReset = () => {
    setStage('hub');
    setCurrentQuestion(0);
    setAnswers({});
    setCareerPaths([]);
    setSelectedPath(null);
    setRoadmap([]);
  };

  return (
    <section
      id='journey'
      className='min-h-screen py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-[#2dcbc5]/5 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#2dcbc5]/3 to-blue-500/3 rounded-full blur-3xl' />
      </div>

      <div className='w-full container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 sm:mb-16 relative'>
          {stage !== 'hub' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleReset}
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
            className='text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4'>
            Lets Walk This Journey Together
            <span className='block mt-1 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] bg-clip-text text-transparent'>
              Starts Here
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto'>
            Choose your path and let our AI guide you to your dream career
          </motion.p>
        </motion.div>

        <AnimatePresence mode='wait'>
          {stage === 'hub' && (
            <motion.div
              key='hub'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='max-w-3xl lg:max-w-5xl mx-auto'>
              <Hub onStartJourney={handleStartJourney} />
            </motion.div>
          )}

          {stage === 'questions' && (
            <Questions
              currentQuestion={currentQuestion}
              onAnswerSelect={handleAnswerSelect}
            />
          )}

          {stage === 'analyzing' && <Analyzing />}

          {stage === 'paths' && (
            <CareerPaths
              careerPaths={careerPaths}
              onPathSelect={handlePathSelect}
              onReset={handleReset}
            />
          )}

          {stage === 'roadmap' && selectedPath && (
            <Roadmap
              selectedPath={selectedPath}
              roadmap={roadmap}
              onReset={handleReset}
            />
          )}

          {stage === 'quiz' && <Quiz onStartQuestions={() => setStage('questions')} />}
        </AnimatePresence>
      </div>
    </section>
  );
}

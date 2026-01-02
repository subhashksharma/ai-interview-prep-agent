'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Target,
  Route,
  CheckCircle,
  Sparkles,
  TrendingUp,
  DollarSign,
  ChevronRight,
  MapPin,
  Home,
  Award,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  journeyQuestions,
  generateCareerPaths,
  generateRoadmap,
  type CareerPath,
  type RoadmapStep,
} from '@/lib/journey-data';

type JourneyStage = 'hub' | 'questions' | 'analyzing' | 'paths' | 'roadmap' | 'quiz';

interface JourneyOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stage: JourneyStage;
  action: string;
}

const journeyOptions: JourneyOption[] = [
  {
    id: 'questions',
    title: 'Discovery Path',
    description: 'Answer 5 questions to discover careers that match your personality and goals',
    icon: <HelpCircle size={32} />,
    color: 'from-[#2dcbc5] to-[#2ab7ca]',
    stage: 'questions',
    action: 'Start Questions',
  },
  {
    id: 'explore',
    title: 'Explore Careers',
    description: 'Browse curated career paths and find the perfect fit for your aspirations',
    icon: <Target size={32} />,
    color: 'from-purple-500 to-purple-600',
    stage: 'paths',
    action: 'Explore Now',
  },
  {
    id: 'roadmap',
    title: 'View Sample Roadmap',
    description: 'See a detailed step-by-step roadmap for a career path that interests you',
    icon: <Route size={32} />,
    color: 'from-blue-500 to-blue-600',
    stage: 'roadmap',
    action: 'View Roadmap',
  },
  {
    id: 'quiz',
    title: 'Take Assessment',
    description: 'Quick quiz to assess your current skills and get personalized recommendations',
    icon: <Award size={32} />,
    color: 'from-amber-500 to-orange-500',
    stage: 'quiz',
    action: 'Start Quiz',
  },
];

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
      // Generate sample paths
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
      // Show sample roadmap
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
      className='min-h-screen flex items-center py-20 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2dcbc5]/5 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-[#2ab7ca]/5 rounded-full blur-3xl pointer-events-none' />

      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Header with back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-8 sm:mb-12 md:mb-16'>
          <div className='relative inline-block'>
            {stage !== 'hub' && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleReset}
                className='absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white border border-slate-200 hover:border-[#2dcbc5] hover:bg-[#2dcbc5]/5 transition-all group'>
                <Home
                  size={20}
                  className='text-slate-600 group-hover:text-[#2dcbc5]'
                />
              </motion.button>
            )}
            <div className='inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-white via-slate-50 to-white rounded-full shadow-xl border border-slate-200/50'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800'>
                Let's Walk This Journey Together
              </h2>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode='wait'>
          {/* Hub - AI-Powered Timeline Journey */}
          {stage === 'hub' && (
            <motion.div
              key='hub'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='max-w-4xl mx-auto'>
              {/* Hero intro */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className='text-center mb-12 sm:mb-16'>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className='relative inline-block mb-6'>
                  <div className='absolute inset-0 bg-gradient-to-r from-[#2dcbc5] via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse' />
                  <div className='relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#2dcbc5] via-[#2ab7ca] to-blue-600 flex items-center justify-center shadow-2xl border-4 border-white/50'>
                    <Sparkles
                      size={40}
                      className='text-white'
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className='space-y-3 sm:space-y-4'>
                  <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2dcbc5]/10 via-purple-500/10 to-pink-500/10 border border-[#2dcbc5]/30 backdrop-blur-sm'>
                    <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
                    <span className='text-sm font-bold bg-gradient-to-r from-[#2dcbc5] via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                      AI-Powered Career Intelligence
                    </span>
                  </div>
                  <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight'>
                    Choose Your{' '}
                    <span className='bg-gradient-to-r from-[#2dcbc5] via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                      Starting Point
                    </span>
                  </h3>
                  <p className='text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed'>
                    Experience intelligent guidance tailored to your journey. Pick any path—our AI
                    adapts to you.
                  </p>
                </motion.div>
              </motion.div>

              {/* Vertical Timeline with AI-themed nodes */}
              <div className='relative'>
                {/* Animated gradient line */}
                <div className='absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2dcbc5] via-purple-500 to-pink-500 opacity-20' />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  className='absolute left-6 sm:left-8 top-0 w-0.5 bg-gradient-to-b from-[#2dcbc5] via-purple-500 to-pink-500'
                  style={{
                    boxShadow: '0 0 20px rgba(45, 203, 197, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
                  }}
                />

                {/* Timeline items */}
                <div className='space-y-6 sm:space-y-8 relative'>
                  {journeyOptions.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.6 + index * 0.15,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className='relative flex items-start gap-4 sm:gap-6 group'>
                      {/* Animated node */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.8 + index * 0.15,
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        className='relative z-10 flex-shrink-0'>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${option.color} rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity`}
                        />
                        <div
                          className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center shadow-2xl border-4 border-white group-hover:border-white/80 transition-all`}>
                          <div className='text-white'>{option.icon}</div>
                        </div>
                      </motion.div>

                      {/* Content card with glassmorphism */}
                      <motion.div
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStartJourney(option.stage)}
                        className='flex-1 cursor-pointer'>
                        <div
                          className='relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:border-white/80'
                          style={{
                            boxShadow:
                              '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                          }}>
                          {/* Animated gradient overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                          />

                          {/* Shimmer effect */}
                          <motion.div
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '200%' }}
                            transition={{ duration: 0.8 }}
                            className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent'
                            style={{ width: '50%' }}
                          />

                          <div className='relative z-10'>
                            <div className='flex items-start justify-between gap-3 mb-3'>
                              <h4 className='text-lg sm:text-xl md:text-2xl font-bold text-slate-900 group-hover:text-slate-950 transition-colors'>
                                {option.title}
                              </h4>
                              <motion.div
                                whileHover={{ x: 4 }}
                                className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg`}>
                                <ChevronRight
                                  size={20}
                                  className='text-white'
                                />
                              </motion.div>
                            </div>

                            <p className='text-sm sm:text-base text-slate-600 mb-4 leading-relaxed'>
                              {option.description}
                            </p>

                            {/* Action label with AI badge */}
                            <div className='flex items-center gap-2 flex-wrap'>
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r ${option.color} text-white text-xs sm:text-sm font-semibold shadow-md`}>
                                {option.action}
                              </span>
                              <span className='inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium'>
                                <Sparkles
                                  size={12}
                                  className='text-slate-500'
                                />
                                AI-Guided
                              </span>
                            </div>
                          </div>

                          {/* Floating particles effect */}
                          <div className='absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-white/60 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700' />
                          <div className='absolute -left-4 -bottom-4 w-20 h-20 bg-gradient-to-tr from-white/40 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700' />
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust indicators with AI theme */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className='mt-12 sm:mt-16'>
                <div className='relative bg-gradient-to-r from-[#2dcbc5]/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/50 overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-r from-[#2dcbc5]/10 via-transparent to-pink-500/10 opacity-50' />
                  <div className='relative grid grid-cols-3 gap-4 sm:gap-6 text-center'>
                    <div className='space-y-2'>
                      <div className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2dcbc5] to-blue-600 bg-clip-text text-transparent'>
                        1000+
                      </div>
                      <div className='text-xs sm:text-sm text-slate-600 font-medium'>
                        Career Paths
                      </div>
                    </div>
                    <div className='space-y-2 border-x border-slate-200/50'>
                      <div className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent'>
                        95%
                      </div>
                      <div className='text-xs sm:text-sm text-slate-600 font-medium'>
                        Satisfaction
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-center gap-1'>
                        <Sparkles
                          size={20}
                          className='text-pink-500'
                        />
                        <span className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent'>
                          AI
                        </span>
                      </div>
                      <div className='text-xs sm:text-sm text-slate-600 font-medium'>Powered</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {stage === 'questions' && (
            <motion.div
              key='questions'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='max-w-3xl mx-auto'>
              <div className='mb-8'>
                <div className='flex justify-between items-center mb-3'>
                  <span className='text-sm font-semibold text-slate-600'>
                    Question {currentQuestion + 1} of {journeyQuestions.length}
                  </span>
                  <span className='text-sm font-semibold text-[#2dcbc5]'>
                    {Math.round(((currentQuestion + 1) / journeyQuestions.length) * 100)}%
                  </span>
                </div>
                <div className='h-2 bg-slate-200 rounded-full overflow-hidden'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentQuestion + 1) / journeyQuestions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                    className='h-full bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca]'
                  />
                </div>
              </div>

              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className='bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200/50'>
                  <h3 className='text-2xl md:text-3xl font-bold text-slate-900 mb-8'>
                    {journeyQuestions[currentQuestion].question}
                  </h3>

                  <div className='space-y-4'>
                    {journeyQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          handleAnswerSelect(journeyQuestions[currentQuestion].id, option)
                        }
                        className='w-full text-left p-6 rounded-2xl border-2 border-slate-200 hover:border-[#2dcbc5] hover:bg-[#2dcbc5]/5 transition-all duration-200 group'>
                        <div className='flex items-center justify-between'>
                          <span className='text-lg font-medium text-slate-700 group-hover:text-[#2dcbc5]'>
                            {option}
                          </span>
                          <ChevronRight
                            size={20}
                            className='text-slate-400 group-hover:text-[#2dcbc5] transform group-hover:translate-x-1 transition-all'
                          />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {stage === 'analyzing' && (
            <motion.div
              key='analyzing'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className='max-w-2xl mx-auto text-center'>
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1, repeat: Infinity },
                }}
                className='w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] flex items-center justify-center shadow-2xl shadow-[#2dcbc5]/30'>
                <Sparkles
                  size={48}
                  className='text-white'
                />
              </motion.div>

              <h3 className='text-2xl md:text-3xl font-bold text-slate-900 mb-4'>
                Analyzing your responses...
              </h3>
              <p className='text-lg text-slate-600'>
                Our AI is finding the perfect career paths for you
              </p>
            </motion.div>
          )}

          {stage === 'paths' && (
            <motion.div
              key='paths'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center mb-12'>
                <div className='flex items-center justify-center gap-3 mb-6'>
                  <Target
                    size={32}
                    className='text-[#2dcbc5]'
                  />
                  <h3 className='text-3xl md:text-4xl font-bold text-slate-900'>
                    Discover the career paths that fit you best
                  </h3>
                </div>
                <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
                  Based on your responses, here are the top career paths matched to your profile
                </p>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {careerPaths.map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => handlePathSelect(path)}
                    className='relative bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200 hover:border-[#2dcbc5] hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden'>
                    <div className='absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-full shadow-lg'>
                      <span className='text-white font-bold text-sm'>{path.matchScore}% Match</span>
                    </div>

                    <div className='text-6xl mb-4'>{path.icon}</div>

                    <h4 className='text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#2dcbc5] transition-colors'>
                      {path.title}
                    </h4>

                    <p className='text-slate-600 mb-6 leading-relaxed'>{path.description}</p>

                    <div className='space-y-3 mb-6'>
                      <div className='flex items-center gap-2 text-sm'>
                        <DollarSign
                          size={16}
                          className='text-green-500'
                        />
                        <span className='text-slate-700 font-medium'>Salary: {path.salary}</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm'>
                        <TrendingUp
                          size={16}
                          className='text-[#2dcbc5]'
                        />
                        <span className='text-slate-700 font-medium'>Demand: {path.demand}</span>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2 mb-6'>
                      {path.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className='px-3 py-1 bg-slate-100 group-hover:bg-[#2dcbc5]/10 text-slate-700 rounded-full text-sm font-medium transition-colors'>
                          {skill}
                        </span>
                      ))}
                    </div>

                    <Button className='w-full bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] hover:from-[#2ab7ca] hover:to-[#2dcbc5] text-white rounded-xl group-hover:shadow-lg transition-all'>
                      Choose This Path
                      <ChevronRight
                        size={18}
                        className='ml-2'
                      />
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className='text-center'>
                <Button
                  variant='ghost'
                  onClick={handleReset}
                  className='text-slate-600 hover:text-[#2dcbc5]'>
                  Start Over
                </Button>
              </div>
            </motion.div>
          )}

          {stage === 'roadmap' && selectedPath && (
            <motion.div
              key='roadmap'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center mb-12'>
                <div className='flex items-center justify-center gap-3 mb-4'>
                  <Route
                    size={32}
                    className='text-[#2dcbc5]'
                  />
                  <h3 className='text-3xl md:text-4xl font-bold text-slate-900'>
                    Your Personalized Roadmap
                  </h3>
                </div>
                <p className='text-lg text-slate-600 mb-4'>
                  {selectedPath.title} • Step-by-step path to success
                </p>
                <div className='inline-block text-6xl mb-6'>{selectedPath.icon}</div>
              </motion.div>

              <div className='max-w-4xl mx-auto relative'>
                <div className='absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2dcbc5] via-[#2ab7ca] to-slate-300' />

                <div className='space-y-8'>
                  {roadmap.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className='relative flex gap-6 md:gap-8'>
                      <div className='relative z-10 flex-shrink-0'>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl ${
                            step.status === 'current'
                              ? 'bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] ring-4 ring-[#2dcbc5]/30'
                              : step.status === 'completed'
                              ? 'bg-gradient-to-br from-green-400 to-green-500'
                              : 'bg-white border-4 border-slate-300'
                          }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle
                              size={28}
                              className='text-white'
                            />
                          ) : step.status === 'current' ? (
                            <MapPin
                              size={28}
                              className='text-white'
                            />
                          ) : (
                            <span className='text-2xl font-bold text-slate-400'>{step.id}</span>
                          )}
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.2 }}
                        whileHover={{ x: 8 }}
                        className='flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 hover:border-[#2dcbc5] transition-all group'>
                        <div className='flex items-start justify-between mb-3'>
                          <h4 className='text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[#2dcbc5] transition-colors'>
                            {step.title}
                          </h4>
                          <span className='px-3 py-1 bg-[#2dcbc5]/10 text-[#2dcbc5] rounded-full text-sm font-semibold whitespace-nowrap ml-4'>
                            {step.duration}
                          </span>
                        </div>

                        <p className='text-slate-600 mb-4 leading-relaxed'>{step.description}</p>

                        <div className='flex flex-wrap gap-2'>
                          {step.skills.map((skill, i) => (
                            <span
                              key={i}
                              className='px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium'>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className='text-center mt-12 space-y-4'>
                <p className='text-slate-600'>Ready to start your journey?</p>
                <div className='flex gap-4 justify-center flex-wrap'>
                  <Button
                    size='lg'
                    className='px-8 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] hover:from-[#2ab7ca] hover:to-[#2dcbc5] text-white rounded-xl shadow-xl'>
                    Get Started Now
                  </Button>
                  <Button
                    variant='outline'
                    size='lg'
                    onClick={handleReset}
                    className='rounded-xl'>
                    Explore Other Paths
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Quiz Stage - Quick Assessment */}
          {stage === 'quiz' && (
            <motion.div
              key='quiz'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='max-w-3xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center mb-8 sm:mb-12'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-4'>
                  <Award
                    size={18}
                    className='text-purple-500'
                  />
                  <span className='text-sm font-semibold text-purple-600'>Quick Assessment</span>
                </div>
                <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4'>
                  Take the Career Quiz
                </h3>
                <p className='text-base sm:text-lg text-slate-600'>
                  Answer a few quick questions to discover your ideal career match
                </p>
              </motion.div>

              <div className='grid gap-6 sm:gap-8'>
                {/* Quiz intro card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-200/50'>
                  <div className='text-center mb-6 sm:mb-8'>
                    <div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl'>
                      <Sparkles
                        size={32}
                        className='text-white'
                      />
                    </div>
                    <h4 className='text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4'>
                      5-Minute Career Match
                    </h4>
                    <p className='text-sm sm:text-base text-slate-600 leading-relaxed'>
                      This quick assessment analyzes your skills, interests, and goals to match you
                      with the perfect career paths.
                    </p>
                  </div>

                  <div className='space-y-4 mb-6 sm:mb-8'>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <CheckCircle
                          size={16}
                          className='text-green-600'
                        />
                      </div>
                      <div>
                        <p className='font-semibold text-slate-900 text-sm sm:text-base'>
                          Personalized Results
                        </p>
                        <p className='text-xs sm:text-sm text-slate-600'>
                          Get matched with careers that fit your unique profile
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <CheckCircle
                          size={16}
                          className='text-green-600'
                        />
                      </div>
                      <div>
                        <p className='font-semibold text-slate-900 text-sm sm:text-base'>
                          AI-Powered Analysis
                        </p>
                        <p className='text-xs sm:text-sm text-slate-600'>
                          Advanced algorithms analyze your responses in real-time
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <CheckCircle
                          size={16}
                          className='text-green-600'
                        />
                      </div>
                      <div>
                        <p className='font-semibold text-slate-900 text-sm sm:text-base'>
                          Detailed Roadmap
                        </p>
                        <p className='text-xs sm:text-sm text-slate-600'>
                          Receive a step-by-step plan to reach your career goals
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStage('questions')}
                    size='lg'
                    className='w-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300'>
                    Start Assessment
                    <ChevronRight
                      className='ml-2'
                      size={20}
                    />
                  </Button>
                </motion.div>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className='grid grid-cols-3 gap-4'>
                  <div className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center'>
                    <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 sm:mb-2'>
                      5
                    </div>
                    <div className='text-xs sm:text-sm text-slate-600'>Questions</div>
                  </div>
                  <div className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center'>
                    <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-1 sm:mb-2'>
                      5min
                    </div>
                    <div className='text-xs sm:text-sm text-slate-600'>Duration</div>
                  </div>
                  <div className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center'>
                    <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 sm:mb-2'>
                      4+
                    </div>
                    <div className='text-xs sm:text-sm text-slate-600'>Career Matches</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

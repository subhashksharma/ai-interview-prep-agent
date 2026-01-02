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
  Zap,
  ArrowRight,
  Clock,
  Star,
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
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
  glowColor: string;
  stage: JourneyStage;
  action: string;
  duration?: string;
  popular?: boolean;
}

const journeyOptions: JourneyOption[] = [
  {
    id: 'questions',
    title: 'Discovery Path',
    subtitle: 'Personalized Journey',
    description:
      'Answer 5 thoughtful questions and let AI uncover careers perfectly aligned with your unique strengths',
    icon: <HelpCircle size={26} />,
    accentColor: 'text-[#2dcbc5]',
    bgColor: 'bg-[#2dcbc5]',
    glowColor: 'rgba(45,203,197,0.4)',
    stage: 'questions',
    action: 'Start Discovery',
    duration: '3 min',
    popular: true,
  },
  {
    id: 'explore',
    title: 'Explore Careers',
    subtitle: 'Browse & Compare',
    description:
      'Dive into our curated collection of career paths with detailed insights and match scores',
    icon: <Target size={26} />,
    accentColor: 'text-violet-500',
    bgColor: 'bg-violet-500',
    glowColor: 'rgba(139,92,246,0.4)',
    stage: 'paths',
    action: 'Browse Careers',
  },
  {
    id: 'roadmap',
    title: 'View Roadmap',
    subtitle: 'Step-by-Step Guide',
    description: 'See exactly what it takes to succeed with a detailed roadmap for any career path',
    icon: <Route size={26} />,
    accentColor: 'text-blue-500',
    bgColor: 'bg-blue-500',
    glowColor: 'rgba(59,130,246,0.4)',
    stage: 'roadmap',
    action: 'See Example',
  },
  {
    id: 'quiz',
    title: 'Quick Assessment',
    subtitle: 'Fast Track',
    description:
      'Short on time? Take our rapid skill assessment for instant career recommendations',
    icon: <Zap size={26} />,
    accentColor: 'text-amber-500',
    bgColor: 'bg-amber-500',
    glowColor: 'rgba(245,158,11,0.4)',
    stage: 'quiz',
    action: 'Take Quiz',
    duration: '5 min',
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

      <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
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
            Your Career Journey
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
          {/* Hub - Vertical Timeline Design */}
          {stage === 'hub' && (
            <motion.div
              key='hub'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='max-w-3xl mx-auto'>
              {/* Vertical Timeline */}
              <div className='relative'>
                {/* Timeline line */}
                <div className='absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#2dcbc5] via-violet-400 via-blue-400 to-amber-400' />

                {/* Animated glow on timeline */}
                <motion.div
                  initial={{ top: 0, opacity: 0 }}
                  animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className='absolute left-5 sm:left-7 w-3 h-24 bg-gradient-to-b from-transparent via-[#2dcbc5] to-transparent rounded-full'
                  style={{ filter: 'blur(6px)' }}
                />

                {/* Timeline Items */}
                <div className='space-y-5 sm:space-y-6'>
                  {journeyOptions.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.15 + index * 0.1,
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className='relative flex gap-4 sm:gap-5 group'>
                      {/* Timeline Node */}
                      <div className='relative z-10 flex-shrink-0'>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl ${option.bgColor} shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300`}
                          style={{ boxShadow: `0 10px 40px -10px ${option.glowColor}` }}
                          onClick={() => handleStartJourney(option.stage)}>
                          <div className='text-white'>{option.icon}</div>
                        </motion.div>

                        {/* Popular badge */}
                        {option.popular && (
                          <motion.div
                            initial={{ scale: 0, rotate: -12 }}
                            animate={{ scale: 1, rotate: -12 }}
                            transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                            className='absolute -top-2 -right-3 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg'>
                            <span className='text-[9px] sm:text-[10px] font-bold text-white tracking-wide'>
                              POPULAR
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* Content Card */}
                      <motion.div
                        whileHover={{ y: -2, x: 4 }}
                        whileTap={{ scale: 0.995 }}
                        onClick={() => handleStartJourney(option.stage)}
                        className='flex-1 cursor-pointer'>
                        <div
                          className='relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-100/80 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden'
                          style={{
                            borderLeft: '3px solid transparent',
                            borderImage: `linear-gradient(to bottom, ${option.glowColor}, transparent) 1`,
                          }}>
                          {/* Hover gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${
                              option.bgColor === 'bg-[#2dcbc5]'
                                ? 'from-[#2dcbc5]/5 to-transparent'
                                : option.bgColor === 'bg-violet-500'
                                ? 'from-violet-500/5 to-transparent'
                                : option.bgColor === 'bg-blue-500'
                                ? 'from-blue-500/5 to-transparent'
                                : 'from-amber-500/5 to-transparent'
                            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          />

                          <div className='relative'>
                            {/* Header */}
                            <div className='flex items-start justify-between gap-3 mb-2 sm:mb-3'>
                              <div>
                                <p
                                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${option.accentColor} mb-0.5 sm:mb-1`}>
                                  {option.subtitle}
                                </p>
                                <h3 className='text-lg sm:text-xl font-bold text-slate-900'>
                                  {option.title}
                                </h3>
                              </div>
                              {option.duration && (
                                <div className='flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100'>
                                  <Clock
                                    size={11}
                                    className='text-slate-400'
                                  />
                                  <span className='text-[10px] sm:text-xs font-medium text-slate-500'>
                                    {option.duration}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Description */}
                            <p className='text-sm text-slate-500 mb-4 leading-relaxed line-clamp-2'>
                              {option.description}
                            </p>

                            {/* Action */}
                            <div className='flex items-center gap-2'>
                              <span className={`text-sm font-semibold ${option.accentColor}`}>
                                {option.action}
                              </span>
                              <ArrowRight
                                size={16}
                                className={`${option.accentColor} group-hover:translate-x-1.5 transition-transform duration-300`}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className='mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-4'>
                {[
                  {
                    value: '1000+',
                    label: 'Career Paths',
                    gradient: 'from-[#2dcbc5] to-[#2ab7ca]',
                  },
                  {
                    value: '95%',
                    label: 'Satisfaction',
                    gradient: 'from-violet-500 to-purple-500',
                  },
                  {
                    value: 'AI',
                    label: 'Powered',
                    gradient: 'from-amber-500 to-orange-500',
                    icon: Sparkles,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className='relative bg-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-200/50 border border-slate-100 text-center'>
                    <div className='flex items-center justify-center gap-1'>
                      {stat.icon && (
                        <stat.icon
                          size={18}
                          className='text-amber-500'
                        />
                      )}
                      <span
                        className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </div>
                    <p className='text-[10px] sm:text-xs text-slate-400 mt-1 font-medium uppercase tracking-wide'>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Questions - Slick Design */}
          {stage === 'questions' && (
            <motion.div
              key='questions'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='max-w-2xl mx-auto'>
              {/* Progress */}
              <div className='mb-8 sm:mb-10'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2 sm:gap-3'>
                    {[...Array(journeyQuestions.length)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`w-8 sm:w-10 h-1.5 rounded-full transition-all duration-300 ${
                          i <= currentQuestion
                            ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca]'
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className='flex items-center gap-2 px-3 py-1.5 bg-[#2dcbc5]/10 rounded-full'>
                    <span className='text-sm font-bold text-[#2dcbc5]'>{currentQuestion + 1}</span>
                    <span className='text-sm text-slate-400'>/</span>
                    <span className='text-sm text-slate-400'>{journeyQuestions.length}</span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 60, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                  {/* Question Card */}
                  <div className='bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100'>
                    <div className='flex items-start gap-4 mb-8'>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className='w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2dcbc5]/25'>
                        <span className='text-lg sm:text-xl font-bold text-white'>
                          {currentQuestion + 1}
                        </span>
                      </motion.div>
                      <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug'>
                        {journeyQuestions[currentQuestion].question}
                      </h3>
                    </div>

                    <div className='space-y-3'>
                      {journeyQuestions[currentQuestion].options.map((option, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.07 }}
                          whileHover={{ scale: 1.015, x: 6 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() =>
                            handleAnswerSelect(journeyQuestions[currentQuestion].id, option)
                          }
                          className='w-full text-left p-4 sm:p-5 rounded-2xl bg-slate-50/80 border-2 border-transparent hover:bg-gradient-to-r hover:from-[#2dcbc5]/5 hover:to-[#2ab7ca]/5 hover:border-[#2dcbc5]/40 transition-all duration-200 group'>
                          <div className='flex items-center justify-between gap-4'>
                            <span className='text-base sm:text-lg text-slate-600 group-hover:text-slate-900 font-medium transition-colors'>
                              {option}
                            </span>
                            <div className='w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-200 group-hover:bg-gradient-to-r group-hover:from-[#2dcbc5] group-hover:to-[#2ab7ca] group-hover:border-transparent flex items-center justify-center transition-all duration-200'>
                              <ChevronRight
                                size={18}
                                className='text-slate-300 group-hover:text-white transition-colors'
                              />
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Analyzing */}
          {stage === 'analyzing' && (
            <motion.div
              key='analyzing'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='max-w-md mx-auto text-center py-12'>
              <div className='relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-8'>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className='absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#2dcbc5] border-r-[#2ab7ca]'
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  className='absolute inset-3 rounded-full border-[3px] border-transparent border-b-violet-400 border-l-purple-400'
                />
                <div className='absolute inset-6 rounded-full bg-gradient-to-br from-[#2dcbc5]/10 to-violet-500/10 flex items-center justify-center'>
                  <Sparkles
                    size={26}
                    className='text-[#2dcbc5]'
                  />
                </div>
              </div>

              <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-3'>
                Analyzing Your Profile
              </h3>
              <p className='text-lg text-slate-500'>
                Our AI is finding your perfect career matches...
              </p>
            </motion.div>
          )}

          {/* Career Paths - Extraordinary Design */}
          {stage === 'paths' && (
            <motion.div
              key='paths'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center mb-10 sm:mb-12'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-4'>
                  <CheckCircle
                    size={16}
                    className='text-green-500'
                  />
                  <span className='text-sm font-semibold text-green-700'>Analysis Complete</span>
                </motion.div>
                <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3'>
                  Your Career Matches
                </h3>
                <p className='text-base sm:text-lg text-slate-500 max-w-xl mx-auto'>
                  Based on your profile, here are the careers that align with your strengths
                </p>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 mb-8'>
                {careerPaths.map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ y: -10, scale: 1.01 }}
                    onClick={() => handlePathSelect(path)}
                    className='group relative cursor-pointer'>
                    {/* Multi-layered glow effect */}
                    <div className='absolute -inset-1 bg-gradient-to-r from-[#2dcbc5]/20 via-violet-400/20 to-blue-400/20 rounded-[34px] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700' />
                    <div className='absolute -inset-0.5 bg-gradient-to-r from-[#2dcbc5]/30 to-violet-500/30 rounded-[33px] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500' />

                    <div className='relative bg-gradient-to-br from-white via-white to-slate-50/30 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-200/60 backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-[#2dcbc5]/20 group-hover:border-[#2dcbc5]/20 transition-all duration-500'>
                      {/* Animated background mesh */}
                      <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700'>
                        <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(45,203,197,0.06),transparent_50%)]' />
                        <div className='absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.05),transparent_50%)]' />
                      </div>

                      {/* Top Section with floating icon */}
                      <div className='relative h-32 sm:h-36 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/50 flex items-center justify-center overflow-hidden backdrop-blur-xl'>
                        {/* Subtle grid pattern */}
                        <div className='absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]' />

                        {/* Gradient orb */}
                        <motion.div
                          className='absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,203,197,0.12),transparent_60%)]'
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.12, 0.18, 0.12],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />

                        <motion.div
                          className='relative text-7xl sm:text-8xl drop-shadow-lg'
                          whileHover={{
                            scale: 1.15,
                            rotate: [0, -8, 8, -8, 0],
                            y: -5,
                          }}
                          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}>
                          {path.icon}
                        </motion.div>

                        {/* AI-powered badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 200 }}
                          className='absolute top-4 left-4'>
                          <div className='flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-xl rounded-full border border-violet-200/30 shadow-lg'>
                            <Sparkles
                              size={11}
                              className='text-violet-600'
                            />
                            <span className='text-[10px] font-bold text-violet-700 uppercase tracking-wider'>
                              AI Match
                            </span>
                          </div>
                        </motion.div>

                        {/* Match score badge */}
                        <div className='absolute top-4 right-4'>
                          <motion.div
                            initial={{ scale: 0, rotate: 12 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.3 + index * 0.1,
                              type: 'spring',
                              stiffness: 200,
                            }}
                            className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-full blur-md opacity-60' />
                            <div className='relative px-3.5 py-2 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-full shadow-lg shadow-[#2dcbc5]/40 border border-white/20'>
                              <div className='flex items-center gap-1.5'>
                                <Star
                                  size={14}
                                  className='text-white fill-white drop-shadow'
                                />
                                <span className='text-base font-bold text-white drop-shadow'>
                                  {path.matchScore}%
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className='relative p-6 sm:p-7'>
                        {/* Title */}
                        <h4 className='text-xl sm:text-2xl font-bold bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-3 group-hover:from-[#2dcbc5] group-hover:via-[#2ab7ca] group-hover:to-[#2dcbc5] transition-all duration-300'>
                          {path.title}
                        </h4>

                        {/* Description */}
                        <p className='text-slate-600 mb-5 leading-relaxed text-sm sm:text-base line-clamp-2'>
                          {path.description}
                        </p>

                        {/* Stats with enhanced design */}
                        <div className='flex items-center gap-3 sm:gap-4 mb-5'>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100/50 group-hover:border-green-200 transition-all'>
                            <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-sm'>
                              <DollarSign
                                size={14}
                                className='text-white'
                              />
                            </div>
                            <span className='text-sm font-semibold text-slate-700'>
                              {path.salary}
                            </span>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className='flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#2dcbc5]/5 to-[#2ab7ca]/5 rounded-xl border border-[#2dcbc5]/20 group-hover:border-[#2dcbc5]/40 transition-all'>
                            <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] flex items-center justify-center shadow-sm'>
                              <TrendingUp
                                size={14}
                                className='text-white'
                              />
                            </div>
                            <span className='text-sm font-semibold text-slate-700'>
                              {path.demand}
                            </span>
                          </motion.div>
                        </div>

                        {/* Skills with glassmorphism */}
                        <div className='flex flex-wrap gap-2 mb-6'>
                          {path.skills.slice(0, 3).map((skill, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className='px-3 py-1.5 bg-gradient-to-r from-slate-100/80 to-slate-50/80 backdrop-blur-sm group-hover:from-[#2dcbc5]/10 group-hover:to-[#2ab7ca]/10 text-slate-700 rounded-lg text-xs sm:text-sm font-medium border border-slate-200/50 group-hover:border-[#2dcbc5]/30 shadow-sm transition-all duration-300'>
                              {skill}
                            </motion.span>
                          ))}
                          {path.skills.length > 3 && (
                            <span className='px-3 py-1.5 bg-slate-100/80 backdrop-blur-sm text-slate-500 rounded-lg text-xs sm:text-sm font-medium border border-slate-200/50'>
                              +{path.skills.length - 3}
                            </span>
                          )}
                        </div>

                        {/* CTA Button with enhanced design */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className='relative w-full py-3.5 sm:py-4 rounded-xl overflow-hidden group/btn'>
                          <div className='absolute inset-0 bg-gradient-to-r from-[#2dcbc5] via-[#2ab7ca] to-[#2dcbc5] opacity-100 group-hover/btn:opacity-0 transition-opacity duration-300' />
                          <div className='absolute inset-0 bg-gradient-to-r from-[#2ab7ca] via-[#2dcbc5] to-violet-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300' />
                          <div className='absolute inset-0 bg-gradient-to-r from-[#2dcbc5]/0 via-white/20 to-[#2dcbc5]/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700' />
                          <div className='relative flex items-center justify-center gap-2.5 text-white font-semibold text-sm sm:text-base'>
                            <span className='drop-shadow'>View Roadmap</span>
                            <ArrowRight
                              size={18}
                              className='group-hover/btn:translate-x-1 transition-transform duration-300 drop-shadow'
                            />
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='text-center'>
                <button
                  onClick={handleReset}
                  className='text-slate-400 hover:text-[#2dcbc5] font-medium transition-colors inline-flex items-center gap-2'>
                  <ArrowRight
                    size={16}
                    className='rotate-180'
                  />
                  Start Over
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Roadmap */}
          {stage === 'roadmap' && selectedPath && (
            <motion.div
              key='roadmap'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center mb-10 sm:mb-12'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2dcbc5]/10 border border-[#2dcbc5]/20 mb-4'>
                  <span className='text-5xl sm:text-6xl'>{selectedPath.icon}</span>
                  <span className='text-sm font-semibold text-[#2dcbc5]'>{selectedPath.title}</span>
                </motion.div>
                <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3'>
                  Your Success Roadmap
                </h3>
                <p className='text-base sm:text-lg text-slate-500 max-w-xl mx-auto'>
                  Follow these steps to master your path and achieve your career goals
                </p>
              </motion.div>

              <div className='max-w-3xl mx-auto relative'>
                {/* Timeline line */}
                <div className='absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#2dcbc5] via-[#2ab7ca] via-green-400 to-violet-400' />

                {/* Animated glow on timeline */}
                <motion.div
                  initial={{ top: 0, opacity: 0 }}
                  animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className='absolute left-5 sm:left-7 w-3 h-24 bg-gradient-to-b from-transparent via-[#2dcbc5] to-transparent rounded-full'
                  style={{ filter: 'blur(6px)' }}
                />

                {/* Timeline Items */}
                <div className='space-y-5 sm:space-y-6'>
                  {roadmap.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.15 + index * 0.1,
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className='relative flex gap-4 sm:gap-5 group'>
                      {/* Timeline Node */}
                      <div className='relative z-10 flex-shrink-0'>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 ${
                            step.status === 'current'
                              ? 'bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca]'
                              : step.status === 'completed'
                              ? 'bg-gradient-to-br from-green-400 to-green-500'
                              : 'bg-white border-2 border-slate-300'
                          }`}
                          style={{
                            boxShadow:
                              step.status === 'current'
                                ? '0 10px 40px -10px rgba(45,203,197,0.5)'
                                : step.status === 'completed'
                                ? '0 10px 40px -10px rgba(34,197,94,0.4)'
                                : '0 4px 20px -5px rgba(0,0,0,0.1)',
                          }}>
                          {step.status === 'completed' ? (
                            <CheckCircle
                              size={24}
                              className='text-white'
                            />
                          ) : step.status === 'current' ? (
                            <MapPin
                              size={24}
                              className='text-white'
                            />
                          ) : (
                            <span className='text-xl font-bold text-slate-400'>{step.id}</span>
                          )}
                        </motion.div>

                        {/* Status badge */}
                        {(step.status === 'current' || step.status === 'completed') && (
                          <motion.div
                            initial={{ scale: 0, rotate: -12 }}
                            animate={{ scale: 1, rotate: -12 }}
                            transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                            className={`absolute -top-2 -right-3 px-2 py-0.5 rounded-full shadow-lg ${
                              step.status === 'current'
                                ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca]'
                                : 'bg-gradient-to-r from-green-400 to-green-500'
                            }`}>
                            <span className='text-[9px] sm:text-[10px] font-bold text-white tracking-wide uppercase'>
                              {step.status === 'current' ? 'NOW' : 'DONE'}
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* Content Card */}
                      <motion.div
                        whileHover={{ y: -2, x: 4 }}
                        whileTap={{ scale: 0.995 }}
                        className='flex-1'>
                        <div
                          className='relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-100/80 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden'
                          style={{
                            borderLeft: '3px solid transparent',
                            borderImage:
                              step.status === 'current'
                                ? 'linear-gradient(to bottom, rgba(45,203,197,0.4), transparent) 1'
                                : step.status === 'completed'
                                ? 'linear-gradient(to bottom, rgba(34,197,94,0.4), transparent) 1'
                                : 'linear-gradient(to bottom, rgba(139,92,246,0.3), transparent) 1',
                          }}>
                          {/* Hover gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              step.status === 'current'
                                ? 'from-[#2dcbc5]/5 to-transparent'
                                : step.status === 'completed'
                                ? 'from-green-400/5 to-transparent'
                                : 'from-violet-500/5 to-transparent'
                            }`}
                          />

                          <div className='relative'>
                            {/* Header */}
                            <div className='flex items-start justify-between gap-3 mb-2 sm:mb-3'>
                              <div>
                                <h3 className='text-lg sm:text-xl font-bold text-slate-900'>
                                  {step.title}
                                </h3>
                              </div>
                              <div className='flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100'>
                                <Clock
                                  size={11}
                                  className='text-slate-400'
                                />
                                <span className='text-[10px] sm:text-xs font-medium text-slate-500'>
                                  {step.duration}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className='text-sm text-slate-500 mb-4 leading-relaxed'>
                              {step.description}
                            </p>

                            {/* Skills */}
                            <div className='flex flex-wrap gap-2'>
                              {step.skills.slice(0, 4).map((skill, i) => (
                                <span
                                  key={i}
                                  className='px-3 py-1 bg-slate-100 group-hover:bg-[#2dcbc5]/10 text-slate-600 rounded-lg text-sm font-medium transition-colors'>
                                  {skill}
                                </span>
                              ))}
                              {step.skills.length > 4 && (
                                <span className='px-3 py-1 bg-slate-100 text-slate-400 rounded-lg text-sm'>
                                  +{step.skills.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className='text-center mt-10 sm:mt-12'>
                <div className='flex gap-4 justify-center flex-wrap'>
                  <Button
                    size='lg'
                    className='px-8 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] hover:opacity-90 text-white rounded-xl shadow-lg shadow-[#2dcbc5]/25'>
                    Get Started
                  </Button>
                  <Button
                    variant='outline'
                    size='lg'
                    onClick={handleReset}
                    className='rounded-xl border-slate-200 hover:border-[#2dcbc5] hover:text-[#2dcbc5]'>
                    Explore Other Paths
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Quiz */}
          {stage === 'quiz' && (
            <motion.div
              key='quiz'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='max-w-lg mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className='bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 text-center'>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className='w-18 h-18 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30'>
                  <Zap
                    size={36}
                    className='text-white'
                  />
                </motion.div>

                <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-3'>
                  Quick Assessment
                </h3>
                <p className='text-slate-500 mb-8 leading-relaxed'>
                  Answer 5 quick questions and get instant career recommendations powered by AI.
                </p>

                <div className='grid grid-cols-3 gap-3 sm:gap-4 mb-8'>
                  {[
                    { value: '5', label: 'Questions' },
                    { value: '5 min', label: 'Duration' },
                    { value: '4+', label: 'Results' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className='p-3 sm:p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100'>
                      <div className='text-lg sm:text-xl font-bold text-amber-600'>
                        {stat.value}
                      </div>
                      <div className='text-[10px] sm:text-xs text-amber-500/70 font-medium uppercase tracking-wide'>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button
                  onClick={() => setStage('questions')}
                  size='lg'
                  className='w-full py-5 sm:py-6 text-base sm:text-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-white rounded-xl shadow-lg shadow-amber-500/25'>
                  Start Assessment
                  <ArrowRight
                    className='ml-2'
                    size={20}
                  />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

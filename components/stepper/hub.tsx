'use client';

import { motion } from 'framer-motion';
import { HelpCircle, Target, Route, Zap, ArrowRight, Clock, Sparkles } from 'lucide-react';

type JourneyStage =
  | 'hub'
  | 'questions'
  | 'analyzing'
  | 'paths'
  | 'roadmap'
  | 'quiz'
  | 'enhanced-quiz';

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
  {
    id: 'enhanced-quiz',
    title: 'Deep Assessment',
    subtitle: 'Comprehensive Evaluation',
    description:
      'Get in-depth skill evaluation with AI-powered questions, custom topics, and detailed feedback',
    icon: <Sparkles size={26} />,
    accentColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500',
    glowColor: 'rgba(16,185,129,0.4)',
    stage: 'enhanced-quiz',
    action: 'Start Assessment',
    duration: '15-30 min',
  },
];

interface HubProps {
  onStartJourney: (stage: JourneyStage) => void;
}

export default function Hub({ onStartJourney }: HubProps) {
  return (
    <motion.div
      key='hub'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {/* Vertical Timeline */}
      <div className='relative'>
        {/* Timeline line */}
        <div className='absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#2dcbc5] to-emerald-400' />

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
              className='relative flex gap-4 sm:gap-5 lg:gap-6 group'>
              {/* Timeline Node */}
              <div className='relative z-10 flex-shrink-0'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl ${option.bgColor} shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300`}
                  style={{ boxShadow: `0 10px 40px -10px ${option.glowColor}` }}
                  onClick={() => onStartJourney(option.stage)}>
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
                onClick={() => onStartJourney(option.stage)}
                className='flex-1 cursor-pointer'>
                <div
                  className='relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-lg shadow-slate-200/50 border border-slate-100/80 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden'
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
                        : option.bgColor === 'bg-amber-500'
                        ? 'from-amber-500/5 to-transparent'
                        : 'from-emerald-500/5 to-transparent'
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
                        <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-slate-900'>
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
                    <p className='text-sm lg:text-base text-slate-500 mb-4 leading-relaxed line-clamp-2'>
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
  );
}

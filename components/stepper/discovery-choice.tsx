'use client';

import { motion } from 'framer-motion';
import {
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
  Zap,
  Brain,
  Target,
  TrendingUp,
  CheckCircle2,
  Lightbulb,
  Rocket,
} from 'lucide-react';

interface DiscoveryChoiceProps {
  onSelectPath: (path: 'questions' | 'enhanced-quiz') => void;
}

export default function DiscoveryChoice({ onSelectPath }: DiscoveryChoiceProps) {
  const options = [
    {
      id: 'questions',
      title: 'Quick Discovery',
      subtitle: 'Lightning Fast',
      description:
        'AI analyzes your career aspirations in minutes and reveals your perfect match paths',
      tagline: 'Perfect for career explorers',
      icon: Zap,
      duration: '2 min',
      features: [
        { text: 'Smart 5-question flow', icon: Target },
        { text: 'Real-time AI matching', icon: Brain },
        { text: 'Instant career roadmap', icon: Rocket },
      ],
      color: '#2dcbc5',
      gradient: 'from-[#2dcbc5] via-[#2ab7ca] to-blue-500',
      shadow: 'shadow-[#2dcbc5]/30',
      glow: 'rgba(45,203,197,0.2)',
      ctaText: 'Start Quick Discovery',
      badge: 'Most Popular',
      badgeColor: 'from-amber-400 via-orange-500 to-rose-500',
    },
    {
      id: 'enhanced-quiz',
      title: 'Deep Dive Assessment',
      subtitle: 'Comprehensive Analysis',
      description:
        'Advanced AI evaluation with adaptive questions that uncover your hidden strengths',
      tagline: 'For serious career planners',
      icon: Brain,
      duration: '15-30 min',
      features: [
        { text: 'Adaptive skill testing', icon: Sparkles },
        { text: 'Multi-format questions', icon: CheckCircle2 },
        { text: 'Detailed insights report', icon: TrendingUp },
      ],
      color: '#8b5cf6',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      shadow: 'shadow-violet-500/30',
      glow: 'rgba(139,92,246,0.2)',
      ctaText: 'Begin Deep Assessment',
      badge: 'Most Accurate',
      badgeColor: 'from-violet-500 via-purple-500 to-pink-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='relative w-full max-w-6xl mx-auto'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className='absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#2dcbc5]/10 to-blue-500/10 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className='absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl'
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className='text-center mb-12 sm:mb-16'>
        {/* AI Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className='inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-slate-50/80 border border-slate-200 backdrop-blur-sm'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
            <Sparkles className='w-4 h-4 text-slate-400' />
          </motion.div>
          <span className='text-sm font-semibold text-slate-600'>Powered by Advanced AI</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <div className='w-2 h-2 rounded-full bg-slate-400' />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight'>
          Choose Your Discovery Path
        </h2>
        <p className='text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed'>
          Let our AI understand your unique strengths and aspirations to craft your{' '}
          <span className='font-semibold text-slate-900'>personalized career roadmap</span>
        </p>
      </motion.div>

      {/* Options Grid */}
      <div className='grid md:grid-cols-2 gap-6 sm:gap-8'>
        {options.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className='group relative cursor-pointer'
              onClick={() => onSelectPath(option.id as 'questions' | 'enhanced-quiz')}>
              {/* Hover Glow Effect */}
              <motion.div
                className='absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl'
                style={{
                  background: `linear-gradient(135deg, ${option.glow}, ${option.glow})`,
                }}
              />

              {/* Main Card */}
              <motion.div
                whileHover={{ y: -12, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-2xl ${option.shadow} border border-slate-200/60 hover:border-slate-300 overflow-hidden transition-all duration-500`}
                style={{
                  boxShadow: `0 25px 70px -15px ${option.glow}`,
                }}>
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-3 transition-opacity duration-500`}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />

                {/* Top Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: -12 }}
                  transition={{ delay: 0.5 + index * 0.15, type: 'spring', stiffness: 200 }}
                  className={`absolute -top-2 -right-2 px-4 py-2 rounded-2xl bg-gradient-to-r ${option.badgeColor} shadow-xl`}>
                  <div className='flex items-center gap-1.5'>
                    <Sparkles
                      size={14}
                      className='text-white'
                    />
                    <span className='text-xs font-bold text-white tracking-wide uppercase'>
                      {option.badge}
                    </span>
                  </div>
                </motion.div>

                {/* Icon with Pulsing Effect */}
                <div className='relative mb-6'>
                  <motion.div
                    animate={{
                      scale: [1, 1.03, 1],
                      opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.gradient} blur-xl`}
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.15,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${option.gradient} shadow-2xl flex items-center justify-center transition-all duration-500`}
                    style={{
                      boxShadow: `0 15px 40px -10px ${option.glow}`,
                    }}>
                    <IconComponent
                      size={36}
                      className='text-white'
                      strokeWidth={2}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className='relative space-y-4'>
                  {/* Duration Badge */}
                  <div className='flex items-center gap-2'>
                    <div
                      className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 shadow-sm'
                      style={{
                        borderColor: option.color,
                        backgroundColor: `${option.color}10`,
                      }}>
                      <Clock
                        size={14}
                        style={{ color: option.color }}
                      />
                      <span
                        className='text-sm font-bold'
                        style={{ color: option.color }}>
                        {option.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className='text-3xl sm:text-4xl font-bold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors'>
                      {option.title}
                    </h3>
                    <p className='text-sm font-semibold text-slate-400 uppercase tracking-wider'>
                      {option.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className='text-slate-600 leading-relaxed text-base'>{option.description}</p>

                  {/* Features List with Icons */}
                  <ul className='space-y-3 pt-2'>
                    {option.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.15 + idx * 0.1 }}
                          className='flex items-center gap-3 group/item'>
                          <div
                            className='w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 group-hover/item:scale-110'
                            style={{
                              backgroundColor: `${option.color}15`,
                            }}>
                            <FeatureIcon
                              size={16}
                              style={{ color: option.color }}
                            />
                          </div>
                          <span className='text-sm font-medium text-slate-700 group-hover/item:text-slate-900 transition-colors'>
                            {feature.text}
                          </span>
                        </motion.li>
                      );
                    })}
                  </ul>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center justify-between gap-3 mt-6 p-4 rounded-2xl bg-gradient-to-r ${option.gradient} shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                    style={{
                      boxShadow: `0 10px 30px -10px ${option.glow}`,
                    }}>
                    <span className='text-lg font-bold text-white'>{option.ctaText}</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight
                        size={24}
                        className='text-white'
                        strokeWidth={3}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className='mt-12 text-center space-y-6'>
        {/* Trust Indicators */}
        <div className='flex flex-wrap items-center justify-center gap-6 sm:gap-8'>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#2dcbc5] to-blue-500 flex items-center justify-center shadow-lg'>
              <CheckCircle2
                size={20}
                className='text-white'
              />
            </div>
            <div className='text-left'>
              <p className='text-sm font-bold text-slate-900'>100% Free</p>
              <p className='text-xs text-slate-500'>No credit card needed</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg'>
              <Brain
                size={20}
                className='text-white'
              />
            </div>
            <div className='text-left'>
              <p className='text-sm font-bold text-slate-900'>AI-Powered</p>
              <p className='text-xs text-slate-500'>Advanced matching</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg'>
              <Lightbulb
                size={20}
                className='text-white'
              />
            </div>
            <div className='text-left'>
              <p className='text-sm font-bold text-slate-900'>Personalized</p>
              <p className='text-xs text-slate-500'>Just for you</p>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <p className='text-sm text-slate-500 max-w-xl mx-auto leading-relaxed'>
          Not sure which path to choose?{' '}
          <span className='font-semibold text-slate-700'>Start with Quick Discovery</span> — you can
          always take the Deep Assessment later for more detailed insights.
        </p>
      </motion.div>
    </motion.div>
  );
}

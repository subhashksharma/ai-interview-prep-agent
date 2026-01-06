'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, ArrowRight, Clock, Zap } from 'lucide-react';

interface DiscoveryChoiceProps {
  onSelectPath: (path: 'questions' | 'enhanced-quiz') => void;
}

export default function DiscoveryChoice({ onSelectPath }: DiscoveryChoiceProps) {
  const options = [
    {
      id: 'questions',
      title: 'Quick Questions',
      subtitle: 'Fast & Simple',
      description: 'Answer 5 thoughtful questions to discover careers that match your strengths',
      icon: MessageSquare,
      duration: '3 min',
      features: ['5 guided questions', 'AI career matching', 'Instant results'],
      color: '#2dcbc5',
      gradient: 'from-[#2dcbc5] to-[#2ab7ca]',
      shadow: 'shadow-[#2dcbc5]/20',
      glow: 'rgba(45,203,197,0.15)',
    },
    {
      id: 'enhanced-quiz',
      title: 'Deep Assessment',
      subtitle: 'Comprehensive',
      description: 'In-depth skill evaluation with AI-powered questions and detailed feedback',
      icon: Sparkles,
      duration: '15-30 min',
      features: ['Custom topics', 'Multiple question types', 'Detailed analysis'],
      color: '#10b981',
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/20',
      glow: 'rgba(16,185,129,0.15)',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full max-w-6xl mx-auto'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='text-center mb-12'>
        <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-3'>
          Choose Your Discovery Path
        </h3>
        <p className='text-base sm:text-lg text-slate-600 max-w-2xl mx-auto'>
          Select how you'd like our AI to understand you better
        </p>
      </motion.div>

      {/* Options Grid */}
      <div className='grid md:grid-cols-2 gap-6 sm:gap-8'>
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectPath(option.id as 'questions' | 'enhanced-quiz')}
            className='group relative cursor-pointer'>
            {/* Card */}
            <div
              className={`relative bg-white rounded-3xl p-8 sm:p-10 shadow-xl ${option.shadow} border border-slate-100 hover:border-slate-200 transition-all duration-300 overflow-hidden`}
              style={{
                boxShadow: `0 20px 60px -10px ${option.glow}`,
              }}>
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Floating Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4 + index * 0.15, type: 'spring', stiffness: 200 }}
                className={`relative mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                style={{
                  boxShadow: `0 10px 30px -5px ${option.glow}`,
                }}>
                <option.icon
                  size={28}
                  className='text-white'
                />
              </motion.div>

              {/* Content */}
              <div className='relative'>
                {/* Subtitle Badge */}
                <div className='inline-flex items-center gap-2 mb-3'>
                  <span
                    className='text-xs font-bold uppercase tracking-wider'
                    style={{ color: option.color }}>
                    {option.subtitle}
                  </span>
                  <div className='flex items-center gap-1 px-2 py-0.5 bg-slate-50 rounded-lg border border-slate-100'>
                    <Clock
                      size={12}
                      className='text-slate-400'
                    />
                    <span className='text-xs text-slate-500 font-medium'>{option.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-3'>
                  {option.title}
                </h4>

                {/* Description */}
                <p className='text-slate-600 leading-relaxed mb-6'>{option.description}</p>

                {/* Features List */}
                <ul className='space-y-2.5 mb-8'>
                  {option.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.15 + idx * 0.1 }}
                      className='flex items-center gap-3'>
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${option.gradient}`}
                      />
                      <span className='text-sm text-slate-600'>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className='flex items-center gap-2'>
                  <span
                    className='text-base font-semibold'
                    style={{ color: option.color }}>
                    {option.id === 'questions' ? 'Start Questions' : 'Begin Assessment'}
                  </span>
                  <ArrowRight
                    size={20}
                    className='group-hover:translate-x-2 transition-transform duration-300'
                    style={{ color: option.color }}
                  />
                </div>
              </div>

              {/* Recommended Badge (for quick questions) */}
              {option.id === 'questions' && (
                <motion.div
                  initial={{ scale: 0, rotate: 12 }}
                  animate={{ scale: 1, rotate: 12 }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                  className='absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg'>
                  <div className='flex items-center gap-1'>
                    <Zap
                      size={14}
                      className='text-white'
                    />
                    <span className='text-xs font-bold text-white tracking-wide'>RECOMMENDED</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className='text-center text-sm text-slate-400 mt-8'>
        Not sure? Start with Quick Questions - you can always take the Deep Assessment later
      </motion.p>
    </motion.div>
  );
}

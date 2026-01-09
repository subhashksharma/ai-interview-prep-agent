'use client';

import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import {
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
  ShieldCheck,
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
      description: '5 guided prompts, rapid AI signal, instant career picks',
      tagline: 'Best for exploring fast',
      icon: Zap,
      duration: '2 min',
      features: [
        { text: 'Smart 5-question flow', icon: Target },
        { text: 'Real-time AI matching', icon: Brain },
        { text: 'Instant roadmap preview', icon: Rocket },
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
      description: 'Adaptive AI quiz, skill signals, interview-grade insight pack',
      tagline: 'Best for decisive planners',
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
      className='relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Atmosphere */}
      <div className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 40, 0], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className='absolute -top-52 -left-32 w-[420px] h-[420px] bg-gradient-to-br from-[#2dcbc5]/25 via-cyan-300/15 to-blue-500/10 rounded-full blur-3xl'
        />
        <motion.div
          animate={{ scale: [1.12, 1, 1.12], rotate: [60, 0, 60], opacity: [0.12, 0.08, 0.12] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className='absolute -bottom-48 -right-28 w-[460px] h-[460px] bg-gradient-to-br from-violet-500/25 via-purple-400/12 to-fuchsia-500/10 rounded-full blur-3xl'
        />
        <div className='absolute inset-x-10 top-20 h-64 bg-gradient-to-r from-cyan-100/10 via-white to-violet-100/10 blur-3xl rounded-full' />
      </div>

      {/* Header */}
      <div className='grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center mb-14 sm:mb-16'>
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className='space-y-5 text-center lg:text-left'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-lg'>
            <Sparkles className='w-4 h-4 text-[#2dcbc5]' />
            <span className='text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wide'>
              AI Discovery Concierge
            </span>
          </div>

          <h2 className='text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 leading-tight tracking-tight'>
            Choose Your Discovery Path
          </h2>
          <p className='text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl'>
            Tell our AI how you want to be understood. Get a tailored career roadmap and interview
            prep plan with the level of depth that fits you today.
          </p>

          <div className='flex flex-wrap justify-center lg:justify-start gap-2.5 pt-1'>
            <Pill
              icon={Clock}
              label='Time'
              value='2 min vs 15-30 min'
            />
            <Pill
              icon={ShieldCheck}
              label='Confidence'
              value='Rapid signal or deep validation'
            />
            <Pill
              icon={TrendingUp}
              label='Outcome'
              value='Career picks or full report'
            />
          </div>
        </motion.div>

        {/* AI Orb / Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className='relative h-[260px] sm:h-72 w-full'>
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 via-white/50 to-white/20 border border-white/60 shadow-xl backdrop-blur-xl overflow-hidden'>
            <motion.div
              className='absolute inset-0'
              animate={{ backgroundPosition: ['0% 0%', '120% 120%'] }}
              transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(45,203,197,0.25), transparent 35%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.25), transparent 40%), radial-gradient(circle at 50% 80%, rgba(79,70,229,0.25), transparent 38%)',
                backgroundSize: '180% 180%',
              }}
            />
            <div className='absolute inset-5 rounded-2xl border border-slate-100/70' />
            <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6'>
              <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-semibold shadow-lg'>
                <Sparkles className='w-3.5 h-3.5' /> AI Signal Ready
              </div>
              <div className='text-3xl sm:text-[34px] font-bold text-slate-900 tracking-tight'>
                92% match
              </div>
              <p className='text-xs sm:text-sm text-slate-500 max-w-xs'>
                Based on people like you who took this path
              </p>
              <div className='grid grid-cols-3 gap-2.5 w-full'>
                <MiniStat
                  label='Clarity'
                  value='+48%'
                  color='#2dcbc5'
                />
                <MiniStat
                  label='Speed'
                  value='x5'
                  color='#22c55e'
                />
                <MiniStat
                  label='Confidence'
                  value='+32%'
                  color='#8b5cf6'
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Options Grid */}
      <div className='grid md:grid-cols-2 gap-5 sm:gap-7'>
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
                className='absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl'
                style={{
                  background: `linear-gradient(135deg, ${option.glow}, ${option.glow})`,
                }}
              />

              {/* Main Card */}
              <motion.div
                whileHover={{ y: -10, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative bg-white/92 backdrop-blur-xl rounded-[2rem] p-7 sm:p-9 shadow-2xl ${option.shadow} border border-slate-200/70 hover:border-slate-300 overflow-hidden transition-all duration-500`}
                style={{
                  boxShadow: `0 25px 70px -15px ${option.glow}`,
                }}>
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-8 transition-opacity duration-500`}
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
                  initial={{ scale: 0, rotate: -8 }}
                  animate={{ scale: 1, rotate: -8 }}
                  transition={{ delay: 0.5 + index * 0.15, type: 'spring', stiffness: 200 }}
                  className={`absolute -top-3 -right-3 px-4 py-2 rounded-2xl bg-gradient-to-r ${option.badgeColor} shadow-xl border border-white/30 backdrop-blur`}
                  style={{ boxShadow: `0 12px 35px -10px ${option.glow}` }}>
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
                <div className='relative mb-5 sm:mb-6'>
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.32, 0.2],
                    }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.gradient} blur-2xl`}
                  />
                  <motion.div
                    initial={{ scale: 0.85, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.4 + index * 0.15,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${option.gradient} shadow-2xl flex items-center justify-center transition-all duration-500`}
                    style={{
                      boxShadow: `0 15px 40px -10px ${option.glow}`,
                    }}>
                    <IconComponent
                      size={32}
                      className='text-white'
                      strokeWidth={2}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className='relative space-y-3.5'>
                  {/* Duration Badge */}
                  <div className='flex items-center gap-2'>
                    <div
                      className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 shadow-sm'
                      style={{
                        borderColor: option.color,
                        backgroundColor: `${option.color}10`,
                      }}>
                      <Clock
                        size={13}
                        style={{ color: option.color }}
                      />
                      <span
                        className='text-xs sm:text-sm font-semibold'
                        style={{ color: option.color }}>
                        {option.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className='text-2xl sm:text-[28px] font-bold text-slate-900 mb-1.5 group-hover:text-slate-950 transition-colors tracking-tight'>
                      {option.title}
                    </h3>
                    <p className='text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.14em]'>
                      {option.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className='text-slate-600 leading-relaxed text-sm sm:text-base'>
                    {option.description}
                  </p>

                  {/* Features List with Icons */}
                  <ul className='space-y-2.5 pt-1'>
                    {option.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.15 + idx * 0.1 }}
                          className='flex items-center gap-2.5 group/item'>
                          <div
                            className='w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 group-hover/item:scale-105'
                            style={{
                              backgroundColor: `${option.color}15`,
                            }}>
                            <FeatureIcon
                              size={14}
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
                    className={`flex items-center justify-between gap-3 mt-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r ${option.gradient} shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                    style={{ boxShadow: `0 10px 30px -10px ${option.glow}` }}>
                    <div className='flex flex-col items-start text-white'>
                      <span className='text-base sm:text-lg font-bold leading-tight'>
                        {option.ctaText}
                      </span>
                      <span className='text-xs sm:text-[13px] opacity-80'>
                        Guided by AI in real time
                      </span>
                    </div>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight
                        size={22}
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

interface PillProps {
  icon: ElementType;
  label: string;
  value: string;
}

function Pill({ icon: Icon, label, value }: PillProps) {
  return (
    <div className='inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-lg'>
      <Icon
        size={14}
        className='text-slate-500'
      />
      <span className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>{label}</span>
      <span className='text-sm font-semibold text-slate-800'>{value}</span>
    </div>
  );
}

interface MiniStatProps {
  label: string;
  value: string;
  color: string;
}

function MiniStat({ label, value, color }: MiniStatProps) {
  return (
    <div className='rounded-xl border border-slate-100 bg-white/80 px-3 py-2 text-left shadow-sm backdrop-blur'>
      <div className='text-[11px] font-semibold uppercase tracking-wide text-slate-400'>
        {label}
      </div>
      <div className='flex items-center gap-1'>
        <span className='text-lg font-bold text-slate-900'>{value}</span>
        <span
          className='w-2 h-2 rounded-full'
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

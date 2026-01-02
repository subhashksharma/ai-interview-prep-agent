'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, TrendingUp, DollarSign, ArrowRight, Star } from 'lucide-react';
import { type CareerPath } from '@/lib/journey-data';

interface CareerPathsProps {
  careerPaths: CareerPath[];
  onPathSelect: (path: CareerPath) => void;
  onReset: () => void;
}

export default function CareerPaths({ careerPaths, onPathSelect, onReset }: CareerPathsProps) {
  return (
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
            onClick={() => onPathSelect(path)}
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
                    <span className='text-sm font-semibold text-slate-700'>{path.salary}</span>
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
                    <span className='text-sm font-semibold text-slate-700'>{path.demand}</span>
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
          onClick={onReset}
          className='text-slate-400 hover:text-[#2dcbc5] font-medium transition-colors inline-flex items-center gap-2'>
          <ArrowRight
            size={16}
            className='rotate-180'
          />
          Start Over
        </button>
      </motion.div>
    </motion.div>
  );
}

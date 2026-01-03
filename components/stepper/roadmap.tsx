'use client';

import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type CareerPath, type RoadmapStep } from '@/lib/journey-data';

interface RoadmapProps {
  selectedPath: CareerPath;
  roadmap: RoadmapStep[];
  onReset: () => void;
}

export default function Roadmap({ selectedPath, roadmap, onReset }: RoadmapProps) {
  return (
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

      <div className='max-w-3xl lg:max-w-4xl mx-auto relative'>
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
              className='relative flex gap-4 sm:gap-5 lg:gap-6 group'>
              {/* Timeline Node */}
              <div className='relative z-10 flex-shrink-0'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 ${
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
                  className='relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-lg shadow-slate-200/50 border border-slate-100/80 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden'
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
            onClick={onReset}
            className='rounded-xl border-slate-200 hover:border-[#2dcbc5] hover:text-[#2dcbc5]'>
            Explore Other Paths
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

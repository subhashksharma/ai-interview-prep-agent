'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { type CareerPath } from '@/lib/journey-data';
import { CareerCard } from '@/components/shared/career-card';

interface CareerPathsSimpleProps {
  careerPaths: CareerPath[];
  onPathSelect: (path: CareerPath) => void;
  onReset: () => void;
}

export default function CareerPathsSimple({
  careerPaths,
  onPathSelect,
  onReset,
}: CareerPathsSimpleProps) {
  return (
    <motion.div
      key='paths-simple'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {/* Header */}
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

      {/* Career Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-7xl mx-auto'>
        {careerPaths.map((path, index) => (
          <CareerCard
            key={path.id}
            career={path}
            status={index === 0 ? 'recommended' : null}
            onSelect={onPathSelect}
          />
        ))}
      </div>

      {/* Reset Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='text-center'>
        <button
          onClick={onReset}
          className='text-slate-400 hover:text-[#2dcbc5] font-medium transition-colors'>
          ← Start Over
        </button>
      </motion.div>
    </motion.div>
  );
}

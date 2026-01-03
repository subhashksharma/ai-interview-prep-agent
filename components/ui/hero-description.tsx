'use client';

import { motion } from 'framer-motion';

interface HeroDescriptionProps {
  text?: string;
  isLoading?: boolean;
}

export default function HeroDescription({ text, isLoading = false }: HeroDescriptionProps) {
  // Default text if none provided
  const defaultText =
    'CareerBuddy guides you end‑to‑end—from self‑discovery and role exploration to job tracking, mock interviews.';

  const displayText = text || defaultText;

  if (isLoading) {
    return (
      <div className='mb-10 max-w-xl'>
        <div className='space-y-3'>
          <div className='h-4 bg-slate-200 rounded animate-pulse w-full' />
          <div className='h-4 bg-slate-200 rounded animate-pulse w-4/5' />
        </div>
      </div>
    );
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className='text-[15px] text-slate-600 mb-10 max-w-xl leading-relaxed drop-shadow-sm'>
      {displayText}
    </motion.p>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Analyzing() {
  return (
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

      <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-3'>Analyzing Your Profile</h3>
      <p className='text-lg text-slate-500'>Our AI is finding your perfect career matches...</p>
    </motion.div>
  );
}

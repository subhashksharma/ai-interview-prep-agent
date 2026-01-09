'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizProps {
  onStartQuestions: () => void;
}

export default function Quiz({ onStartQuestions }: QuizProps) {
  return (
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

        <h3 className='text-subsection-heading mb-3'>Quick Assessment</h3>
        <p className='text-body-default mb-8'>
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
              <div className='text-lg sm:text-xl font-bold text-amber-600'>{stat.value}</div>
              <div className='text-body-small font-medium uppercase tracking-wide'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <Button
          onClick={onStartQuestions}
          size='lg'
          className='w-full py-5 sm:py-6 text-button-large bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-white rounded-xl shadow-lg shadow-amber-500/25'>
          Start Assessment
          <ArrowRight
            className='ml-2'
            size={20}
          />
        </Button>
      </motion.div>
    </motion.div>
  );
}

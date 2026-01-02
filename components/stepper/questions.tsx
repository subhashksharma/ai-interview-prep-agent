'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { journeyQuestions } from '@/lib/journey-data';

interface QuestionsProps {
  currentQuestion: number;
  onAnswerSelect: (questionId: number, answer: string) => void;
}

export default function Questions({ currentQuestion, onAnswerSelect }: QuestionsProps) {
  return (
    <motion.div
      key='questions'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='max-w-2xl mx-auto'>
      {/* Progress */}
      <div className='mb-8 sm:mb-10'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2 sm:gap-3'>
            {[...Array(journeyQuestions.length)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`w-8 sm:w-10 h-1.5 rounded-full transition-all duration-300 ${
                  i <= currentQuestion
                    ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca]'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <div className='flex items-center gap-2 px-3 py-1.5 bg-[#2dcbc5]/10 rounded-full'>
            <span className='text-sm font-bold text-[#2dcbc5]'>{currentQuestion + 1}</span>
            <span className='text-sm text-slate-400'>/</span>
            <span className='text-sm text-slate-400'>{journeyQuestions.length}</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 60, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
          {/* Question Card */}
          <div className='bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100'>
            <div className='flex items-start gap-4 mb-8'>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className='w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2dcbc5]/25'>
                <span className='text-lg sm:text-xl font-bold text-white'>
                  {currentQuestion + 1}
                </span>
              </motion.div>
              <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug'>
                {journeyQuestions[currentQuestion].question}
              </h3>
            </div>

            <div className='space-y-3'>
              {journeyQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.07 }}
                  whileHover={{ scale: 1.015, x: 6 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onAnswerSelect(journeyQuestions[currentQuestion].id, option)}
                  className='w-full text-left p-4 sm:p-5 rounded-2xl bg-slate-50/80 border-2 border-transparent hover:bg-gradient-to-r hover:from-[#2dcbc5]/5 hover:to-[#2ab7ca]/5 hover:border-[#2dcbc5]/40 transition-all duration-200 group'>
                  <div className='flex items-center justify-between gap-4'>
                    <span className='text-base sm:text-lg text-slate-600 group-hover:text-slate-900 font-medium transition-colors'>
                      {option}
                    </span>
                    <div className='w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-200 group-hover:bg-gradient-to-r group-hover:from-[#2dcbc5] group-hover:to-[#2ab7ca] group-hover:border-transparent flex items-center justify-center transition-all duration-200'>
                      <ChevronRight
                        size={18}
                        className='text-slate-300 group-hover:text-white transition-colors'
                      />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

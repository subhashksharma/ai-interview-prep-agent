'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Star } from 'lucide-react';
import { journeyQuestions } from '@/lib/journey-data';

interface EnhancedQuestionsProps {
  onComplete: (answers: Record<number, string>) => void;
  onExit: () => void;
}

export default function EnhancedQuestions({ onComplete, onExit }: EnhancedQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = journeyQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / journeyQuestions.length) * 100;

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);

    if (currentQuestion < journeyQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      }, 300);
    } else {
      // All questions answered
      setTimeout(() => {
        onComplete(newAnswers);
      }, 300);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full max-w-4xl mx-auto'>
      {/* Header with Progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8'>
        {/* Progress Bar */}
        <div className='mb-6'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm font-semibold text-slate-900'>
              Question {currentQuestion + 1} of {journeyQuestions.length}
            </span>
            <span className='text-sm text-slate-500'>{Math.round(progress)}% Complete</span>
          </div>
          <div className='h-2 bg-slate-100 rounded-full overflow-hidden'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='h-full bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-full'
            />
          </div>
        </div>

        {/* Question Steps */}
        <div className='flex items-center gap-2'>
          {journeyQuestions.map((_, idx) => (
            <div
              key={idx}
              className='flex-1 flex items-center gap-2'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  idx < currentQuestion
                    ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] text-white shadow-lg shadow-[#2dcbc5]/25'
                    : idx === currentQuestion
                    ? 'bg-white border-2 border-[#2dcbc5] text-[#2dcbc5]'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                {idx < currentQuestion ? <Check size={16} /> : idx + 1}
              </motion.div>
              {idx < journeyQuestions.length - 1 && (
                <div
                  className={`flex-1 h-0.5 transition-colors duration-300 ${
                    idx < currentQuestion ? 'bg-[#2dcbc5]' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Question Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 60, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className='bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100'>
          {/* Question Header */}
          <div className='flex items-start gap-4 mb-8'>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className='w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] flex items-center justify-center flex-shrink-0 shadow-xl shadow-[#2dcbc5]/30'>
              <Star
                size={24}
                className='text-white'
              />
            </motion.div>
            <div className='flex-1'>
              <span className='inline-block px-3 py-1 rounded-full bg-[#2dcbc5]/10 text-[#2dcbc5] text-xs font-bold uppercase tracking-wider mb-3'>
                Discovery Question
              </span>
              <h3 className='text-2xl lg:text-3xl font-bold text-slate-900 leading-tight'>
                {question.question}
              </h3>
            </div>
          </div>

          {/* Options */}
          <div className='space-y-3 mb-8'>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isAnswered = answers[question.id] !== undefined;

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2dcbc5]/10 to-[#2ab7ca]/10 border-2 border-[#2dcbc5] shadow-lg shadow-[#2dcbc5]/10'
                      : 'bg-slate-50/80 border-2 border-transparent hover:bg-slate-100 hover:border-slate-200'
                  }`}>
                  {/* Background gradient on hover */}
                  {!isSelected && (
                    <div className='absolute inset-0 bg-gradient-to-r from-[#2dcbc5]/5 to-[#2ab7ca]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  )}

                  <div className='flex items-center justify-between gap-4 relative z-10'>
                    <div className='flex items-center gap-4 flex-1'>
                      {/* Selection indicator */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] shadow-lg'
                            : 'bg-white border-2 border-slate-300 group-hover:border-[#2dcbc5]/40'
                        }`}>
                        {isSelected && (
                          <Check
                            size={14}
                            className='text-white'
                          />
                        )}
                      </div>
                      <span
                        className={`text-base lg:text-lg font-medium transition-colors ${
                          isSelected
                            ? 'text-slate-900'
                            : 'text-slate-600 group-hover:text-slate-900'
                        }`}>
                        {option}
                      </span>
                    </div>
                    <ChevronRight
                      size={20}
                      className={`transition-all duration-300 ${
                        isSelected
                          ? 'text-[#2dcbc5] translate-x-1'
                          : 'text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: selectedOption ? 1 : 0.5, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
              selectedOption
                ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] text-white shadow-xl shadow-[#2dcbc5]/30 hover:shadow-2xl hover:shadow-[#2dcbc5]/40 hover:scale-[1.02] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}>
            {currentQuestion < journeyQuestions.length - 1
              ? 'Next Question'
              : 'Complete & See Results'}
          </motion.button>

          {/* Skip info */}
          <p className='text-center text-sm text-slate-400 mt-4'>
            Answer honestly for the best career matches
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

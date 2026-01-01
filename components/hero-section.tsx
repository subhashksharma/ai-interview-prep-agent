'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Sparkles, Zap, PlayCircle, Heading1 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className='min-h-screen flex items-center py-20 md:py-24 overflow-hidden relative'>
      {/* Add white overlay for better text visibility */}
      <div className='absolute inset-0 bg-white/40 backdrop-blur-[2px]' />
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='flex flex-col md:flex-row items-center gap-12'>
          <div className='md:w-1/2'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}>
              <motion.div
                className='inline-flex items-center px-4 py-2 rounded-full bg-[#2dcbc5]/10 border border-[#2dcbc5]/20 backdrop-blur-sm text-[#2dcbc5] mb-8 shadow-sm'
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
                <Sparkles
                  size={16}
                  className='mr-2'
                />
                <span className='text-sm font-semibold'>Next-Gen AI Agents</span>
              </motion.div>
              <h1 className='text-[2.75rem] leading-[1.15] md:text-5xl lg:text-5xl font-bold mb-8 text-slate-900 tracking-tight drop-shadow-sm'>
                An Empathetic AI Career Companion
              </h1>
              <p className='text-lg md:text-xl text-slate-700 mb-10 max-w-xl leading-relaxed drop-shadow-sm'>
                CareerBuddy guides you end‑to‑end—from self‑discovery and role exploration to job
                tracking, mock interviews, tailored docs, negotiation, and 30‑60‑90 success. Built
                to support you at every stage, with empathy.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <Button
                    className='bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] hover:from-[#2ab7ca] hover:to-[#2dcbc5] text-white px-8 py-4 text-lg font-semibold shadow-xl shadow-[#2dcbc5]/30 hover:shadow-2xl hover:shadow-[#2dcbc5]/40 transition-all duration-300 rounded-lg w-full sm:w-auto'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <span>Start My Career Plan</span>
                    <ArrowRight
                      size={20}
                      className={`ml-2 transition-transform duration-300 ${
                        isHovered ? 'translate-x-1' : ''
                      }`}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <Button
                    variant='ghost'
                    className='group flex items-center gap-4 px-4 py-3 rounded-lg w-full sm:w-auto text-left bg-transparent hover:bg-transparent focus:bg-transparent'
                    aria-label='Watch demo - see how it works'>
                    <div className='flex-shrink-0 w-12 h-12 rounded-full border-2 border-slate-900/90 flex items-center justify-center transition-all duration-200 group-hover:bg-[#2dcbc5] group-hover:border-transparent group-hover:scale-105'>
                      <PlayCircle
                        size={16}
                        className='text-slate-900 group-hover:text-white transition-colors duration-200'
                      />
                    </div>
                    <div className='leading-tight'>
                      <div className='inline-block px-0 py-0 rounded-sm transition-colors duration-200'>
                        <div className='text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-[#2dcbc5]'>
                          Watch Demo
                        </div>
                        <div className='text-sm text-slate-500 transition-colors duration-200 group-hover:text-[#2dcbc5]/80'>
                          See how it works
                        </div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              </div>
              <motion.div
                className='mt-10 flex items-center text-slate-500 text-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}>
                <div className='flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200/50 shadow-sm'>
                  <Zap
                    size={16}
                    className='mr-2 text-green-600'
                  />
                  <span className='font-medium'>No credit card required • Free tier available</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <div className='md:w-1/2'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='relative'>
              <div className='relative bg-gradient-to-br from-[#2dcbc5]/10 to-[#2ab7ca]/10 rounded-2xl p-6 border border-slate-200 shadow-xl'>
                <div className='absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-xl flex items-center justify-center'>
                  <Bot
                    size={24}
                    className='text-white'
                  />
                </div>
                <div className='pt-6'>
                  <div className='bg-white rounded-lg p-4 mb-4 border border-slate-200'>
                    <div className='flex items-center mb-2'>
                      <div className='w-8 h-8 rounded-full bg-[#2dcbc5]/10 flex items-center justify-center mr-3'>
                        <span className='text-[#2dcbc5] font-medium'>U</span>
                      </div>
                      <p className='text-slate-800'>I have a Product Manager interview next Thursday — help me prepare.</p>
                    </div>
                  </div>
                  <div className='bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-lg p-4 mb-4 text-white'>
                    <div className='flex items-center mb-2'>
                      <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3'>
                        <span className='text-white font-medium'>A</span>
                      </div>
                      <p>I'll create a focused prep plan and mock interview tailored to the role.</p>
                    </div>
                    <div className='pl-11 space-y-2 text-sm'>
                      <p className='bg-white/10 rounded p-2'>✓ Analyze the job description and highlight key skills</p>
                      <p className='bg-white/10 rounded p-2'>✓ Draft tailored resume bullets and talking points</p>
                      <p className='bg-white/10 rounded p-2'>✓ Create a 30‑minute mock interview with feedback</p>
                      <p className='bg-white/10 rounded p-2'>✓ Suggest focused resources and a 5‑day study plan</p>
                    </div>
                  </div>
                  <div className='bg-white rounded-lg p-4 border border-slate-200'>
                    <div className='flex items-center'>
                      <div className='w-8 h-8 rounded-full bg-[#2dcbc5]/10 flex items-center justify-center mr-3'>
                        <span className='text-[#2dcbc5] font-medium font-manrope'>U</span>
                      </div>
                      <p className='text-slate-800 font-inter'>Perfect — that sounds great, thank you!</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='absolute -z-10 w-full h-full bg-gradient-to-r from-[#2dcbc5]/20 to-[#2ab7ca]/20 rounded-2xl blur-3xl top-6 left-6'></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

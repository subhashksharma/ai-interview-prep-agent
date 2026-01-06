'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className='py-20 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl'></div>
      </div>

      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='relative'>
          {/* Sparkles Icon */}
          <div className='flex justify-center mb-8'>
            <div className='inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10'>
              <Sparkles className='w-10 h-10 text-blue-500' />
            </div>
          </div>

          <div className='relative px-6 py-12 md:px-10 md:py-16'>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className='relative z-10 mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 border-2 border-blue-200 hover:border-blue-400/50 shadow-2xl hover:shadow-[0_20px_70px_rgba(59,130,246,0.3)] transition-all duration-500 p-8 md:p-12'>
              {/* Gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl'></div>

              <div className='relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-12'>
                <div className='flex-1 text-center md:text-left'>
                  <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'>
                    Ready to move your career forward?
                  </h2>
                  <p className='text-slate-700 text-lg md:text-xl font-medium leading-relaxed'>
                    Start free with CareerBuddy — an empathetic AI companion for role prep, tailored
                    docs, interview practice, and 30–60–90 success.
                  </p>
                </div>

                <div className='flex-shrink-0 flex flex-col sm:flex-row gap-4 md:gap-5'>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 md:px-10 md:py-7 rounded-2xl text-base md:text-xl font-bold shadow-2xl shadow-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] transition-all duration-300 border-2 border-white/20'>
                      <Sparkles className='w-5 h-5 mr-2' />
                      Start My Career Plan
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                      variant='outline'
                      className='group flex items-center gap-3 px-6 py-6 md:px-8 md:py-7 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-slate-300 hover:border-purple-500 text-slate-800 hover:text-purple-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 shadow-xl hover:shadow-2xl transition-all duration-300'>
                      <span className='text-base md:text-lg font-bold'>Try a Mock Interview</span>
                      <ArrowRight
                        size={20}
                        className='text-slate-700 group-hover:text-purple-600 group-hover:translate-x-2 transition-all duration-300'
                      />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className='py-20 md:py-24 bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='relative'>
          <div className='relative px-6 py-12 md:px-10 md:py-16'>
            <div className='relative z-10 mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-white/70 to-white/60 border border-slate-200 shadow-xl p-8 md:p-12'>
              <div className='flex flex-col md:flex-row items-center gap-6 md:gap-12'>
                <div className='flex-1 text-center md:text-left'>
                  <h2 className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight'>
                    Ready to move your career forward?
                  </h2>
                  <p className='text-slate-600 text-base md:text-lg'>
                    Start free with CareerBuddy — an empathetic AI companion for role prep, tailored
                    docs, interview practice, and 30–60–90 success.
                  </p>
                </div>

                <div className='flex-shrink-0 flex flex-col sm:flex-row gap-3 md:gap-4'>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}>
                    <Button className='bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold shadow-xl shadow-[#2dcbc5]/25 transition-all'>
                      Start My Career Plan
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}>
                    <Button
                      variant='ghost'
                      className='group flex items-center gap-3 px-4 py-3 rounded-lg bg-transparent border border-slate-200 text-slate-800 hover:bg-[#f8fafb] transition'>
                      <span className='text-sm font-medium'>Try a Mock Interview</span>
                      <ArrowRight
                        size={18}
                        className='text-slate-700 group-hover:translate-x-1 transition-transform duration-200'
                      />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

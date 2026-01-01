'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className='py-20 md:py-24 bg-gradient-to-br from-[#2dcbc5] via-[#2ab7ca] to-blue-600'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='relative'>
          <div className='relative px-8 py-20 md:p-20'>
            {/* Enhanced Background Pattern */}
            <div className='absolute inset-0 overflow-hidden'>
              <div className='absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl'></div>
              <div className='absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl'></div>
            </div>

            <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8'>
              <div className='text-center lg:text-left max-w-xl'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight'>
                  Ready to move your career forward?
                </h2>
                <p className='text-white/90 text-lg md:text-xl max-w-xl leading-relaxed'>
                  Start free with CareerBuddy—your empathetic AI companion for job search to day‑90
                  success.
                </p>
              </div>
              <div className='flex flex-col gap-4 min-w-fit'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Button className='bg-white text-[#2dcbc5] hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto'>
                    Start My Career Plan
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Button
                    variant='outline'
                    className='bg-transparent border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 w-full sm:w-auto group'>
                    <span>Try a Mock Interview</span>
                    <ArrowRight
                      size={20}
                      className='ml-2 group-hover:translate-x-1 transition-transform duration-300'
                    />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

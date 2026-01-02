'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import FeaturesSection from '@/components/features-section';
import UseCasesSection from '@/components/use-cases-section';
import PricingSection from '@/components/pricing-section';
import TestimonialsSection from '@/components/testimonials-section';
import CtaSection from '@/components/cta-section';
import Footer from '@/components/footer';
import Btn from '@/components/btn-download';
import StepperSection from '@/components/stepper-section';

export default function Home() {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaused(true);
    }, 5000); // Pause after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen bg-slate-50 relative overflow-hidden'>
      {/* Sound Wave / Echo Background */}
      <div className='fixed inset-0 z-0 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/40' />

        <div
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-out ${
            isPaused ? 'paused-animations opacity-100' : 'opacity-100'
          }`}>
          {/* Echo Ripples - Sound Wave Effect */}
          <div className='absolute top-1/4 left-1/4 w-[700px] h-[700px] border-[3px] border-[#2dcbc5]/30 rounded-full animate-ripple' />
          <div
            className='absolute top-1/4 left-1/4 w-[700px] h-[700px] border-[2px] border-[#2dcbc5]/20 rounded-full animate-ripple'
            style={{ animationDelay: '1s' }}
          />
          <div
            className='absolute top-1/4 left-1/4 w-[700px] h-[700px] border-[3px] border-[#2ab7ca]/25 rounded-full animate-ripple'
            style={{ animationDelay: '2s' }}
          />
          <div
            className='absolute top-1/4 left-1/4 w-[700px] h-[700px] border-[2px] border-blue-400/20 rounded-full animate-ripple'
            style={{ animationDelay: '3s' }}
          />

          <div
            className='absolute top-2/3 right-1/4 w-[600px] h-[600px] border-[3px] border-[#2ab7ca]/30 rounded-full animate-ripple'
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className='absolute top-2/3 right-1/4 w-[600px] h-[600px] border-[2px] border-blue-400/20 rounded-full animate-ripple'
            style={{ animationDelay: '1.5s' }}
          />
          <div
            className='absolute top-2/3 right-1/4 w-[600px] h-[600px] border-[3px] border-[#2dcbc5]/25 rounded-full animate-ripple'
            style={{ animationDelay: '2.5s' }}
          />
          <div
            className='absolute top-2/3 right-1/4 w-[600px] h-[600px] border-[2px] border-[#2ab7ca]/20 rounded-full animate-ripple'
            style={{ animationDelay: '3.5s' }}
          />

          {/* Pulsing Center Rings */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-2 border-[#2dcbc5]/40 rounded-full animate-pulse-ring' />
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border-2 border-[#2ab7ca]/40 rounded-full animate-pulse-ring'
            style={{ animationDelay: '1s' }}
          />
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border-2 border-blue-400/40 rounded-full animate-pulse-ring'
            style={{ animationDelay: '2s' }}
          />

          {/* Wave Lines */}
          <div className='absolute top-1/4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2dcbc5]/25 to-transparent animate-wave' />
          <div
            className='absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2ab7ca]/20 to-transparent animate-wave'
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className='absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2ab7ca]/30 to-transparent animate-wave'
            style={{ animationDelay: '1s' }}
          />
          <div
            className='absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-wave'
            style={{ animationDelay: '1.5s' }}
          />
          <div
            className='absolute top-3/4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2dcbc5]/25 to-transparent animate-wave'
            style={{ animationDelay: '2s' }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className='absolute inset-0 bg-grid-pattern opacity-[0.04]' />
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <Navbar />
        <main>
          <HeroSection />
          <StepperSection />
          <FeaturesSection />
          <UseCasesSection />
          <TestimonialsSection />
          <PricingSection />
          <CtaSection />
          <div className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40'>
            <Btn
              url='https://codescandy.com/'
              label='Download Template'
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

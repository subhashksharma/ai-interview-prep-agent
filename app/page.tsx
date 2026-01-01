import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import FeaturesSection from '@/components/features-section';
import UseCasesSection from '@/components/use-cases-section';
import PricingSection from '@/components/pricing-section';
import TestimonialsSection from '@/components/testimonials-section';
import CtaSection from '@/components/cta-section';
import Footer from '@/components/footer';
import Btn from '@/components/btn-download';

export default function Home() {
  return (
    <div className='min-h-screen bg-slate-50 relative overflow-hidden'>
      {/* Animated Gradient Mesh Background */}
      <div className='fixed inset-0 z-0 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/40' />

        {/* Animated Gradient Orbs */}
        <div className='absolute top-0 -left-4 w-72 h-72 bg-[#2dcbc5] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
        <div className='absolute top-0 -right-4 w-72 h-72 bg-[#2ab7ca] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000' />
        <div className='absolute inset-0'>
          <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-[#2dcbc5]/30 rounded-full animate-float' />
          <div className='absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[#2ab7ca]/40 rounded-full animate-float animation-delay-1000' />
          <div className='absolute top-2/3 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-float animation-delay-2000' />
          <div className='absolute top-1/2 right-1/4 w-1 h-1 bg-[#2dcbc5]/50 rounded-full animate-float animation-delay-3000' />
          <div className='absolute top-3/4 left-2/3 w-1.5 h-1.5 bg-[#2ab7ca]/30 rounded-full animate-float animation-delay-4000' />
          <div className='absolute top-1/6 right-1/2 w-2 h-2 bg-blue-300/40 rounded-full animate-float animation-delay-500' />
        </div>

        {/* Grid Pattern Overlay */}
        <div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
      </div>

      {/* Content */}
      <div className='relative z-10'>
        <Navbar />
        <main>
          <HeroSection />
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

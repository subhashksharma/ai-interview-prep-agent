'use client';

import HeaderComponent from '@/components/header-components';
import LandingPageHomeComponents from '@/components/landing-page-home-components';
import FeaturesSection from '@/components/features-section';
import UseCasesSection from '@/components/use-cases-section';
import PricingSection from '@/components/pricing-section';
import TestimonialsSection from '@/components/testimonials-section';
import CtaSection from '@/components/cta-section';
import Footer from '@/components/footer';
import Btn from '@/components/btn-download';
import VideoBackground from '@/components/video-background';
import DiscoveryCareerJourney from '@/components/discovery-career-journey';

export default function Home() {
  return (
    <div className='min-h-screen bg-slate-50 relative overflow-hidden'>
      {/* Video Background */}
      <VideoBackground
        posterUrl='https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-poster-00001.jpg'
        videoUrls={{
          mp4: 'https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-transcode.mp4',
          webm: 'https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b%2F68e6057dd670c86ab26c8544_Kore%20Hero%20Banner%20Ripple%20BG-transcode.webm',
        }}
        autoplay={true}
        loop={false}
      />

      {/* Content */}
      <div className='relative z-10'>
        <HeaderComponent />
        <main>
          <LandingPageHomeComponents />
          <DiscoveryCareerJourney />
          <FeaturesSection />
          <UseCasesSection />
          <TestimonialsSection />
          <PricingSection />
          <CtaSection />
          <div className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40'>
            <Btn
              url='https://abctest.com/'
              label='Download'
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

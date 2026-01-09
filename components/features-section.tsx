'use client';

import { motion } from 'framer-motion';
import { Compass, Search, ListChecks, MessageSquare, FileText, Handshake } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Compass className='h-6 w-6 text-[#2dcbc5]' />,
      title: 'Onboarding & Self‑Discovery',
      description:
        'Capture skills, values, motivators, preferences, and availability to build a living career persona.',
    },
    {
      icon: <Search className='h-6 w-6 text-[#2dcbc5]' />,
      title: 'Career & Role Exploration',
      description:
        'AI‑powered role suggestions, comfort vs. stretch paths, market demand, salary ranges, and skill gaps.',
    },
    {
      icon: <ListChecks className='h-6 w-6 text-[#2dcbc5]' />,
      title: 'Jobs Dashboard',
      description:
        'Import jobs from anywhere, parse JDs, track progress, and get dynamic master + job‑specific prep plans.',
    },
    {
      icon: <MessageSquare className='h-6 w-6 text-[#2dcbc5]' />,
      title: 'Mock Interviews & Quizzes',
      description:
        'AI recruiter + technical rounds, pop‑up quizzes, and feedback loops that sharpen answers and confidence.',
    },
    {
      icon: <FileText className='h-6 w-6 text-[#2dcbc5]' />,
      title: 'Tailored Documents',
      description:
        'ATS‑ready resumes, role‑specific cover letters, and evolving “Tell me about yourself” scripts per job.',
    },
    {
      icon: <Handshake className='h-6 w-6 text-[#2dcbc5]' />,
      title: 'Offer Negotiation',
      description:
        'Break down offers, compare markets, and generate empathetic yet assertive negotiation scripts.',
    },
  ];

  return (
    <section
      id='features'
      className='min-h-screen flex items-center py-20 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2dcbc5]/5 rounded-full blur-3xl pointer-events-none' />
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-20'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-[#2dcbc5]/10 border border-[#2dcbc5]/20 text-[#2dcbc5] mb-6'>
              <span className='text-pill'>Built for Your Career Journey</span>
            </div>
            <h2 className='text-hero-main mb-4'>End‑to‑End Support, Powered by Empathy</h2>
            <p className='text-body-large max-w-2xl mx-auto'>
              From discovery to offer, CareerBuddy brings structure, confidence, and guidance to
              every step.
            </p>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className='group'>
              <div className='bg-white p-8 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#2dcbc5]/10 transition-all duration-300 h-full relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#2dcbc5]/0 via-[#2dcbc5]/0 to-[#2dcbc5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                <div className='relative z-10'>
                  <div className='w-14 h-14 bg-gradient-to-br from-[#2dcbc5]/10 to-[#2ab7ca]/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm'>
                    {feature.icon}
                  </div>
                  <h3 className='text-card-title mb-3 group-hover:text-[#2dcbc5] transition-colors duration-300'>
                    {feature.title}
                  </h3>
                  <p className='text-body-default'>{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

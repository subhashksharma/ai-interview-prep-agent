'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, Repeat, AlertTriangle, Undo2, TrendingUp, Search } from 'lucide-react';

export default function UseCasesSection() {
  const [activeTab, setActiveTab] = useState('fresh-graduates');

  const useCases: Record<
    string,
    {
      icon: React.ReactNode;
      title: string;
      description: string;
      benefits: string[];
      image: string;
    }
  > = {
    'fresh-graduates': {
      icon: <GraduationCap className='h-6 w-6' />,
      title: 'Fresh Graduates & Students',
      description:
        'Get clarity on roles, build an ATS‑ready resume, and practice recruiter + technical rounds with empathetic feedback.',
      benefits: [
        'AI‑guided self‑discovery and role mapping',
        'General resume draft to kickstart networking',
        'Pop‑up quizzes for quick skill checks',
        'Confidence‑building mock interviews',
      ],
      image:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    },
    'career-switchers': {
      icon: <Repeat className='h-6 w-6' />,
      title: 'Career Switchers',
      description:
        'Map adjacent and stretch roles, close skill gaps, and get tailored prep plans for each track you’re targeting.',
      benefits: [
        'Comfort vs. stretch role suggestions',
        'Skill gap analysis with upskilling',
        'Dual‑track prep support (e.g., Product + Data)',
        'Role‑specific cover letters',
      ],
      image:
        'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
    },
    'laid-off': {
      icon: <AlertTriangle className='h-6 w-6' />,
      title: 'Laid‑off Professionals',
      description:
        'Reduce chaos with structure. Import jobs from anywhere, track progress, and get day‑by‑day preparation guidance.',
      benefits: [
        'Job import + parsing from any platform',
        'Dynamic master and job‑specific plans',
        'Communication templates for outreach + follow‑ups',
        'Motivational nudges when it’s tough',
      ],
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    },
    returnees: {
      icon: <Undo2 className='h-6 w-6' />,
      title: 'Returnees (Career Break)',
      description:
        'Ease back with updated resumes, confidence‑oriented interview practice, and a paced plan based on your availability.',
      benefits: [
        'Persona‑aware pacing and reminders',
        'ATS‑ready resume with gap framing',
        'Scripts for outreach and interviews',
        'Gentle, empathetic reinforcement',
      ],
      image:
        'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1200&q=80',
    },
    'mid-senior': {
      icon: <TrendingUp className='h-6 w-6' />,
      title: 'Mid‑Senior Professionals',
      description:
        'Target leadership or high‑impact roles with refined positioning, case prep, and negotiation support.',
      benefits: [
        'Market demand + salary insights',
        'Storytelling for impact and outcomes',
        'Panel‑style mock interviews',
        'Offer breakdown + scripts',
      ],
      image:
        'https://images.unsplash.com/photo-1542219550-0b2f1e1a8d3b?auto=format&fit=crop&w=1200&q=80',
    },
    'passive-seekers': {
      icon: <Search className='h-6 w-6' />,
      title: 'Passive Job Seekers',
      description:
        'Find your market fit quietly—explore options, keep a living career journal, and be ready when opportunity knocks.',
      benefits: [
        'Gentle exploration without pressure',
        'Career journal for wins + growth',
        'Periodic checkpoints every 3–6 months',
        'Resource curation that fits your goals',
      ],
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    },
  };

  return (
    <section
      id='use-cases'
      className='min-h-screen flex items-center py-20 md:py-24 bg-white relative overflow-hidden'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Made for Every Stage of Your Career
            </h2>
            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
              Whether you’re a student, switching careers, returning, or leveling up—CareerBuddy
              supports your journey with empathy.
            </p>
          </motion.div>
        </div>

        <div className='flex flex-wrap justify-center gap-2 mb-12'>
          {Object.entries(useCases).map(([key, useCase]) => (
            <Button
              key={key}
              variant={activeTab === key ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${
                activeTab === key ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-300'
              }`}
              onClick={() => setActiveTab(key)}>
              <span className={activeTab === key ? 'text-white' : 'text-slate-700'}>
                {useCase.icon}
              </span>
              <span>{useCase.title}</span>
            </Button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-white rounded-xl overflow-hidden border border-slate-200 shadow-lg'>
          <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-1/2 p-8 lg:p-12'>
              <h3 className='text-2xl font-bold mb-4'>{useCases[activeTab].title}</h3>
              <p className='text-slate-600 mb-6'>{useCases[activeTab].description}</p>

              <h4 className='font-semibold text-lg mb-3'>Key Benefits:</h4>
              <ul className='space-y-2 mb-8'>
                {useCases[activeTab].benefits.map((benefit: string, index: number) => (
                  <li
                    key={index}
                    className='flex items-start'>
                    <div className='mr-2 mt-1 text-blue-600'>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M13.3334 4L6.00008 11.3333L2.66675 8'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button className='bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white'>
                Learn More
              </Button>
            </div>
            <div className='lg:w-1/2 bg-slate-100 flex items-center justify-center p-8'>
              <img
                src={useCases[activeTab].image || '/placeholder.svg'}
                alt={`${useCases[activeTab].title} illustration`}
                className='rounded-lg shadow-md max-w-full h-auto'
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

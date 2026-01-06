'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Repeat,
  AlertTriangle,
  Undo2,
  TrendingUp,
  Search,
  Sparkles,
} from 'lucide-react';

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

  // short sample dialogues for a few roles — used for the interactive preview
  const conversations: Record<
    string,
    {
      scenario: string;
      messages: { from: 'user' | 'assistant'; text: string }[];
    }
  > = {
    'fresh-graduates': {
      scenario:
        'You have a 20‑minute recruiter screen. Practice a quick intro and one impact story to lead with.',
      messages: [
        { from: 'user', text: "Hi — I'm Sam, a recent CS graduate focused on backend systems." },
        {
          from: 'assistant',
          text: 'Nice to meet you, Sam — tell me about a project where you improved performance.',
        },
        {
          from: 'user',
          text: 'I refactored a caching layer and reduced latency by 40% for our API.',
        },
        {
          from: 'assistant',
          text: 'Great — frame the challenge, your action, and the measurable result.',
        },
      ],
    },
    'career-switchers': {
      scenario:
        'Moving from marketing into product. Frame transferable skills and a short learning plan for interviews.',
      messages: [
        { from: 'user', text: 'I led growth experiments and want to move into PM roles.' },
        {
          from: 'assistant',
          text: 'Emphasize hypothesis design, metrics, and stakeholder alignment.',
        },
        { from: 'user', text: 'Which projects should I highlight?' },
        {
          from: 'assistant',
          text: 'Pick 2 projects: one showing product intuition and one showing measurable impact.',
        },
      ],
    },
    'mid-senior': {
      scenario:
        'Interviewing for a senior IC or manager role—practice leadership stories and compensation framing.',
      messages: [
        { from: 'user', text: 'I led a cross‑functional launch that lifted retention by 18%.' },
        {
          from: 'assistant',
          text: 'Structure it: context, challenge, action, outcome, and learning.',
        },
        { from: 'user', text: 'How should I discuss compensation expectations?' },
        {
          from: 'assistant',
          text: 'Share a range anchored to market data and be clear about priorities.',
        },
      ],
    },
  };

  const [visibleCount, setVisibleCount] = useState(0);

  // autoplay preview for selected role conversations
  useEffect(() => {
    const convo = conversations[activeTab];
    if (!convo) {
      setVisibleCount(0);
      return;
    }
    setVisibleCount(1);
    let i = 1;
    const id = setInterval(() => {
      i += 1;
      if (i > convo.messages.length) {
        clearInterval(id);
        return;
      }
      setVisibleCount(i);
    }, 1400);
    return () => clearInterval(id);
  }, [activeTab]);

  return (
    <section
      id='use-cases'
      className='min-h-screen flex items-center py-20 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className='inline-flex items-center justify-center p-2 mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10'>
              <Sparkles className='w-8 h-8 text-blue-500' />
            </div>
            <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'>
              Made for Every Stage of Your Career
            </h2>
            <p className='text-lg md:text-xl text-slate-600 max-w-2xl mx-auto'>
              Whether you’re a student, switching careers, returning, or leveling up—CareerBuddy
              supports your journey with empathy.
            </p>
          </motion.div>
        </div>

        <div className='flex flex-wrap justify-center gap-3 mb-12'>
          {Object.entries(useCases).map(([key, useCase]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <Button
                variant={activeTab === key ? 'default' : 'outline'}
                className={`flex items-center gap-2 text-sm sm:text-base transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-xl shadow-blue-500/25 border-0'
                    : 'border-2 border-slate-200 hover:border-blue-500/50 hover:shadow-lg hover:bg-blue-50/50'
                }`}
                onClick={() => setActiveTab(key)}>
                <span className={activeTab === key ? 'text-white' : 'text-slate-700'}>
                  {useCase.icon}
                </span>
                <span className='hidden sm:inline'>{useCase.title}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className='bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-blue-500/50 shadow-xl hover:shadow-2xl transition-all duration-300'>
          <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-white to-blue-50/20'>
              <h3 className='text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                {useCases[activeTab].title}
              </h3>
              <p className='text-slate-700 text-lg mb-6'>{useCases[activeTab].description}</p>

              <h4 className='font-bold text-xl mb-4 text-slate-800'>Key Benefits:</h4>
              <ul className='space-y-3 mb-8'>
                {useCases[activeTab].benefits.map((benefit: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='flex items-start'>
                    <div className='mr-3 mt-1'>
                      <div className='w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center'>
                        <svg
                          width='14'
                          height='14'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M13.3334 4L6.00008 11.3333L2.66675 8'
                            stroke='white'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
                    </div>
                    <span className='text-slate-700'>{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Button className='bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl shadow-blue-500/25 px-8 py-6 text-lg rounded-xl'>
                  Learn More
                </Button>
              </motion.div>
            </div>
            <div className='lg:w-1/2 bg-gradient-to-br from-slate-50 to-blue-50/50 flex items-center justify-center p-8'>
              {conversations[activeTab] ? (
                <div className='w-full max-w-md'>
                  <h4 className='text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide'>
                    Scenario
                  </h4>
                  <p className='text-slate-700 mb-6 font-medium'>
                    {conversations[activeTab].scenario}
                  </p>

                  <div className='bg-white rounded-2xl p-5 shadow-xl border-2 border-slate-100 space-y-3 max-h-64 overflow-auto'>
                    {conversations[activeTab].messages.slice(0, visibleCount).map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${m.from === 'assistant' ? 'justify-end' : ''}`}>
                        <div
                          className={`px-5 py-3 rounded-2xl max-w-[80%] shadow-md ${
                            m.from === 'assistant'
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                              : 'bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 border border-slate-200'
                          }`}>
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className='mt-4 text-sm text-slate-500 flex items-center gap-2'>
                    <Sparkles className='w-4 h-4 text-blue-500' />
                    Auto preview — messages reveal sequentially.
                  </div>
                </div>
              ) : (
                <img
                  src={useCases[activeTab].image || '/placeholder.svg'}
                  alt={`${useCases[activeTab].title} illustration`}
                  className='rounded-3xl shadow-2xl max-w-full h-auto border-2 border-slate-200'
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

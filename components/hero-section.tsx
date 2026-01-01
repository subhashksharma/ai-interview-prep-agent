'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, Zap, PlayCircle, UploadCloud, Heading1 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  // Simulate real-time chat conversation
  const messages = [
    { from: 'user', text: 'I have a Product Manager interview next Thursday — help me prepare.' },
    {
      from: 'bot',
      text: "I'll create a focused prep plan and mock interview tailored to the role.",
    },
    { from: 'bot', text: '✓ Analyze the job description and highlight key skills', isStep: true },
    { from: 'bot', text: '✓ Draft tailored resume bullets and talking points', isStep: true },
    { from: 'bot', text: '✓ Create a 30‑minute mock interview with feedback', isStep: true },
    { from: 'bot', text: '✓ Suggest focused resources and a 5‑day study plan', isStep: true },
    { from: 'user', text: 'Perfect — that sounds great, thank you!' },
  ];

  // Start chat after page loads (1.5s delay)
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setChatStarted(true);
    }, 1500);
    return () => clearTimeout(startTimer);
  }, []);

  // Animate messages appearing one by one with typing indicators
  useEffect(() => {
    if (!chatStarted || visibleMessages >= messages.length) return;

    const nextMessage = messages[visibleMessages];

    // Show typing indicator
    setShowTyping(true);

    // Hide typing and show message after delay
    const typingDuration = nextMessage.isStep ? 400 : nextMessage.from === 'user' ? 800 : 1000;
    const timer = setTimeout(() => {
      setShowTyping(false);
      setVisibleMessages((prev) => prev + 1);
    }, typingDuration);

    return () => clearTimeout(timer);
  }, [chatStarted, visibleMessages, messages]);

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
                <span className='text-sm font-semibold'>This is buddy 🤖 I can help you.</span>
              </motion.div>
              <h1 className='md:text-4xl lg:text-4xl font-bold mb-8 text-slate-900 tracking-tight drop-shadow-sm'>
                Let's walk this journey together. Let's get to know each ohter.
              </h1>
              <p className='text-xl text-slate-500 mb-10 max-w-xl leading-relaxed drop-shadow-sm'>
                CareerBuddy guides you end‑to‑end—from self‑discovery and role exploration to job
                tracking, mock interviews, tailored docs, negotiation, and 30‑60‑90 success. Built
                to support you at every stage, with empathy.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <Button
                    variant='ghost'
                    className='group flex items-center gap-4 px-4 py-3 rounded-lg w-full sm:w-auto text-left bg-transparent hover:bg-transparent focus:bg-transparent'
                    aria-label='Upload resume - get tailored resume bullets'>
                    <div className='flex-shrink-0 w-10 h-10 rounded-full border-2 border-slate-900/90 flex items-center justify-center transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#2dcbc5] group-hover:to-[#2ab7ca] group-hover:border-transparent group-hover:scale-105'>
                      <UploadCloud
                        size={16}
                        className='text-slate-900 group-hover:text-white transition-colors duration-200'
                      />
                    </div>
                    <div className='leading-tight'>
                      <div className='inline-block px-0 py-0 rounded-sm transition-colors duration-200'>
                        <div className='text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-[#2dcbc5]'>
                          Upload Resume
                        </div>
                        <div className='text-sm text-slate-500 transition-colors duration-200 group-hover:text-[#2dcbc5]/80'>
                          Get tailored resume bullets
                        </div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <Button
                    variant='ghost'
                    className='group flex items-center gap-4 px-4 py-3 rounded-lg w-full sm:w-auto text-left bg-transparent hover:bg-transparent focus:bg-transparent'
                    aria-label='Watch demo - see how it works'>
                    <div className='flex-shrink-0 w-10 h-10 rounded-full border-2 border-slate-900/90 flex items-center justify-center transition-all duration-200 group-hover:bg-[#2dcbc5] group-hover:border-transparent group-hover:scale-105'>
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
                    size={24}
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
                <div className='absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-xl flex items-center justify-center animate-pulse-glow'>
                  <Bot
                    size={24}
                    className='text-white'
                  />
                </div>
                <div className='pt-6 space-y-3 min-h-[300px]'>
                  {messages.slice(0, visibleMessages).map((msg, index) => {
                    if (msg.from === 'user') {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className='bg-white rounded-lg p-4 border border-slate-200'>
                          <div className='flex items-center'>
                            <div className='w-8 h-8 rounded-full bg-[#2dcbc5]/10 flex items-center justify-center mr-3 flex-shrink-0'>
                              <span className='text-[#2dcbc5] font-medium'>U</span>
                            </div>
                            <p className='text-slate-800'>{msg.text}</p>
                          </div>
                        </motion.div>
                      );
                    } else if (msg.isStep) {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className='pl-11'>
                          <p className='bg-white/10 rounded p-2 text-sm text-slate-700 border border-slate-200'>
                            {msg.text}
                          </p>
                        </motion.div>
                      );
                    } else {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className='bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-lg p-4 text-white'>
                          <div className='flex items-center'>
                            <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0'>
                              <span className='text-white font-medium'>A</span>
                            </div>
                            <p>{msg.text}</p>
                          </div>
                        </motion.div>
                      );
                    }
                  })}

                  {/* Typing indicator */}
                  {showTyping && visibleMessages < messages.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`rounded-lg p-4 border ${
                        messages[visibleMessages]?.from === 'user'
                          ? 'bg-white border-slate-200'
                          : messages[visibleMessages]?.isStep
                          ? 'pl-11'
                          : 'bg-gradient-to-r from-[#2dcbc5]/10 to-[#2ab7ca]/10 border-[#2dcbc5]/20'
                      }`}>
                      <div className='flex items-center'>
                        {!messages[visibleMessages]?.isStep && (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              messages[visibleMessages]?.from === 'user'
                                ? 'bg-[#2dcbc5]/10'
                                : 'bg-[#2dcbc5]/20'
                            }`}>
                            <span
                              className={`font-medium ${
                                messages[visibleMessages]?.from === 'user'
                                  ? 'text-[#2dcbc5]'
                                  : 'text-[#2dcbc5]'
                              }`}>
                              {messages[visibleMessages]?.from === 'user' ? 'U' : 'A'}
                            </span>
                          </div>
                        )}
                        <div className='flex space-x-1'>
                          <span
                            className='w-2 h-2 bg-[#2dcbc5] rounded-full animate-bounce'
                            style={{ animationDelay: '0ms' }}></span>
                          <span
                            className='w-2 h-2 bg-[#2dcbc5] rounded-full animate-bounce'
                            style={{ animationDelay: '150ms' }}></span>
                          <span
                            className='w-2 h-2 bg-[#2dcbc5] rounded-full animate-bounce'
                            style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
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

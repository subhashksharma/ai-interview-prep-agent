'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

type Message = { from: string; text: string; isStep?: boolean };

interface BotDemoChatboxProps {
  messages: Message[];
  visibleMessages: number;
  showTyping: boolean;
  className?: string;
}

export default function BotDemoChatbox({
  messages,
  visibleMessages,
  showTyping,
  className,
}: BotDemoChatboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={className ?? 'relative'}>
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
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className='w-2 h-2 bg-[#2dcbc5] rounded-full animate-bounce'
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className='w-2 h-2 bg-[#2dcbc5] rounded-full animate-bounce'
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <div className='absolute -z-10 w-full h-full bg-gradient-to-r from-[#2dcbc5]/20 to-[#2ab7ca]/20 rounded-2xl blur-3xl top-6 left-6'></div>
    </motion.div>
  );
}

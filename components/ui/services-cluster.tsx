'use client';

import React, { useEffect, useState } from 'react';
import ServiceBubble from './service-bubble';
import { Bot } from 'lucide-react';

type Item = { label: string; dotColor?: string; from?: string; to?: string };

const defaultItems: Item[] = [
  { label: 'Onboarding & Self‑Discovery', dotColor: '#2dcbc5' },
  { label: 'Career & Role Exploration', dotColor: '#60a5fa' },
  { label: 'Jobs Dashboard', dotColor: '#7dd3fc' },
  { label: 'Mock Interviews & Quizzes', dotColor: '#34d399' },
  { label: 'Tailored Documents', dotColor: '#a78bfa' },
  { label: 'Offer Negotiation', dotColor: '#f472b6' },
];

export default function ServicesCluster({
  items = defaultItems,
  className = '',
}: {
  items?: Item[];
  className?: string;
}) {
  // Positions around the center (percentages)
  const positions = [
    { top: '8%', left: '18%' },
    { top: '26%', left: '6%' },
    { top: '8%', left: '72%' },
    { top: '70%', left: '10%' },
    { top: '74%', left: '62%' },
    { top: '54%', left: '80%' },
  ];

  return (
    <>
      {/* Desktop / large: connected radial cluster */}
      <div className={`hidden md:block relative w-full h-[420px] ${className}`}>
        {/* Connector lines drawn via SVG from center (50,50) to each bubble percentage */}
        <svg
          className='absolute inset-0 w-full h-full pointer-events-none'
          viewBox='0 0 100 100'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden>
          {items.map((_, i) => {
            const pos = positions[i % positions.length];
            const x = parseFloat(pos.left || '50');
            const y = parseFloat(pos.top || '50');
            return (
              <line
                key={`line-${i}`}
                x1='50'
                y1='50'
                x2={String(x)}
                y2={String(y)}
                stroke='rgba(45,203,197,0.18)'
                strokeWidth='0.8'
                strokeLinecap='round'
              />
            );
          })}
        </svg>
        {/* Center decorative rings (simple) */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-[260px] h-[260px] rounded-full bg-gradient-to-br from-[#ecfeff] to-white/80 border border-[#2dcbc5]/10 flex items-center justify-center'>
            <div className='w-44 h-36 rounded-2xl bg-gradient-to-br from-white to-[#f7ffff] border border-[#e6fdfc]/40 shadow-inner flex items-center justify-center relative'>
              {/* Monitor bezel */}
              {/* <div className='absolute -top-8 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] shadow-lg border-2 border-white'>
                <Bot
                  size={34}
                  className='text-white'
                />
              </div> */}

              {/* Screen */}
              <div className='w-36 h-20 bg-slate-900 rounded-md flex items-center justify-center p-2'>
                <div className='w-full text-center'>
                  <CenterTyping textClass='text-white' />
                </div>
              </div>

              {/* Stand */}
              <div className='absolute bottom-[-10px] w-24 h-4 bg-white/90 rounded-b-md border border-[#ecfeff]/40' />
            </div>
          </div>
        </div>

        {/* Bubbles */}
        {items.map((it, i) => (
          <div
            key={i}
            className='absolute'
            style={{
              top: positions[i % positions.length].top,
              left: positions[i % positions.length].left,
            }}>
            <ServiceBubble
              label={it.label}
              dotColor={it.dotColor}
              from={it.from}
              to={it.to}
              delay={i * 0.3}
              href={`/services/${it.label
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')}`}
            />
          </div>
        ))}
      </div>

      {/* Mobile: compact grid/list without connectors */}
      <div
        className={`w-full md:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 items-center ${className}`}>
        {items.map((it, i) => (
          <div
            key={`m-${i}`}
            className='flex justify-center'>
            <ServiceBubble
              label={it.label}
              dotColor={it.dotColor}
              from={it.from}
              to={it.to}
              delay={0}
              href={`/services/${it.label
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')}`}
              className='px-3 py-2 text-center'
            />
          </div>
        ))}
      </div>
    </>
  );
}

function CenterTyping({ textClass = 'text-slate-900' }: { textClass?: string }) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const full = 'This is buddy 🤖 I can help you.';
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTyped(full);
      return;
    }
    let i = 0;
    setTyped('');
    const id = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  const pulseClass = textClass.includes('white') ? 'bg-white' : 'bg-slate-700';

  return (
    <div
      className='text-center'
      role='status'
      aria-live='polite'>
      <div className={`text-xs ${textClass} font-semibold leading-tight`}>{typed}</div>
      <div className='h-3'>
        <span
          className={`inline-block w-1 h-3 ${pulseClass} rounded-sm align-middle ml-1 animate-pulse`}
          aria-hidden
        />
      </div>
    </div>
  );
}

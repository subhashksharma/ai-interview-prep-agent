'use client';

import React from 'react';
import ServiceBubble from './service-bubble';

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
            <div className='w-28 h-28 rounded-full bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] shadow-lg' />
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

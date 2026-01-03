'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

interface ServiceBubbleProps {
  label: string;
  dotColor?: string; // tailwind or hex
  from?: string; // gradient start (hex)
  to?: string; // gradient end (hex)
  delay?: number; // seconds for stagger
  className?: string;
  href?: string;
}

export default function ServiceBubble({
  label,
  dotColor = '#2dcbc5',
  from,
  to,
  delay = 0,
  className = '',
  href,
}: ServiceBubbleProps) {
  const reduce = useReducedMotion();

  const gradientStyle =
    from && to
      ? { background: `linear-gradient(90deg, ${from}, ${to})`, color: 'white' }
      : undefined;

  const initial = reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.98 };
  const animate = { opacity: 1, y: 0, scale: 1 };
  const transition = { duration: 0.55, delay };
  const isMobileCompact = className.includes('mobile-compact');

  const pillBase = `inline-flex items-center gap-2 rounded-full shadow-md transition-transform duration-200 transform hover:scale-[1.02] border border-white/10`;
  const pillJustify = isMobileCompact ? 'justify-center' : 'justify-start';
  // Mobile: wider fixed width and slightly taller to accommodate two-line labels.
  // Desktop: fixed height (h-9) but allow variable width with a sensible min-width.
  const pillSize = isMobileCompact
    ? 'w-48 h-10 text-xs px-3 py-1'
    : 'min-w-[140px] h-9 text-sm px-3 py-2';
  const pillBg = from && to ? '' : 'bg-white/80 dark:bg-slate-800/70';
  const pillText = from && to ? 'text-white' : 'text-slate-800 dark:text-white';
  const pillClasses = `${pillBase} ${pillJustify} ${pillSize} ${pillBg} ${pillText}`;

  const dotClasses = 'w-2.5 h-2.5 rounded-full flex-shrink-0';

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}>
      <div
        className='animate-bubble'
        style={{ animationDelay: `${delay + 0.55}s` }}>
        {href ? (
          <Link
            href={href}
            aria-label={label}
            style={gradientStyle}
            className={pillClasses}>
            <span
              className={dotClasses}
              style={{ background: dotColor }}
            />
            <span
              className={
                isMobileCompact ? 'text-center w-full whitespace-normal leading-tight' : 'truncate'
              }>
              {label}
            </span>
          </Link>
        ) : (
          <div
            style={gradientStyle}
            className={pillClasses}>
            <span
              className={dotClasses}
              style={{ background: dotColor }}
            />
            <span
              className={
                isMobileCompact ? 'text-center w-full whitespace-normal leading-tight' : 'truncate'
              }>
              {label}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

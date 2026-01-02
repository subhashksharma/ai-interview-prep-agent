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
            className='service-pill'
            aria-label={label}
            style={gradientStyle}>
            <span
              className='service-dot'
              style={{ background: dotColor }}
            />
            <span className='text-sm'>{label}</span>
          </Link>
        ) : (
          <div
            className='service-pill'
            style={gradientStyle}>
            <span
              className='service-dot'
              style={{ background: dotColor }}
            />
            <span className='text-sm'>{label}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

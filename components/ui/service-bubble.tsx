'use client';

import React from 'react';
import Link from 'next/link';

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
  const gradientStyle =
    from && to
      ? { background: `linear-gradient(90deg, ${from}, ${to})`, color: 'white' }
      : undefined;

  return (
    <div
      className={`animate-bubble ${className}`}
      style={{ animationDelay: `${delay}s` }}>
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
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingKeywordsProps {
  keywords: string[];
  interval?: number; // ms
  className?: string;
}

export default function RotatingKeywords({
  keywords,
  interval = 2200,
  className = '',
}: RotatingKeywordsProps) {
  const [index, setIndex] = useState(0);
  const [directionUp, setDirectionUp] = useState(true);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      // don't animate, just cycle text slowly
      const id = window.setInterval(() => {
        setIndex((i) => (i + 1) % keywords.length);
      }, Math.max(1200, interval));
      return () => clearInterval(id);
    }

    const id = window.setInterval(() => {
      setDirectionUp((d) => !d);
      setIndex((i) => (i + 1) % keywords.length);
    }, interval);

    return () => clearInterval(id);
  }, [keywords.length, interval]);

  if (!keywords || keywords.length === 0) return null;

  const enter = (up: boolean) => ({ opacity: 0, y: up ? 16 : -16 });
  const exit = (up: boolean) => ({ opacity: 0, y: up ? -16 : 16 });

  return (
    <span aria-live='polite'>
      <AnimatePresence mode='wait'>
        <motion.span
          key={index}
          initial={enter(directionUp)}
          animate={{ opacity: 1, y: 0 }}
          exit={exit(directionUp)}
          transition={{ duration: 0.36, ease: 'easeInOut' }}
          className={`inline-block ${className}`.trim()}>
          {keywords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

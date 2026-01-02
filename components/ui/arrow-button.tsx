'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type ArrowButtonProps = React.ComponentProps<typeof Button> & {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ArrowButton({
  title = 'Click Me',
  subtitle = 'See how it works',
  className = '',
  onClick,
  ...rest
}: ArrowButtonProps) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) onClick(e as any);
    const target = document.getElementById('journey');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Button
      variant='ghost'
      onClick={handleClick}
      className={
        className ||
        'group flex items-center gap-4 px-4 py-3 rounded-lg w-full sm:w-auto text-left bg-transparent hover:bg-transparent focus:bg-transparent'
      }
      aria-label={`${title} - ${subtitle}`}
      {...rest}>
      <motion.div
        className='flex-shrink-0 w-10 h-10 rounded-full border-2 border-slate-900/90 flex items-center justify-center transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#2dcbc5] group-hover:to-[#2ab7ca] group-hover:border-transparent group-hover:scale-110'
        animate={{ y: [0, -12, 0], scale: [1, 1.06, 1] }}
        whileHover={{ scale: 1.12 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}>
        <ArrowDownCircle
          size={16}
          className='text-slate-900 group-hover:text-white transition-colors duration-200'
        />
      </motion.div>

      <div className='leading-tight'>
        <div className='inline-block px-0 py-0 rounded-sm transition-colors duration-200'>
          <div className='inline-block bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm'>
            {title}
          </div>
          <div className='text-sm text-slate-500 transition-colors duration-200 group-hover:text-[#2dcbc5]/80'>
            {subtitle}
          </div>
        </div>
      </div>
    </Button>
  );
}

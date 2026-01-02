'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

type WatchButtonProps = React.ComponentProps<typeof Button> & {
  className?: string;
};

export default function WatchButton({ className, ...rest }: WatchButtonProps) {
  return (
    <Button
      variant='ghost'
      className={
        className ||
        'group flex items-center gap-4 px-4 py-3 rounded-lg w-full sm:w-auto text-left bg-transparent hover:bg-transparent focus:bg-transparent'
      }
      aria-label='Watch demo - see how it works'
      {...rest}>
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
  );
}

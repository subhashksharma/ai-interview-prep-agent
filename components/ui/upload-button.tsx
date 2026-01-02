'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

type UploadButtonProps = React.ComponentProps<typeof Button> & {
  className?: string;
};

export default function UploadButton({ className, ...rest }: UploadButtonProps) {
  return (
    <Button
      variant='ghost'
      className={
        className ||
        'group flex items-center gap-4 px-4 py-3 rounded-lg w-full sm:w-auto text-left bg-transparent hover:bg-transparent focus:bg-transparent'
      }
      aria-label='Upload resume - get tailored resume bullets'
      {...rest}>
      <div className='flex-shrink-0 w-10 h-10 rounded-full border-2 border-slate-900/90 flex items-center justify-center transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-[#2dcbc5] group-hover:to-[#2ab7ca] group-hover:border-transparent group-hover:scale-105'>
        <UploadCloud
          size={16}
          className='text-slate-900 group-hover:text-white transition-colors duration-200'
        />
      </div>
      <div className='leading-tight'>
        <div className='inline-block px-0 py-0 rounded-sm transition-colors duration-200'>
          <div className='inline-block bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm'>
            Upload Resume
          </div>
          <div className='text-sm text-slate-500 transition-colors duration-200 group-hover:text-[#2dcbc5]/80'>
            Get tailored resume bullets
          </div>
        </div>
      </div>
    </Button>
  );
}

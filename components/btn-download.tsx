// components/Btn.tsx
import React from 'react';
import { Download } from 'lucide-react';

interface BtnProps {
  url: string;
  label: string;
}

const Btn: React.FC<BtnProps> = ({ url, label }) => {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='group inline-flex items-center px-5 py-3 rounded-xl bg-white border border-slate-200/60 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#2dcbc5]/20 text-slate-700 hover:text-[#2dcbc5] transition-all duration-300 hover:scale-105 hover:border-[#2dcbc5]/30 hover:bg-white backdrop-blur-sm'>
      <Download
        size={18}
        className='mr-2.5 group-hover:animate-bounce'
      />
      <span className='font-semibold text-[15px]'>{label}</span>
    </a>
  );
};

export default Btn;

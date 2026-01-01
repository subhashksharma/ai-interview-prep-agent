'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}>
      <div className='max-w-6xl mx-auto px-6 flex items-center justify-between'>
        <Link
          href='/'
          className='flex items-center space-x-3 group transition-all duration-300'>
          <div className='w-10 h-10 bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] rounded-xl flex items-center justify-center shadow-lg shadow-[#2dcbc5]/25 group-hover:shadow-xl group-hover:shadow-[#2dcbc5]/30 transition-all duration-300 group-hover:scale-105'>
            <span className='text-white font-bold text-lg'>C</span>
          </div>
          <span
            className={`text-2xl font-bold bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] bg-clip-text text-transparent tracking-tight transition-all duration-300`}>
            CareerBuddy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-1'>
          <Link
            href='#features'
            className='relative px-4 py-2.5 text-[15px] font-medium text-[#334155] hover:text-[#2dcbc5] transition-all duration-300 rounded-lg group'>
            Features
            <span className='absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full'></span>
          </Link>
          <Link
            href='#use-cases'
            className='relative px-4 py-2.5 text-[15px] font-medium text-[#334155] hover:text-[#2dcbc5] transition-all duration-300 rounded-lg group'>
            Use Cases
            <span className='absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full'></span>
          </Link>
          <Link
            href='#pricing'
            className='relative px-4 py-2.5 text-[15px] font-medium text-[#334155] hover:text-[#2dcbc5] transition-all duration-300 rounded-lg group'>
            Pricing
            <span className='absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full'></span>
          </Link>
          <Link
            href='#testimonials'
            className='relative px-4 py-2.5 text-[15px] font-medium text-[#334155] hover:text-[#2dcbc5] transition-all duration-300 rounded-lg group'>
            Testimonials
            <span className='absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full'></span>
          </Link>
        </div>

        <div className='hidden md:flex items-center space-x-3'>
          <Button
            variant='ghost'
            className='font-medium text-[15px] text-[#334155] hover:text-[#2dcbc5] hover:bg-[#2dcbc5]/5 transition-all duration-300 rounded-lg'>
            Log in
          </Button>
          <Button className='bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] hover:from-[#2ab7ca] hover:to-[#2dcbc5] text-white font-semibold text-[15px] px-6 py-2.5 rounded-lg shadow-lg shadow-[#2dcbc5]/30 hover:shadow-xl hover:shadow-[#2dcbc5]/40 transition-all duration-300 hover:scale-105'>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-[#334155] transition-colors duration-300'
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-slate-200 py-4'>
          <div className='container mx-auto px-4 flex flex-col space-y-4'>
            <Link
              href='#features'
              className='text-slate-700 hover:text-blue-600 transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}>
              Features
            </Link>
            <Link
              href='#use-cases'
              className='text-slate-700 hover:text-blue-600 transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}>
              Use Cases
            </Link>
            <Link
              href='#pricing'
              className='text-slate-700 hover:text-blue-600 transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link
              href='#testimonials'
              className='text-slate-700 hover:text-blue-600 transition-colors py-2'
              onClick={() => setIsMenuOpen(false)}>
              Testimonials
            </Link>
            <div className='flex flex-col space-y-2 pt-2 border-t border-slate-200'>
              <Button
                variant='outline'
                className='w-full border-slate-300'>
                Log in
              </Button>
              <Button className='w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white'>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

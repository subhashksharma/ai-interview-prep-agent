'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link
          href='/'
          className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] rounded-md flex items-center justify-center'>
            <span className='text-white font-bold'>C</span>
          </div>
          <span className='text-xl font-bold bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] bg-clip-text text-transparent'>
            CareerBuddy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-8'>
          <Link
            href='#features'
            className='text-slate-700 hover:text-[#2dcbc5] transition-colors'>
            Features
          </Link>
          <Link
            href='#use-cases'
            className='text-slate-700 hover:text-[#2dcbc5] transition-colors'>
            Use Cases
          </Link>
          <Link
            href='#pricing'
            className='text-slate-700 hover:text-[#2dcbc5] transition-colors'>
            Pricing
          </Link>
          <Link
            href='#testimonials'
            className='text-slate-700 hover:text-[#2dcbc5] transition-colors'>
            Testimonials
          </Link>
        </div>

        <div className='hidden md:flex items-center space-x-4'>
          <Button variant='ghost'>Log in</Button>
          <Button className='bg-[#2dcbc5] hover:bg-[#2ab7ca] text-white'>Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-slate-700'
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

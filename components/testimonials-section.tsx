'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'CareerBuddy helped me land my dream PM role. The mock interviews felt real and the feedback was incredibly detailed — I felt prepared walking into every round.',
      author: 'Priya Sharma',
      title: 'Product Manager',
      company: 'TechStartup',
      avatar: './images/avatar/avatar-1.jpg',
    },
    {
      quote:
        "After being laid off, I felt overwhelmed. CareerBuddy's structured approach helped me organize my job search and the tailored resume bullets made a huge difference.",
      author: 'James Mitchell',
      title: 'Senior Engineer',
      company: 'CloudScale',
      avatar: './images/avatar/avatar-2.jpg',
    },
    {
      quote:
        'Switching from marketing to product felt impossible until CareerBuddy mapped my transferable skills and gave me a clear prep plan. Got offers from 3 companies!',
      author: 'Maria Garcia',
      title: 'Associate PM',
      company: 'FinanceApp',
      avatar: './images/avatar/avatar-3.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id='testimonials'
      className='min-h-screen flex items-center py-20 md:py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>What Our Customers Say</h2>
            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
              Discover how businesses are achieving remarkable results with our agentic AI platform.
            </p>
          </motion.div>
        </div>

        <div className='relative max-w-4xl mx-auto'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200'>
            <div className='absolute -top-6 left-8 text-[#2dcbc5]'>
              <Quote
                size={48}
                className='opacity-30'
              />
            </div>
            <div className='relative z-10'>
              <p className='text-xl md:text-2xl text-slate-800 mb-8 italic'>
                "{testimonials[currentIndex].quote}"
              </p>
              <div className='flex items-center'>
                <div className='mr-4'>
                  <img
                    src={testimonials[currentIndex].avatar || '/placeholder.svg'}
                    alt={testimonials[currentIndex].author}
                    className='w-16 h-16 rounded-full object-cover border-2 border-[#2dcbc5]/30'
                  />
                </div>
                <div>
                  <h4 className='font-bold text-lg'>{testimonials[currentIndex].author}</h4>
                  <p className='text-slate-600'>{testimonials[currentIndex].title}</p>
                  <p className='text-[#2dcbc5]'>{testimonials[currentIndex].company}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className='flex justify-center mt-8 gap-4'>
            <button
              onClick={prevTestimonial}
              className='p-2 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors'
              aria-label='Previous testimonial'>
              <ChevronLeft size={24} />
            </button>
            <div className='flex items-center gap-2'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-[#2dcbc5]' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className='p-2 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors'
              aria-label='Next testimonial'>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

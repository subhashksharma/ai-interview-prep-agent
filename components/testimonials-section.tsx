'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

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
      className='min-h-screen flex items-center py-20 md:py-24 bg-gradient-to-b from-blue-50/30 via-purple-50/20 to-white relative overflow-hidden'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className='inline-flex items-center justify-center p-2 mb-6 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10'>
              <Sparkles className='w-8 h-8 text-purple-500' />
            </div>
            <h2 className='text-section-heading bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent'>
              What Our Customers Say
            </h2>
            <p className='text-body-large max-w-2xl mx-auto'>
              Discover how professionals are achieving remarkable results with CareerBuddy.
            </p>
          </motion.div>
        </div>

        <div className='relative max-w-4xl mx-auto'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className='bg-gradient-to-br from-white to-purple-50/20 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-purple-200 hover:border-purple-400/50 transition-all duration-300'>
            <div className='absolute -top-6 left-8'>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl'>
                <Quote
                  size={32}
                  className='text-white'
                />
              </div>
            </div>
            <div className='relative z-10 mt-4'>
              <p className='text-xl md:text-2xl text-slate-800 mb-8 leading-relaxed font-medium'>
                "{testimonials[currentIndex].quote}"
              </p>
              <div className='flex items-center'>
                <div className='mr-5'>
                  <div className='relative'>
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50'></div>
                    <img
                      src={testimonials[currentIndex].avatar || '/placeholder.svg'}
                      alt={testimonials[currentIndex].author}
                      className='relative w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl'
                    />
                  </div>
                </div>
                <div>
                  <h4 className='font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className='text-slate-700 font-medium'>{testimonials[currentIndex].title}</p>
                  <p className='text-purple-600 font-semibold'>
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className='flex justify-center mt-10 gap-4'>
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/25 hover:shadow-2xl transition-all duration-300'
              aria-label='Previous testimonial'>
              <ChevronLeft size={24} />
            </motion.button>
            <div className='flex items-center gap-3'>
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8 shadow-lg'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/25 hover:shadow-2xl transition-all duration-300'
              aria-label='Next testimonial'>
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

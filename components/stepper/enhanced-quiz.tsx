'use client';

import { motion } from 'framer-motion';
import { Zap, ArrowRight, Target, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EnhancedQuizProps {
  onStartAssessment: () => void;
}

export default function EnhancedQuiz({ onStartAssessment }: EnhancedQuizProps) {
  return (
    <motion.div
      key='enhanced-quiz'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='max-w-4xl mx-auto px-4'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-8'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className='inline-flex items-center justify-center p-3 mb-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-xl shadow-amber-500/30'>
          <Sparkles className='w-8 h-8 text-white' />
        </motion.div>
        <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent'>
          Intelligent Assessment System
        </h2>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Practice without judgment. Learn at your own pace. Get personalized feedback powered by
          AI.
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2 }}
        className='bg-gradient-to-br from-white to-amber-50/30 rounded-3xl p-8 md:p-10 shadow-2xl border border-amber-100'>
        {/* Features Grid */}
        <div className='grid md:grid-cols-3 gap-4 mb-8'>
          {[
            {
              icon: Target,
              title: 'Topic-Based',
              description: 'Choose from curated topics',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: Brain,
              title: 'Custom Assessment',
              description: 'Create your own path',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: Zap,
              title: 'AI-Powered',
              description: 'Instant personalized feedback',
              color: 'from-amber-500 to-orange-500',
            },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}>
                <Card className='p-5 bg-white/80 backdrop-blur border-2 border-transparent hover:border-amber-200 transition-all duration-300 h-full'>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='font-bold text-slate-900 mb-1'>{feature.title}</h3>
                  <p className='text-sm text-slate-500'>{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className='grid grid-cols-3 gap-4 mb-8'>
          {[
            { value: 'Unlimited', label: 'Questions' },
            { value: 'Adaptive', label: 'Difficulty' },
            { value: '100%', label: 'Judgment-Free' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className='p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 text-center'>
              <div className='text-xl font-bold text-amber-600'>{stat.value}</div>
              <div className='text-xs text-amber-500/70 font-medium uppercase tracking-wide'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}>
          <Button
            onClick={onStartAssessment}
            size='lg'
            className='w-full py-6 text-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-white rounded-xl shadow-xl shadow-amber-500/30 font-semibold'>
            Start Your Assessment Journey
            <ArrowRight
              className='ml-2'
              size={20}
            />
          </Button>
        </motion.div>

        {/* Encouragement Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100'>
          <p className='text-sm text-center text-slate-600'>
            💡 <strong>Remember:</strong> This is your safe space to learn and grow. Take your time,
            make mistakes, and celebrate every step forward!
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

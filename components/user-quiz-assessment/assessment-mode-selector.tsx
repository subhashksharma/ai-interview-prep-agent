'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Edit3, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AssessmentMode } from './types';

interface AssessmentModeSelectorProps {
  onSelectMode: (mode: AssessmentMode) => void;
}

export function AssessmentModeSelector({ onSelectMode }: AssessmentModeSelectorProps) {
  const [hoveredMode, setHoveredMode] = React.useState<AssessmentMode>(null);

  const modes = [
    {
      id: 'topic-based' as const,
      title: 'Topic-Based Assessment',
      description: 'Choose from curated topics tailored to your career goals',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Pre-designed question sets',
        'Difficulty progression',
        'Industry-standard topics',
        'Instant recommendations',
      ],
    },
    {
      id: 'custom' as const,
      title: 'Custom Assessment',
      description: 'Create your own personalized assessment journey',
      icon: Edit3,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Your specific topics',
        'AI-generated questions',
        'Flexible difficulty',
        'Tailored to your needs',
      ],
    },
  ];

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-8'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-12'>
        <div className='inline-flex items-center justify-center p-2 mb-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10'>
          <Sparkles className='w-6 h-6 text-blue-500' />
        </div>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Start Your Assessment Journey
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Practice without judgment. Learn at your pace. Grow with confidence.
          <br />
          Choose how you'd like to begin your interview preparation today.
        </p>
      </motion.div>

      {/* Mode Selection Cards */}
      <div className='grid md:grid-cols-2 gap-6 mb-8'>
        {modes.map((mode, index) => {
          const Icon = mode.icon;
          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredMode(mode.id)}
              onHoverEnd={() => setHoveredMode(null)}>
              <Card
                className={`relative overflow-hidden border-2 transition-all duration-300 cursor-pointer h-full ${
                  hoveredMode === mode.id
                    ? 'border-primary shadow-2xl scale-105'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onSelectMode(mode.id)}>
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    mode.color
                  } opacity-0 transition-opacity duration-300 ${
                    hoveredMode === mode.id ? 'opacity-10' : ''
                  }`}
                />

                <CardHeader className='relative'>
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${mode.color} mb-4`}>
                    <Icon className='w-7 h-7 text-white' />
                  </div>
                  <CardTitle className='text-2xl'>{mode.title}</CardTitle>
                  <CardDescription className='text-base'>{mode.description}</CardDescription>
                </CardHeader>

                <CardContent className='relative space-y-4'>
                  {/* Features */}
                  <div className='space-y-2'>
                    {mode.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: hoveredMode === mode.id ? idx * 0.05 : 0 }}
                        className='flex items-center gap-2 text-sm'>
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${mode.color}`}
                        />
                        <span className='text-muted-foreground'>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full mt-4 bg-gradient-to-r ${mode.color} hover:opacity-90 transition-opacity`}
                    size='lg'
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMode(mode.id);
                    }}>
                    <Zap className='w-4 h-4 mr-2' />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Encouragement Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className='text-center p-6 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-border'>
        <p className='text-sm text-muted-foreground'>
          💡 <strong>Remember:</strong> This is a judgment-free zone. Take your time, learn from
          each question, and celebrate every step of progress. You've got this!
        </p>
      </motion.div>
    </div>
  );
}

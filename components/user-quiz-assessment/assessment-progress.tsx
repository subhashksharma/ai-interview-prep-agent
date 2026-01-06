'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, Award, Sparkles, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
  elapsedTime: number;
  confidenceLevels: {
    low: number;
    medium: number;
    high: number;
  };
}

export function AssessmentProgress({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  elapsedTime,
  confidenceLevels,
}: AssessmentProgressProps) {
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const encouragementMessages = [
    "You're making excellent progress! 🌟",
    'Keep up the great work! 💪',
    "You're crushing it! 🚀",
    'Fantastic effort so far! ✨',
    "You're doing amazing! 🎯",
  ];

  const randomEncouragement =
    encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];

  return (
    <div className='w-full'>
      <Card className='border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-sm'>
        <CardContent className='p-4 sm:p-6 space-y-4 sm:space-y-6'>
          {/* Main Progress */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Target className='w-4 h-4 text-primary' />
                <span className='text-sm font-medium'>Overall Progress</span>
              </div>
              <span className='text-sm font-bold'>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress
              value={progressPercentage}
              className='h-3'
            />
            <p className='text-xs text-muted-foreground'>
              {answeredQuestions} of {totalQuestions} questions answered
            </p>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 gap-3'>
            {/* Current Question */}
            <div className='p-3 rounded-lg bg-background/50 border'>
              <div className='flex items-center gap-2 mb-1'>
                <div className='w-2 h-2 rounded-full bg-blue-500 animate-pulse' />
                <span className='text-xs text-muted-foreground'>Current</span>
              </div>
              <p className='text-lg font-bold'>#{currentQuestion}</p>
            </div>

            {/* Time Elapsed */}
            <div className='p-3 rounded-lg bg-background/50 border'>
              <div className='flex items-center gap-2 mb-1'>
                <Clock className='w-3 h-3 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>Time</span>
              </div>
              <p className='text-lg font-bold'>{formatTime(elapsedTime)}</p>
            </div>
          </div>

          {/* Confidence Distribution */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <TrendingUp className='w-4 h-4 text-primary' />
              <span className='text-sm font-medium'>Your Confidence</span>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Badge
                  variant='secondary'
                  className='w-20 justify-center text-xs'>
                  High
                </Badge>
                <Progress
                  value={(confidenceLevels.high / answeredQuestions) * 100}
                  className='flex-1 h-2'
                />
                <span className='text-xs font-medium w-8 text-right'>{confidenceLevels.high}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Badge
                  variant='secondary'
                  className='w-20 justify-center text-xs'>
                  Medium
                </Badge>
                <Progress
                  value={(confidenceLevels.medium / answeredQuestions) * 100}
                  className='flex-1 h-2'
                />
                <span className='text-xs font-medium w-8 text-right'>
                  {confidenceLevels.medium}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Badge
                  variant='secondary'
                  className='w-20 justify-center text-xs'>
                  Low
                </Badge>
                <Progress
                  value={(confidenceLevels.low / answeredQuestions) * 100}
                  className='flex-1 h-2'
                />
                <span className='text-xs font-medium w-8 text-right'>{confidenceLevels.low}</span>
              </div>
            </div>
          </div>

          {/* Encouragement */}
          <motion.div
            key={answeredQuestions}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20'>
            <div className='flex items-start gap-2'>
              <Heart className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
              <div>
                <p className='text-sm font-medium text-foreground mb-1'>{randomEncouragement}</p>
                <p className='text-xs text-muted-foreground'>
                  Every question brings you closer to your goals. Keep the momentum going!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Milestone Badges */}
          {answeredQuestions >= totalQuestions / 2 && answeredQuestions < totalQuestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20'>
              <Award className='w-4 h-4 text-purple-500' />
              <p className='text-sm font-medium'>Halfway there! Amazing work! 🎉</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

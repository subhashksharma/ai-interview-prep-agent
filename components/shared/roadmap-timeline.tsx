'use client';

import { motion } from 'framer-motion';
import { Check, Clock, BookOpen, Target, ArrowRight } from 'lucide-react';
import type { RoadmapStep } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RoadmapStepCardProps {
  step: RoadmapStep;
  index: number;
  isLast?: boolean;
  onStepClick?: (step: RoadmapStep) => void;
}

export function RoadmapStepCard({
  step,
  index,
  isLast = false,
  onStepClick,
}: RoadmapStepCardProps) {
  const statusConfig = {
    completed: {
      icon: Check,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      lineColor: 'bg-emerald-300',
    },
    current: {
      icon: Target,
      color: 'bg-[#2dcbc5]',
      textColor: 'text-[#2dcbc5]',
      bgColor: 'bg-[#2dcbc5]/5',
      borderColor: 'border-[#2dcbc5]/30',
      lineColor: 'bg-[#2dcbc5]/50',
    },
    pending: {
      icon: Clock,
      color: 'bg-slate-300',
      textColor: 'text-slate-500',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      lineColor: 'bg-slate-200',
    },
  };

  const config = statusConfig[step.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className='relative flex gap-4 sm:gap-6'>
      {/* Timeline */}
      <div className='flex flex-col items-center'>
        {/* Node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
          className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center shadow-lg z-10`}>
          <StatusIcon
            size={20}
            className='text-white'
          />
        </motion.div>

        {/* Connecting Line */}
        {!isLast && <div className={`w-0.5 flex-1 ${config.lineColor} mt-3`} />}
      </div>

      {/* Content Card */}
      <Card
        className={`flex-1 mb-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${config.bgColor} ${config.borderColor} border`}
        onClick={() => onStepClick?.(step)}>
        <CardHeader className='pb-3'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-1'>
                <Badge
                  variant='outline'
                  className={`text-xs ${config.textColor} ${config.borderColor}`}>
                  Step {index + 1}
                </Badge>
                {step.status === 'current' && (
                  <Badge className='bg-[#2dcbc5] text-white text-xs animate-pulse'>
                    In Progress
                  </Badge>
                )}
              </div>
              <CardTitle className='text-lg font-bold text-slate-900'>{step.title}</CardTitle>
            </div>
            <div className='flex items-center gap-1.5 text-sm text-slate-500 bg-white/50 px-3 py-1.5 rounded-full'>
              <Clock size={14} />
              <span>{step.duration}</span>
            </div>
          </div>
          <CardDescription className='text-slate-600 mt-2'>{step.description}</CardDescription>
        </CardHeader>

        <CardContent className='pt-0 space-y-4'>
          {/* Skills */}
          <div className='flex flex-wrap gap-2'>
            {step.skills.map((skill, idx) => (
              <Badge
                key={idx}
                variant='secondary'
                className='bg-white/80 text-slate-700 text-xs'>
                {skill}
              </Badge>
            ))}
          </div>

          {/* Milestones */}
          {step.milestones && step.milestones.length > 0 && (
            <div className='space-y-2'>
              <p className='text-sm font-medium text-slate-700 flex items-center gap-2'>
                <Target
                  size={14}
                  className={config.textColor}
                />
                Key Milestones
              </p>
              <ul className='space-y-1.5'>
                {step.milestones.slice(0, 3).map((milestone, idx) => (
                  <li
                    key={idx}
                    className='flex items-start gap-2 text-sm text-slate-600'>
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${config.color} mt-1.5 flex-shrink-0`}
                    />
                    {milestone}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Full Roadmap Timeline Component
interface RoadmapTimelineProps {
  steps: RoadmapStep[];
  onStepClick?: (step: RoadmapStep) => void;
  title?: string;
  description?: string;
}

export function RoadmapTimeline({ steps, onStepClick, title, description }: RoadmapTimelineProps) {
  const completedSteps = steps.filter((s) => s.status === 'completed').length;
  const progress = steps.length > 0 ? (completedSteps / steps.length) * 100 : 0;

  return (
    <div className='w-full'>
      {/* Header */}
      {(title || description) && (
        <div className='mb-8 text-center'>
          {title && <h3 className='text-2xl font-bold text-slate-900 mb-2'>{title}</h3>}
          {description && <p className='text-slate-600'>{description}</p>}

          {/* Progress Summary */}
          <div className='flex items-center justify-center gap-6 mt-4 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-emerald-500' />
              <span className='text-slate-600'>Completed: {completedSteps}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-[#2dcbc5]' />
              <span className='text-slate-600'>
                Current: {steps.filter((s) => s.status === 'current').length}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-slate-300' />
              <span className='text-slate-600'>
                Pending: {steps.filter((s) => s.status === 'pending').length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className='max-w-3xl mx-auto'>
        {steps.map((step, index) => (
          <RoadmapStepCard
            key={step.id}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            onStepClick={onStepClick}
          />
        ))}
      </div>
    </div>
  );
}

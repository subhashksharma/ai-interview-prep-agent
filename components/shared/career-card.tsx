'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, DollarSign, Briefcase } from 'lucide-react';
import type { CareerPath } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CareerCardProps {
  career: CareerPath;
  rank?: number;
  onSelect?: (career: CareerPath) => void;
  variant?: 'compact' | 'detailed';
  showMatchScore?: boolean;
  className?: string;
}

export function CareerCard({
  career,
  rank,
  onSelect,
  variant = 'detailed',
  showMatchScore = true,
  className = '',
}: CareerCardProps) {
  const isCompact = variant === 'compact';

  const demandColors = {
    'Very High': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    High: 'bg-blue-100 text-blue-700 border-blue-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={className}>
      <Card
        className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 border-slate-200/80 ${
          isCompact ? 'p-4' : ''
        }`}
        onClick={() => onSelect?.(career)}>
        {/* Match Score Badge */}
        {showMatchScore && (
          <div className='absolute top-3 right-3 z-10'>
            <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2dcbc5]/10 to-emerald-500/10 border border-[#2dcbc5]/20'>
              <TrendingUp
                size={14}
                className='text-[#2dcbc5]'
              />
              <span className='text-sm font-bold text-[#2dcbc5]'>{career.matchScore}%</span>
            </div>
          </div>
        )}

        {/* Rank Badge */}
        {rank !== undefined && (
          <div className='absolute top-3 left-3 z-10'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[#2dcbc5] to-emerald-500 flex items-center justify-center shadow-lg'>
              <span className='text-white font-bold text-sm'>{rank}</span>
            </div>
          </div>
        )}

        <CardHeader className={rank !== undefined ? 'pt-14' : ''}>
          <div className='flex items-start gap-4'>
            {/* Icon */}
            <div className='flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-2xl shadow-sm border border-slate-200/50'>
              {career.icon}
            </div>

            <div className='flex-1 min-w-0'>
              <CardTitle className='text-xl font-bold text-slate-900 mb-1'>
                {career.title}
              </CardTitle>
              <CardDescription className='text-slate-600 line-clamp-2'>
                {career.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* Match Progress */}
          {showMatchScore && !isCompact && (
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-slate-500'>Match Score</span>
                <span className='font-semibold text-[#2dcbc5]'>{career.matchScore}%</span>
              </div>
              <Progress
                value={career.matchScore}
                className='h-2'
              />
            </div>
          )}

          {/* Skills */}
          <div className='flex flex-wrap gap-2'>
            {career.skills.slice(0, isCompact ? 3 : 5).map((skill, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs'>
                {skill}
              </Badge>
            ))}
            {career.skills.length > (isCompact ? 3 : 5) && (
              <Badge
                variant='secondary'
                className='bg-slate-100 text-slate-500 text-xs'>
                +{career.skills.length - (isCompact ? 3 : 5)} more
              </Badge>
            )}
          </div>

          {/* Meta Info */}
          {!isCompact && (
            <div className='flex items-center gap-4 pt-2 border-t border-slate-100'>
              <div className='flex items-center gap-1.5 text-sm text-slate-600'>
                <DollarSign
                  size={14}
                  className='text-emerald-500'
                />
                <span>{career.salary}</span>
              </div>
              <Badge
                variant='outline'
                className={`text-xs ${demandColors[career.demand]}`}>
                <Briefcase
                  size={12}
                  className='mr-1'
                />
                {career.demand} Demand
              </Badge>
            </div>
          )}

          {/* Action Button */}
          {onSelect && !isCompact && (
            <Button
              variant='ghost'
              className='w-full group mt-2 text-[#2dcbc5] hover:text-[#2dcbc5] hover:bg-[#2dcbc5]/10'
              onClick={(e) => {
                e.stopPropagation();
                onSelect(career);
              }}>
              View Roadmap
              <ArrowRight
                size={16}
                className='ml-2 transition-transform group-hover:translate-x-1'
              />
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Grid component for multiple career cards
interface CareerCardsGridProps {
  careers: CareerPath[];
  onSelect?: (career: CareerPath) => void;
  variant?: 'compact' | 'detailed';
  showRank?: boolean;
  columns?: 1 | 2 | 3;
}

export function CareerCardsGrid({
  careers,
  onSelect,
  variant = 'detailed',
  showRank = true,
  columns = 2,
}: CareerCardsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {careers.map((career, index) => (
        <CareerCard
          key={career.id}
          career={career}
          rank={showRank ? index + 1 : undefined}
          onSelect={onSelect}
          variant={variant}
        />
      ))}
    </div>
  );
}

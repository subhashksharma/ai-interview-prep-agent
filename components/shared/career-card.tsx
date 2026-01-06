'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Briefcase, DollarSign, Zap } from 'lucide-react';
import type { CareerPath } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CareerCardProps {
  career: CareerPath;
  status?: 'recommended' | 'trending' | 'new' | null;
  onSelect?: (career: CareerPath) => void;
  className?: string;
}

export function CareerCard({ career, status = null, onSelect, className = '' }: CareerCardProps) {
  // Determine the label based on demand
  const getLabelConfig = () => {
    if (career.demand === 'Very High') {
      return { label: 'Live', bgColor: 'bg-green-100', textColor: 'text-green-700' };
    } else if (career.demand === 'High') {
      return { label: 'On Demand', bgColor: 'bg-blue-100', textColor: 'text-blue-700' };
    } else {
      return { label: 'Useful', bgColor: 'bg-purple-100', textColor: 'text-purple-700' };
    }
  };

  // Determine confidence level based on match score
  const getConfidenceLevel = () => {
    const score = career.matchScore || 0;
    if (score >= 90)
      return { text: 'Very High Confidence', color: 'bg-green-600 hover:bg-green-700' };
    if (score >= 80) return { text: 'High Confidence', color: 'bg-blue-600 hover:bg-blue-700' };
    if (score >= 70) return { text: 'Good Confidence', color: 'bg-[#2dcbc5] hover:bg-[#2ab7ca]' };
    return { text: 'Moderate Confidence', color: 'bg-slate-600 hover:bg-slate-700' };
  };

  const labelConfig = getLabelConfig();
  const confidenceConfig = getConfidenceLevel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}>
      <Card className='h-full hover:border-primary transition-all duration-300 hover:shadow-lg group'>
        <CardHeader>
          {/* Top Row: Label and Match Score */}
          <div className='flex items-center justify-between mb-3'>
            <Badge
              variant='secondary'
              className={`${labelConfig.bgColor} ${labelConfig.textColor} border-0 font-medium`}>
              {labelConfig.label}
            </Badge>
            {career.matchScore && (
              <div className='flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2dcbc5]/10'>
                <TrendingUp className='w-3.5 h-3.5 text-[#2dcbc5]' />
                <span className='text-sm font-bold text-[#2dcbc5]'>{career.matchScore}%</span>
              </div>
            )}
          </div>

          {/* Role Name */}
          <CardTitle className='text-lg group-hover:text-primary transition-colors mb-2'>
            {career.title}
          </CardTitle>

          {/* Description */}
          <CardDescription className='line-clamp-3'>{career.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {/* Demand and Salary */}
            <div className='flex items-center gap-3 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Briefcase className='w-4 h-4' />
                <span>{career.demand} Demand</span>
              </div>
              {career.salary && (
                <div className='flex items-center gap-1'>
                  <DollarSign className='w-4 h-4' />
                  <span>{career.salary}</span>
                </div>
              )}
            </div>

            {/* Skills Tags */}
            <div className='flex flex-wrap gap-1'>
              {career.skills.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant='secondary'
                  className='text-xs'>
                  {skill}
                </Badge>
              ))}
              {career.skills.length > 3 && (
                <Badge
                  variant='secondary'
                  className='text-xs'>
                  +{career.skills.length - 3}
                </Badge>
              )}
            </div>

            {/* Confidence Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(career);
              }}
              className={`w-full mt-2 py-2.5 px-4 rounded-md text-white transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 ${confidenceConfig.color}`}>
              View Career Plan • {confidenceConfig.text}
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Grid component for displaying multiple career cards
interface CareerCardsGridProps {
  careers: CareerPath[];
  onSelect?: (career: CareerPath) => void;
  columns?: 1 | 2 | 3;
}

export function CareerCardsGrid({ careers, onSelect, columns = 3 }: CareerCardsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3 sm:gap-4`}>
      {careers.map((career, index) => (
        <CareerCard
          key={career.id}
          career={career}
          status={index === 0 ? 'recommended' : null}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Clock, CheckCircle2 } from 'lucide-react';
import type { AssessmentSession } from '@/components/user-quiz-assessment/types';

interface AssessmentResultsProps {
  session: AssessmentSession;
}

export default function AssessmentResults({ session }: AssessmentResultsProps) {
  const { topic, customInput, questions, answers } = session;

  const topicDisplay = topic?.name || customInput?.topic || 'Assessment';
  const difficulty = topic ? 'intermediate' : customInput?.difficulty || 'intermediate';
  const totalQuestions = questions.length;
  const answeredQuestions = answers.length;

  // Calculate performance metrics
  const highConfidenceCount = answers.filter((a) => a.confidence === 'high').length;
  const mediumConfidenceCount = answers.filter((a) => a.confidence === 'medium').length;
  const lowConfidenceCount = answers.filter((a) => a.confidence === 'low').length;

  const performanceScore =
    answeredQuestions > 0
      ? Math.round((highConfidenceCount * 100 + mediumConfidenceCount * 60) / answeredQuestions)
      : 0;

  const confidenceDistribution = {
    high: highConfidenceCount,
    medium: mediumConfidenceCount,
    low: lowConfidenceCount,
  };

  // Calculate total time spent
  const totalTimeMinutes = Math.floor(
    answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / 60
  );

  // Generate strengths and improvements based on performance
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (highConfidenceCount >= answeredQuestions * 0.5) {
    strengths.push('Strong confidence in core concepts');
  }
  if (highConfidenceCount + mediumConfidenceCount >= answeredQuestions * 0.7) {
    strengths.push('Good overall understanding of the topic');
  }
  if (customInput?.specificAreas && customInput.specificAreas.length > 0) {
    strengths.push(`Focused expertise in ${customInput.specificAreas.slice(0, 2).join(', ')}`);
  }
  if (difficulty === 'advanced' || difficulty === 'expert') {
    strengths.push('Tackling advanced-level challenges');
  }

  if (lowConfidenceCount > answeredQuestions * 0.3) {
    improvements.push('Review fundamental concepts to build stronger foundations');
  }
  if (mediumConfidenceCount > answeredQuestions * 0.5) {
    improvements.push('Practice more challenging problems to boost confidence');
  }
  if (performanceScore < 60) {
    improvements.push('Consider revisiting the basics and taking more time with each concept');
  }

  // Add default values if empty
  if (strengths.length === 0) {
    strengths.push('Completed the full assessment');
    strengths.push('Willingness to learn and improve');
  }
  if (improvements.length === 0) {
    improvements.push('Keep practicing to maintain your skills');
    improvements.push('Explore advanced topics to expand your knowledge');
  }

  const summary = `You completed a ${difficulty}-level assessment on ${topicDisplay} with ${answeredQuestions} questions. Your performance shows ${
    performanceScore >= 70 ? 'strong' : performanceScore >= 50 ? 'good' : 'developing'
  } understanding. ${
    highConfidenceCount > lowConfidenceCount
      ? 'You demonstrated confidence in most areas.'
      : 'Focus on building confidence through more practice.'
  } Keep learning and growing!`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='text-center mb-6 sm:mb-8'>
        <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-3 sm:mb-4'>
          <Award
            size={14}
            className='text-emerald-600 sm:w-4 sm:h-4'
          />
          <span className='text-xs sm:text-sm font-semibold text-emerald-700'>
            Assessment Complete!
          </span>
        </div>
        <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 px-4'>
          Your {topicDisplay} Results
        </h3>
        <p className='text-sm sm:text-base text-slate-600 px-4'>
          Based on your performance, here's what we learned about your skills
        </p>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className='bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-lg shadow-emerald-100/50'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex-1'>
            <p className='text-xs sm:text-sm font-medium text-emerald-700 mb-1'>
              Overall Performance
            </p>
            <h4 className='text-3xl sm:text-4xl font-bold text-emerald-600'>
              {performanceScore}
              <span className='text-xl sm:text-2xl text-emerald-500'>/100</span>
            </h4>
            <p className='text-xs sm:text-sm text-slate-600 mt-2'>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Assessment
            </p>
          </div>
          <div className='relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0'>
            <svg className='w-full h-full transform -rotate-90'>
              <circle
                cx='48'
                cy='48'
                r='40'
                stroke='currentColor'
                strokeWidth='8'
                fill='none'
                className='text-emerald-200'
              />
              <motion.circle
                cx='48'
                cy='48'
                r='40'
                stroke='currentColor'
                strokeWidth='8'
                fill='none'
                strokeLinecap='round'
                className='text-emerald-500'
                initial={{ strokeDashoffset: 251.2 }}
                animate={{
                  strokeDashoffset: 251.2 - (251.2 * performanceScore) / 100,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  strokeDasharray: '251.2',
                }}
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center'>
              <TrendingUp
                size={28}
                className='text-emerald-600 sm:w-8 sm:h-8'
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
        <div className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm'>
          <div className='flex items-center gap-2 mb-2'>
            <CheckCircle2
              size={16}
              className='text-blue-500'
            />
            <p className='text-xs font-medium text-slate-500'>Questions</p>
          </div>
          <p className='text-xl sm:text-2xl font-bold text-slate-900'>
            {answeredQuestions}/{totalQuestions}
          </p>
        </div>

        <div className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm'>
          <div className='flex items-center gap-2 mb-2'>
            <Clock
              size={16}
              className='text-amber-500'
            />
            <p className='text-xs font-medium text-slate-500'>Duration</p>
          </div>
          <p className='text-xl sm:text-2xl font-bold text-slate-900'>{totalTimeMinutes}m</p>
        </div>

        <div className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm'>
          <div className='flex items-center gap-2 mb-2'>
            <Target
              size={16}
              className='text-emerald-500'
            />
            <p className='text-xs font-medium text-slate-500'>High Confidence</p>
          </div>
          <p className='text-xl sm:text-2xl font-bold text-slate-900'>
            {confidenceDistribution.high}
          </p>
        </div>

        <div className='bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm'>
          <div className='flex items-center gap-2 mb-2'>
            <Award
              size={16}
              className='text-violet-500'
            />
            <p className='text-xs font-medium text-slate-500'>Strengths</p>
          </div>
          <p className='text-xl sm:text-2xl font-bold text-slate-900'>{strengths.length}</p>
        </div>
      </motion.div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm'>
          <h4 className='text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2'>
            <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 flex items-center justify-center'>
              <TrendingUp
                size={16}
                className='text-emerald-600'
              />
            </div>
            Your Strengths
          </h4>
          <div className='flex flex-wrap gap-2'>
            {strengths.map((strength: string, index: number) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className='px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-medium text-emerald-700'>
                {strength}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Areas for Improvement */}
      {improvements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm'>
          <h4 className='text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2'>
            <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-100 flex items-center justify-center'>
              <Target
                size={16}
                className='text-amber-600'
              />
            </div>
            Growth Opportunities
          </h4>
          <div className='space-y-3'>
            {improvements.map((improvement: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className='flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl'>
                <div className='w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-xs font-bold text-amber-700'>{index + 1}</span>
                </div>
                <p className='text-sm text-slate-700 leading-relaxed'>{improvement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Summary */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200'>
          <h4 className='text-base sm:text-lg font-bold text-slate-900 mb-3'>Assessment Summary</h4>
          <p className='text-sm sm:text-base text-slate-700 leading-relaxed'>{summary}</p>
        </motion.div>
      )}

      {/* Next Steps Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className='text-center py-4 sm:py-6'>
        <p className='text-sm sm:text-base text-slate-600 mb-2'>
          Based on your assessment, we've curated personalized career paths for you
        </p>
        <p className='text-sm text-slate-500'>Scroll down to explore your matches 👇</p>
      </motion.div>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  Check,
  CircleDot,
  SquareCheck,
  PenLine,
  FileText,
  Puzzle,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface QuickGeneralQuestionsProps {
  onComplete: (answers: Record<number, string>) => void;
  onExit: () => void;
}

type QuestionType = 'single' | 'multi' | 'input' | 'textarea' | 'blank';

type QuestionOption = {
  value: string;
  label: string;
  description?: string;
  icon?: string;
};

type TemplateSegment =
  | { type: 'text'; content: string }
  | { type: 'blank'; id: string; placeholder: string; width?: 'xs' | 'sm' | 'md' | 'lg' };

interface QuickQuestion {
  id: number;
  title: string;
  helper?: string;
  type: QuestionType;
  required?: boolean;
  options?: QuestionOption[];
  placeholder?: string;
  maxSelections?: number;
  template?: TemplateSegment[];
}

type AnswerValue = string | string[] | Record<string, string>;

const blankWidthClass: Record<'xs' | 'sm' | 'md' | 'lg', string> = {
  xs: 'w-16 sm:w-20',
  sm: 'w-24 sm:w-32',
  md: 'w-36 sm:w-48',
  lg: 'w-48 sm:w-64',
};

const quickQuestions: QuickQuestion[] = [
  {
    id: 1,
    type: 'single',
    title: 'Where are you in your career journey today?',
    helper: 'Choose the statement that matches your current situation.',
    required: true,
    options: [
      {
        value: 'exploring',
        label: 'Exploring what is possible',
        description: 'Researching paths for quick clarity',
        icon: '🔭',
      },
      {
        value: 'upskilling',
        label: 'Leveling up in my role',
        description: 'Sharpening skills to grow faster',
        icon: '📈',
      },
      {
        value: 'transitioning',
        label: 'Preparing for a transition',
        description: 'Moving into a new role or industry',
        icon: '🚀',
      },
      {
        value: 'job-search',
        label: 'Actively interviewing',
        description: 'Landing offers with confidence',
        icon: '🎯',
      },
    ],
  },
  {
    id: 2,
    type: 'multi',
    title: 'Which skill areas do you want to focus on?',
    helper: 'Pick up to three to personalize your momentum plan.',
    required: true,
    maxSelections: 3,
    options: [
      {
        value: 'frontend-experience',
        label: 'Frontend Experience',
        description: 'UI, animations, design systems',
        icon: '🎨',
      },
      {
        value: 'product-strategy',
        label: 'Product Strategy',
        description: 'Discovery, roadmaps, insights',
        icon: '💡',
      },
      {
        value: 'systems-thinking',
        label: 'Systems Thinking',
        description: 'Architecture, scalability',
        icon: '⚙️',
      },
      {
        value: 'data-storytelling',
        label: 'Data Storytelling',
        description: 'Dashboards, metrics',
        icon: '📊',
      },
      {
        value: 'leadership',
        label: 'Leadership & Influence',
        description: 'Alignment, coaching',
        icon: '👑',
      },
      {
        value: 'ai-integration',
        label: 'AI Integration',
        description: 'Automation, prompts',
        icon: '🤖',
      },
    ],
  },
  {
    id: 3,
    type: 'input',
    title: 'What impact do you want to make this year?',
    helper: 'Describe your main career goal in one sentence.',
    required: true,
    placeholder: 'e.g. Launch AI features that improve retention by 15%',
  },
  {
    id: 4,
    type: 'textarea',
    title: 'Any context we should keep in mind?',
    helper: 'Optional — share time constraints, preferred industries, etc.',
    required: false,
    placeholder: 'Details that help us tailor recommendations...',
  },
  {
    id: 5,
    type: 'blank',
    title: 'Complete your goal statement',
    helper: 'Fill in the blanks to pace your roadmap precisely.',
    required: true,
    template: [
      { type: 'text', content: 'I want to become a' },
      { type: 'blank', id: 'role', placeholder: 'Staff PM', width: 'md' },
      { type: 'text', content: 'in' },
      { type: 'blank', id: 'timeline', placeholder: '12', width: 'xs' },
      { type: 'text', content: 'months, dedicating' },
      { type: 'blank', id: 'hours', placeholder: '10', width: 'xs' },
      { type: 'text', content: 'hours/week.' },
    ],
  },
];

function getTypeIcon(type: QuestionType) {
  switch (type) {
    case 'single':
      return CircleDot;
    case 'multi':
      return SquareCheck;
    case 'input':
      return PenLine;
    case 'textarea':
      return FileText;
    case 'blank':
      return Puzzle;
    default:
      return CircleDot;
  }
}

function isPlainObjectValue(value: AnswerValue | undefined): value is Record<string, string> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isQuestionFilled(question: QuickQuestion, answers: Record<number, AnswerValue>): boolean {
  const value = answers[question.id];

  if (question.type === 'multi') {
    if (!Array.isArray(value)) return false;
    return value.some((entry) => entry.trim().length > 0);
  }

  if (question.type === 'blank') {
    if (!isPlainObjectValue(value)) return false;
    const blanks = question.template?.filter((segment) => segment.type === 'blank') ?? [];
    return blanks.every((segment) => value[segment.id]?.trim().length);
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  return false;
}

function normalizeAnswers(answers: Record<number, AnswerValue>): Record<number, string> {
  const result: Record<number, string> = {};

  quickQuestions.forEach((question) => {
    const value = answers[question.id];

    if (typeof value === 'string') {
      result[question.id] = value.trim();
      return;
    }

    if (Array.isArray(value)) {
      result[question.id] = value
        .map((entry) => entry.trim())
        .filter(Boolean)
        .join('|');
      return;
    }

    if (isPlainObjectValue(value)) {
      const blanks = question.template?.filter((segment) => segment.type === 'blank') ?? [];
      const ordered = blanks.map((segment) => (value[segment.id] ?? '').trim()).filter(Boolean);
      result[question.id] = ordered.join('|');
      return;
    }

    result[question.id] = '';
  });

  return result;
}

// Import the new interface
import { QuickAssessmentInterface } from './quick-assessment-interface';

// Simple questions for quick assessment that match the deep assessment style
const quickAssessmentQuestions = [
  {
    id: 1,
    text: "What type of work environment do you thrive in?",
    options: [
      "Fast-paced startup with lots of autonomy",
      "Structured corporate environment with clear processes", 
      "Remote-first with flexible schedule",
      "Collaborative team setting with regular interaction"
    ]
  },
  {
    id: 2,
    text: "Which describes your ideal role responsibilities?",
    options: [
      "Building and coding technical solutions",
      "Managing projects and coordinating teams",
      "Analyzing data and creating insights", 
      "Designing user experiences and interfaces"
    ]
  }
];

export default function QuickGeneralQuestions({ onComplete, onExit }: QuickGeneralQuestionsProps) {
  return (
    <QuickAssessmentInterface
      questions={quickAssessmentQuestions}
      onComplete={onComplete}
      onExit={onExit}
    />
  );
}

  const handleSingleSelect = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleMultiToggle = (question: QuickQuestion, value: string) => {
    setAnswers((prev) => {
      const current = prev[question.id];
      const selection = Array.isArray(current) ? current : [];
      const isSelected = selection.includes(value);
      let nextSelection = isSelected
        ? selection.filter((item) => item !== value)
        : [...selection, value];

      if (!isSelected && question.maxSelections && nextSelection.length > question.maxSelections) {
        nextSelection = selection;
      }

      return { ...prev, [question.id]: nextSelection };
    });
  };

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleBlankChange = (questionId: number, fieldId: string, value: string) => {
    setAnswers((prev) => {
      const current = prev[questionId];
      const blanks = isPlainObjectValue(current) ? current : {};
      return { ...prev, [questionId]: { ...blanks, [fieldId]: value } };
    });
  };

  const handleReset = () => {
    setAnswers({});
    setShowValidation(false);
  };

  const handleSubmit = () => {
    if (!allRequiredAnswered) {
      setShowValidation(true);
      return;
    }
    const normalized = normalizeAnswers(answers);
    onComplete(normalized);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='relative w-full min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      {/* Subtle background decorations */}
      <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-[#2dcbc5]/5 rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl' />
      </div>

      <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-10'>
          <div className='flex items-start justify-between gap-4 mb-8'>
            <div className='space-y-4'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2dcbc5]/15 to-blue-500/10 border border-[#2dcbc5]/20'>
                <Sparkles className='w-4 h-4 text-[#2dcbc5]' />
                <span className='text-sm font-semibold text-[#2dcbc5]'>Quick Discovery</span>
                <span className='text-xs text-slate-400'>• 2 min</span>
              </motion.div>

              <h1 className='text-3xl sm:text-4xl font-bold text-slate-900 leading-tight'>
                Let&apos;s understand your{' '}
                <span className='bg-gradient-to-r from-[#2dcbc5] to-blue-500 bg-clip-text text-transparent'>
                  career goals
                </span>
              </h1>
              <p className='text-slate-500 text-lg max-w-xl'>
                Answer a few quick questions so we can craft your personalized roadmap.
              </p>
            </div>

            <Button
              variant='ghost'
              size='sm'
              onClick={onExit}
              className='shrink-0 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100'>
              <ArrowLeft
                size={18}
                className='mr-1.5'
              />
              Exit
            </Button>
          </div>

          {/* Progress bar */}
          <div className='space-y-3'>
            <div className='relative h-2.5 bg-slate-100 rounded-full overflow-hidden'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='absolute inset-y-0 left-0 bg-gradient-to-r from-[#2dcbc5] via-[#2ab7ca] to-blue-500 rounded-full'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer' />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {quickQuestions.map((q, idx) => {
                  const isFilled = isQuestionFilled(q, answers);
                  return (
                    <motion.div
                      key={q.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isFilled
                          ? 'bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] text-white shadow-lg shadow-[#2dcbc5]/30'
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                      {isFilled ? <Check size={14} /> : idx + 1}
                    </motion.div>
                  );
                })}
              </div>
              <span className='text-sm font-medium text-slate-500'>
                {requiredCompleted} of {requiredQuestions.length} required
              </span>
            </div>
          </div>
        </motion.header>

        {/* Questions */}
        <div className='space-y-6'>
          {quickQuestions.map((question, index) => {
            const answerValue = answers[question.id];
            const isFilled = isQuestionFilled(question, answers);
            const isError = showValidation && question.required !== false && !isFilled;
            const selectedCount = Array.isArray(answerValue) ? answerValue.length : 0;
            const TypeIcon = getTypeIcon(question.type);

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className={`group relative ${isError ? 'animate-shake' : ''}`}>
                {/* Card */}
                <div
                  className={`relative overflow-hidden rounded-3xl bg-white border transition-all duration-300 shadow-xl ${
                    isFilled
                      ? 'border-[#2dcbc5]/30 shadow-[#2dcbc5]/10'
                      : isError
                      ? 'border-rose-300 shadow-rose-100'
                      : 'border-slate-100 shadow-slate-200/50 hover:border-slate-300/80 hover:shadow-xl'
                  }`}>
                  {/* Completion indicator line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
                      isFilled ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca]' : 'bg-transparent'
                    }`}
                  />

                  <div className='p-6 sm:p-8 md:p-10 lg:p-12'>
                    {/* Question header */}
                    <div className='flex items-start gap-4 mb-5'>
                      <div
                        className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isFilled
                            ? 'bg-gradient-to-br from-[#2dcbc5] to-[#2ab7ca] text-white shadow-lg shadow-[#2dcbc5]/25'
                            : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200/80'
                        }`}>
                        {isFilled ? (
                          <Check
                            size={20}
                            strokeWidth={2.5}
                          />
                        ) : (
                          <TypeIcon size={20} />
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-3 mb-1'>
                          <h3 className='text-lg sm:text-xl font-semibold text-slate-900 leading-snug'>
                            {question.title}
                          </h3>
                          <span
                            className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                              question.required !== false
                                ? 'bg-[#2dcbc5]/10 text-[#2dcbc5]'
                                : 'bg-slate-100 text-slate-400'
                            }`}>
                            {question.required !== false ? 'Required' : 'Optional'}
                          </span>
                        </div>
                        {question.helper && (
                          <p className='text-sm text-slate-500'>
                            {question.helper}
                            {question.type === 'multi' && question.maxSelections && (
                              <span className='ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-xs font-medium text-slate-500'>
                                {selectedCount}/{question.maxSelections}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Question content */}
                    <div className='space-y-4'>
                      {/* Single choice */}
                      {question.type === 'single' && question.options && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                          {question.options.map((option) => {
                            const isSelected =
                              typeof answerValue === 'string' && answerValue === option.value;
                            return (
                              <motion.button
                                key={option.value}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleSingleSelect(question.id, option.value)}
                                className={`relative flex items-center gap-3 p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-[#2dcbc5]/5 to-[#2ab7ca]/5 border-2 border-[#2dcbc5]/40 shadow-md shadow-[#2dcbc5]/10'
                                    : 'bg-slate-50/80 border-2 border-transparent hover:bg-gradient-to-r hover:from-[#2dcbc5]/5 hover:to-[#2ab7ca]/5 hover:border-[#2dcbc5]/40'
                                }`}>
                                {option.icon && (
                                  <span className='text-xl shrink-0'>{option.icon}</span>
                                )}
                                <div className='flex-1 min-w-0'>
                                  <p
                                    className={`font-semibold text-sm ${
                                      isSelected ? 'text-slate-900' : 'text-slate-700'
                                    }`}>
                                    {option.label}
                                  </p>
                                  {option.description && (
                                    <p className='text-xs text-slate-400 mt-0.5 truncate'>
                                      {option.description}
                                    </p>
                                  )}
                                </div>
                                <div
                                  className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'border-[#2dcbc5] bg-[#2dcbc5]'
                                      : 'border-slate-300'
                                  }`}>
                                  {isSelected && (
                                    <Check
                                      size={12}
                                      className='text-white'
                                    />
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      )}

                      {/* Multi choice */}
                      {question.type === 'multi' && question.options && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5'>
                          {question.options.map((option) => {
                            const selectedValues = Array.isArray(answerValue) ? answerValue : [];
                            const isSelected = selectedValues.includes(option.value);
                            const isDisabled =
                              !isSelected &&
                              question.maxSelections !== undefined &&
                              selectedValues.length >= question.maxSelections;

                            return (
                              <motion.button
                                key={option.value}
                                whileHover={!isDisabled ? { scale: 1.02 } : {}}
                                whileTap={!isDisabled ? { scale: 0.98 } : {}}
                                onClick={() =>
                                  !isDisabled && handleMultiToggle(question, option.value)
                                }
                                disabled={isDisabled}
                                className={`relative flex items-center gap-3 p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-[#2dcbc5]/5 to-[#2ab7ca]/5 border-2 border-[#2dcbc5]/40 shadow-md shadow-[#2dcbc5]/10'
                                    : isDisabled
                                    ? 'bg-slate-50/50 border-2 border-transparent opacity-50 cursor-not-allowed'
                                    : 'bg-slate-50/80 border-2 border-transparent hover:bg-gradient-to-r hover:from-[#2dcbc5]/5 hover:to-[#2ab7ca]/5 hover:border-[#2dcbc5]/40'
                                }`}>
                                {option.icon && (
                                  <span className='text-lg shrink-0'>{option.icon}</span>
                                )}
                                <div className='flex-1 min-w-0'>
                                  <p
                                    className={`font-semibold text-sm ${
                                      isSelected ? 'text-slate-900' : 'text-slate-700'
                                    }`}>
                                    {option.label}
                                  </p>
                                  {option.description && (
                                    <p className='text-[11px] text-slate-400 mt-0.5 truncate'>
                                      {option.description}
                                    </p>
                                  )}
                                </div>
                                <div
                                  className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'border-[#2dcbc5] bg-[#2dcbc5]'
                                      : 'border-slate-300'
                                  }`}>
                                  {isSelected && (
                                    <Check
                                      size={12}
                                      className='text-white'
                                    />
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      )}

                      {/* Text input */}
                      {question.type === 'input' && (
                        <Input
                          value={typeof answerValue === 'string' ? answerValue : ''}
                          onChange={(e) => handleInputChange(question.id, e.target.value)}
                          placeholder={question.placeholder}
                          className='h-12 rounded-xl border-slate-200 bg-slate-50/80 text-base placeholder:text-slate-400 focus:bg-white focus:border-[#2dcbc5] focus:ring-2 focus:ring-[#2dcbc5]/20 transition-all'
                        />
                      )}

                      {/* Textarea */}
                      {question.type === 'textarea' && (
                        <Textarea
                          value={typeof answerValue === 'string' ? answerValue : ''}
                          onChange={(e) => handleInputChange(question.id, e.target.value)}
                          placeholder={question.placeholder}
                          rows={3}
                          className='rounded-xl border-slate-200 bg-slate-50/80 text-base placeholder:text-slate-400 focus:bg-white focus:border-[#2dcbc5] focus:ring-2 focus:ring-[#2dcbc5]/20 transition-all resize-none'
                        />
                      )}

                      {/* Fill in the blank */}
                      {question.type === 'blank' && question.template && (
                        <div className='flex flex-wrap items-center gap-2 p-4 rounded-xl bg-slate-50/80 border border-slate-200/60'>
                          {question.template.map((segment, segmentIndex) => {
                            if (segment.type === 'text') {
                              return (
                                <span
                                  key={`${question.id}-text-${segmentIndex}`}
                                  className='text-slate-600 font-medium'>
                                  {segment.content}
                                </span>
                              );
                            }

                            const blanks = isPlainObjectValue(answerValue) ? answerValue : {};
                            const widthClass = segment.width
                              ? blankWidthClass[segment.width]
                              : 'w-36';

                            return (
                              <Input
                                key={`${question.id}-${segment.id}`}
                                value={blanks[segment.id] ?? ''}
                                onChange={(e) =>
                                  handleBlankChange(question.id, segment.id, e.target.value)
                                }
                                placeholder={segment.placeholder}
                                className={`h-9 px-3 rounded-lg border-slate-200 border-dashed bg-white text-sm font-medium placeholder:text-slate-400 focus:border-[#2dcbc5] focus:ring-1 focus:ring-[#2dcbc5]/20 transition-all ${widthClass}`}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {isError && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className='mt-4 text-sm font-medium text-rose-500 flex items-center gap-2'>
                          <span className='w-1.5 h-1.5 rounded-full bg-rose-500' />
                          Please complete this question
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='mt-10 pt-6 border-t border-slate-200/60'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-2 text-sm text-slate-500'>
              <div className='w-2 h-2 rounded-full bg-[#2dcbc5] animate-pulse' />
              <span>
                {allRequiredAnswered
                  ? 'All set! Ready to see your matches.'
                  : `${requiredQuestions.length - requiredCompleted} required ${
                      requiredQuestions.length - requiredCompleted === 1 ? 'answer' : 'answers'
                    } remaining`}
              </span>
            </div>

            <div className='flex items-center gap-3'>
              <Button
                variant='ghost'
                onClick={handleReset}
                className='rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100'>
                <RotateCcw
                  size={16}
                  className='mr-2'
                />
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!allRequiredAnswered}
                className={`rounded-xl px-6 py-2.5 font-semibold transition-all duration-300 ${
                  allRequiredAnswered
                    ? 'bg-gradient-to-r from-[#2dcbc5] to-[#2ab7ca] text-white shadow-lg shadow-[#2dcbc5]/30 hover:shadow-xl hover:shadow-[#2dcbc5]/40 hover:scale-[1.02]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}>
                View My Matches
                <ChevronRight
                  size={18}
                  className='ml-1'
                />
              </Button>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.section>
  );
}

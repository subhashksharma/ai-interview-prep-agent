'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Timer,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Code2,
  FileText,
  ListChecks,
  Brain,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Question, Answer } from './types';

interface QuestionInterfaceProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  previousAnswer?: Answer;
}

export function QuestionInterface({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  onPrevious,
  onFinish,
  isFirstQuestion,
  isLastQuestion,
  previousAnswer,
}: QuestionInterfaceProps) {
  const [answer, setAnswer] = React.useState(previousAnswer?.answer || '');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(
    Array.isArray(previousAnswer?.answer) ? previousAnswer.answer : []
  );
  const [fillInBlanks, setFillInBlanks] = React.useState<string[]>(
    Array.isArray(previousAnswer?.answer) ? previousAnswer.answer : []
  );
  const [confidence, setConfidence] = React.useState<'low' | 'medium' | 'high'>(
    previousAnswer?.confidence || 'medium'
  );
  const [showHints, setShowHints] = React.useState(false);
  const [startTime] = React.useState(Date.now());
  const [elapsedTime, setElapsedTime] = React.useState(0);

  // Initialize blanks array for fill-in-blanks questions
  React.useEffect(() => {
    if (question.type === 'fill-in-blanks' && question.blanksCount) {
      setFillInBlanks(Array(question.blanksCount).fill(''));
    }
  }, [question.type, question.blanksCount]);

  // Timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleBlankChange = (index: number, value: string) => {
    const newBlanks = [...fillInBlanks];
    newBlanks[index] = value;
    setFillInBlanks(newBlanks);
  };

  const getAnswerValue = () => {
    if (question.type === 'multiple-choice') {
      return selectedOptions;
    } else if (question.type === 'fill-in-blanks') {
      return fillInBlanks;
    } else {
      return answer;
    }
  };

  const isAnswerValid = () => {
    if (question.type === 'multiple-choice') {
      return selectedOptions.length > 0;
    } else if (question.type === 'fill-in-blanks') {
      return fillInBlanks.every((blank) => blank.trim().length > 0);
    } else if (typeof answer === 'string') {
      return answer.trim().length > 0;
    }
    return false;
  };

  const handleSubmitAnswer = () => {
    if (!isAnswerValid()) return;

    const answerData: Answer = {
      questionId: question.id,
      answer: getAnswerValue(),
      timeSpent: elapsedTime,
      confidence,
      timestamp: new Date(),
    };

    onAnswer(answerData);
  };

  const handleNextQuestion = () => {
    handleSubmitAnswer();
    onNext();
  };

  const handleFinishAssessment = () => {
    handleSubmitAnswer();
    onFinish();
  };

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  const questionTypeIcons = {
    'single-choice': ListChecks,
    'multiple-choice': CheckCircle2,
    'fill-in-blanks': FileText,
    coding: Code2,
    writing: FileText,
    'case-study': Brain,
  };

  const questionTypeLabels = {
    'single-choice': 'Single Choice',
    'multiple-choice': 'Multiple Choice',
    'fill-in-blanks': 'Fill in Blanks',
    coding: 'Coding',
    writing: 'Writing',
    'case-study': 'Case Study',
  };

  const QuestionIcon = questionTypeIcons[question.type] || FileText;

  const difficultyColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-blue-500',
    advanced: 'bg-purple-500',
    expert: 'bg-orange-500',
  };

  return (
    <div className='w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}>
          {/* Progress Header */}
          <div className='mb-4 sm:mb-6'>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center gap-2 sm:gap-3 flex-wrap'>
                <Badge
                  variant='outline'
                  className='text-xs sm:text-sm'>
                  Question {questionNumber} of {totalQuestions}
                </Badge>
                <Badge
                  variant='secondary'
                  className='text-xs sm:text-sm'>
                  <QuestionIcon className='w-3 h-3 mr-1' />
                  {questionTypeLabels[question.type]}
                </Badge>
                <div className={`w-2 h-2 rounded-full ${difficultyColors[question.difficulty]}`} />
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Timer className='w-4 h-4' />
                <span className='text-sm font-medium'>{formatTime(elapsedTime)}</span>
              </div>
            </div>
            <Progress
              value={progressPercentage}
              className='h-2'
            />
          </div>

          {/* Question Card */}
          <Card className='mb-4 sm:mb-6'>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <CardTitle className='text-lg sm:text-xl lg:text-2xl mb-2'>
                    {question.question}
                  </CardTitle>
                  <CardDescription className='flex items-center gap-2 flex-wrap'>
                    <Badge
                      variant='secondary'
                      className='text-xs'>
                      {question.category}
                    </Badge>
                    <span className='text-xs'>
                      Estimated time: ~{Math.floor(question.timeEstimate / 60)} min
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className='space-y-4'>
              {/* Case Study Text */}
              {question.type === 'case-study' && question.caseStudyText && (
                <div className='p-4 sm:p-6 bg-muted/50 rounded-lg border-2 border-muted-foreground/20 mb-4'>
                  <div className='flex items-center gap-2 mb-3'>
                    <FileText className='w-4 h-4 text-blue-500' />
                    <span className='text-sm font-semibold text-muted-foreground'>Case Study</span>
                  </div>
                  <div className='prose prose-sm max-w-none text-foreground whitespace-pre-wrap'>
                    {question.caseStudyText}
                  </div>
                </div>
              )}

              {/* Single Choice (Radio) */}
              {question.type === 'single-choice' && question.options && (
                <RadioGroup
                  value={typeof answer === 'string' ? answer : ''}
                  onValueChange={setAnswer}>
                  <div className='space-y-3'>
                    {question.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}>
                        <Label
                          htmlFor={`option-${index}`}
                          className='flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors'>
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}`}
                          />
                          <span className='flex-1'>{option}</span>
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Multiple Choice (Checkboxes) */}
              {question.type === 'multiple-choice' && question.options && (
                <div className='space-y-3'>
                  <div className='text-sm text-muted-foreground mb-2'>Select all that apply:</div>
                  {question.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}>
                      <Label
                        htmlFor={`checkbox-${index}`}
                        className='flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors'>
                        <Checkbox
                          id={`checkbox-${index}`}
                          checked={selectedOptions.includes(option)}
                          onCheckedChange={() => handleToggleOption(option)}
                        />
                        <span className='flex-1'>{option}</span>
                      </Label>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Fill in the Blanks */}
              {question.type === 'fill-in-blanks' && fillInBlanks.length > 0 && (
                <div className='space-y-4'>
                  <div className='text-sm text-muted-foreground mb-3'>
                    Fill in the blanks below:
                  </div>
                  {fillInBlanks.map((blank, index) => (
                    <div
                      key={index}
                      className='space-y-2'>
                      <Label
                        htmlFor={`blank-${index}`}
                        className='text-sm font-medium'>
                        Blank #{index + 1}
                      </Label>
                      <Input
                        id={`blank-${index}`}
                        placeholder={`Enter answer for blank ${index + 1}...`}
                        value={blank}
                        onChange={(e) => handleBlankChange(index, e.target.value)}
                        className='text-base'
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Text Input for Writing/Coding/Case Study */}
              {(question.type === 'writing' ||
                question.type === 'coding' ||
                question.type === 'case-study') && (
                <div className='space-y-2'>
                  <Label htmlFor='answer'>Your Answer</Label>
                  <Textarea
                    id='answer'
                    placeholder={
                      question.type === 'coding'
                        ? 'Write your code here...'
                        : question.type === 'case-study'
                        ? 'Analyze the case study and provide your answer...'
                        : 'Type your answer here... Take your time and explain your thinking.'
                    }
                    value={typeof answer === 'string' ? answer : ''}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={question.type === 'coding' ? 12 : 8}
                    className={`font-${question.type === 'coding' ? 'mono' : 'sans'} resize-none`}
                  />
                  <p className='text-xs text-muted-foreground'>
                    💡 Don't worry about being perfect. Focus on demonstrating your understanding
                    and thought process.
                  </p>
                </div>
              )}

              {/* Confidence Level */}
              <div className='space-y-3 pt-4 border-t'>
                <Label className='text-sm font-medium'>
                  How confident are you with this answer?
                </Label>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                  {[
                    { level: 'low' as const, label: 'Need Practice', emoji: '🤔' },
                    { level: 'medium' as const, label: 'Somewhat Sure', emoji: '💭' },
                    { level: 'high' as const, label: 'Very Confident', emoji: '✨' },
                  ].map((conf) => (
                    <Button
                      key={conf.level}
                      variant={confidence === conf.level ? 'default' : 'outline'}
                      className='flex items-center justify-center gap-2'
                      onClick={() => setConfidence(conf.level)}>
                      <span>{conf.emoji}</span>
                      <span className='text-sm'>{conf.label}</span>
                    </Button>
                  ))}
                </div>
                <p className='text-xs text-muted-foreground'>
                  This helps us understand your learning progress. Be honest - there's no judgment
                  here!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hints Card (Collapsible) */}
          {question.hints && question.hints.length > 0 && (
            <Card className='mb-6 border-blue-500/20 bg-blue-500/5'>
              <CardHeader className='pb-3'>
                <Button
                  variant='ghost'
                  className='w-full flex items-center justify-between p-0 h-auto hover:bg-transparent'
                  onClick={() => setShowHints(!showHints)}>
                  <div className='flex items-center gap-2'>
                    <Lightbulb className='w-4 h-4 text-blue-500' />
                    <span className='font-medium'>Need a hint?</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${showHints ? 'rotate-90' : ''}`}
                  />
                </Button>
              </CardHeader>
              <AnimatePresence>
                {showHints && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}>
                    <CardContent className='pt-0 space-y-2'>
                      {question.hints.map((hint, index) => (
                        <div
                          key={index}
                          className='flex items-start gap-2 text-sm'>
                          <Sparkles className='w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5' />
                          <p className='text-muted-foreground'>{hint}</p>
                        </div>
                      ))}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          )}

          {/* Encouragement Card */}
          <Card className='mb-6 border-green-500/20 bg-green-500/5'>
            <CardContent className='pt-6'>
              <div className='flex gap-3'>
                <CheckCircle2 className='w-5 h-5 text-green-500 flex-shrink-0' />
                <div className='space-y-1 text-sm'>
                  <p className='font-medium text-foreground'>You're doing great! 🌟</p>
                  <p className='text-muted-foreground'>
                    Remember: This is practice. Every answer, whether right or learning opportunity,
                    helps you grow. Focus on understanding, not perfection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4'>
            <Button
              variant='outline'
              onClick={onPrevious}
              disabled={isFirstQuestion}
              size='lg'
              className='w-full sm:w-auto'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Previous
            </Button>

            <div className='flex gap-2 sm:gap-3'>
              {!isLastQuestion ? (
                <Button
                  onClick={handleNextQuestion}
                  disabled={!isAnswerValid()}
                  size='lg'
                  className='flex-1 sm:flex-none'>
                  <span className='hidden sm:inline'>Next Question</span>
                  <span className='sm:hidden'>Next</span>
                  <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              ) : (
                <Button
                  onClick={handleFinishAssessment}
                  disabled={!isAnswerValid()}
                  size='lg'
                  className='flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90'>
                  <Send className='w-4 h-4 mr-2' />
                  <span className='hidden sm:inline'>Finish Assessment</span>
                  <span className='sm:hidden'>Finish</span>
                </Button>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className='mt-4 sm:mt-6 text-center'>
            <p className='text-sm text-muted-foreground'>
              {totalQuestions - questionNumber} question
              {totalQuestions - questionNumber !== 1 ? 's' : ''} remaining
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

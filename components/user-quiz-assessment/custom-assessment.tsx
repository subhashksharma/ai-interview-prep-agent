'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Plus, Minus, Lightbulb, ArrowRight, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { CustomAssessmentInput, DifficultyLevel } from './types';

interface CustomAssessmentProps {
  onStartCustomAssessment: (input: CustomAssessmentInput) => void;
  onBack: () => void;
}

export function CustomAssessment({ onStartCustomAssessment, onBack }: CustomAssessmentProps) {
  const [topic, setTopic] = React.useState('');
  const [specificAreas, setSpecificAreas] = React.useState<string[]>([]);
  const [currentArea, setCurrentArea] = React.useState('');
  const [difficulty, setDifficulty] = React.useState<DifficultyLevel>('intermediate');
  const [duration, setDuration] = React.useState(30);
  const [questionCount, setQuestionCount] = React.useState(15);
  const [additionalContext, setAdditionalContext] = React.useState('');

  const difficulties: { level: DifficultyLevel; label: string; color: string }[] = [
    { level: 'beginner', label: 'Beginner', color: 'bg-green-500' },
    { level: 'intermediate', label: 'Intermediate', color: 'bg-blue-500' },
    { level: 'advanced', label: 'Advanced', color: 'bg-purple-500' },
    { level: 'expert', label: 'Expert', color: 'bg-orange-500' },
  ];

  const suggestedTopics = [
    'React Performance Optimization',
    'GraphQL API Design',
    'Microservices Architecture',
    'Cloud Security Best Practices',
    'Leadership & Team Management',
    'Product Strategy',
  ];

  const handleAddArea = () => {
    if (currentArea.trim() && !specificAreas.includes(currentArea.trim())) {
      setSpecificAreas([...specificAreas, currentArea.trim()]);
      setCurrentArea('');
    }
  };

  const handleRemoveArea = (area: string) => {
    setSpecificAreas(specificAreas.filter((a) => a !== area));
  };

  const handleSubmit = () => {
    if (!topic.trim()) return;

    const input: CustomAssessmentInput = {
      topic: topic.trim(),
      specificAreas: specificAreas.length > 0 ? specificAreas : undefined,
      difficulty,
      duration,
      questionCount,
      additionalContext: additionalContext.trim() || undefined,
    };

    onStartCustomAssessment(input);
  };

  const isValid = topic.trim().length > 0;

  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-8'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className='mb-8'>
          <Button
            variant='ghost'
            onClick={onBack}
            className='mb-4'>
            ← Back to Mode Selection
          </Button>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500'>
              <Wand2 className='w-5 h-5 text-white' />
            </div>
            <h2 className='text-3xl font-bold'>Create Your Custom Assessment</h2>
          </div>
          <p className='text-muted-foreground'>
            Tell us what you want to practice, and our AI will create a personalized assessment just
            for you.
          </p>
        </div>

        <div className='space-y-6'>
          {/* Main Topic */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>What topic would you like to practice?</CardTitle>
              <CardDescription>
                Be as specific or broad as you like. Our AI adapts to your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Input
                  placeholder='e.g., React Hooks, System Design, AWS Services, Leadership Skills...'
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className='text-lg'
                />
              </div>

              {/* Suggested Topics */}
              <div>
                <Label className='text-xs text-muted-foreground mb-2 block'>
                  Quick suggestions:
                </Label>
                <div className='flex flex-wrap gap-2'>
                  {suggestedTopics.map((suggested) => (
                    <Badge
                      key={suggested}
                      variant='outline'
                      className='cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors'
                      onClick={() => setTopic(suggested)}>
                      {suggested}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specific Areas (Optional) */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                Specific Areas to Focus On
                <Badge
                  variant='secondary'
                  className='text-xs'>
                  Optional
                </Badge>
              </CardTitle>
              <CardDescription>
                Add specific subtopics or skills you want to be tested on
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex gap-2'>
                <Input
                  placeholder='e.g., useState, useEffect, custom hooks...'
                  value={currentArea}
                  onChange={(e) => setCurrentArea(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddArea()}
                />
                <Button
                  onClick={handleAddArea}
                  size='icon'
                  variant='secondary'>
                  <Plus className='w-4 h-4' />
                </Button>
              </div>

              {specificAreas.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {specificAreas.map((area) => (
                    <Badge
                      key={area}
                      variant='default'
                      className='pl-3 pr-1 py-1'>
                      {area}
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-5 w-5 p-0 ml-1'
                        onClick={() => handleRemoveArea(area)}>
                        <Minus className='w-3 h-3' />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Difficulty & Settings */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Assessment Settings</CardTitle>
              <CardDescription>
                Customize the difficulty and length of your assessment
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Difficulty Selection */}
              <div className='space-y-3'>
                <Label>Difficulty Level</Label>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                  {difficulties.map((diff) => (
                    <Button
                      key={diff.level}
                      variant={difficulty === diff.level ? 'default' : 'outline'}
                      className='relative'
                      onClick={() => setDifficulty(diff.level)}>
                      <div className={`absolute left-2 w-2 h-2 rounded-full ${diff.color}`} />
                      <span className='ml-2'>{diff.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Duration Slider */}
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label>Duration</Label>
                  <span className='text-sm font-medium'>{duration} minutes</span>
                </div>
                <Slider
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  min={10}
                  max={90}
                  step={5}
                  className='w-full'
                />
                <p className='text-xs text-muted-foreground'>
                  Recommended: 30-45 minutes for focused practice
                </p>
              </div>

              {/* Question Count */}
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label>Number of Questions</Label>
                  <span className='text-sm font-medium'>{questionCount} questions</span>
                </div>
                <Slider
                  value={[questionCount]}
                  onValueChange={(value) => setQuestionCount(value[0])}
                  min={5}
                  max={50}
                  step={5}
                  className='w-full'
                />
                <p className='text-xs text-muted-foreground'>
                  More questions = broader coverage, Fewer questions = deeper focus
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Context (Optional) */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                Additional Context
                <Badge
                  variant='secondary'
                  className='text-xs'>
                  Optional
                </Badge>
              </CardTitle>
              <CardDescription>
                Share any specific goals, experience level, or context to help us tailor your
                assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., I'm preparing for a senior frontend role at a startup. I have 3 years of React experience but want to improve my performance optimization skills..."
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                rows={4}
                className='resize-none'
              />
            </CardContent>
          </Card>

          {/* Tips Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}>
            <Card className='border-blue-500/20 bg-blue-500/5'>
              <CardContent className='pt-6'>
                <div className='flex gap-3'>
                  <Lightbulb className='w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5' />
                  <div className='space-y-2 text-sm text-muted-foreground'>
                    <p className='font-medium text-foreground'>Tips for best results:</p>
                    <ul className='space-y-1 list-disc list-inside'>
                      <li>Be specific about what you want to learn or practice</li>
                      <li>Choose a difficulty that challenges you without overwhelming</li>
                      <li>Start with shorter sessions if you're new to the topic</li>
                      <li>Add context to get more relevant, personalized questions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <Button
            size='lg'
            className='w-full'
            onClick={handleSubmit}
            disabled={!isValid}>
            <Wand2 className='w-4 h-4 mr-2' />
            Generate My Assessment
            <ArrowRight className='w-4 h-4 ml-2' />
          </Button>

          {/* Encouragement */}
          <div className='text-center p-4 rounded-lg bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-border'>
            <p className='text-sm text-muted-foreground'>
              ✨ Our AI is ready to create a unique assessment tailored just for you. Take your
              time, and remember: every question is an opportunity to learn!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

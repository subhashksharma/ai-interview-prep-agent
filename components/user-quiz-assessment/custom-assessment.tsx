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
  const [roles, setRoles] = React.useState<string[]>([]);
  const [currentRole, setCurrentRole] = React.useState('');
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
    'Product Manager',
    'Backend Developer',
    'Data Analyst',
    'Security Engineer',
    'Engineering Manager',
    'Business Analyst',
  ];

  const suggestedTechnologies = [
    'React',
    'Python',
    'AWS',
    'Docker',
    'SQL',
    'Agile',
    'Leadership',
    'Communication',
  ];

  const handleAddRole = () => {
    if (currentRole.trim() && !roles.includes(currentRole.trim())) {
      setRoles([...roles, currentRole.trim()]);
      setCurrentRole('');
    }
  };

  const handleRemoveRole = (role: string) => {
    setRoles(roles.filter((r) => r !== role));
  };

  const handleAddSuggestedRole = (role: string) => {
    if (!roles.includes(role)) {
      setRoles([...roles, role]);
    }
  };

  const handleAddArea = () => {
    if (currentArea.trim() && !specificAreas.includes(currentArea.trim())) {
      setSpecificAreas([...specificAreas, currentArea.trim()]);
      setCurrentArea('');
    }
  };

  const handleAddSuggestedTech = (tech: string) => {
    if (!specificAreas.includes(tech)) {
      setSpecificAreas([...specificAreas, tech]);
    }
  };

  const handleRemoveArea = (area: string) => {
    setSpecificAreas(specificAreas.filter((a) => a !== area));
  };

  const handleSubmit = () => {
    if (roles.length === 0) return;

    const input: CustomAssessmentInput = {
      topic: roles.join(', '),
      specificAreas: specificAreas.length > 0 ? specificAreas : undefined,
      difficulty,
      duration,
      questionCount,
      additionalContext: additionalContext.trim() || undefined,
    };

    onStartCustomAssessment(input);
  };

  const isValid = roles.length > 0;

  return (
    <div className='w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className='mb-6 sm:mb-8'>
          <Button
            variant='ghost'
            onClick={onBack}
            className='mb-3 sm:mb-4'>
            ← Back to Mode Selection
          </Button>
          <div className='flex items-center gap-2 sm:gap-3 mb-2'>
            <div className='p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500'>
              <Wand2 className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
            </div>
            <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold'>
              Create Your Custom Role Assessment
            </h2>
          </div>
          <p className='text-sm sm:text-base text-muted-foreground'>
            Define your target role and the areas you want to focus on. Our AI will create a
            tailored assessment covering the skills, technologies, and responsibilities for your
            role.
          </p>
        </div>

        <div className='space-y-4 sm:space-y-6'>
          {/* Main Topic - Multiple Roles */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>What roles are you targeting?</CardTitle>
              <CardDescription>
                Add one or more roles you want to prepare for (e.g., Product Manager, DevOps
                Engineer)
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Selected Roles */}
              {roles.length > 0 && (
                <div className='flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20'>
                  {roles.map((role) => (
                    <Badge
                      key={role}
                      variant='default'
                      className='pl-3 pr-1 py-1.5 text-sm'>
                      {role}
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-4 w-4 p-0 ml-2 hover:bg-transparent'
                        onClick={() => handleRemoveRole(role)}>
                        <Minus className='w-3 h-3' />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add Role Input */}
              <div className='flex gap-2'>
                <Input
                  placeholder='Type a role and press Enter or click + to add...'
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRole()}
                  className='text-base'
                />
                <Button
                  onClick={handleAddRole}
                  size='icon'
                  variant='secondary'
                  disabled={!currentRole.trim()}>
                  <Plus className='w-4 h-4' />
                </Button>
              </div>

              {/* Suggested Roles */}
              <div>
                <Label className='text-xs text-muted-foreground mb-2 block'>
                  Quick add suggestions:
                </Label>
                <div className='flex flex-wrap gap-2'>
                  {suggestedTopics.map((suggested) => (
                    <Badge
                      key={suggested}
                      variant={roles.includes(suggested) ? 'default' : 'outline'}
                      className='cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors'
                      onClick={() => handleAddSuggestedRole(suggested)}>
                      {roles.includes(suggested) ? '✓ ' : '+ '}
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
                Key Technologies & Responsibilities
                <Badge
                  variant='secondary'
                  className='text-xs'>
                  Optional
                </Badge>
              </CardTitle>
              <CardDescription>
                Add multiple technologies, tools, or responsibilities you want to focus on
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Selected Technologies */}
              {specificAreas.length > 0 && (
                <div className='flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20'>
                  {specificAreas.map((area) => (
                    <Badge
                      key={area}
                      variant='default'
                      className='pl-3 pr-1 py-1.5 text-sm'>
                      {area}
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-4 w-4 p-0 ml-2 hover:bg-transparent'
                        onClick={() => handleRemoveArea(area)}>
                        <Minus className='w-3 h-3' />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add Technology Input */}
              <div className='flex gap-2'>
                <Input
                  placeholder='Type a technology or skill and press Enter or + to add...'
                  value={currentArea}
                  onChange={(e) => setCurrentArea(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddArea()}
                />
                <Button
                  onClick={handleAddArea}
                  size='icon'
                  variant='secondary'
                  disabled={!currentArea.trim()}>
                  <Plus className='w-4 h-4' />
                </Button>
              </div>

              {/* Suggested Technologies */}
              <div>
                <Label className='text-xs text-muted-foreground mb-2 block'>
                  Quick add suggestions:
                </Label>
                <div className='flex flex-wrap gap-2'>
                  {suggestedTechnologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant={specificAreas.includes(tech) ? 'default' : 'outline'}
                      className='cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors'
                      onClick={() => handleAddSuggestedTech(tech)}>
                      {specificAreas.includes(tech) ? '✓ ' : '+ '}
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {specificAreas.length === 0 && (
                <div className='text-center py-4 text-sm text-muted-foreground'>
                  <Info className='w-4 h-4 inline-block mr-1' />
                  Add technologies to get more targeted questions
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
                Career Context
                <Badge
                  variant='secondary'
                  className='text-xs'>
                  Optional
                </Badge>
              </CardTitle>
              <CardDescription>
                Share your experience level, career goals, or specific interview context to get more
                relevant questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., I'm a fresher targeting Product Manager roles at startups. Want to focus on product roadmaps and prioritization. OR I have 5 years as a backend developer, now switching to DevOps..."
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
                      <li>
                        Be specific about your target role and career level (fresher/experienced)
                      </li>
                      <li>Mention key technologies and tools relevant to the role</li>
                      <li>Choose difficulty based on your current skill level</li>
                      <li>Add career context to get real-world scenario questions</li>
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

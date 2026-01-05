'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Database,
  Layers,
  Users,
  Brain,
  Palette,
  Server,
  Shield,
  Cloud,
  Briefcase,
  Crown,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Target,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TopicOption, DifficultyLevel, TopicCategory } from './types';

interface TopicBasedAssessmentProps {
  onSelectTopic: (topic: TopicOption, difficulty: DifficultyLevel) => void;
  onBack: () => void;
}

// Topic configurations with icons
const topicCategories = {
  'technical-coding': { icon: Code2, label: 'Coding', color: 'text-blue-500' },
  'system-design': { icon: Layers, label: 'System Design', color: 'text-purple-500' },
  behavioral: { icon: Users, label: 'Behavioral', color: 'text-green-500' },
  'data-structures': { icon: Database, label: 'Data Structures', color: 'text-cyan-500' },
  algorithms: { icon: Brain, label: 'Algorithms', color: 'text-indigo-500' },
  frontend: { icon: Palette, label: 'Frontend', color: 'text-pink-500' },
  backend: { icon: Server, label: 'Backend', color: 'text-orange-500' },
  database: { icon: Database, label: 'Database', color: 'text-teal-500' },
  devops: { icon: Cloud, label: 'DevOps', color: 'text-sky-500' },
  'ai-ml': { icon: Brain, label: 'AI/ML', color: 'text-violet-500' },
  'product-management': { icon: Briefcase, label: 'Product', color: 'text-amber-500' },
  leadership: { icon: Crown, label: 'Leadership', color: 'text-rose-500' },
};

// Sample topics - in real app, fetch from API
const sampleTopics: TopicOption[] = [
  {
    id: 'react-fundamentals',
    name: 'React Fundamentals',
    category: 'frontend',
    description: 'Core React concepts, hooks, state management, and component patterns',
    icon: '⚛️',
    estimatedTime: 30,
    questionCount: 15,
    tags: ['React', 'JavaScript', 'Hooks', 'Components'],
  },
  {
    id: 'nodejs-backend',
    name: 'Node.js Backend Development',
    category: 'backend',
    description: 'Express, REST APIs, middleware, authentication, and best practices',
    icon: '🟢',
    estimatedTime: 45,
    questionCount: 20,
    tags: ['Node.js', 'Express', 'REST API', 'Backend'],
  },
  {
    id: 'system-design-basics',
    name: 'System Design Fundamentals',
    category: 'system-design',
    description: 'Scalability, load balancing, caching, databases, and architecture patterns',
    icon: '🏗️',
    estimatedTime: 60,
    questionCount: 12,
    tags: ['Architecture', 'Scalability', 'Design Patterns'],
  },
  {
    id: 'data-structures',
    name: 'Data Structures Mastery',
    category: 'data-structures',
    description: 'Arrays, linked lists, trees, graphs, heaps, and hash tables',
    icon: '📊',
    estimatedTime: 40,
    questionCount: 25,
    tags: ['DSA', 'Algorithms', 'Problem Solving'],
  },
  {
    id: 'behavioral-interview',
    name: 'Behavioral Interview Skills',
    category: 'behavioral',
    description: 'STAR method, leadership, teamwork, conflict resolution, and communication',
    icon: '💼',
    estimatedTime: 35,
    questionCount: 15,
    tags: ['Soft Skills', 'Communication', 'Leadership'],
  },
  {
    id: 'sql-database',
    name: 'SQL & Database Design',
    category: 'database',
    description: 'Queries, joins, indexing, normalization, and optimization',
    icon: '🗄️',
    estimatedTime: 40,
    questionCount: 20,
    tags: ['SQL', 'Database', 'Optimization'],
  },
];

export function TopicBasedAssessment({ onSelectTopic, onBack }: TopicBasedAssessmentProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<TopicCategory | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = React.useState<TopicOption | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    React.useState<DifficultyLevel>('intermediate');

  const filteredTopics = sampleTopics.filter((topic) => {
    const matchesSearch =
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const difficulties: {
    level: DifficultyLevel;
    label: string;
    description: string;
    color: string;
  }[] = [
    {
      level: 'beginner',
      label: 'Beginner',
      description: 'Just starting out',
      color: 'bg-green-500',
    },
    {
      level: 'intermediate',
      label: 'Intermediate',
      description: 'Some experience',
      color: 'bg-blue-500',
    },
    {
      level: 'advanced',
      label: 'Advanced',
      description: 'Confident & skilled',
      color: 'bg-purple-500',
    },
    { level: 'expert', label: 'Expert', description: 'Master level', color: 'bg-orange-500' },
  ];

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-8'>
      <AnimatePresence mode='wait'>
        {!selectedTopic ? (
          <motion.div
            key='topic-selection'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}>
            {/* Header */}
            <div className='mb-8'>
              <Button
                variant='ghost'
                onClick={onBack}
                className='mb-4'>
                ← Back to Mode Selection
              </Button>
              <h2 className='text-3xl font-bold mb-2'>Choose Your Topic</h2>
              <p className='text-muted-foreground'>
                Select a topic that matches your preparation goals. Each assessment is designed to
                help you grow.
              </p>
            </div>

            {/* Search and Filter */}
            <div className='mb-6 space-y-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
                <Input
                  placeholder='Search topics, skills, or technologies...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>

              {/* Category Filter */}
              <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setSelectedCategory('all')}>
                  <Filter className='w-3 h-3 mr-1' />
                  All Topics
                </Button>
                {Object.entries(topicCategories).map(([key, { label, icon: Icon, color }]) => (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setSelectedCategory(key as TopicCategory)}>
                    <Icon className={`w-3 h-3 mr-1 ${color}`} />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Topics Grid */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredTopics.map((topic, index) => {
                const categoryInfo = topicCategories[topic.category];
                const CategoryIcon = categoryInfo.icon;

                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}>
                    <Card
                      className='h-full hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg group'
                      onClick={() => setSelectedTopic(topic)}>
                      <CardHeader>
                        <div className='flex items-start justify-between mb-2'>
                          <div className='text-3xl'>{topic.icon}</div>
                          <CategoryIcon className={`w-5 h-5 ${categoryInfo.color}`} />
                        </div>
                        <CardTitle className='text-lg group-hover:text-primary transition-colors'>
                          {topic.name}
                        </CardTitle>
                        <CardDescription className='line-clamp-2'>
                          {topic.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-3'>
                          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-1'>
                              <Clock className='w-4 h-4' />
                              <span>{topic.estimatedTime} min</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Target className='w-4 h-4' />
                              <span>{topic.questionCount} questions</span>
                            </div>
                          </div>
                          <div className='flex flex-wrap gap-1'>
                            {topic.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant='secondary'
                                className='text-xs'>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {filteredTopics.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>
                  No topics found. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key='difficulty-selection'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}>
            {/* Difficulty Selection */}
            <div className='max-w-3xl mx-auto'>
              <Button
                variant='ghost'
                onClick={() => setSelectedTopic(null)}
                className='mb-4'>
                ← Back to Topics
              </Button>

              <div className='text-center mb-8'>
                <div className='text-4xl mb-3'>{selectedTopic.icon}</div>
                <h2 className='text-3xl font-bold mb-2'>{selectedTopic.name}</h2>
                <p className='text-muted-foreground'>{selectedTopic.description}</p>
              </div>

              <Card className='mb-6'>
                <CardHeader>
                  <CardTitle>Select Your Difficulty Level</CardTitle>
                  <CardDescription>
                    Choose a level that challenges you while keeping the experience enjoyable
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid sm:grid-cols-2 gap-4'>
                    {difficulties.map((diff) => (
                      <motion.div
                        key={diff.level}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}>
                        <Card
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedDifficulty === diff.level
                              ? 'border-primary shadow-lg'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedDifficulty(diff.level)}>
                          <CardHeader>
                            <div className='flex items-center gap-3'>
                              <div className={`w-3 h-3 rounded-full ${diff.color}`} />
                              <div>
                                <CardTitle className='text-base'>{diff.label}</CardTitle>
                                <CardDescription className='text-sm'>
                                  {diff.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button
                size='lg'
                className='w-full'
                onClick={() => onSelectTopic(selectedTopic, selectedDifficulty)}>
                Start Assessment
                <ArrowRight className='w-4 h-4 ml-2' />
              </Button>

              <div className='mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20'>
                <p className='text-sm text-muted-foreground text-center'>
                  💫 <strong>Pro Tip:</strong> Don't worry about choosing the "perfect" difficulty.
                  You can always adjust as you progress. The goal is to learn and improve!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

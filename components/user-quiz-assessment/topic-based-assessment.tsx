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
  LineChart,
  TestTube,
  Laptop,
  Megaphone,
  BarChart3,
  Microscope,
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

// Role categories for IT and Business sectors
const topicCategories = {
  'technical-coding': { icon: Code2, label: 'Engineering', color: 'text-blue-500' },
  'system-design': { icon: Layers, label: 'Architecture', color: 'text-purple-500' },
  'product-management': { icon: Briefcase, label: 'Product', color: 'text-amber-500' },
  'data-science': { icon: BarChart3, label: 'Data & Analytics', color: 'text-cyan-500' },
  design: { icon: Palette, label: 'Design', color: 'text-pink-500' },
  devops: { icon: Cloud, label: 'DevOps & Cloud', color: 'text-sky-500' },
  quality: { icon: TestTube, label: 'Quality & Testing', color: 'text-teal-500' },
  business: { icon: LineChart, label: 'Business', color: 'text-green-500' },
  'ai-ml': { icon: Brain, label: 'AI/ML', color: 'text-violet-500' },
  security: { icon: Shield, label: 'Security', color: 'text-red-500' },
  leadership: { icon: Crown, label: 'Leadership', color: 'text-rose-500' },
  marketing: { icon: Megaphone, label: 'Marketing', color: 'text-orange-500' },
};

// IT and Business Role options
const sampleTopics: TopicOption[] = [
  {
    id: 'product-manager',
    name: 'Product Manager',
    category: 'product-management',
    description:
      'Product strategy, roadmaps, user stories, stakeholder management, metrics, and prioritization',
    icon: '📊',
    estimatedTime: 45,
    questionCount: 20,
    tags: ['Product Strategy', 'Roadmaps', 'Metrics', 'User Stories'],
  },
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    category: 'technical-coding',
    description: 'Data structures, algorithms, system design, coding patterns, and problem-solving',
    icon: '💻',
    estimatedTime: 60,
    questionCount: 25,
    tags: ['DSA', 'Coding', 'System Design', 'Problem Solving'],
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    category: 'technical-coding',
    description:
      'React, JavaScript, CSS, responsive design, performance optimization, and modern frameworks',
    icon: '⚛️',
    estimatedTime: 40,
    questionCount: 20,
    tags: ['React', 'JavaScript', 'CSS', 'Web Performance'],
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    category: 'technical-coding',
    description:
      'APIs, databases, microservices, authentication, server architecture, and scalability',
    icon: '🔧',
    estimatedTime: 50,
    questionCount: 22,
    tags: ['APIs', 'Databases', 'Node.js', 'Microservices'],
  },
  {
    id: 'fullstack-developer',
    name: 'Full Stack Developer',
    category: 'technical-coding',
    description:
      'Frontend + backend integration, deployment, DevOps basics, and end-to-end development',
    icon: '⚡',
    estimatedTime: 60,
    questionCount: 30,
    tags: ['Full Stack', 'MERN', 'Deployment', 'APIs'],
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'data-science',
    description:
      'Statistics, ML algorithms, Python, data analysis, model building, and visualization',
    icon: '📈',
    estimatedTime: 55,
    questionCount: 25,
    tags: ['Python', 'ML', 'Statistics', 'Data Analysis'],
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'data-science',
    description: 'SQL, Excel, Tableau, data visualization, business intelligence, and reporting',
    icon: '📊',
    estimatedTime: 40,
    questionCount: 20,
    tags: ['SQL', 'Tableau', 'Excel', 'BI'],
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    category: 'devops',
    description: 'CI/CD, Docker, Kubernetes, AWS/Azure, infrastructure as code, and monitoring',
    icon: '🚀',
    estimatedTime: 50,
    questionCount: 22,
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    id: 'cloud-architect',
    name: 'Cloud Architect',
    category: 'system-design',
    description:
      'Cloud platforms, architecture patterns, security, cost optimization, and migration strategies',
    icon: '☁️',
    estimatedTime: 55,
    questionCount: 20,
    tags: ['AWS', 'Azure', 'Architecture', 'Security'],
  },
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    category: 'design',
    description: 'User research, wireframing, prototyping, Figma, user flows, and design thinking',
    icon: '🎨',
    estimatedTime: 40,
    questionCount: 18,
    tags: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
  },
  {
    id: 'qa-engineer',
    name: 'QA Engineer',
    category: 'quality',
    description: 'Test automation, manual testing, Selenium, test strategies, and quality metrics',
    icon: '🧪',
    estimatedTime: 45,
    questionCount: 20,
    tags: ['Testing', 'Selenium', 'Automation', 'Quality'],
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    category: 'business',
    description:
      'Requirements gathering, process mapping, stakeholder communication, and documentation',
    icon: '📋',
    estimatedTime: 40,
    questionCount: 18,
    tags: ['Requirements', 'Documentation', 'Analysis', 'Communication'],
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    category: 'leadership',
    description: 'Agile/Scrum, project planning, risk management, team coordination, and delivery',
    icon: '📅',
    estimatedTime: 40,
    questionCount: 18,
    tags: ['Agile', 'Scrum', 'Planning', 'Team Management'],
  },
  {
    id: 'ml-engineer',
    name: 'Machine Learning Engineer',
    category: 'ai-ml',
    description: 'ML models, TensorFlow, PyTorch, deployment, MLOps, and model optimization',
    icon: '🤖',
    estimatedTime: 60,
    questionCount: 25,
    tags: ['ML', 'TensorFlow', 'PyTorch', 'MLOps'],
  },
  {
    id: 'security-engineer',
    name: 'Security Engineer',
    category: 'security',
    description:
      'Cybersecurity, penetration testing, vulnerability assessment, and security protocols',
    icon: '🔒',
    estimatedTime: 50,
    questionCount: 22,
    tags: ['Security', 'Pentesting', 'Compliance', 'Protocols'],
  },
  {
    id: 'technical-lead',
    name: 'Technical Lead',
    category: 'leadership',
    description:
      'Team leadership, code reviews, architecture decisions, mentoring, and technical strategy',
    icon: '👨‍💼',
    estimatedTime: 50,
    questionCount: 20,
    tags: ['Leadership', 'Architecture', 'Mentoring', 'Strategy'],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing Manager',
    category: 'marketing',
    description: 'SEO, SEM, social media, analytics, campaigns, and growth strategies',
    icon: '📱',
    estimatedTime: 40,
    questionCount: 18,
    tags: ['SEO', 'Analytics', 'Campaigns', 'Growth'],
  },
  {
    id: 'scrum-master',
    name: 'Scrum Master',
    category: 'leadership',
    description:
      'Agile facilitation, sprint planning, retrospectives, team coaching, and process improvement',
    icon: '🎯',
    estimatedTime: 35,
    questionCount: 16,
    tags: ['Agile', 'Scrum', 'Facilitation', 'Coaching'],
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
    <div className='w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8'>
      <AnimatePresence mode='wait'>
        {!selectedTopic ? (
          <motion.div
            key='topic-selection'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}>
            {/* Header */}
            <div className='mb-6 sm:mb-8'>
              <Button
                variant='ghost'
                onClick={onBack}
                className='mb-3 sm:mb-4'>
                ← Back to Mode Selection
              </Button>
              <h2 className='text-2xl sm:text-3xl font-bold mb-2'>Choose Your Target Role</h2>
              <p className='text-sm sm:text-base text-muted-foreground'>
                Select the role you're preparing for. Each assessment covers role-specific skills,
                responsibilities, and real-world scenarios.
              </p>
            </div>

            {/* Search and Filter */}
            <div className='mb-5 sm:mb-6 space-y-3 sm:space-y-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
                <Input
                  placeholder='Search roles (e.g., Product Manager, Software Engineer)...'
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
                  All Roles
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
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
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
            <div className='max-w-5xl mx-auto'>
              <Button
                variant='ghost'
                onClick={() => setSelectedTopic(null)}
                className='mb-4'>
                ← Back to Topics
              </Button>

              <div className='text-center mb-6 sm:mb-8'>
                <div className='text-3xl sm:text-4xl mb-3'>{selectedTopic.icon}</div>
                <h2 className='text-2xl sm:text-3xl font-bold mb-2'>{selectedTopic.name}</h2>
                <p className='text-sm sm:text-base text-muted-foreground'>
                  {selectedTopic.description}
                </p>
              </div>

              <Card className='mb-4 sm:mb-6'>
                <CardHeader>
                  <CardTitle>Select Your Difficulty Level</CardTitle>
                  <CardDescription>
                    Choose a level that challenges you while keeping the experience enjoyable
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
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

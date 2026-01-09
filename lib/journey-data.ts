// Re-export types from shared location
export type { CareerPath, RoadmapStep, JourneyQuestion } from '@/lib/types';

// Legacy interface for backwards compatibility
export interface Question {
  id: number;
  question: string;
  options: string[];
}

export const journeyQuestions: Question[] = [
  {
    id: 1,
    question: 'What type of work environment do you thrive in?',
    options: [
      'Fast-paced and dynamic',
      'Structured and stable',
      'Creative and flexible',
      'Collaborative and social',
    ],
  },
  {
    id: 2,
    question: 'Which skills do you enjoy using most?',
    options: [
      'Technical and analytical',
      'Creative and design',
      'Communication and leadership',
      'Problem-solving and strategy',
    ],
  },
  {
    id: 3,
    question: 'What motivates you most in your career?',
    options: ['Making an impact', 'Financial growth', 'Work-life balance', 'Continuous learning'],
  },
  {
    id: 4,
    question: 'How do you prefer to work?',
    options: [
      'Independently with autonomy',
      'In a team setting',
      'Mix of both',
      'Leading and mentoring others',
    ],
  },
  {
    id: 5,
    question: 'What level of risk are you comfortable with?',
    options: [
      'High risk, high reward',
      'Moderate risk with stability',
      'Low risk, secure path',
      'Depends on the opportunity',
    ],
  },
];

export function generateCareerPaths(answers: Record<number, string>): CareerPath[] {
  // Mock logic - in real app, this would use AI/ML
  const paths: CareerPath[] = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      description:
        'Software engineers design, develop, and maintain applications that power modern businesses. This role is highly valued across all industries from startups to Fortune 500 companies. With AI and cloud computing driving innovation, the demand for skilled engineers continues to grow, making it one of the most future-proof careers with excellent growth potential.',
      matchScore: 95,
      skills: ['JavaScript', 'React', 'Node.js', 'Problem Solving'],
      salary: '$80k - $150k',
      demand: 'Very High',
      icon: '💻',
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      description:
        'Product managers are the strategic leaders who define product vision and drive execution from concept to launch. Highly valued for their ability to balance user needs with business goals, PMs are essential in tech companies of all sizes. As digital transformation accelerates, the need for skilled product leaders continues to rise, offering strong career advancement and competitive compensation.',
      matchScore: 88,
      skills: ['Strategy', 'Communication', 'Analytics', 'Leadership'],
      salary: '$90k - $160k',
      demand: 'High',
      icon: '🎯',
    },
    {
      id: 'ux-designer',
      title: 'UX/UI Designer',
      description:
        'UX/UI designers craft intuitive digital experiences that users love. This role combines creativity with psychology and data to solve real user problems. As companies recognize that great design drives customer satisfaction and revenue, demand for skilled designers has surged. With emerging technologies like AI, AR/VR, and voice interfaces, the future of UX design is incredibly promising.',
      matchScore: 82,
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      salary: '$70k - $130k',
      demand: 'High',
      icon: '🎨',
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      description:
        'Data scientists transform raw data into actionable insights using advanced analytics and machine learning. Organizations across healthcare, finance, retail, and tech rely on data scientists to drive strategic decisions. With the explosion of AI and big data, this field is experiencing unprecedented growth, offering exceptional job security and some of the highest salaries in tech.',
      matchScore: 78,
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      salary: '$85k - $155k',
      demand: 'Very High',
      icon: '📊',
    },
  ];

  return paths.sort((a, b) => b.matchScore - a.matchScore);
}

export function generateRoadmap(pathId: string): RoadmapStep[] {
  const roadmaps: Record<string, RoadmapStep[]> = {
    'software-engineer': [
      {
        id: 1,
        title: 'Foundation Building',
        description: 'Learn programming fundamentals and basic web development',
        duration: '2-3 months',
        status: 'current',
        skills: ['HTML/CSS', 'JavaScript Basics', 'Git'],
      },
      {
        id: 2,
        title: 'Framework Mastery',
        description: 'Master modern frameworks and build projects',
        duration: '3-4 months',
        status: 'pending',
        skills: ['React', 'Node.js', 'Databases'],
      },
      {
        id: 3,
        title: 'Advanced Concepts',
        description: 'Deep dive into algorithms, system design, and architecture',
        duration: '4-5 months',
        status: 'pending',
        skills: ['Data Structures', 'System Design', 'Cloud'],
      },
      {
        id: 4,
        title: 'Portfolio & Job Prep',
        description: 'Build impressive projects and prepare for interviews',
        duration: '2-3 months',
        status: 'pending',
        skills: ['Portfolio Projects', 'Interview Prep', 'Networking'],
      },
      {
        id: 5,
        title: 'Land Your Role',
        description: 'Apply strategically and ace technical interviews',
        duration: '1-2 months',
        status: 'pending',
        skills: ['Job Applications', 'Technical Interviews', 'Negotiation'],
      },
    ],
    'product-manager': [
      {
        id: 1,
        title: 'Product Fundamentals',
        description: 'Understand product lifecycle and core PM principles',
        duration: '2-3 months',
        status: 'current',
        skills: ['Product Strategy', 'User Stories', 'Agile'],
      },
      {
        id: 2,
        title: 'Technical Understanding',
        description: 'Learn enough tech to communicate effectively with engineers',
        duration: '2-3 months',
        status: 'pending',
        skills: ['Basic Coding', 'APIs', 'System Architecture'],
      },
      {
        id: 3,
        title: 'Analytics & Metrics',
        description: 'Master data-driven decision making',
        duration: '2-3 months',
        status: 'pending',
        skills: ['SQL', 'Analytics Tools', 'A/B Testing'],
      },
      {
        id: 4,
        title: 'Build Case Studies',
        description: 'Create compelling product case studies',
        duration: '2-3 months',
        status: 'pending',
        skills: ['Product Cases', 'Presentation', 'Documentation'],
      },
      {
        id: 5,
        title: 'PM Interview Prep',
        description: 'Prepare for product interviews and land the role',
        duration: '1-2 months',
        status: 'pending',
        skills: ['Product Sense', 'Execution', 'Leadership'],
      },
    ],
  };

  return roadmaps[pathId] || roadmaps['software-engineer'];
}

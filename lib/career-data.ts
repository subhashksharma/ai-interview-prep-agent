// Career Path Data and Generation Logic
import type { CareerPath, JourneyQuestion, Roadmap, RoadmapStep } from '@/lib/types';

// ============================================================
// Journey Discovery Questions
// ============================================================

export const journeyQuestions: JourneyQuestion[] = [
  {
    id: 1,
    question: 'What type of work environment do you thrive in?',
    options: [
      'Fast-paced and dynamic',
      'Structured and stable',
      'Creative and flexible',
      'Collaborative and social',
    ],
    category: 'environment',
    weight: 1,
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
    category: 'skills',
    weight: 1.5,
  },
  {
    id: 3,
    question: 'What motivates you most in your career?',
    options: ['Making an impact', 'Financial growth', 'Work-life balance', 'Continuous learning'],
    category: 'motivation',
    weight: 1,
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
    category: 'workstyle',
    weight: 1,
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
    category: 'risk',
    weight: 0.8,
  },
];

// ============================================================
// Career Paths Database
// ============================================================

export const careerPathsDatabase: CareerPath[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Build innovative applications and solve complex technical challenges',
    matchScore: 0,
    skills: ['JavaScript', 'React', 'Node.js', 'Problem Solving', 'System Design'],
    salary: '$80k - $150k',
    demand: 'Very High',
    icon: '💻',
    category: 'engineering',
    growthPotential: 'Excellent',
    requiredExperience: '0-2 years entry, 3-5 years mid, 6+ years senior',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Lead product strategy and bridge the gap between business and technology',
    matchScore: 0,
    skills: ['Strategy', 'Communication', 'Analytics', 'Leadership', 'User Research'],
    salary: '$90k - $160k',
    demand: 'High',
    icon: '🎯',
    category: 'product',
    growthPotential: 'Excellent',
    requiredExperience: '2-4 years with technical or business background',
  },
  {
    id: 'ux-designer',
    title: 'UX/UI Designer',
    description: 'Create beautiful and intuitive user experiences',
    matchScore: 0,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
    salary: '$70k - $130k',
    demand: 'High',
    icon: '🎨',
    category: 'design',
    growthPotential: 'Very Good',
    requiredExperience: '0-2 years with strong portfolio',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Extract insights from data to drive business decisions',
    matchScore: 0,
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
    salary: '$85k - $155k',
    demand: 'Very High',
    icon: '📊',
    category: 'data',
    growthPotential: 'Excellent',
    requiredExperience: '1-3 years with strong quantitative background',
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Build and maintain infrastructure and deployment pipelines',
    matchScore: 0,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
    salary: '$95k - $170k',
    demand: 'Very High',
    icon: '🔧',
    category: 'devops',
    growthPotential: 'Excellent',
    requiredExperience: '2-4 years with system administration background',
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Build beautiful and responsive user interfaces',
    matchScore: 0,
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'Testing', 'Performance'],
    salary: '$70k - $140k',
    demand: 'Very High',
    icon: '🎨',
    category: 'engineering',
    growthPotential: 'Very Good',
    requiredExperience: '0-2 years entry level',
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Design and build server-side applications and APIs',
    matchScore: 0,
    skills: ['Node.js', 'Python', 'Databases', 'APIs', 'Security', 'Scalability'],
    salary: '$80k - $150k',
    demand: 'Very High',
    icon: '⚙️',
    category: 'engineering',
    growthPotential: 'Excellent',
    requiredExperience: '0-2 years entry level',
  },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    description: 'Ensure software quality through testing and automation',
    matchScore: 0,
    skills: ['Testing', 'Automation', 'Selenium', 'API Testing', 'CI/CD'],
    salary: '$65k - $120k',
    demand: 'High',
    icon: '🔍',
    category: 'qa',
    growthPotential: 'Good',
    requiredExperience: '0-2 years entry level',
  },
  {
    id: 'technical-lead',
    title: 'Technical Lead',
    description: 'Lead development teams and drive technical decisions',
    matchScore: 0,
    skills: ['Leadership', 'Architecture', 'Code Review', 'Mentoring', 'Strategy'],
    salary: '$110k - $180k',
    demand: 'High',
    icon: '👨‍💼',
    category: 'leadership',
    growthPotential: 'Excellent',
    requiredExperience: '5+ years with leadership skills',
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    description: 'Protect systems and data from security threats',
    matchScore: 0,
    skills: ['Security', 'Networking', 'Penetration Testing', 'Compliance', 'Cloud Security'],
    salary: '$100k - $175k',
    demand: 'Very High',
    icon: '🔒',
    category: 'security',
    growthPotential: 'Excellent',
    requiredExperience: '2-4 years with security focus',
  },
];

// ============================================================
// Career Path Matching Logic
// ============================================================

interface AnswerWeights {
  environment: Record<string, string[]>;
  skills: Record<string, string[]>;
  motivation: Record<string, string[]>;
  workstyle: Record<string, string[]>;
  risk: Record<string, string[]>;
}

const answerToCareerMapping: AnswerWeights = {
  environment: {
    'Fast-paced and dynamic': ['software-engineer', 'devops-engineer', 'frontend-developer'],
    'Structured and stable': ['qa-engineer', 'backend-developer', 'security-engineer'],
    'Creative and flexible': ['ux-designer', 'frontend-developer', 'product-manager'],
    'Collaborative and social': ['product-manager', 'technical-lead', 'ux-designer'],
  },
  skills: {
    'Technical and analytical': [
      'software-engineer',
      'data-scientist',
      'backend-developer',
      'devops-engineer',
    ],
    'Creative and design': ['ux-designer', 'frontend-developer'],
    'Communication and leadership': ['product-manager', 'technical-lead'],
    'Problem-solving and strategy': ['software-engineer', 'data-scientist', 'security-engineer'],
  },
  motivation: {
    'Making an impact': ['product-manager', 'technical-lead', 'software-engineer'],
    'Financial growth': [
      'software-engineer',
      'devops-engineer',
      'security-engineer',
      'data-scientist',
    ],
    'Work-life balance': ['qa-engineer', 'frontend-developer', 'ux-designer'],
    'Continuous learning': ['data-scientist', 'software-engineer', 'devops-engineer'],
  },
  workstyle: {
    'Independently with autonomy': ['software-engineer', 'backend-developer', 'data-scientist'],
    'In a team setting': ['frontend-developer', 'ux-designer', 'qa-engineer'],
    'Mix of both': ['product-manager', 'devops-engineer', 'security-engineer'],
    'Leading and mentoring others': ['technical-lead', 'product-manager'],
  },
  risk: {
    'High risk, high reward': ['software-engineer', 'product-manager', 'technical-lead'],
    'Moderate risk with stability': ['devops-engineer', 'data-scientist', 'security-engineer'],
    'Low risk, secure path': ['qa-engineer', 'backend-developer'],
    'Depends on the opportunity': ['frontend-developer', 'ux-designer'],
  },
};

export function generateCareerPaths(answers: Record<number, string>): CareerPath[] {
  const scores: Record<string, number> = {};

  // Initialize scores
  careerPathsDatabase.forEach((path) => {
    scores[path.id] = 50; // Base score
  });

  // Calculate scores based on answers
  journeyQuestions.forEach((question, index) => {
    const answer = answers[question.id];
    if (!answer) return;

    const category = question.category as keyof AnswerWeights;
    const matchingCareers = answerToCareerMapping[category]?.[answer] || [];
    const weight = question.weight || 1;

    matchingCareers.forEach((careerId, idx) => {
      // Higher bonus for first match, decreasing for others
      const bonus = (15 - idx * 3) * weight;
      scores[careerId] = (scores[careerId] || 0) + bonus;
    });
  });

  // Convert to career paths with scores
  const paths = careerPathsDatabase.map((path) => ({
    ...path,
    matchScore: Math.min(99, Math.max(60, scores[path.id] || 60)),
  }));

  // Sort by score and return top results
  return paths.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
}

// ============================================================
// Roadmap Generation
// ============================================================

const roadmapTemplates: Record<string, Omit<RoadmapStep, 'status'>[]> = {
  'software-engineer': [
    {
      id: 1,
      title: 'Foundation Building',
      description: 'Master programming fundamentals and basic web development concepts',
      duration: '2-3 months',
      skills: ['HTML/CSS', 'JavaScript Basics', 'Git', 'Command Line'],
      milestones: [
        'Build a personal website',
        'Complete 50+ coding challenges',
        'Contribute to open source',
      ],
      order: 1,
    },
    {
      id: 2,
      title: 'Framework Mastery',
      description: 'Learn modern frameworks and build real-world projects',
      duration: '3-4 months',
      skills: ['React', 'Node.js', 'Databases', 'REST APIs'],
      milestones: ['Build 3 full-stack applications', 'Deploy to cloud', 'Learn testing basics'],
      order: 2,
    },
    {
      id: 3,
      title: 'Advanced Concepts',
      description: 'Deep dive into algorithms, system design, and architecture',
      duration: '4-5 months',
      skills: ['Data Structures', 'System Design', 'Cloud Services', 'Performance'],
      milestones: [
        'Complete 100+ LeetCode problems',
        'Design 5 system architectures',
        'Build a scalable app',
      ],
      order: 3,
    },
    {
      id: 4,
      title: 'Interview Preparation',
      description: 'Prepare for technical interviews with mock sessions',
      duration: '1-2 months',
      skills: ['Behavioral Questions', 'Coding Interviews', 'System Design Interviews'],
      milestones: ['Complete 10 mock interviews', 'Refine resume', 'Build portfolio'],
      order: 4,
    },
  ],
  'product-manager': [
    {
      id: 1,
      title: 'Product Fundamentals',
      description: 'Learn core product management concepts and frameworks',
      duration: '2-3 months',
      skills: ['Product Strategy', 'User Research', 'Roadmapping', 'Agile/Scrum'],
      milestones: ['Complete PM certification', 'Read 5 PM books', 'Build product sense'],
      order: 1,
    },
    {
      id: 2,
      title: 'Technical Foundation',
      description: 'Develop technical knowledge to work effectively with engineers',
      duration: '2-3 months',
      skills: ['Basic Coding', 'APIs', 'Data Analytics', 'Technical Communication'],
      milestones: [
        'Complete coding basics',
        'Analyze 10 product metrics',
        'Shadow engineering team',
      ],
      order: 2,
    },
    {
      id: 3,
      title: 'Business & Strategy',
      description: 'Master business strategy and market analysis',
      duration: '2-3 months',
      skills: ['Market Analysis', 'Business Models', 'Competitive Analysis', 'Pricing'],
      milestones: ['Analyze 5 companies', 'Create business case', 'Present to stakeholders'],
      order: 3,
    },
    {
      id: 4,
      title: 'Interview Mastery',
      description: 'Prepare for PM interviews with case studies and mock sessions',
      duration: '1-2 months',
      skills: ['Case Studies', 'Product Design', 'Estimation', 'Behavioral'],
      milestones: ['Complete 20 case studies', '10 mock interviews', 'Build PM portfolio'],
      order: 4,
    },
  ],
  // Default template for other paths
  default: [
    {
      id: 1,
      title: 'Foundation',
      description: 'Build core skills and knowledge in your chosen field',
      duration: '2-3 months',
      skills: ['Core Concepts', 'Tools & Technologies', 'Best Practices'],
      order: 1,
    },
    {
      id: 2,
      title: 'Practical Application',
      description: 'Apply knowledge through hands-on projects',
      duration: '3-4 months',
      skills: ['Project Work', 'Real-world Scenarios', 'Collaboration'],
      order: 2,
    },
    {
      id: 3,
      title: 'Advanced Skills',
      description: 'Develop advanced expertise in specialized areas',
      duration: '3-4 months',
      skills: ['Specialization', 'Advanced Techniques', 'Industry Standards'],
      order: 3,
    },
    {
      id: 4,
      title: 'Career Launch',
      description: 'Prepare for job search and interviews',
      duration: '1-2 months',
      skills: ['Interview Prep', 'Networking', 'Portfolio Building'],
      order: 4,
    },
  ],
};

export function generateRoadmap(pathId: string): RoadmapStep[] {
  const template = roadmapTemplates[pathId] || roadmapTemplates.default;

  return template.map((step, index) => ({
    ...step,
    status: index === 0 ? 'current' : 'pending',
  }));
}

export function getCareerPathById(pathId: string): CareerPath | undefined {
  return careerPathsDatabase.find((path) => path.id === pathId);
}

export function getCareerPathsByCategory(category: CareerPath['category']): CareerPath[] {
  return careerPathsDatabase.filter((path) => path.category === category);
}

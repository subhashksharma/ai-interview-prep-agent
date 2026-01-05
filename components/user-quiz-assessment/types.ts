// Assessment System Types

export type AssessmentMode = 'topic-based' | 'custom' | null;

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type TopicCategory =
  | 'technical-coding'
  | 'system-design'
  | 'product-management'
  | 'data-science'
  | 'design'
  | 'devops'
  | 'quality'
  | 'business'
  | 'ai-ml'
  | 'security'
  | 'leadership'
  | 'marketing';

export interface TopicOption {
  id: string;
  name: string;
  category: TopicCategory;
  description: string;
  icon: string;
  estimatedTime: number; // in minutes
  questionCount: number;
  tags: string[];
}

export interface CustomAssessmentInput {
  topic: string;
  specificAreas?: string[];
  difficulty: DifficultyLevel;
  duration: number; // in minutes
  questionCount: number;
  additionalContext?: string;
}

export interface Question {
  id: string;
  question: string;
  type:
    | 'single-choice'
    | 'multiple-choice'
    | 'fill-in-blanks'
    | 'coding'
    | 'writing'
    | 'case-study';
  difficulty: DifficultyLevel;
  timeEstimate: number; // in seconds
  category: string;
  hints?: string[];
  options?: string[]; // for single/multiple-choice
  correctAnswers?: string[]; // for validation (optional)
  caseStudyText?: string; // for case-study type
  blanksCount?: number; // for fill-in-blanks type
  questionText?: string; // additional context for case studies
}

export interface Answer {
  questionId: string;
  answer: string | string[]; // string for single answer, array for multiple-choice or fill-in-blanks
  timeSpent: number;
  confidence: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export interface AssessmentSession {
  id: string;
  mode: AssessmentMode;
  topic?: TopicOption;
  customInput?: CustomAssessmentInput;
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  startTime: Date;
  status: 'not-started' | 'in-progress' | 'paused' | 'completed';
  encouragementMessages: string[];
}

export interface AssessmentFeedback {
  questionId: string;
  feedback: string;
  strengths: string[];
  areasForImprovement: string[];
  encouragement: string;
  nextSteps: string[];
  isPositive: boolean;
}

// Shared Types for Career Buddy
// Central location for all type definitions

// ============================================================
// Core User Types
// ============================================================

export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  resume?: ResumeData;
  preferences?: UserPreferences;
  assessmentHistory?: AssessmentSession[];
  careerMatches?: CareerPath[];
}

export interface UserPreferences {
  preferredWorkEnvironment: 'remote' | 'hybrid' | 'onsite' | null;
  targetSalaryRange?: SalaryRange;
  industries?: string[];
  locations?: string[];
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

// ============================================================
// Resume Types
// ============================================================

export interface ResumeData {
  rawText?: string;
  parsedData?: ParsedResume;
  uploadedAt?: Date;
}

export interface ParsedResume {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications?: Certification[];
  summary?: string;
}

export interface PersonalInfo {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  highlights?: string[];
  skills?: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  graduationYear?: string;
  gpa?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  expiryDate?: string;
  credentialId?: string;
}

// ============================================================
// Career Path Types
// ============================================================

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  skills: string[];
  salary: string;
  demand: 'Very High' | 'High' | 'Medium' | 'Low';
  icon: string;
  category?: CareerCategory;
  growthPotential?: string;
  requiredExperience?: string;
  learningResources?: LearningResource[];
}

export type CareerCategory =
  | 'engineering'
  | 'product'
  | 'design'
  | 'data'
  | 'marketing'
  | 'leadership'
  | 'operations'
  | 'security'
  | 'devops'
  | 'qa';

export interface LearningResource {
  title: string;
  type: 'course' | 'book' | 'video' | 'article' | 'practice';
  url?: string;
  provider?: string;
  duration?: string;
  isFree: boolean;
}

// ============================================================
// Roadmap Types
// ============================================================

export interface Roadmap {
  careerPathId: string;
  title: string;
  description: string;
  totalDuration: string;
  steps: RoadmapStep[];
}

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: 'pending' | 'current' | 'completed';
  skills: string[];
  milestones?: string[];
  resources?: LearningResource[];
  order: number;
}

// ============================================================
// Assessment Types
// ============================================================

export type AssessmentMode = 'topic-based' | 'custom' | 'resume-based' | null;

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type QuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'fill-in-blanks'
  | 'coding'
  | 'writing'
  | 'case-study';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

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
  type: QuestionType;
  difficulty: DifficultyLevel;
  timeEstimate: number; // in seconds
  category: string;
  hints?: string[];
  options?: string[]; // for single/multiple-choice
  correctAnswers?: string[]; // for validation
  caseStudyText?: string; // for case-study type
  blanksCount?: number; // for fill-in-blanks
  questionText?: string; // additional context
}

export interface Answer {
  questionId: string;
  answer: string | string[];
  timeSpent: number;
  confidence: ConfidenceLevel;
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
  endTime?: Date;
  status: 'not-started' | 'in-progress' | 'paused' | 'completed';
  encouragementMessages: string[];
  score?: AssessmentScore;
}

export interface AssessmentScore {
  totalQuestions: number;
  answered: number;
  correct: number;
  percentage: number;
  confidenceBreakdown: Record<ConfidenceLevel, number>;
  timeSpent: number; // seconds
  strengths: string[];
  areasForImprovement: string[];
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

// ============================================================
// Journey Questions (Discovery Flow)
// ============================================================

export interface JourneyQuestion {
  id: number;
  question: string;
  options: string[];
  category?: string;
  weight?: number;
}

// ============================================================
// Preparation Plan Types
// ============================================================

export interface PreparationPlan {
  id: string;
  careerPathId: string;
  userId?: string;
  title: string;
  description: string;
  totalWeeks: number;
  hoursPerWeek: number;
  milestones: PlanMilestone[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanMilestone {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  tasks: PlanTask[];
  resources: LearningResource[];
  assessmentId?: string;
}

export interface PlanTask {
  id: string;
  title: string;
  description?: string;
  type: 'learn' | 'practice' | 'project' | 'review';
  estimatedHours: number;
  completed: boolean;
  completedAt?: Date;
}

// ============================================================
// API Response Types
// ============================================================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CareerMatchResponse {
  paths: CareerPath[];
  confidence: number;
  basedOn: 'resume' | 'assessment' | 'discovery' | 'combined';
  generatedAt: Date;
}

export interface RoadmapGenerationResponse {
  roadmap: Roadmap;
  estimatedCompletion: Date;
  alternativePaths?: Roadmap[];
}

// Assessment System Types
// Re-export from shared types for backwards compatibility

export type {
  AssessmentMode,
  DifficultyLevel,
  TopicCategory,
  TopicOption,
  CustomAssessmentInput,
  Question,
  Answer,
  AssessmentSession,
  AssessmentFeedback,
  QuestionType,
  ConfidenceLevel,
} from '@/lib/types';

// Legacy exports for compatibility
export type { AssessmentScore } from '@/lib/types';

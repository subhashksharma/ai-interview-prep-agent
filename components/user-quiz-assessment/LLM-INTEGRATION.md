# LLM Integration Guide

## 🤖 Backend Architecture

### Overview

The assessment system is designed to work with any LLM backend (OpenAI GPT-4, Anthropic Claude, Google Gemini, etc.). All LLM interactions are centralized in `llm-service.ts` for easy integration.

## 🔌 Integration Points

### 1. Question Generation (Topic-Based)

**Endpoint**: `POST /api/generate-topic-questions`

**Request**:

```json
{
  "topic": {
    "id": "react-fundamentals",
    "name": "React Fundamentals",
    "category": "frontend",
    "description": "Core React concepts...",
    "questionCount": 15,
    "tags": ["React", "JavaScript", "Hooks"]
  },
  "difficulty": "intermediate"
}
```

**LLM Prompt Template**:

```
You are an expert technical interview coach helping job seekers prepare for interviews in a supportive, judgment-free environment.

Generate ${questionCount} high-quality interview questions about ${topic.name}.

Context:
- Topic: ${topic.name}
- Category: ${topic.category}
- Difficulty Level: ${difficulty}
- Description: ${topic.description}
- Relevant Tags: ${topic.tags.join(', ')}

Requirements:
1. Create ${questionCount} diverse questions covering different aspects
2. Mix question types:
   - 40% Open-ended (encourage detailed explanations)
   - 30% Scenario-based (real-world situations)
   - 20% Multiple-choice (with 4 options each)
   - 10% Coding challenges (if technical topic)

3. For each question provide:
   - Clear, professional question text
   - Appropriate difficulty level
   - 2-3 helpful hints (optional guidance, not answers)
   - For multiple-choice: 4 distinct options (one clearly best answer)

4. Ensure questions:
   - Are realistic and industry-relevant
   - Test understanding, not just memorization
   - Encourage thoughtful responses
   - Are free from bias or offensive content

5. Tone: Professional yet supportive
   - No trick questions
   - Focus on learning, not catching mistakes
   - Questions should build confidence

Return as JSON array with this structure:
[
  {
    "id": "unique-id",
    "question": "question text",
    "type": "open-ended" | "multiple-choice" | "coding" | "scenario-based",
    "difficulty": "${difficulty}",
    "timeEstimate": 180,  // seconds
    "category": "${topic.category}",
    "hints": ["hint1", "hint2"],
    "options": ["opt1", "opt2", "opt3", "opt4"]  // only for multiple-choice
  }
]
```

**Response**:

```json
{
  "questions": [
    {
      "id": "react-q1",
      "question": "Explain how React's Virtual DOM improves performance...",
      "type": "open-ended",
      "difficulty": "intermediate",
      "timeEstimate": 300,
      "category": "frontend",
      "hints": ["Think about how React compares DOM states", "Consider the reconciliation process"]
    }
  ]
}
```

### 2. Question Generation (Custom)

**Endpoint**: `POST /api/generate-custom-questions`

**Request**:

```json
{
  "topic": "GraphQL Performance Optimization",
  "specificAreas": ["Query batching", "Caching strategies", "N+1 problem"],
  "difficulty": "advanced",
  "duration": 45,
  "questionCount": 12,
  "additionalContext": "Preparing for senior backend role, 5 years experience"
}
```

**LLM Prompt Template**:

```
You are an expert technical interview coach creating a personalized assessment for a job seeker.

User Request:
- Main Topic: ${input.topic}
${input.specificAreas ? `- Specific Focus Areas: ${input.specificAreas.join(', ')}` : ''}
- Difficulty Level: ${input.difficulty}
- Time Available: ${input.duration} minutes
- Number of Questions: ${input.questionCount}
${input.additionalContext ? `- Additional Context: ${input.additionalContext}` : ''}

Task:
Create ${input.questionCount} interview questions tailored to this user's specific needs.

Guidelines:
1. Tailor questions to the stated difficulty and context
2. If specific areas mentioned, ensure coverage of each
3. Allocate time appropriately (~${Math.floor(duration/questionCount)} min per question)
4. Balance question types based on topic nature
5. Consider the user's experience level and goals

Question Distribution:
- Start with foundational questions (20%)
- Progress to intermediate concepts (40%)
- Include advanced scenarios (30%)
- Add expert-level challenges (10%)

For each question:
- Make it directly relevant to their stated goals
- Provide contextual hints that guide without giving answers
- Ensure realistic interview scenarios
- Support their learning journey

Return as JSON array following the standard question format.
```

### 3. Answer Evaluation

**Endpoint**: `POST /api/evaluate-answer`

**Request**:

```json
{
  "question": {
    "id": "react-q1",
    "question": "Explain React's Virtual DOM...",
    "type": "open-ended",
    "difficulty": "intermediate"
  },
  "answer": {
    "questionId": "react-q1",
    "answer": "The Virtual DOM is a lightweight copy...",
    "timeSpent": 245,
    "confidence": "medium"
  }
}
```

**LLM Prompt Template**:

```
You are a supportive technical mentor providing constructive feedback on interview practice answers.

Question Asked:
"${question.question}"

User's Answer:
"${answer.answer}"

Context:
- Question Type: ${question.type}
- Difficulty: ${question.difficulty}
- Time Spent: ${answer.timeSpent} seconds
- User's Confidence Level: ${answer.confidence}

Your Task:
Provide encouraging, constructive feedback that helps the user learn and improve.

Guidelines:
1. Start with genuine positive feedback
   - Identify what they did well
   - Acknowledge their effort and approach
   - Highlight correct concepts or good reasoning

2. Provide constructive guidance
   - Point out areas to expand or clarify
   - Suggest additional concepts to consider
   - Offer alternative perspectives

3. Add encouragement
   - Motivate continued learning
   - Frame improvement areas positively
   - Acknowledge progress indicators

4. Suggest next steps
   - Specific resources to review
   - Practice recommendations
   - Related concepts to explore

Important Rules:
- NEVER use words like "wrong", "incorrect", "mistake"
- Instead use: "could be expanded", "consider also", "an alternative view"
- Focus on growth, not judgment
- Be specific and actionable
- Keep tone warm and supportive

Return JSON:
{
  "questionId": "${question.id}",
  "feedback": "Main feedback paragraph",
  "strengths": ["strength1", "strength2"],
  "areasForImprovement": ["area1", "area2"],
  "encouragement": "Motivational message",
  "nextSteps": ["step1", "step2"],
  "isPositive": true/false
}
```

### 4. Comprehensive Report Generation

**Endpoint**: `POST /api/generate-assessment-report`

**Request**:

```json
{
  "session": {
    "id": "session-123",
    "mode": "topic-based",
    "topic": {
      /* topic info */
    },
    "questions": [
      /* all questions */
    ],
    "answers": [
      /* all answers with confidence */
    ],
    "totalTime": 1800
  }
}
```

**LLM Prompt Template**:

```
You are an expert career coach analyzing an interview practice session.

Assessment Summary:
- Total Questions: ${questions.length}
- Questions Answered: ${answers.length}
- Total Time: ${formatTime(totalTime)}
- Topic: ${session.topic?.name || session.customInput?.topic}
- Difficulty: ${difficulty}

User's Performance:
${answers.map((a, i) => `
Question ${i+1}: ${questions[i].question.substring(0, 50)}...
Answer Quality: ${analyzeAnswer(a)}
Time: ${a.timeSpent}s
Confidence: ${a.confidence}
`).join('\n')}

Confidence Distribution:
- High: ${highCount} (${highPercent}%)
- Medium: ${mediumCount} (${mediumPercent}%)
- Low: ${lowCount} (${lowPercent}%)

Your Task:
Generate a comprehensive, encouraging assessment report.

Include:

1. Overall Performance Summary
   - Celebrate what they did well
   - Acknowledge their effort and commitment
   - Provide holistic view of progress

2. Key Strengths (3-5 points)
   - Specific skills demonstrated
   - Patterns of strong performance
   - Natural aptitudes noticed

3. Growth Opportunities (3-5 points)
   - Areas to develop further
   - Concepts needing more practice
   - Skills to strengthen
   - Frame as opportunities, not weaknesses

4. Personalized Recommendations (5-7 items)
   - Specific learning resources
   - Practice exercises
   - Related topics to explore
   - Community/networking suggestions

5. Next Steps Action Plan (3-5 items)
   - Immediate actions to take
   - Short-term goals (1-2 weeks)
   - Medium-term goals (1 month)
   - How to continue momentum

6. Encouragement & Motivation
   - Acknowledge the journey
   - Celebrate progress made
   - Inspire continued learning
   - Build confidence for interviews

Tone: Warm, supportive, professional
Focus: Growth mindset, continuous improvement
Avoid: Negative language, discouragement, judgment

Return JSON format:
{
  "overallScore": 75,  // 0-100, based on performance
  "strengths": ["strength1", "strength2"],
  "areasForImprovement": ["area1", "area2"],
  "recommendations": ["rec1", "rec2"],
  "nextSteps": ["step1", "step2"],
  "encouragement": "Personalized encouragement message",
  "readinessLevel": "Approaching interview-ready" | "Interview-ready" | "Needs more practice"
}
```

## 🔧 Implementation Examples

### OpenAI Integration

```typescript
// lib/openai-service.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTopicQuestions(
  topic: TopicOption,
  difficulty: DifficultyLevel
): Promise<Question[]> {
  const prompt = buildTopicQuestionsPrompt(topic, difficulty);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert technical interview coach...',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  const result = JSON.parse(completion.choices[0].message.content);
  return result.questions;
}
```

### Anthropic Claude Integration

```typescript
// lib/claude-service.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function evaluateAnswer(
  question: Question,
  answer: Answer
): Promise<AssessmentFeedback> {
  const prompt = buildEvaluationPrompt(question, answer);

  const message = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return JSON.parse(message.content[0].text);
}
```

### API Route Example (Next.js)

```typescript
// app/api/generate-questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateTopicQuestions } from '@/lib/openai-service';

export async function POST(request: NextRequest) {
  try {
    const { topic, difficulty } = await request.json();

    // Validate input
    if (!topic || !difficulty) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate questions using LLM
    const questions = await generateTopicQuestions(topic, difficulty);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
```

## 🚀 Optimization Strategies

### 1. Caching

```typescript
// Cache common questions
const cache = new Map<string, Question[]>();

export async function generateTopicQuestions(topic, difficulty) {
  const cacheKey = `${topic.id}-${difficulty}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const questions = await llmGenerate(topic, difficulty);
  cache.set(cacheKey, questions);

  return questions;
}
```

### 2. Streaming Responses

```typescript
// Stream questions as they're generated
export async function streamQuestions(topic, difficulty) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [...],
    stream: true,
  });

  for await (const chunk of stream) {
    yield chunk.choices[0]?.delta?.content || '';
  }
}
```

### 3. Batch Processing

```typescript
// Evaluate multiple answers in one call
export async function batchEvaluateAnswers(qa Pairs) {
  const prompt = qaPairs.map(pair =>
    buildEvaluationPrompt(pair.question, pair.answer)
  ).join('\n\n---\n\n');

  // Single LLM call for all evaluations
  const results = await llm.complete(prompt);
  return parseMultipleEvaluations(results);
}
```

## 📊 Cost Optimization

### Token Management

```typescript
// Estimate tokens before API call
import { encode } from 'gpt-tokenizer';

function estimateCost(prompt: string) {
  const tokens = encode(prompt).length;
  const costPer1kTokens = 0.01; // Adjust based on model
  return (tokens / 1000) * costPer1kTokens;
}

// Truncate long answers if needed
function truncateAnswer(answer: string, maxTokens: number = 500) {
  const tokens = encode(answer);
  if (tokens.length > maxTokens) {
    return decode(tokens.slice(0, maxTokens));
  }
  return answer;
}
```

### Model Selection

```typescript
// Use different models for different tasks
const models = {
  questionGeneration: 'gpt-4-turbo-preview', // High quality
  answerEvaluation: 'gpt-3.5-turbo', // Fast, cost-effective
  reportGeneration: 'gpt-4-turbo-preview', // Comprehensive
};
```

## 🔒 Security Best Practices

1. **API Key Protection**

   ```typescript
   // Never expose keys in frontend
   // Use environment variables
   const apiKey = process.env.OPENAI_API_KEY;
   ```

2. **Rate Limiting**

   ```typescript
   import rateLimit from 'express-rate-limit';

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
   });
   ```

3. **Input Sanitization**

   ```typescript
   function sanitizeInput(input: string): string {
     return input
       .trim()
       .slice(0, 1000) // Max length
       .replace(/<script>/gi, ''); // Remove scripts
   }
   ```

4. **Content Filtering**

   ```typescript
   // Use OpenAI's moderation endpoint
   const moderation = await openai.moderations.create({
     input: userAnswer,
   });

   if (moderation.results[0].flagged) {
     throw new Error('Content policy violation');
   }
   ```

## 📈 Monitoring & Analytics

```typescript
// Track LLM performance
interface LLMMetrics {
  requestId: string;
  endpoint: string;
  model: string;
  tokensUsed: number;
  latency: number;
  cost: number;
  success: boolean;
}

function trackLLMCall(metrics: LLMMetrics) {
  // Send to analytics service
  analytics.track('llm_api_call', metrics);
}
```

## 🎯 Testing LLM Integrations

```typescript
// Mock LLM for testing
export const mockLLMService = {
  generateQuestions: jest.fn().mockResolvedValue(mockQuestions),
  evaluateAnswer: jest.fn().mockResolvedValue(mockFeedback),
};

// Integration test
describe('Question Generation', () => {
  it('should generate valid questions', async () => {
    const questions = await generateTopicQuestions(mockTopic, 'intermediate');

    expect(questions).toHaveLength(15);
    expect(questions[0]).toMatchSchema(questionSchema);
  });
});
```

---

This guide provides everything needed to integrate your chosen LLM backend with the assessment system! 🚀

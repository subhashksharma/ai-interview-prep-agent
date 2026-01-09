# 🛠️ Technical Implementation Roadmap

> **Actionable steps to transform Career Buddy into an AI-powered personal career coach**

---

## 📦 Phase 1: Foundation Setup (Week 1-4)

### Week 1: AWS Infrastructure & Backend Setup

#### Day 1-2: AWS Account & Lambda Setup

```bash
# Install AWS CLI
brew install awscli

# Configure AWS credentials
aws configure

# Install Serverless Framework (recommended for Lambda management)
npm install -g serverless

# Create serverless project
serverless create --template aws-nodejs-typescript --path career-buddy-backend
cd career-buddy-backend
```

**Lambda Functions Structure:**

```
career-buddy-backend/
├── serverless.yml              # Infrastructure as code
├── package.json
├── tsconfig.json
└── src/
    ├── functions/
    │   ├── auth/
    │   │   ├── signup.ts
    │   │   ├── login.ts
    │   │   └── verify.ts
    │   ├── ai/
    │   │   ├── conversation.ts     # Claude conversation endpoint
    │   │   ├── assessment.ts       # Assessment orchestration
    │   │   └── feedback.ts         # Generate feedback
    │   ├── user/
    │   │   ├── profile.ts
    │   │   ├── progress.ts
    │   │   └── learning-path.ts
    │   └── analytics/
    │       ├── track-event.ts
    │       └── get-insights.ts
    ├── lib/
    │   ├── ai/
    │   │   ├── claude-client.ts
    │   │   ├── openai-client.ts
    │   │   └── rag-system.ts
    │   ├── db/
    │   │   ├── dynamodb-client.ts
    │   │   └── queries.ts
    │   └── utils/
    │       ├── validation.ts
    │       └── response.ts
    └── types/
        └── index.ts
```

**serverless.yml example:**

```yaml
service: career-buddy-api

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  stage: ${opt:stage, 'dev'}
  environment:
    DYNAMODB_TABLE: ${self:service}-${self:provider.stage}
    CLAUDE_API_KEY: ${env:CLAUDE_API_KEY}
    OPENAI_API_KEY: ${env:OPENAI_API_KEY}
    PINECONE_API_KEY: ${env:PINECONE_API_KEY}

  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:Query
            - dynamodb:Scan
            - dynamodb:GetItem
            - dynamodb:PutItem
            - dynamodb:UpdateItem
            - dynamodb:DeleteItem
          Resource: 'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}*'

functions:
  # Auth Functions
  signup:
    handler: src/functions/auth/signup.handler
    events:
      - http:
          path: auth/signup
          method: post
          cors: true

  # AI Functions
  conversation:
    handler: src/functions/ai/conversation.handler
    timeout: 30
    events:
      - http:
          path: ai/conversation
          method: post
          cors: true
          authorizer: aws_iam

resources:
  Resources:
    UsersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:provider.environment.DYNAMODB_TABLE}-users
        AttributeDefinitions:
          - AttributeName: userId
            AttributeType: S
        KeySchema:
          - AttributeName: userId
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST

plugins:
  - serverless-plugin-typescript
  - serverless-offline
```

#### Day 3-4: DynamoDB Schema Design

**Tables:**

```typescript
// users-table
interface UserRecord {
  PK: `USER#${string}`; // Partition Key: USER#user123
  SK: 'PROFILE'; // Sort Key
  userId: string;
  email: string;
  name: string;
  createdAt: string;
  // Profile data
  targetRole?: string;
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'lead';
  resumeS3Key?: string;
  onboardingCompleted: boolean;
}

// user-progress-table
interface ProgressRecord {
  PK: `USER#${string}`;
  SK: `PROGRESS#${string}`; // PROGRESS#2024-01-06
  currentLevel: number;
  skillLevels: Record<string, SkillLevel>;
  completedModules: string[];
  streakDays: number;
  lastActive: string;
}

// learning-paths-table
interface LearningPathRecord {
  PK: `USER#${string}`;
  SK: `PATH#${string}`; // PATH#path123
  pathId: string;
  targetRole: string;
  currentPhase: string;
  phases: Phase[];
  estimatedDuration: number;
  createdAt: string;
  lastModified: string;
}

// assessments-table
interface AssessmentRecord {
  PK: `USER#${string}`;
  SK: `ASSESSMENT#${string}`; // ASSESSMENT#2024-01-06T12:00:00Z
  assessmentId: string;
  mode: AssessmentMode;
  timestamp: string;
  duration: number;
  score: number;
  performanceBreakdown: Record<string, number>;
  behavioralInsights: BehavioralInsights;
  feedback: Feedback;
}

// conversations-table (for AI chat history)
interface ConversationRecord {
  PK: `USER#${string}`;
  SK: `MSG#${string}`; // MSG#timestamp
  messageId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sessionId: string;
}
```

**Create tables with AWS CLI:**

```bash
# Create users table
aws dynamodb create-table \
  --table-name career-buddy-dev-users \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST

# Repeat for other tables...
```

#### Day 5-7: LLM Integration

**1. Install dependencies:**

```bash
npm install @anthropic-ai/sdk openai @pinecone-database/pinecone
```

**2. Create AI clients:**

```typescript
// src/lib/ai/claude-client.ts
import Anthropic from '@anthropic-ai/sdk';

export class ClaudeClient {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
  }

  async chat(params: {
    messages: { role: 'user' | 'assistant'; content: string }[];
    systemPrompt?: string;
    maxTokens?: number;
  }) {
    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: params.maxTokens || 4096,
      system: params.systemPrompt || this.getDefaultSystemPrompt(),
      messages: params.messages,
    });

    return {
      content: response.content[0].type === 'text' ? response.content[0].text : '',
      usage: response.usage,
    };
  }

  private getDefaultSystemPrompt(): string {
    return `You are an empathetic AI career coach for Career Buddy. Your role is to:

1. Deeply understand each user through thoughtful questions
2. Provide personalized guidance based on their unique situation
3. Be encouraging and supportive, never judgmental
4. Adapt your teaching style to their learning preferences
5. Celebrate small wins and progress
6. Help users overcome anxiety and build confidence

Remember:
- Ask follow-up questions to understand deeply
- Use examples and analogies
- Break complex topics into digestible pieces
- Acknowledge struggles and frustrations
- Focus on growth, not perfection`;
  }
}

// src/lib/ai/openai-client.ts
import OpenAI from 'openai';

export class OpenAIClient {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(params: {
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
    model?: string;
    responseFormat?: 'json_object';
  }) {
    const response = await this.client.chat.completions.create({
      model: params.model || 'gpt-4-turbo-preview',
      messages: params.messages,
      ...(params.responseFormat && { response_format: { type: params.responseFormat } }),
    });

    return {
      content: response.choices[0].message.content || '',
      usage: response.usage,
    };
  }

  async embed(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }
}

// src/lib/ai/rag-system.ts
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIClient } from './openai-client';

export class RAGSystem {
  private pinecone: Pinecone;
  private openai: OpenAIClient;
  private indexName = 'career-buddy-knowledge';

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    this.openai = new OpenAIClient();
  }

  async retrieveContext(params: {
    query: string;
    topK?: number;
    filter?: Record<string, any>;
  }): Promise<any[]> {
    // Get query embedding
    const queryEmbedding = await this.openai.embed(params.query);

    // Search in Pinecone
    const index = this.pinecone.index(this.indexName);
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: params.topK || 5,
      includeMetadata: true,
      filter: params.filter,
    });

    return (
      queryResponse.matches?.map((match) => ({
        content: match.metadata?.content,
        score: match.score,
        metadata: match.metadata,
      })) || []
    );
  }

  async augmentPrompt(userQuery: string, userProfile: any): Promise<string> {
    // Retrieve relevant context
    const contexts = await this.retrieveContext({
      query: userQuery,
      topK: 3,
      filter: {
        experienceLevel: userProfile.experienceLevel,
        targetRole: userProfile.targetRole,
      },
    });

    // Build augmented prompt
    const contextText = contexts.map((ctx) => ctx.content).join('\n\n');

    return `Context from knowledge base:
${contextText}

User query: ${userQuery}

Based on the context above and the user's profile (${userProfile.experienceLevel} level targeting ${userProfile.targetRole}), provide a helpful response.`;
  }
}
```

**3. Create conversation handler:**

```typescript
// src/functions/ai/conversation.ts
import { ClaudeClient } from '../../lib/ai/claude-client';
import { RAGSystem } from '../../lib/ai/rag-system';
import { DynamoDBClient } from '../../lib/db/dynamodb-client';

export const handler = async (event: any) => {
  try {
    const { userId, message, sessionId } = JSON.parse(event.body);

    const db = new DynamoDBClient();
    const claude = new ClaudeClient();
    const rag = new RAGSystem();

    // Get user profile
    const userProfile = await db.getUserProfile(userId);

    // Get conversation history
    const history = await db.getConversationHistory(userId, sessionId);

    // Augment with RAG context
    const augmentedMessage = await rag.augmentPrompt(message, userProfile);

    // Build messages array
    const messages = [
      ...history.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: augmentedMessage,
      },
    ];

    // Get AI response
    const response = await claude.chat({ messages });

    // Save conversation
    await db.saveConversation(userId, sessionId, [
      { role: 'user', content: message },
      { role: 'assistant', content: response.content },
    ]);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: response.content,
        usage: response.usage,
      }),
    };
  } catch (error) {
    console.error('Conversation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
```

---

### Week 2: Frontend Authentication & State Management

#### Day 1-3: NextAuth.js Setup

```bash
# Install dependencies
npm install next-auth @auth/core @aws-sdk/client-dynamodb
```

**Create auth configuration:**

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Call your Lambda auth function
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).userId = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
});

export { handler as GET, handler as POST };
```

**Create sign-in page:**

```tsx
// app/auth/signin/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard',
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50'>
      <Card className='w-full max-w-md p-8'>
        <h1 className='text-2xl font-bold mb-6'>Sign In to Career Buddy</h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-4'>
          <div>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type='submit'
            className='w-full'>
            Sign In
          </Button>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>Or continue with</span>
            </div>
          </div>

          <Button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            variant='outline'
            className='w-full mt-4'>
            Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

#### Day 4-5: State Management with Zustand

```bash
npm install zustand
```

```typescript
// lib/store/user-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  userId: string;
  name: string;
  email: string;
  targetRole?: string;
  experienceLevel?: string;
  onboardingCompleted: boolean;
}

interface UserState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

// lib/store/learning-path-store.ts
import { create } from 'zustand';

interface LearningPathState {
  currentPath: any | null;
  currentModule: any | null;
  progress: number;
  setCurrentPath: (path: any) => void;
  setCurrentModule: (module: any) => void;
  updateProgress: (progress: number) => void;
}

export const useLearningPathStore = create<LearningPathState>((set) => ({
  currentPath: null,
  currentModule: null,
  progress: 0,
  setCurrentPath: (path) => set({ currentPath: path }),
  setCurrentModule: (module) => set({ currentModule: module }),
  updateProgress: (progress) => set({ progress }),
}));

// lib/store/conversation-store.ts
import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
}));
```

---

### Week 3: Enhanced Onboarding Flow

#### Create Conversational Discovery Component

```tsx
// components/onboarding/conversational-discovery.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { useConversationStore } from '@/lib/store/conversation-store';
import { useUserStore } from '@/lib/store/user-store';

export default function ConversationalDiscovery() {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, isLoading, addMessage, setLoading } = useConversationStore();
  const { profile } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessionId = useRef(crypto.randomUUID()).current;

  useEffect(() => {
    // Send initial greeting
    if (messages.length === 0) {
      addMessage({
        role: 'assistant',
        content: `Hi ${
          profile?.name || 'there'
        }! 👋 I'm your AI career coach, and I'm here to help you succeed in your interview preparation journey.

Let's start by getting to know you better. This isn't a quiz - just a friendly conversation! 

What role are you currently preparing for?`,
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    addMessage({ role: 'user', content: userMessage });
    setLoading(true);

    try {
      const response = await fetch('/api/ai/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile?.userId,
          message: userMessage,
          sessionId,
        }),
      });

      const data = await response.json();
      addMessage({ role: 'assistant', content: data.message });
    } catch (error) {
      console.error('Failed to send message:', error);
      addMessage({
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Can you try again?",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-3xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-6'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className='inline-flex items-center justify-center p-3 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl'>
            <Sparkles className='w-6 h-6 text-white' />
          </motion.div>
          <h1 className='text-3xl font-bold mb-2'>Let's Get to Know You</h1>
          <p className='text-muted-foreground'>
            This helps me create the perfect learning journey for you
          </p>
        </div>

        {/* Chat Container */}
        <Card className='h-[600px] flex flex-col'>
          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-6 space-y-4'>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}>
                    <p className='whitespace-pre-wrap'>{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex justify-start'>
                <div className='bg-slate-100 rounded-2xl px-4 py-3'>
                  <Loader2 className='w-5 h-5 animate-spin text-slate-500' />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className='p-4 border-t'>
            <div className='flex gap-2'>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder='Type your message...'
                className='flex-1'
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !inputMessage.trim()}
                size='icon'>
                <Send className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
```

---

### Week 4: Vector Database & Knowledge Base

#### Set up Pinecone and populate knowledge

```typescript
// scripts/populate-knowledge-base.ts
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';
import * as fs from 'fs';

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

interface KnowledgeItem {
  id: string;
  content: string;
  metadata: {
    category: string;
    topic: string;
    experienceLevel: string[];
    targetRole: string[];
  };
}

async function embedAndUpsert(items: KnowledgeItem[]) {
  const index = pinecone.index('career-buddy-knowledge');

  // Process in batches of 100
  const batchSize = 100;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    // Get embeddings
    const embeddings = await Promise.all(
      batch.map(async (item) => {
        const response = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: item.content,
        });
        return response.data[0].embedding;
      })
    );

    // Prepare vectors
    const vectors = batch.map((item, idx) => ({
      id: item.id,
      values: embeddings[idx],
      metadata: {
        content: item.content,
        ...item.metadata,
      },
    }));

    // Upsert to Pinecone
    await index.upsert(vectors);

    console.log(`Processed ${i + batch.length}/${items.length} items`);
  }
}

// Knowledge base content
const knowledgeBase: KnowledgeItem[] = [
  {
    id: 'ds-001',
    content: `# Arrays and Hash Tables

Arrays provide O(1) access but O(n) insertion at arbitrary positions.
Hash tables provide O(1) average case for insert, delete, and lookup.

Common patterns:
- Two pointer technique for sorted arrays
- Sliding window for subarray problems
- Hash map for counting frequencies

Interview tips:
- Always ask about edge cases (empty array, duplicates, etc.)
- Clarify if the array is sorted
- Consider space-time tradeoffs`,
    metadata: {
      category: 'data-structures',
      topic: 'arrays-hash-tables',
      experienceLevel: ['entry', 'mid'],
      targetRole: ['software-engineer', 'backend-engineer', 'full-stack'],
    },
  },
  {
    id: 'sd-001',
    content: `# System Design: Rate Limiting

Common algorithms:
1. Token Bucket: Tokens refilled at fixed rate, consumed per request
2. Leaky Bucket: Requests processed at fixed rate, queue overflow drops requests
3. Fixed Window: Simple counter per time window
4. Sliding Window Log: More accurate but memory intensive

When to use:
- API rate limiting: Token bucket (allows bursts)
- Request throttling: Leaky bucket (smooth rate)
- DDoS protection: Combination approach

Interview approach:
1. Clarify requirements (distributed? per-user? global?)
2. Start simple, then optimize
3. Discuss trade-offs`,
    metadata: {
      category: 'system-design',
      topic: 'rate-limiting',
      experienceLevel: ['mid', 'senior'],
      targetRole: ['backend-engineer', 'software-engineer', 'architect'],
    },
  },
  // Add hundreds more...
];

// Run population
embedAndUpsert(knowledgeBase)
  .then(() => console.log('Knowledge base populated!'))
  .catch(console.error);
```

---

## 🎭 Phase 2: Novel Assessments (Week 5-12)

### Scenario Theater Implementation

```tsx
// components/assessments/scenario-theater/scenario-engine.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScenarioNode {
  id: string;
  type: 'story' | 'decision' | 'consequence' | 'end';
  content: string;
  options?: {
    id: string;
    text: string;
    nextNodeId: string;
    skillsAssessed: string[];
  }[];
  imageUrl?: string;
  codeSnippet?: string;
}

interface ScenarioTheaterProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    nodes: ScenarioNode[];
    startNodeId: string;
  };
  onComplete: (results: any) => void;
}

export default function ScenarioTheater({ scenario, onComplete }: ScenarioTheaterProps) {
  const [currentNodeId, setCurrentNodeId] = useState(scenario.startNodeId);
  const [history, setHistory] = useState<string[]>([scenario.startNodeId]);
  const [decisions, setDecisions] = useState<Record<string, string>>({});

  const currentNode = scenario.nodes.find((n) => n.id === currentNodeId)!;

  const handleDecision = (optionId: string, nextNodeId: string) => {
    setDecisions((prev) => ({ ...prev, [currentNodeId]: optionId }));
    setHistory((prev) => [...prev, nextNodeId]);
    setCurrentNodeId(nextNodeId);

    // If it's an end node, complete the scenario
    const nextNode = scenario.nodes.find((n) => n.id === nextNodeId);
    if (nextNode?.type === 'end') {
      onComplete({
        scenarioId: scenario.id,
        decisions,
        path: history,
      });
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      {/* Progress */}
      <div className='mb-6'>
        <div className='flex items-center gap-2 mb-2'>
          {history.map((nodeId, idx) => (
            <div
              key={idx}
              className='flex items-center'>
              <div
                className={`w-3 h-3 rounded-full ${
                  idx === history.length - 1 ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              />
              {idx < history.length - 1 && <div className='w-8 h-0.5 bg-slate-300' />}
            </div>
          ))}
        </div>
        <p className='text-sm text-muted-foreground'>Step {history.length} of scenario</p>
      </div>

      {/* Current Node */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}>
          <Card className='p-8'>
            <Badge className='mb-4'>{currentNode.type}</Badge>

            {/* Content */}
            <div className='prose max-w-none mb-6'>
              <p className='text-lg whitespace-pre-wrap'>{currentNode.content}</p>
            </div>

            {/* Code Snippet */}
            {currentNode.codeSnippet && (
              <pre className='bg-slate-900 text-white p-4 rounded-lg mb-6 overflow-x-auto'>
                <code>{currentNode.codeSnippet}</code>
              </pre>
            )}

            {/* Options */}
            {currentNode.options && (
              <div className='space-y-3'>
                <p className='font-semibold mb-4'>What do you do?</p>
                {currentNode.options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleDecision(option.id, option.nextNodeId)}
                    variant='outline'
                    className='w-full justify-start text-left h-auto py-4 px-6'>
                    <span className='flex-1'>{option.text}</span>
                  </Button>
                ))}
              </div>
            )}

            {/* End Node */}
            {currentNode.type === 'end' && (
              <div className='mt-6 p-4 bg-green-50 rounded-lg border border-green-200'>
                <p className='font-semibold text-green-900 mb-2'>Scenario Complete! 🎉</p>
                <p className='text-sm text-green-700'>
                  We're analyzing your decisions and preparing your feedback...
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

**Example Scenario Data:**

```typescript
// lib/scenarios/code-review-crisis.ts
export const codeReviewCrisisScenario = {
  id: 'cr-001',
  title: 'The Critical Code Review',
  description: 'A junior developer submitted a PR hours before deployment. What do you do?',
  nodes: [
    {
      id: 'start',
      type: 'story',
      content: `It's Friday afternoon, 3 PM. Your team is planning to deploy a critical feature at 6 PM.

You receive a notification: Junior developer Sarah has submitted a PR titled "Quick fix for user authentication bug".

You open the PR and notice:
- 500+ lines changed across 15 files
- No tests added
- Several console.log() statements left in
- A hardcoded API key in one file
- The PR description just says "Fixed the bug"

The bug she's fixing is indeed critical - users can't log in. But this PR has serious issues.

What's your move?`,
      options: [
        {
          id: 'approve-quickly',
          text: 'Approve it - we need the fix deployed ASAP',
          nextNodeId: 'consequence-approve',
          skillsAssessed: ['risk-assessment', 'decision-making'],
        },
        {
          id: 'request-changes',
          text: 'Request changes and explain each issue clearly',
          nextNodeId: 'consequence-request',
          skillsAssessed: ['code-review', 'communication', 'mentorship'],
        },
        {
          id: 'fix-yourself',
          text: 'Quickly fix the critical issues yourself and merge',
          nextNodeId: 'consequence-fix',
          skillsAssessed: ['time-management', 'technical-skills'],
        },
        {
          id: 'pair-session',
          text: 'Jump on a call with Sarah to review and fix together',
          nextNodeId: 'consequence-pair',
          skillsAssessed: ['mentorship', 'collaboration', 'time-management'],
        },
      ],
    },
    {
      id: 'consequence-pair',
      type: 'consequence',
      content: `You message Sarah: "Hey! Let's jump on a quick call to review this together."

Sarah joins the call, a bit nervous. You screen share and walk through the code together.

"This is great that you tackled this bug! Let's just clean up a few things before we merge."

You spend 30 minutes together:
- Removing console.logs
- Moving the API key to environment variables
- Adding basic tests
- Improving the PR description

Sarah learns from the process and you ensure code quality. By 5 PM, you merge a clean PR.

🎯 Excellent Choice!

You demonstrated:
✓ Mentorship and patience
✓ Quality assurance without being a blocker
✓ Time management under pressure
✓ Building team capability`,
      options: [
        {
          id: 'complete',
          text: 'Continue',
          nextNodeId: 'end',
          skillsAssessed: [],
        },
      ],
    },
    // More nodes...
    {
      id: 'end',
      type: 'end',
      content: 'Scenario complete! Analyzing your decisions...',
    },
  ],
  startNodeId: 'start',
};
```

This is getting quite long! I'll create additional implementation guides in separate files.

---

**Continue to next implementation file for:**

- Pair Programming with AI
- Debate Mode
- Teach-Back Sessions
- Crisis Simulations
- Gamification System
- Dashboard Components

Would you like me to continue with the remaining implementation details?

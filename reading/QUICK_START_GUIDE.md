# 🚀 Quick Start Guide - AI Career Coach

> **Get started building your AI-powered personal career coach in 30 minutes**

---

## ⚡ Prerequisites

Before starting, ensure you have:

- [ ] Node.js 18+ installed
- [ ] AWS Account (free tier is fine)
- [ ] Claude API key from Anthropic
- [ ] OpenAI API key
- [ ] Pinecone account (free tier)
- [ ] Git installed

---

## 📦 Step 1: Environment Setup (10 minutes)

### 1.1 Clone and Install Dependencies

```bash
cd /Users/sharma/Documents/CAREERBUDDY/ai-agent

# Install frontend dependencies (already done)
npm install

# Install additional required packages
npm install next-auth @auth/core zustand @anthropic-ai/sdk openai @pinecone-database/pinecone
```

### 1.2 Create Environment Variables

Create `.env.local` in the root directory:

```bash
# Create .env.local file
touch .env.local
```

Add the following (replace with your actual keys):

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-here # Run: openssl rand -base64 32

# API URLs
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.amazonaws.com/dev

# LLM APIs
ANTHROPIC_API_KEY=your-claude-api-key-here
OPENAI_API_KEY=your-openai-api-key-here

# Vector Database
PINECONE_API_KEY=your-pinecone-api-key-here
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=career-buddy-knowledge

# AWS (for backend Lambda functions)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

# Google OAuth (optional, for social login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 1.3 Get API Keys

#### Claude API (Anthropic)

```bash
# Visit: https://console.anthropic.com/
# Sign up → API Keys → Create Key
# Cost: ~$3 per 1M input tokens, $15 per 1M output tokens
```

#### OpenAI API

```bash
# Visit: https://platform.openai.com/api-keys
# Create API Key
# Cost: GPT-4 Turbo ~$10 per 1M input tokens
```

#### Pinecone (Vector Database)

```bash
# Visit: https://www.pinecone.io/
# Sign up for free tier
# Create a project → Get API Key
# Free tier: 1 index, 100K vectors
```

---

## 🏗️ Step 2: Backend Setup (15 minutes)

### 2.1 Create Backend Directory Structure

```bash
# Create backend project directory
mkdir -p ../career-buddy-backend
cd ../career-buddy-backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install @anthropic-ai/sdk openai @pinecone-database/pinecone aws-sdk
npm install --save-dev typescript @types/node @types/aws-lambda
```

### 2.2 Create Lambda Function Structure

```bash
mkdir -p src/functions/ai src/lib/ai
```

Create a simple conversation handler:

```typescript
// src/functions/ai/conversation.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const handler = async (event: any) => {
  try {
    const { message, userId } = JSON.parse(event.body);

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: `You are an empathetic AI career coach. Your role is to understand users deeply and guide them through their interview preparation journey with encouragement and practical advice.`,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const aiMessage = response.content[0].type === 'text' ? response.content[0].text : '';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: aiMessage,
        usage: response.usage,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
```

### 2.3 Test Lambda Locally

Create a test script:

```typescript
// test-conversation.ts
import { handler } from './src/functions/ai/conversation';

async function test() {
  const event = {
    body: JSON.stringify({
      message: 'I want to prepare for a software engineering interview at a FAANG company.',
      userId: 'test-user',
    }),
  };

  const response = await handler(event, {} as any, {} as any);
  console.log(JSON.parse(response.body));
}

test();
```

Run it:

```bash
ts-node test-conversation.ts
```

---

## 🎨 Step 3: Frontend Updates (5 minutes)

### 3.1 Create API Client

```typescript
// lib/api/ai-client.ts
export class AIClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  async sendMessage(params: {
    message: string;
    userId: string;
    sessionId?: string;
  }): Promise<{ message: string; usage?: any }> {
    const response = await fetch(`${this.baseUrl}/ai/conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  }
}

export const aiClient = new AIClient();
```

### 3.2 Create Dashboard Page

```tsx
// app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Target, Brain, Zap } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-2'>Welcome back, {session?.user?.name}! 👋</h1>
          <p className='text-muted-foreground'>Ready to continue your journey?</p>
        </div>

        {/* Quick Actions */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {[
            {
              icon: Sparkles,
              title: 'AI Coach',
              description: 'Chat with your personal coach',
              href: '/coach/chat',
              color: 'from-blue-500 to-purple-500',
            },
            {
              icon: Target,
              title: 'Assessments',
              description: 'Try novel assessment modes',
              href: '/assessments',
              color: 'from-amber-500 to-orange-500',
            },
            {
              icon: Brain,
              title: 'Learning Path',
              description: 'Continue your journey',
              href: '/journey',
              color: 'from-green-500 to-teal-500',
            },
            {
              icon: Zap,
              title: 'Quick Practice',
              description: '15-min focused session',
              href: '/practice/quick',
              color: 'from-pink-500 to-rose-500',
            },
          ].map((action, idx) => {
            const Icon = action.icon;
            return (
              <Card
                key={idx}
                className='p-6 hover:shadow-lg transition-shadow cursor-pointer'>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                  <Icon className='w-6 h-6 text-white' />
                </div>
                <h3 className='font-bold mb-2'>{action.title}</h3>
                <p className='text-sm text-muted-foreground mb-4'>{action.description}</p>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full'>
                  Get Started
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Progress Overview */}
        <Card className='p-6'>
          <h2 className='text-2xl font-bold mb-4'>Your Progress</h2>
          <div className='grid md:grid-cols-3 gap-6'>
            <div>
              <p className='text-sm text-muted-foreground mb-1'>Learning Streak</p>
              <p className='text-3xl font-bold'>7 days 🔥</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground mb-1'>Assessments Completed</p>
              <p className='text-3xl font-bold'>12</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground mb-1'>Skills Improved</p>
              <p className='text-3xl font-bold'>5 📈</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
```

### 3.3 Update App Layout for Protected Routes

```tsx
// app/layout.tsx - Add session provider
import { SessionProvider } from 'next-auth/react';

// Wrap your app in SessionProvider
```

---

## 🧪 Step 4: Test the Integration

### 4.1 Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4.2 Test Flow

1. Navigate to sign in page
2. Create an account
3. Access dashboard
4. Try the AI coach chat (once backend is deployed)

---

## 🚀 Step 5: Deploy Backend to AWS Lambda

### 5.1 Install Serverless Framework

```bash
npm install -g serverless
```

### 5.2 Create serverless.yml

```yaml
# career-buddy-backend/serverless.yml
service: career-buddy-api

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  stage: ${opt:stage, 'dev'}
  environment:
    ANTHROPIC_API_KEY: ${env:ANTHROPIC_API_KEY}
    OPENAI_API_KEY: ${env:OPENAI_API_KEY}
    PINECONE_API_KEY: ${env:PINECONE_API_KEY}

functions:
  conversation:
    handler: src/functions/ai/conversation.handler
    timeout: 30
    events:
      - http:
          path: ai/conversation
          method: post
          cors: true

plugins:
  - serverless-plugin-typescript
  - serverless-offline
```

### 5.3 Deploy

```bash
# Install plugins
npm install --save-dev serverless-plugin-typescript serverless-offline

# Deploy to AWS
serverless deploy

# Output will show your API Gateway URL
# Update NEXT_PUBLIC_API_URL in .env.local with this URL
```

---

## 📊 Step 6: Verify Everything Works

### Checklist:

- [ ] Frontend runs on localhost:3000
- [ ] Can sign up/sign in
- [ ] Dashboard loads
- [ ] Backend Lambda deployed to AWS
- [ ] API Gateway URL configured
- [ ] Can send a message to AI coach
- [ ] Receives response from Claude

### Test AI Integration:

```bash
# Test your deployed endpoint
curl -X POST https://your-api-url.amazonaws.com/dev/ai/conversation \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hi! I want to prepare for a software engineering interview.",
    "userId": "test-user"
  }'
```

---

## 🎯 Next Steps

Now that you have the foundation working, you can:

1. **Implement Conversational Onboarding** (Week 2)

   - Create multi-turn conversation flow
   - Add conversation history storage
   - Implement user profile building

2. **Add Vector Database** (Week 3)

   - Set up Pinecone index
   - Populate knowledge base
   - Implement RAG system

3. **Build First Novel Assessment** (Week 4)

   - Implement Scenario Theater
   - Create sample scenarios
   - Add decision tracking

4. **Add Gamification** (Week 5)
   - Streak tracking
   - Achievement system
   - Progress visualization

---

## 🐛 Troubleshooting

### Issue: CORS errors when calling API

**Solution**: Add CORS headers in Lambda response:

```typescript
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
```

### Issue: Claude API rate limit

**Solution**: Implement request queuing or use exponential backoff:

```typescript
async function retryWithBackoff(fn: () => Promise<any>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.status === 429 && i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      } else {
        throw error;
      }
    }
  }
}
```

### Issue: Large bundle size

**Solution**: Use dynamic imports for heavy components:

```typescript
const ScenarioTheater = dynamic(() => import('@/components/assessments/scenario-theater'), {
  loading: () => <div>Loading...</div>,
});
```

---

## 💡 Pro Tips

1. **Start Simple**: Get the basic AI conversation working first before adding complex features

2. **Use Mock Data**: Create mock responses for development to avoid API costs:

   ```typescript
   const isDev = process.env.NODE_ENV === 'development';
   if (isDev) {
     return { message: 'Mock AI response' };
   }
   ```

3. **Monitor Costs**: Set up AWS CloudWatch alarms for Lambda invocations and Claude API usage

4. **User Testing**: Get real users testing early - their feedback is invaluable

5. **Incremental Deployment**: Deploy features one at a time, test thoroughly before moving to the next

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Claude API Docs](https://docs.anthropic.com/claude/docs)
- [AWS Lambda Guide](https://docs.aws.amazon.com/lambda/)
- [Pinecone Quickstart](https://docs.pinecone.io/docs/quickstart)
- [Serverless Framework](https://www.serverless.com/framework/docs)

---

## 🎉 You're Ready to Build!

Follow the Strategic Plan document for the full feature roadmap and continue with the Technical Implementation Roadmap for detailed guidance on each phase.

**Questions?** Review the documentation or reach out for help.

**Let's build something amazing! 🚀**

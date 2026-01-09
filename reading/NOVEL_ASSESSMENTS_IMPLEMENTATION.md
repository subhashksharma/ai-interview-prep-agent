# 🎭 Novel Assessment Methods - Implementation Guide

> **Detailed implementation for Scenario Theater, Pair Programming, Debate Mode, Teach-Back, and Crisis Simulations**

---

## 🎪 1. Scenario Theater™ - Interactive Story-Based Assessments

### Architecture

```
┌─────────────────────────────────────────────────┐
│           Scenario Theater Engine               │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐      ┌──────────────┐        │
│  │  Story Tree  │─────>│  AI Analyzer │        │
│  │  Navigation  │      │              │        │
│  └──────────────┘      └──────────────┘        │
│         │                      │                │
│         v                      v                │
│  ┌──────────────┐      ┌──────────────┐        │
│  │   Decision   │      │  Feedback    │        │
│  │   Tracking   │      │  Generator   │        │
│  └──────────────┘      └──────────────┘        │
└─────────────────────────────────────────────────┘
```

### Data Structure

```typescript
// types/scenario-theater.ts

export interface ScenarioTheater {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'leadership';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // minutes
  learningObjectives: string[];
  nodes: ScenarioNode[];
  startNodeId: string;
  skillsAssessed: Skill[];
}

export interface ScenarioNode {
  id: string;
  type: 'story' | 'decision' | 'consequence' | 'reflection' | 'end';
  content: string;

  // Media
  imageUrl?: string;
  codeSnippet?: {
    language: string;
    code: string;
    highlight?: number[];
  };

  // Decision points
  options?: DecisionOption[];

  // Metadata
  emotionalTone?: 'neutral' | 'stressful' | 'exciting' | 'challenging';
  timeLimit?: number; // seconds, for timed decisions

  // Scoring
  correctOptionIds?: string[]; // For scoring if applicable
  pointsAwarded?: number;
}

export interface DecisionOption {
  id: string;
  text: string;
  nextNodeId: string;
  skillsAssessed: string[];

  // Immediate feedback
  quickFeedback?: string;

  // Consequences
  consequences?: {
    immediate: string;
    longTerm: string;
  };

  // Scoring
  score?: number;
  isOptimal?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface ScenarioResult {
  scenarioId: string;
  userId: string;
  startedAt: Date;
  completedAt: Date;
  duration: number;

  // Journey
  path: string[]; // Node IDs visited
  decisions: {
    nodeId: string;
    optionId: string;
    timestamp: Date;
    timeSpent: number; // seconds
  }[];

  // Performance
  score: number;
  maxScore: number;
  skillsAssessment: {
    [skillId: string]: {
      demonstrated: number; // 0-100
      opportunities: number;
      examples: string[];
    };
  };

  // Analysis
  decisionPatterns: {
    riskTolerance: 'low' | 'medium' | 'high';
    thinkingSpeed: 'deliberate' | 'balanced' | 'quick';
    communicationStyle: string;
    leadershipApproach?: string;
  };

  // Feedback
  feedback: {
    strengths: string[];
    growthAreas: string[];
    recommendations: string[];
    aiAnalysis: string;
  };
}
```

### Component Implementation

```tsx
// components/assessments/scenario-theater/theater-engine.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { ScenarioTheater, ScenarioNode, DecisionOption } from '@/types/scenario-theater';
import { CodeBlock } from './code-block';
import { DecisionTimer } from './decision-timer';

interface TheaterEngineProps {
  scenario: ScenarioTheater;
  onComplete: (result: any) => void;
  onExit: () => void;
}

export default function TheaterEngine({ scenario, onComplete, onExit }: TheaterEngineProps) {
  const [currentNodeId, setCurrentNodeId] = useState(scenario.startNodeId);
  const [history, setHistory] = useState<string[]>([scenario.startNodeId]);
  const [decisions, setDecisions] = useState<any[]>([]);
  const [startTime] = useState(new Date());
  const [nodeStartTime, setNodeStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState('');

  const currentNode = scenario.nodes.find((n) => n.id === currentNodeId)!;
  const progressPercent = (history.length / scenario.nodes.length) * 100;

  const handleDecision = async (option: DecisionOption) => {
    const timeSpent = Math.floor((Date.now() - nodeStartTime) / 1000);

    // Record decision
    const decision = {
      nodeId: currentNodeId,
      optionId: option.id,
      timestamp: new Date(),
      timeSpent,
      skillsAssessed: option.skillsAssessed,
    };

    setDecisions((prev) => [...prev, decision]);

    // Show quick feedback if available
    if (option.quickFeedback) {
      setCurrentFeedback(option.quickFeedback);
      setShowFeedback(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowFeedback(false);
    }

    // Move to next node
    setHistory((prev) => [...prev, option.nextNodeId]);
    setCurrentNodeId(option.nextNodeId);
    setNodeStartTime(Date.now());

    // Check if scenario is complete
    const nextNode = scenario.nodes.find((n) => n.id === option.nextNodeId);
    if (nextNode?.type === 'end') {
      await completeScenario();
    }
  };

  const completeScenario = async () => {
    const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);

    // Call AI to analyze the journey
    const result = await analyzeScenarioPerformance({
      scenarioId: scenario.id,
      decisions,
      path: history,
      duration,
    });

    onComplete(result);
  };

  const analyzeScenarioPerformance = async (data: any) => {
    // Call backend AI analysis
    const response = await fetch('/api/assessments/analyze-scenario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4'>
      {/* Header */}
      <div className='max-w-4xl mx-auto mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h1 className='text-2xl font-bold'>{scenario.title}</h1>
            <p className='text-sm text-muted-foreground'>
              {scenario.category} • {scenario.difficulty}
            </p>
          </div>
          <Button
            variant='ghost'
            onClick={onExit}>
            Exit
          </Button>
        </div>

        {/* Progress Bar */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span>Progress</span>
            <span>
              {history.length} / {scenario.nodes.length} steps
            </span>
          </div>
          <Progress
            value={progressPercent}
            className='h-2'
          />
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-4xl mx-auto'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentNodeId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}>
            <Card className='p-8'>
              {/* Node Type Badge */}
              <div className='flex items-center gap-2 mb-4'>
                <Badge variant={currentNode.type === 'decision' ? 'default' : 'secondary'}>
                  {currentNode.type}
                </Badge>
                {currentNode.emotionalTone && (
                  <Badge variant='outline'>{currentNode.emotionalTone}</Badge>
                )}
                {currentNode.timeLimit && (
                  <DecisionTimer
                    seconds={currentNode.timeLimit}
                    onExpire={() => {
                      // Auto-select first option or show consequence
                      if (currentNode.options?.[0]) {
                        handleDecision(currentNode.options[0]);
                      }
                    }}
                  />
                )}
              </div>

              {/* Story Content */}
              <div className='prose max-w-none mb-6'>
                <p className='text-lg leading-relaxed whitespace-pre-wrap'>{currentNode.content}</p>
              </div>

              {/* Code Snippet */}
              {currentNode.codeSnippet && (
                <div className='mb-6'>
                  <CodeBlock
                    language={currentNode.codeSnippet.language}
                    code={currentNode.codeSnippet.code}
                    highlightLines={currentNode.codeSnippet.highlight}
                  />
                </div>
              )}

              {/* Image */}
              {currentNode.imageUrl && (
                <div className='mb-6 rounded-lg overflow-hidden'>
                  <img
                    src={currentNode.imageUrl}
                    alt='Scenario visual'
                    className='w-full'
                  />
                </div>
              )}

              {/* Decision Options */}
              {currentNode.options && (
                <div className='space-y-3'>
                  <p className='font-semibold text-lg mb-4'>What do you do?</p>
                  {currentNode.options.map((option, idx) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}>
                      <Button
                        onClick={() => handleDecision(option)}
                        variant='outline'
                        className='w-full justify-start text-left h-auto py-4 px-6 hover:bg-blue-50 hover:border-blue-300 transition-colors'>
                        <div className='flex items-start gap-3 w-full'>
                          <div className='flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold'>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <div className='flex-1'>
                            <p className='font-medium mb-1'>{option.text}</p>
                            {option.consequences && (
                              <p className='text-xs text-muted-foreground'>
                                Assesses: {option.skillsAssessed.join(', ')}
                              </p>
                            )}
                          </div>
                          <ChevronRight className='flex-shrink-0 w-5 h-5 text-muted-foreground' />
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Reflection Prompt */}
              {currentNode.type === 'reflection' && (
                <div className='mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200'>
                  <div className='flex items-start gap-3'>
                    <AlertCircle className='w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5' />
                    <div>
                      <p className='font-semibold text-amber-900 mb-1'>Take a moment to reflect</p>
                      <p className='text-sm text-amber-700'>
                        How might this decision impact the team? What would you do differently?
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* End Node */}
              {currentNode.type === 'end' && (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className='mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200'>
                  <h3 className='text-xl font-bold text-green-900 mb-2'>Scenario Complete! 🎉</h3>
                  <p className='text-green-700 mb-4'>
                    We're analyzing your decisions and preparing personalized feedback...
                  </p>
                  <div className='flex items-center gap-2 text-sm text-green-600'>
                    <Clock className='w-4 h-4' />
                    <span>This will take just a moment</span>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Quick Feedback Overlay */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className='fixed bottom-8 left-1/2 -translate-x-1/2 max-w-md'>
              <Card className='p-4 bg-blue-500 text-white border-0 shadow-xl'>
                <p className='text-sm'>{currentFeedback}</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

### Supporting Components

```tsx
// components/assessments/scenario-theater/decision-timer.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface DecisionTimerProps {
  seconds: number;
  onExpire: () => void;
}

export function DecisionTimer({ seconds, onExpire }: DecisionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onExpire]);

  const progress = (timeLeft / seconds) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <motion.div
      animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1 }}
      className={`flex items-center gap-2 px-3 py-1 rounded-full ${
        isUrgent ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
      }`}>
      <Clock className='w-4 h-4' />
      <span className='font-semibold'>{timeLeft}s</span>
      <div className='w-16 h-1 bg-white/50 rounded-full overflow-hidden'>
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          className={isUrgent ? 'h-full bg-red-500' : 'h-full bg-blue-500'}
        />
      </div>
    </motion.div>
  );
}

// components/assessments/scenario-theater/code-block.tsx
('use client');

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string;
  code: string;
  highlightLines?: number[];
}

export function CodeBlock({ language, code, highlightLines = [] }: CodeBlockProps) {
  return (
    <div className='rounded-lg overflow-hidden border border-slate-700'>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        wrapLines
        lineProps={(lineNumber) => {
          const isHighlighted = highlightLines.includes(lineNumber);
          return {
            style: {
              backgroundColor: isHighlighted ? 'rgba(255, 255, 0, 0.1)' : 'transparent',
              display: 'block',
            },
          };
        }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
```

### Backend AI Analysis

```typescript
// API route: app/api/assessments/analyze-scenario/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ClaudeClient } from '@/lib/ai/claude-client';

export async function POST(req: NextRequest) {
  try {
    const { scenarioId, decisions, path, duration } = await req.json();

    const claude = new ClaudeClient();

    // Build analysis prompt
    const prompt = `Analyze this candidate's performance in a scenario-based assessment.

Scenario ID: ${scenarioId}
Total Duration: ${duration} seconds
Decisions Made: ${decisions.length}

Decision Details:
${decisions
  .map(
    (d: any, idx: number) => `
${idx + 1}. Node: ${d.nodeId}
   Choice: ${d.optionId}
   Time Spent: ${d.timeSpent}s
   Skills Assessed: ${d.skillsAssessed.join(', ')}
`
  )
  .join('\n')}

Provide a comprehensive analysis including:
1. Key strengths demonstrated
2. Areas for growth
3. Decision-making patterns (risk tolerance, speed, communication style)
4. Specific recommendations for improvement
5. Overall assessment (0-100 score)

Format your response as JSON with the structure:
{
  "score": number,
  "strengths": string[],
  "growthAreas": string[],
  "decisionPatterns": {
    "riskTolerance": "low" | "medium" | "high",
    "thinkingSpeed": "deliberate" | "balanced" | "quick",
    "communicationStyle": string
  },
  "recommendations": string[],
  "analysis": string
}`;

    const response = await claude.chat({
      messages: [{ role: 'user', content: prompt }],
      systemPrompt:
        'You are an expert at analyzing interview performance and providing constructive, empathetic feedback.',
    });

    const analysis = JSON.parse(response.content);

    return NextResponse.json({
      ...analysis,
      scenarioId,
      duration,
      completedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze scenario' }, { status: 500 });
  }
}
```

### Example Scenarios

```typescript
// lib/scenarios/production-incident.ts
export const productionIncidentScenario = {
  id: 'prod-incident-001',
  title: 'The 3 AM Production Incident',
  description: 'A critical bug hits production. How do you handle it?',
  category: 'technical' as const,
  difficulty: 'intermediate' as const,
  estimatedDuration: 15,
  learningObjectives: [
    'Incident response and prioritization',
    'Communication under pressure',
    'Technical troubleshooting',
    'Team coordination',
  ],
  skillsAssessed: [
    { id: 'incident-management', name: 'Incident Management', category: 'technical' },
    { id: 'communication', name: 'Communication', category: 'soft-skills' },
    { id: 'debugging', name: 'Debugging', category: 'technical' },
    { id: 'decision-making', name: 'Decision Making', category: 'leadership' },
  ],
  startNodeId: 'start',
  nodes: [
    {
      id: 'start',
      type: 'story' as const,
      content: `It's 3:17 AM. Your phone buzzes with urgent alerts.

PagerDuty: "🚨 CRITICAL: Payment processing service down"
Slack: "Payment service showing 100% error rate"
Email: "Customer tickets flooding in"

You're the on-call engineer. The payment service processes $50k/hour during normal hours. Even at 3 AM, this is costing money.

Initial investigation shows:
- Service returning 500 errors
- Database connections timing out
- CPU usage normal
- Memory usage: 95% (usually 60%)

What's your first move?`,
      emotionalTone: 'stressful',
      options: [
        {
          id: 'restart-service',
          text: 'Restart the payment service immediately to restore functionality',
          nextNodeId: 'consequence-restart',
          skillsAssessed: ['incident-management', 'decision-making'],
          quickFeedback: 'Quick action! But will it solve the root cause?',
        },
        {
          id: 'investigate-logs',
          text: 'Check application logs and database metrics before taking action',
          nextNodeId: 'consequence-investigate',
          skillsAssessed: ['debugging', 'decision-making'],
          quickFeedback: 'Good! Understanding the problem is key.',
          isOptimal: true,
        },
        {
          id: 'rollback',
          text: 'Immediately rollback to the previous deployment',
          nextNodeId: 'consequence-rollback',
          skillsAssessed: ['incident-management', 'decision-making'],
          quickFeedback: 'Bold move! Was there a recent deployment?',
        },
        {
          id: 'escalate',
          text: 'Wake up the team lead and database admin before proceeding',
          nextNodeId: 'consequence-escalate',
          skillsAssessed: ['communication', 'decision-making'],
          quickFeedback: 'Communication is important, but time is critical...',
        },
      ],
    },
    {
      id: 'consequence-investigate',
      type: 'consequence' as const,
      content: `You dive into the logs. 90 seconds of focused investigation reveals:

Application Logs:
"Database connection pool exhausted"
"Failed to acquire connection after 30s timeout"

Database Metrics:
- Active connections: 100/100 (maxed out!)
- Long-running queries: 47 (abnormal)
- Oldest query: running for 6 minutes

Deployment History:
- Last deployment: 4 hours ago
- Change: "Optimized product search query"

You spot the issue! The "optimized" query is actually doing a full table scan on millions of rows, holding connections hostage.

Now what?`,
      codeSnippet: {
        language: 'sql',
        code: `-- The problematic query
SELECT * FROM products 
WHERE LOWER(name) LIKE '%search_term%'
ORDER BY created_at DESC;

-- No index on LOWER(name)!
-- Scanning 5 million rows on each search`,
        highlight: [2],
      },
      options: [
        {
          id: 'kill-queries',
          text: 'Kill the long-running queries and monitor',
          nextNodeId: 'resolution-kill',
          skillsAssessed: ['incident-management', 'technical-skills'],
          isOptimal: true,
        },
        {
          id: 'rollback-now',
          text: 'Rollback the deployment immediately',
          nextNodeId: 'resolution-rollback',
          skillsAssessed: ['incident-management'],
          isOptimal: true,
        },
        {
          id: 'increase-pool',
          text: 'Increase database connection pool size',
          nextNodeId: 'resolution-pool',
          skillsAssessed: ['decision-making'],
        },
      ],
    },
    // More nodes...
    {
      id: 'end',
      type: 'end' as const,
      content: "Incident resolved! Let's review your performance...",
    },
  ],
};
```

---

## 💻 2. Pair Programming with AI

### Architecture

```
User Code ←→ AI Partner ←→ Real-time Feedback
    ↓            ↓                ↓
 Monaco       Claude          Code Analysis
 Editor      (GPT-4)          Suggestions
```

### Implementation

```tsx
// components/assessments/pair-programming/pair-session.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Code2, MessageSquare } from 'lucide-react';

type PairMode = 'driver' | 'navigator' | 'ping-pong';

interface PairSessionProps {
  problem: {
    id: string;
    title: string;
    description: string;
    starterCode: string;
    language: string;
  };
  mode: PairMode;
  onComplete: (result: any) => void;
}

export default function PairSession({ problem, mode, onComplete }: PairSessionProps) {
  const [code, setCode] = useState(problem.starterCode);
  const [aiPartner, setAiPartner] = useState<{ role: 'ai' | 'user'; message: string }[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [turn, setTurn] = useState<'user' | 'ai'>('user');
  const editorRef = useRef<any>(null);

  useEffect(() => {
    // AI sends initial greeting
    sendAiMessage(
      "Hey! I'm excited to work on this with you. Let's start by understanding the problem. What's your initial approach?"
    );
  }, []);

  // Watch for code changes and provide hints
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (mode === 'driver' && code !== problem.starterCode) {
        analyzeCodeAndProvideHints();
      }
    }, 3000);

    return () => clearTimeout(debounce);
  }, [code]);

  const analyzeCodeAndProvideHints = async () => {
    setIsAiThinking(true);

    const response = await fetch('/api/assessments/pair-programming/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        problem: problem.description,
        mode,
      }),
    });

    const { hint, encouragement } = await response.json();

    if (hint) {
      sendAiMessage(encouragement || hint);
    }

    setIsAiThinking(false);
  };

  const sendAiMessage = (message: string) => {
    setAiPartner((prev) => [...prev, { role: 'ai', message }]);
  };

  const handleUserMessage = async (message: string) => {
    setAiPartner((prev) => [...prev, { role: 'user', message }]);

    // Get AI response
    setIsAiThinking(true);
    const response = await fetch('/api/ai/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        context: {
          type: 'pair-programming',
          problem: problem.description,
          currentCode: code,
          mode,
        },
      }),
    });

    const { message: aiResponse } = await response.json();
    sendAiMessage(aiResponse);
    setIsAiThinking(false);
  };

  const handleRunCode = async () => {
    // Execute code and show results
    const response = await fetch('/api/assessments/execute-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        language: problem.language,
        testCases: problem.testCases,
      }),
    });

    const result = await response.json();

    if (result.success) {
      sendAiMessage(`Great! All tests passed! ${result.encouragement}`);
    } else {
      sendAiMessage(`The tests didn't quite pass. ${result.hint}`);
    }
  };

  return (
    <div className='h-screen flex'>
      {/* Code Editor */}
      <div className='flex-1 flex flex-col'>
        <div className='bg-slate-900 text-white px-4 py-2 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Code2 className='w-5 h-5' />
            <span className='font-semibold'>{problem.title}</span>
            <Badge variant='outline'>{mode} mode</Badge>
          </div>
          <Button
            onClick={handleRunCode}
            size='sm'
            variant='secondary'>
            <Play className='w-4 h-4 mr-2' />
            Run Code
          </Button>
        </div>

        <Editor
          height='100%'
          language={problem.language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme='vs-dark'
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            readOnly: mode === 'navigator' && turn === 'ai',
          }}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>

      {/* AI Partner Chat */}
      <div className='w-96 border-l border-slate-200 flex flex-col bg-white'>
        <div className='bg-blue-500 text-white px-4 py-3 flex items-center gap-2'>
          <MessageSquare className='w-5 h-5' />
          <div>
            <p className='font-semibold'>AI Pair Partner</p>
            <p className='text-xs text-blue-100'>
              {mode === 'driver' ? "I'll review your code" : "I'll help guide you"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {aiPartner.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-900'
                }`}>
                <p className='text-sm whitespace-pre-wrap'>{msg.message}</p>
              </div>
            </div>
          ))}

          {isAiThinking && (
            <div className='flex justify-start'>
              <div className='bg-slate-100 rounded-lg px-4 py-2'>
                <div className='flex gap-1'>
                  <div className='w-2 h-2 bg-slate-400 rounded-full animate-bounce' />
                  <div className='w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]' />
                  <div className='w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]' />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className='p-4 border-t'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
              if (input.value.trim()) {
                handleUserMessage(input.value);
                input.value = '';
              }
            }}>
            <input
              name='message'
              type='text'
              placeholder='Ask your pair partner...'
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </form>
        </div>
      </div>
    </div>
  );
}
```

This document is getting quite long! I have detailed implementations for:

- ✅ Scenario Theater (complete)
- ✅ Pair Programming (complete)
- 🔄 Debate Mode (next)
- 🔄 Teach-Back Sessions (next)
- 🔄 Crisis Simulations (next)

Would you like me to continue with the remaining assessment methods, or would you prefer I create a summary document with links to all resources?

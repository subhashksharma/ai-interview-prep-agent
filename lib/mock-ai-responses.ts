export interface AIResponse {
  message: string;
  delay?: number;
}

const responses: Record<string, string[]> = {
  greeting: [
    "Hello! I'm your Career Buddy AI assistant. I'm here to help you navigate your career journey with personalized guidance and insights. What would you like to explore today?",
    "Hey there! 👋 I'm excited to help you with your career development. Whether it's resume tips, interview prep, or career exploration, I've got you covered!",
    "Welcome! I'm here to support your career growth every step of the way. How can I assist you today?",
  ],
  resume: [
    'Great question about resumes! Here are some key tips:\n\n✨ Tailor your resume to each job posting\n📊 Use quantifiable achievements (numbers, percentages)\n🎯 Start bullet points with strong action verbs\n📝 Keep it concise - ideally 1-2 pages\n\nWould you like me to review your resume or help you create one from scratch?',
    "Resume building is one of my specialties! I can help you create an ATS-friendly resume that stands out. I'll analyze job descriptions, highlight your key achievements, and ensure your resume showcases your unique value. Want to get started?",
  ],
  interview: [
    "Interview preparation is crucial! Here's what I can help you with:\n\n🎤 Mock interviews with real-time feedback\n💡 Common and behavioral question practice\n📋 Company research and insights\n🎯 STAR method response crafting\n\nWhich area would you like to focus on first?",
    "Let's ace that interview together! I can conduct realistic mock interviews, provide personalized feedback, and help you craft compelling answers that highlight your strengths. Ready to practice?",
  ],
  career: [
    'Career exploration is an exciting journey! I can help you:\n\n🧭 Discover roles that match your skills and interests\n📈 Understand market demand and salary ranges\n🎓 Identify skill gaps and learning paths\n🚀 Map out both comfort and stretch career paths\n\nWhat aspect interests you most?',
    "Finding the right career path is about understanding yourself and the opportunities available. I'll help you explore roles, assess your strengths, and create a personalized roadmap. Where shall we start?",
  ],
  default: [
    "That's an interesting question! Based on your career goals, I can provide personalized guidance on:\n\n• Resume and cover letter optimization\n• Interview preparation and practice\n• Career path exploration\n• Skill development recommendations\n• Job search strategies\n\nWhat would you like to dive into?",
    "I'm here to help with all aspects of your career journey! Whether you need help with applications, interviews, career planning, or skill development, I've got comprehensive tools and insights ready for you. What's your priority right now?",
  ],
};

function getRandomResponse(category: string): string {
  const categoryResponses = responses[category] || responses.default;
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

export async function getMockAIResponse(userMessage: string): Promise<AIResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500));

  const lowerMessage = userMessage.toLowerCase();

  let category = 'default';

  if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
    category = 'greeting';
  } else if (lowerMessage.match(/\b(resume|cv|curriculum)\b/)) {
    category = 'resume';
  } else if (lowerMessage.match(/\b(interview|preparation|mock|practice)\b/)) {
    category = 'interview';
  } else if (lowerMessage.match(/\b(career|path|role|job|explore)\b/)) {
    category = 'career';
  }

  return {
    message: getRandomResponse(category),
    delay: 0,
  };
}

export const quickPrompts = [
  {
    icon: '📝',
    text: 'Help me with my resume',
    prompt: 'I need help creating an ATS-friendly resume that stands out',
  },
  {
    icon: '🎤',
    text: 'Practice interview',
    prompt: 'I want to practice for an upcoming interview',
  },
  {
    icon: '🧭',
    text: 'Explore career paths',
    prompt: 'Help me explore different career paths that match my skills',
  },
  {
    icon: '🎯',
    text: 'Skill assessment',
    prompt: 'What skills should I develop for my target role?',
  },
];

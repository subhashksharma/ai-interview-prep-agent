# Career Buddy - Architecture & Component Guidelines

## 🎯 Project Vision

An empathetic AI-powered platform to help job seekers prepare for interviews with kindness and support.

## 📁 Project Structure

```
ai-agent/
├── app/                          # Next.js 14+ App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
│
├── components/
│   ├── ui/                      # ✨ REUSABLE UI COMPONENTS (shadcn/ui)
│   │   ├── button.tsx           # All button variants
│   │   ├── input.tsx            # Text input fields
│   │   ├── textarea.tsx         # Multi-line text input
│   │   ├── card.tsx             # Card layouts
│   │   ├── badge.tsx            # Labels and tags
│   │   ├── progress.tsx         # Progress bars
│   │   ├── checkbox.tsx         # Checkboxes
│   │   ├── radio-group.tsx      # Radio buttons
│   │   ├── select.tsx           # Dropdown selects
│   │   ├── tabs.tsx             # Tab navigation
│   │   ├── pagination.tsx       # Pagination controls
│   │   ├── dialog.tsx           # Modal dialogs
│   │   ├── alert.tsx            # Alert messages
│   │   └── ...                  # 50+ components
│   │
│   ├── 🎨 FEATURE COMPONENTS (Landing Page)
│   │   ├── hero-section.tsx     # Hero with animation
│   │   ├── navbar.tsx           # Navigation bar
│   │   ├── footer.tsx           # Footer
│   │   ├── features-section.tsx # Features showcase
│   │   ├── pricing-section.tsx  # Pricing plans
│   │   ├── testimonials-section.tsx
│   │   ├── use-cases-section.tsx
│   │   ├── cta-section.tsx      # Call-to-action
│   │   └── journey-workflow.tsx # Journey visualization
│   │
│   ├── stepper/                 # 🚶 JOURNEY WORKFLOW STEPS
│   │   ├── hub.tsx              # Journey hub selector
│   │   ├── quiz.tsx             # Initial quiz
│   │   ├── questions.tsx        # Q&A interface
│   │   ├── analyzing.tsx        # Analysis loading
│   │   ├── roadmap.tsx          # Learning roadmap
│   │   └── career-paths.tsx     # Career recommendations
│   │
│   └── user-quiz-assessment/   # 📝 DEEP ASSESSMENT MODULE
│       ├── index.tsx            # Main orchestrator
│       ├── types.ts             # TypeScript definitions
│       ├── assessment-mode-selector.tsx
│       ├── topic-based-assessment.tsx
│       ├── custom-assessment.tsx
│       ├── question-interface.tsx
│       ├── assessment-results.tsx
│       ├── assessment-progress.tsx
│       └── llm-service.ts       # AI mock service
│
├── lib/
│   ├── utils.ts                 # cn() helper, utilities
│   ├── journey-data.ts          # Journey content data
│   └── mock-ai-responses.ts     # Mock AI data
│
├── hooks/
│   ├── use-toast.ts             # Toast notifications
│   └── use-mobile.tsx           # Responsive hook
│
└── public/
    └── images/                  # Static assets
```

---

## 🏗️ Component Architecture Principles

### 1. **Component Classification**

#### **UI Components** (`/components/ui/`)

- **Purpose:** Pure, reusable UI building blocks
- **Characteristics:**
  - No business logic
  - Highly customizable via props
  - Consistent styling via variants
  - Accessible (ARIA compliant)
  - Built with Radix UI + Tailwind CSS
- **Examples:** Button, Input, Card, Badge, Dialog

#### **Feature Components** (`/components/*.tsx`)

- **Purpose:** Business logic + UI composition
- **Characteristics:**
  - Use UI components internally
  - Contain feature-specific logic
  - Self-contained modules
  - Can manage local state
- **Examples:** HeroSection, Navbar, PricingSection

#### **Module Components** (`/components/[module]/`)

- **Purpose:** Complex feature groups with sub-components
- **Characteristics:**
  - Grouped by domain/feature
  - Share types and utilities
  - Isolated state management
  - Clear file structure
- **Examples:** `user-quiz-assessment/`, `stepper/`

---

### 2. **Component Design Rules**

#### ✅ **DO:**

```tsx
// ✅ Use UI components from /components/ui/
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function MyFeature() {
  return (
    <Card>
      <Input placeholder='Enter text' />
      <Button variant='default'>Submit</Button>
    </Card>
  );
}
```

#### ❌ **DON'T:**

```tsx
// ❌ Don't create custom buttons/inputs with inline styles
export function MyFeature() {
  return (
    <div className='rounded-lg border p-4'>
      <input className='border rounded p-2' /> {/* ❌ Use <Input /> instead */}
      <button className='bg-blue-500 text-white px-4 py-2'>
        {' '}
        {/* ❌ Use <Button /> instead */}
        Submit
      </button>
    </div>
  );
}
```

---

### 3. **UI Component Variants**

Use the component variant system for consistency:

```tsx
// Button variants
<Button variant="default">Primary Action</Button>
<Button variant="glow">Special Action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="link">Link Style</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// Combining variants
<Button variant="outline" size="lg">Large Outline Button</Button>
```

---

### 4. **Responsive Design Pattern**

**Standard Container Pattern:**

```tsx
// Use this consistently across all feature components
<section className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8'>
  {/* Your content */}
</section>
```

**Responsive Utilities:**

```tsx
// Spacing
gap-3 sm:gap-4 lg:gap-6
mb-4 sm:mb-6 lg:mb-8
space-y-4 sm:space-y-6

// Typography
text-sm sm:text-base lg:text-lg
text-2xl sm:text-3xl lg:text-4xl

// Layout
flex-col sm:flex-row
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

---

### 5. **State Management Patterns**

#### **Local State** (useState)

```tsx
// Use for component-specific UI state
const [isOpen, setIsOpen] = useState(false);
const [selectedOption, setSelectedOption] = useState('');
```

#### **Form State** (React Hook Form)

```tsx
// Use for forms with validation
import { useForm } from 'react-hook-form';

const form = useForm({
  defaultValues: { name: '', email: '' },
});
```

#### **Global State** (Context API)

```tsx
// Use sparingly for truly global state
// Example: Theme, User session, Toast notifications
const { theme, setTheme } = useTheme();
```

---

### 6. **TypeScript Best Practices**

#### **Component Props**

```tsx
// Always define prop interfaces
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FeatureCard({ title, description, icon, onClick, className }: FeatureCardProps) {
  return (
    <Card
      className={cn('p-6', className)}
      onClick={onClick}>
      {icon && <div className='mb-4'>{icon}</div>}
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-muted-foreground'>{description}</p>
    </Card>
  );
}
```

#### **Type Files**

```tsx
// Group related types in [module]/types.ts
export interface Question {
  id: string;
  text: string;
  type: 'single-choice' | 'multiple-choice' | 'writing';
  options?: string[];
}

export interface Answer {
  questionId: string;
  answer: string | string[];
  timestamp: number;
}
```

---

### 7. **File Naming Conventions**

```
✅ kebab-case for files:
   - hero-section.tsx
   - user-quiz-assessment/
   - topic-based-assessment.tsx

✅ PascalCase for components:
   - export function HeroSection() {}
   - export function TopicBasedAssessment() {}

✅ Descriptive, clear names:
   - assessment-mode-selector.tsx (not selector.tsx)
   - question-interface.tsx (not interface.tsx)
```

---

### 8. **Import Organization**

```tsx
// 1. React and framework imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

// 3. UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// 4. Feature components
import { Navbar } from '@/components/navbar';

// 5. Utilities and types
import { cn } from '@/lib/utils';
import type { Question, Answer } from './types';
```

---

## 🎨 Design System

### Color Palette

```css
/* Primary Brand Colors */
--primary: #2dcbc5          /* Teal - Main brand */
--primary-hover: #2ab7ca    /* Teal variant */

/* Backgrounds */
--background: hsl(var(--background))
--foreground: hsl(var(--foreground))

/* Semantic Colors */
--destructive: red shades
--warning: yellow shades
--success: green shades
--info: blue shades
```

### Typography Scale

```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
<h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
<p className="text-base sm:text-lg">
<small className="text-sm sm:text-base">
```

### Spacing System

```tsx
// Use Tailwind spacing scale (4px increments)
gap-2   (8px)
gap-3   (12px)
gap-4   (16px)
gap-6   (24px)
gap-8   (32px)
```

---

## 📦 Adding New Features

### Checklist for New Components:

1. **Determine component type:**

   - [ ] UI component? → Add to `/components/ui/`
   - [ ] Feature component? → Add to `/components/`
   - [ ] Module? → Create `/components/[module-name]/`

2. **Create component file:**

   ```tsx
   // components/my-feature.tsx
   'use client'; // Only if using hooks/state

   import { Button } from '@/components/ui/button';
   import { cn } from '@/lib/utils';

   interface MyFeatureProps {
     title: string;
     className?: string;
   }

   export function MyFeature({ title, className }: MyFeatureProps) {
     return (
       <div className={cn('max-w-7xl mx-auto px-3 sm:px-6 lg:px-8', className)}>
         <h2>{title}</h2>
         <Button>Click me</Button>
       </div>
     );
   }
   ```

3. **Use existing UI components:**

   - [ ] Check `/components/ui/` for existing components
   - [ ] Use Button instead of `<button>`
   - [ ] Use Input instead of `<input>`
   - [ ] Use Card for containers
   - [ ] Use Badge for labels

4. **Follow responsive patterns:**

   - [ ] Use `max-w-7xl mx-auto` for content width
   - [ ] Use `px-3 sm:px-6 lg:px-8` for padding
   - [ ] Add responsive text sizes
   - [ ] Test on mobile, tablet, desktop

5. **Add TypeScript types:**

   - [ ] Define Props interface
   - [ ] Export types if reusable
   - [ ] Group types in `types.ts` for modules

6. **Document if complex:**
   - [ ] Add JSDoc comments for complex logic
   - [ ] Update this ARCHITECTURE.md if adding new patterns

---

## 🔧 Development Workflow

### Before Starting:

1. Check `/components/ui/` for existing components
2. Review this architecture guide
3. Look at similar existing features

### While Coding:

1. Use UI components consistently
2. Follow naming conventions
3. Add TypeScript types
4. Keep components focused (Single Responsibility)
5. Test responsive behavior

### Before Committing:

1. Run `npm run build` - ensure no errors
2. Check for unused imports
3. Verify responsive design
4. Test accessibility (keyboard navigation)
5. Update documentation if needed

---

## 📚 Available UI Components

**Forms:**

- Button, Input, Textarea, Checkbox, RadioGroup, Select, Switch, Slider, Label

**Layout:**

- Card, Tabs, Accordion, Collapsible, Separator, Scroll Area, Resizable

**Feedback:**

- Alert, Toast, Progress, Badge, Skeleton, Spinner

**Overlay:**

- Dialog, Sheet, Popover, Dropdown Menu, Context Menu, Hover Card, Tooltip

**Navigation:**

- Pagination, Breadcrumb, Navigation Menu, Sidebar

**Data:**

- Table, Calendar, Command (search)

**Advanced:**

- Form (with validation), Carousel, Chart

---

## 🚀 Performance Best Practices

1. **Use `'use client'` sparingly:** Only add to components using hooks/state
2. **Lazy load heavy components:**
   ```tsx
   const HeavyComponent = dynamic(() => import('./heavy-component'), {
     loading: () => <Skeleton />,
   });
   ```
3. **Optimize images:**
   ```tsx
   import Image from 'next/image';
   <Image
     src='/image.jpg'
     alt='...'
     width={800}
     height={600}
   />;
   ```
4. **Minimize bundle size:** Import only what you need
   ```tsx
   import { Button } from '@/components/ui/button'; // ✅
   import * from '@/components/ui'; // ❌
   ```

---

## 🧪 Testing Checklist

- [ ] Component renders without errors
- [ ] Props work as expected
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] Dark mode compatible (if applicable)
- [ ] Loading/error states handled
- [ ] No console errors/warnings

---

## 📞 Need Help?

- Check existing similar components
- Review shadcn/ui docs: https://ui.shadcn.com
- Ask in team chat
- Update this guide if you discover new patterns!

---

**Last Updated:** January 2026  
**Maintainer:** Career Buddy Team

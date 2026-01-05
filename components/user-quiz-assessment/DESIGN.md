# Design System - User Quiz Assessment

## 🎨 Visual Design Language

### Design Principles

1. **Welcoming & Non-Intimidating**

   - Soft, rounded corners (12px - 24px radius)
   - Gentle gradient overlays
   - Warm, inviting color palette
   - Ample whitespace for breathing room

2. **Progressive Disclosure**

   - Information revealed as needed
   - Smooth transitions between states
   - Clear visual hierarchy
   - Step-by-step guidance

3. **Encouraging & Supportive**

   - Positive micro-interactions
   - Celebratory animations
   - Warm emoji usage
   - Constructive feedback language

4. **Clean & Modern**
   - Card-based layouts
   - Glass morphism effects
   - Subtle shadows and depth
   - Consistent spacing system

## 🎨 Color Palette

### Primary Colors

```scss
// Assessment Mode Selection
$blue: #3B82F6 → #06B6D4      // Topic-based (from-blue-500 to-cyan-500)
$purple: #8B5CF6 → #EC4899    // Custom (from-purple-500 to-pink-500)

// Status & Feedback
$green: #10B981 → #059669     // Success, encouragement
$amber: #F59E0B → #F97316     // Primary actions, attention
$orange: #F97316 → #EA580C    // Warm CTAs

// Confidence Levels
$confidence-high: #8B5CF6     // Purple
$confidence-medium: #3B82F6   // Blue
$confidence-low: #10B981      // Green (still positive!)

// Difficulty Levels
$beginner: #10B981            // Green
$intermediate: #3B82F6        // Blue
$advanced: #8B5CF6            // Purple
$expert: #F97316              // Orange
```

### Neutral Colors

```scss
$background: #FFFFFF
$background-dark: #0F172A
$card-bg: #FAFAFA
$border: #E2E8F0
$text-primary: #0F172A
$text-secondary: #64748B
$text-muted: #94A3B8
```

### Semantic Colors

```scss
// Always positive framing
$success: #10B981             // Achievements
$info: #3B82F6                // Information
$learning: #F59E0B            // Learning opportunities
$celebration: #EC4899         // Milestones
```

## 📐 Layout System

### Container Sizes

```scss
$max-width-sm: 640px          // Mobile, single cards
$max-width-md: 768px          // Tablets
$max-width-lg: 1024px         // Desktop, main content
$max-width-xl: 1280px         // Wide screens
$max-width-2xl: 1536px        // Ultra-wide
```

### Spacing Scale (Tailwind-based)

```scss
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
```

### Grid Layouts

```tsx
// Two-column card grid
<div className="grid md:grid-cols-2 gap-6">

// Three-column stats
<div className="grid grid-cols-3 gap-4">

// Responsive layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## 🎭 Animation Patterns

### Entry Animations

```tsx
// Fade in from below
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}

// Scale in
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ type: 'spring', stiffness: 200 }}

// Slide from right
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -20 }}
```

### Hover Effects

```tsx
// Card hover
<Card className="hover:border-primary hover:shadow-lg transition-all duration-300">

// Button hover
<Button className="hover:opacity-90 transition-opacity">

// Scale on hover
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

### Loading States

```tsx
// Spinner
<Loader2 className="w-12 h-12 animate-spin text-primary" />

// Pulse effect
<div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />

// Progress bar
<Progress value={progressPercentage} className="h-2" />
```

## 🃏 Card Designs

### Base Card

```tsx
<Card className="
  rounded-3xl
  p-8
  shadow-xl
  border
  border-border
  bg-white
  hover:shadow-2xl
  transition-shadow
  duration-300
">
```

### Gradient Card

```tsx
<Card className="
  bg-gradient-to-br
  from-blue-500/5
  to-purple-500/5
  border-2
  border-blue-500/20
">
```

### Glass Morphism Card

```tsx
<Card className="
  bg-white/80
  backdrop-blur-sm
  border-2
  border-white/20
  shadow-xl
">
```

### Interactive Card

```tsx
<Card className="
  cursor-pointer
  hover:border-primary
  hover:scale-105
  transition-all
  duration-300
  group
">
```

## 🔘 Button Styles

### Primary CTA

```tsx
<Button className="
  bg-gradient-to-r
  from-amber-400
  to-orange-500
  hover:opacity-90
  text-white
  shadow-xl
  shadow-amber-500/30
  rounded-xl
  px-8
  py-6
  text-lg
  font-semibold
">
```

### Secondary Button

```tsx
<Button variant="outline" className="
  border-2
  hover:border-primary
  hover:bg-primary/5
  transition-colors
">
```

### Icon Button

```tsx
<Button size="icon" variant="ghost" className="
  hover:bg-primary/10
  rounded-full
">
```

## 📝 Typography

### Headings

```tsx
// Main page title
<h1 className="text-4xl md:text-5xl font-bold mb-4">

// Section title
<h2 className="text-3xl font-bold mb-2">

// Card title
<h3 className="text-2xl font-bold">

// Subsection
<h4 className="text-lg font-semibold">
```

### Body Text

```tsx
// Primary text
<p className="text-base text-foreground">

// Secondary text
<p className="text-sm text-muted-foreground">

// Emphasized text
<p className="text-lg font-medium">
```

### Special Text Effects

```tsx
// Gradient text
<h1 className="
  bg-gradient-to-r
  from-blue-600
  to-purple-600
  bg-clip-text
  text-transparent
">

// Uppercase labels
<span className="
  text-xs
  uppercase
  tracking-wide
  font-medium
  text-muted-foreground
">
```

## 🎯 Icon Usage

### Icon Sizes

```tsx
// Small icons (in text)
<Icon className="w-4 h-4" />

// Medium icons (buttons, cards)
<Icon className="w-5 h-5" />

// Large icons (headers)
<Icon className="w-6 h-6 md:w-8 md:h-8" />

// Hero icons
<Icon className="w-12 h-12" />
```

### Icon Containers

```tsx
// Gradient icon background
<div className="
  w-12
  h-12
  rounded-xl
  bg-gradient-to-br
  from-blue-500
  to-cyan-500
  flex
  items-center
  justify-center
  shadow-lg
">
  <Icon className="w-6 h-6 text-white" />
</div>

// Circle icon background
<div className="
  w-10
  h-10
  rounded-full
  bg-primary/10
  flex
  items-center
  justify-center
">
  <Icon className="w-5 h-5 text-primary" />
</div>
```

## 🎨 Visual Hierarchy Examples

### Mode Selection Cards

```
┌─────────────────────────────────────┐
│  [Gradient Icon]                    │
│  Large Bold Title                   │
│  Description text                   │
│  ┌─────────────────────────────┐   │
│  │ • Feature 1                 │   │
│  │ • Feature 2                 │   │
│  │ • Feature 3                 │   │
│  └─────────────────────────────┘   │
│  [Primary CTA Button]               │
└─────────────────────────────────────┘
```

### Question Interface

```
┌─────────────────────────────────────┬──────────────┐
│ Progress: [========>     ] 60%      │ Progress Card│
│                                     │              │
│ Question Number Badge               │ Current: #3  │
│ Type Badge  Difficulty Indicator    │              │
│                                     │ Time: 5:23   │
│ Question Title (Large, Bold)        │              │
│                                     │ Confidence:  │
│ [Answer Input Area]                 │ High: █████  │
│                                     │ Med:  ███    │
│ Confidence Selection:               │ Low:  █      │
│ [Low] [Medium] [High]              │              │
│                                     │ Encouragement│
│ [← Previous] [Next →]              │ Message Box  │
└─────────────────────────────────────┴──────────────┘
```

## 🌈 Gradient Combinations

### Assessment Modes

```css
/* Topic-Based */
.topic-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
}

/* Custom */
.custom-gradient {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
}

/* Success/Completion */
.success-gradient {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

/* Primary Action */
.action-gradient {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
}
```

## 📱 Responsive Breakpoints

```tsx
// Mobile first approach
className = 'text-sm md:text-base lg:text-lg';

// Layout shifts
className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

// Spacing adjustments
className = 'p-4 md:p-6 lg:p-8';

// Hide/show elements
className = 'hidden lg:block';
```

## ✨ Micro-interactions

### Success Celebration

```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: [0, 1.2, 1] }}
  transition={{ type: 'spring' }}>
  🎉 Milestone reached!
</motion.div>
```

### Loading State

```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
  <Loader2 />
</motion.div>
```

### Confidence Selection

```tsx
<Button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={selected ? 'ring-2 ring-primary' : ''}
>
```

## 🎭 Emotion & Tone

### Visual Emotional Cues

- ✅ Green = Progress (not just "correct")
- 💡 Blue = Learning opportunity
- ✨ Purple = Achievement
- 🎯 Orange = Focus/Action
- 💪 Gradients = Energy and movement

### Text Tone Guidelines

- Use "Great work!" instead of "Correct"
- Use "Let's explore this more" instead of "Wrong"
- Use "You're making progress" instead of "Keep trying"
- Always include encouragement with feedback
- Celebrate effort, not just results

## 🎨 Dark Mode Support

```tsx
// Automatic dark mode
className="
  bg-white dark:bg-slate-900
  text-slate-900 dark:text-white
  border-slate-200 dark:border-slate-700
"

// Gradient overlays
className="
  bg-gradient-to-br
  from-blue-500/5 dark:from-blue-500/10
  to-purple-500/5 dark:to-purple-500/10
"
```

## 🚀 Performance Considerations

1. **Lazy load images**: Use Next.js Image component
2. **Optimize animations**: Use `transform` and `opacity` only
3. **Reduce repaints**: Use `will-change` sparingly
4. **Code splitting**: Lazy load heavy components
5. **Memoization**: Use React.memo for expensive renders

---

This design system ensures a **cohesive, welcoming, and judgment-free** experience that encourages learning and celebrates progress at every step! 🌟

# Component Creation Quick Reference

## 🚀 Quick Start Checklist

### Before Creating a Component:

- [ ] **Check existing UI components** in `/components/ui/`
- [ ] **Name it clearly:** `feature-name.tsx` (kebab-case)
- [ ] **Determine location:**
  - Pure UI? → `/components/ui/`
  - Feature? → `/components/`
  - Module? → `/components/[module]/`

---

## 📝 Component Template

### Feature Component Template:

```tsx
'use client'; // Only if using hooks/state

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
  className?: string;
}

export function MyComponent({ title, description, onAction, className }: MyComponentProps) {
  return (
    <section className={cn('max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8', className)}>
      <Card className='p-6'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-4'>{title}</h2>
        {description && <p className='text-muted-foreground mb-6'>{description}</p>}
        <Button onClick={onAction}>Take Action</Button>
      </Card>
    </section>
  );
}
```

---

## 🎨 Common Patterns

### 1. Responsive Container

```tsx
<div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8'>{/* Content */}</div>
```

### 2. Responsive Grid

```tsx
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>{/* Cards */}</div>
```

### 3. Responsive Text

```tsx
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Title</h1>
<p className="text-sm sm:text-base lg:text-lg">Paragraph</p>
```

### 4. Responsive Spacing

```tsx
<div className='space-y-4 sm:space-y-6'>
  <div className='mb-4 sm:mb-6 lg:mb-8'>Item</div>
</div>
```

---

## 🧩 Use These Instead Of...

| ❌ Don't Use      | ✅ Use Instead                        |
| ----------------- | ------------------------------------- |
| `<button>`        | `<Button>` from `/ui/button`          |
| `<input>`         | `<Input>` from `/ui/input`            |
| `<textarea>`      | `<Textarea>` from `/ui/textarea`      |
| Custom divs       | `<Card>` from `/ui/card`              |
| Custom labels     | `<Badge>` from `/ui/badge`            |
| Custom checkboxes | `<Checkbox>` from `/ui/checkbox`      |
| Custom radios     | `<RadioGroup>` from `/ui/radio-group` |
| Custom selects    | `<Select>` from `/ui/select`          |
| Custom tabs       | `<Tabs>` from `/ui/tabs`              |
| Custom modals     | `<Dialog>` from `/ui/dialog`          |

---

## 🎯 Button Quick Reference

```tsx
// Variants
<Button variant="default">Primary</Button>
<Button variant="glow">Special</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

---

## 📦 Common Imports

```tsx
// UI Components (pick what you need)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Utilities
import { cn } from '@/lib/utils';

// Icons (Lucide React)
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

// Animation
import { motion } from 'framer-motion';
```

---

## 🔍 Find Components Fast

### Search for existing patterns:

```bash
# Find all Button usage
grep -r "<Button" components/

# Find Input usage
grep -r "<Input" components/

# Find Card usage
grep -r "<Card" components/
```

### Available UI Components:

```
Forms:        Button, Input, Textarea, Checkbox, RadioGroup,
              Select, Switch, Slider, Label, Form

Layout:       Card, Tabs, Accordion, Separator, ScrollArea

Feedback:     Alert, Toast, Progress, Badge, Skeleton

Overlay:      Dialog, Sheet, Popover, DropdownMenu, Tooltip

Navigation:   Pagination, Breadcrumb, NavigationMenu, Sidebar

Data:         Table, Calendar
```

---

## ✅ Pre-Commit Checklist

- [ ] Used existing UI components (no custom `<button>`, `<input>`, etc.)
- [ ] Added TypeScript types (Props interface)
- [ ] Followed naming convention (kebab-case file, PascalCase component)
- [ ] Added responsive classes (sm:, lg: breakpoints)
- [ ] Used standard container pattern (max-w-7xl, px-3 sm:px-6 lg:px-8)
- [ ] Organized imports (React → Third-party → UI → Utils)
- [ ] Added `'use client'` only if needed (hooks/state)
- [ ] Tested on mobile view
- [ ] No TypeScript errors: `npm run build`
- [ ] No console warnings in dev mode

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module '@/components/ui/...'"

```tsx
// ✅ Fix: Check import path and component exists
import { Button } from '@/components/ui/button'; // Correct
```

### Issue: Custom button not matching design

```tsx
// ❌ Don't do this:
<button className="bg-blue-500 px-4 py-2 rounded">Click</button>

// ✅ Do this:
<Button variant="default">Click</Button>
```

### Issue: Component not responsive

```tsx
// ❌ Fixed sizes:
<div className="px-8 py-6">

// ✅ Responsive:
<div className="px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
```

### Issue: Type errors with props

```tsx
// ✅ Always define interface:
interface MyComponentProps {
  title: string;
  optional?: number;
}

export function MyComponent({ title, optional }: MyComponentProps) {
  // ...
}
```

---

## 📚 Resources

- **shadcn/ui Docs:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Radix UI:** https://www.radix-ui.com/primitives
- **Lucide Icons:** https://lucide.dev/icons
- **Framer Motion:** https://www.framer.com/motion

---

## 💡 Pro Tips

1. **Copy existing patterns:** Look at similar components first
2. **Use cn() utility:** Merge className strings cleanly
3. **Think mobile-first:** Design for small screens, then scale up
4. **Keep it simple:** One component = one responsibility
5. **Ask before reinventing:** Check if component exists in `/ui/`

---

**Quick Help:**

- Lost? Check [ARCHITECTURE.md](./ARCHITECTURE.md)
- Need a component? Check `/components/ui/`
- Stuck? Look at similar existing components
- Still stuck? Ask the team! 🤝

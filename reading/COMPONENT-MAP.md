# Visual Component Map

Quick visual reference for finding and using components in Career Buddy.

---

## 🎨 UI Components Library (`/components/ui/`)

### 📝 Form Inputs

| Component      | File              | Usage                      | Import                                                                     |
| -------------- | ----------------- | -------------------------- | -------------------------------------------------------------------------- |
| **Button**     | `button.tsx`      | All clickable actions      | `import { Button } from '@/components/ui/button'`                          |
| **Input**      | `input.tsx`       | Single-line text input     | `import { Input } from '@/components/ui/input'`                            |
| **Textarea**   | `textarea.tsx`    | Multi-line text input      | `import { Textarea } from '@/components/ui/textarea'`                      |
| **Checkbox**   | `checkbox.tsx`    | Multiple selections        | `import { Checkbox } from '@/components/ui/checkbox'`                      |
| **RadioGroup** | `radio-group.tsx` | Single selection from list | `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'` |
| **Select**     | `select.tsx`      | Dropdown selection         | `import { Select } from '@/components/ui/select'`                          |
| **Switch**     | `switch.tsx`      | Toggle on/off              | `import { Switch } from '@/components/ui/switch'`                          |
| **Slider**     | `slider.tsx`      | Range selection            | `import { Slider } from '@/components/ui/slider'`                          |
| **Label**      | `label.tsx`       | Form field labels          | `import { Label } from '@/components/ui/label'`                            |

### 📦 Layout & Containers

| Component      | File              | Usage                 | Import                                                                            |
| -------------- | ----------------- | --------------------- | --------------------------------------------------------------------------------- |
| **Card**       | `card.tsx`        | Content containers    | `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'` |
| **Separator**  | `separator.tsx`   | Visual dividers       | `import { Separator } from '@/components/ui/separator'`                           |
| **ScrollArea** | `scroll-area.tsx` | Scrollable containers | `import { ScrollArea } from '@/components/ui/scroll-area'`                        |
| **Resizable**  | `resizable.tsx`   | Resizable panels      | `import { Resizable } from '@/components/ui/resizable'`                           |

### 🎭 Overlays & Modals

| Component       | File               | Usage               | Import                                                                                      |
| --------------- | ------------------ | ------------------- | ------------------------------------------------------------------------------------------- |
| **Dialog**      | `dialog.tsx`       | Modal dialogs       | `import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'` |
| **Sheet**       | `sheet.tsx`        | Slide-in panels     | `import { Sheet } from '@/components/ui/sheet'`                                             |
| **Popover**     | `popover.tsx`      | Floating content    | `import { Popover } from '@/components/ui/popover'`                                         |
| **Tooltip**     | `tooltip.tsx`      | Hover tips          | `import { Tooltip } from '@/components/ui/tooltip'`                                         |
| **HoverCard**   | `hover-card.tsx`   | Rich hover content  | `import { HoverCard } from '@/components/ui/hover-card'`                                    |
| **AlertDialog** | `alert-dialog.tsx` | Confirmation modals | `import { AlertDialog } from '@/components/ui/alert-dialog'`                                |

### 🔔 Feedback & Status

| Component    | File           | Usage                   | Import                                                 |
| ------------ | -------------- | ----------------------- | ------------------------------------------------------ |
| **Badge**    | `badge.tsx`    | Status indicators, tags | `import { Badge } from '@/components/ui/badge'`        |
| **Progress** | `progress.tsx` | Progress bars           | `import { Progress } from '@/components/ui/progress'`  |
| **Alert**    | `alert.tsx`    | Alert messages          | `import { Alert } from '@/components/ui/alert'`        |
| **Toast**    | `toast.tsx`    | Toast notifications     | `import { useToast } from '@/components/ui/use-toast'` |
| **Skeleton** | `skeleton.tsx` | Loading placeholders    | `import { Skeleton } from '@/components/ui/skeleton'`  |

### 🧭 Navigation

| Component          | File                  | Usage                | Import                                                                            |
| ------------------ | --------------------- | -------------------- | --------------------------------------------------------------------------------- |
| **Tabs**           | `tabs.tsx`            | Tab navigation       | `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'` |
| **Pagination**     | `pagination.tsx`      | Page navigation      | `import { Pagination } from '@/components/ui/pagination'`                         |
| **Breadcrumb**     | `breadcrumb.tsx`      | Breadcrumb trail     | `import { Breadcrumb } from '@/components/ui/breadcrumb'`                         |
| **NavigationMenu** | `navigation-menu.tsx` | Top-level navigation | `import { NavigationMenu } from '@/components/ui/navigation-menu'`                |
| **Sidebar**        | `sidebar.tsx`         | Side navigation      | `import { Sidebar } from '@/components/ui/sidebar'`                               |

### 🎬 Interactive

| Component        | File                | Usage                | Import                                                         |
| ---------------- | ------------------- | -------------------- | -------------------------------------------------------------- |
| **Accordion**    | `accordion.tsx`     | Expandable sections  | `import { Accordion } from '@/components/ui/accordion'`        |
| **Collapsible**  | `collapsible.tsx`   | Show/hide content    | `import { Collapsible } from '@/components/ui/collapsible'`    |
| **DropdownMenu** | `dropdown-menu.tsx` | Dropdown menus       | `import { DropdownMenu } from '@/components/ui/dropdown-menu'` |
| **ContextMenu**  | `context-menu.tsx`  | Right-click menus    | `import { ContextMenu } from '@/components/ui/context-menu'`   |
| **Command**      | `command.tsx`       | Command palette      | `import { Command } from '@/components/ui/command'`            |
| **Carousel**     | `carousel.tsx`      | Image/content slider | `import { Carousel } from '@/components/ui/carousel'`          |

### 📊 Data Display

| Component    | File           | Usage              | Import                                                |
| ------------ | -------------- | ------------------ | ----------------------------------------------------- |
| **Table**    | `table.tsx`    | Data tables        | `import { Table } from '@/components/ui/table'`       |
| **Calendar** | `calendar.tsx` | Date picker        | `import { Calendar } from '@/components/ui/calendar'` |
| **Chart**    | `chart.tsx`    | Data visualization | `import { Chart } from '@/components/ui/chart'`       |
| **Avatar**   | `avatar.tsx`   | User avatars       | `import { Avatar } from '@/components/ui/avatar'`     |

### 🎨 Special Components

| Component            | File                    | Usage                  | Notes            |
| -------------------- | ----------------------- | ---------------------- | ---------------- |
| **RotatingKeywords** | `rotating-keywords.tsx` | Animated text rotation | Custom component |
| **HeroDescription**  | `hero-description.tsx`  | Hero section text      | Custom component |
| **BotDemoChatbox**   | `bot-demo-chatbox.tsx`  | Chat interface demo    | Custom component |
| **ArrowButton**      | `arrow-button.tsx`      | Button with arrow      | Custom variant   |
| **WatchButton**      | `watch-button.tsx`      | Watch/video button     | Custom variant   |
| **UploadButton**     | `upload-button.tsx`     | File upload button     | Custom variant   |

---

## 🌟 Feature Components (`/components/`)

### Landing Page Components

| Component               | File                       | Uses UI Components | Purpose               |
| ----------------------- | -------------------------- | ------------------ | --------------------- |
| **Navbar**              | `navbar.tsx`               | Button             | Top navigation bar    |
| **HeroSection**         | `hero-section.tsx`         | Button, Card       | Main hero section     |
| **FeaturesSection**     | `features-section.tsx`     | Card, Badge        | Feature showcase      |
| **UseCasesSection**     | `use-cases-section.tsx`    | Tabs, Card, Button | Use case examples     |
| **PricingSection**      | `pricing-section.tsx`      | Button, Card       | Pricing plans         |
| **TestimonialsSection** | `testimonials-section.tsx` | Card, Avatar       | User testimonials     |
| **CTASection**          | `cta-section.tsx`          | Button             | Call-to-action        |
| **Footer**              | `footer.tsx`               | -                  | Footer links          |
| **JourneyWorkflow**     | `journey-workflow.tsx`     | Card, Button       | Journey visualization |

### Journey Workflow Steps (`/components/stepper/`)

| Component       | File               | Uses UI Components       | Purpose                 |
| --------------- | ------------------ | ------------------------ | ----------------------- |
| **Hub**         | `hub.tsx`          | Card, Button, Badge      | Journey selector hub    |
| **Quiz**        | `quiz.tsx`         | Card, Button, RadioGroup | Initial assessment quiz |
| **Questions**   | `questions.tsx`    | Card, Button, Textarea   | Interview questions     |
| **Analyzing**   | `analyzing.tsx`    | Card, Progress, Badge    | AI analysis animation   |
| **Roadmap**     | `roadmap.tsx`      | Card, Badge, Progress    | Learning roadmap        |
| **CareerPaths** | `career-paths.tsx` | Card, Button, Badge      | Career recommendations  |

### Assessment Module (`/components/user-quiz-assessment/`)

| Component                  | File                           | Uses UI Components                            | Purpose                |
| -------------------------- | ------------------------------ | --------------------------------------------- | ---------------------- |
| **Main**                   | `index.tsx`                    | All assessment components                     | Orchestrator           |
| **AssessmentModeSelector** | `assessment-mode-selector.tsx` | Card, Button, Badge                           | Mode selection         |
| **TopicBasedAssessment**   | `topic-based-assessment.tsx`   | RadioGroup, Button, Input                     | Role selection         |
| **CustomAssessment**       | `custom-assessment.tsx`        | Input, Button, Badge                          | Custom role/tech input |
| **QuestionInterface**      | `question-interface.tsx`       | RadioGroup, Checkbox, Input, Textarea, Button | Question display       |
| **AssessmentResults**      | `assessment-results.tsx`       | Card, Progress, Badge                         | Results display        |
| **AssessmentProgress**     | `assessment-progress.tsx`      | Progress, Badge                               | Progress tracking      |

---

## 🗺️ Component Selection Guide

### I need to...

#### Display Information

- **Show a card/container** → Use `<Card>`
- **Show a label/tag** → Use `<Badge>`
- **Show user profile** → Use `<Avatar>`
- **Show a table** → Use `<Table>`
- **Show progress** → Use `<Progress>`
- **Show alert/notification** → Use `<Alert>` or `<Toast>`
- **Show loading state** → Use `<Skeleton>`

#### Get User Input

- **Get text input** → Use `<Input>`
- **Get long text** → Use `<Textarea>`
- **Get single choice** → Use `<RadioGroup>`
- **Get multiple choices** → Use `<Checkbox>`
- **Get dropdown selection** → Use `<Select>`
- **Get toggle on/off** → Use `<Switch>`
- **Get range value** → Use `<Slider>`
- **Get date** → Use `<Calendar>`

#### Create Interactions

- **Show modal dialog** → Use `<Dialog>`
- **Show slide-in panel** → Use `<Sheet>`
- **Show dropdown menu** → Use `<DropdownMenu>`
- **Show tooltip** → Use `<Tooltip>`
- **Show hover info** → Use `<HoverCard>`
- **Show confirmation** → Use `<AlertDialog>`

#### Organize Content

- **Create tabs** → Use `<Tabs>`
- **Create accordion** → Use `<Accordion>`
- **Create collapsible** → Use `<Collapsible>`
- **Create separator** → Use `<Separator>`
- **Create scrollable area** → Use `<ScrollArea>`
- **Create carousel** → Use `<Carousel>`

#### Navigate

- **Create pagination** → Use `<Pagination>`
- **Create breadcrumbs** → Use `<Breadcrumb>`
- **Create navigation menu** → Use `<NavigationMenu>`
- **Create sidebar** → Use `<Sidebar>`

#### Trigger Actions

- **Create button** → Use `<Button>`
  - Primary action: `variant="default"`
  - Special action: `variant="glow"`
  - Destructive action: `variant="destructive"`
  - Secondary action: `variant="outline"`
  - Subtle action: `variant="ghost"`
  - Link style: `variant="link"`

---

## 🎯 Quick Decision Tree

```
Need a component?
│
├─ Is it a standard UI element? (button, input, card, etc.)
│  ├─ YES → Check /components/ui/
│  │        └─ Found? → Use it! ✅
│  │        └─ Not found? → Add from shadcn/ui
│  │
│  └─ NO → Is it feature-specific?
│           └─ YES → Check /components/ or /components/[module]/
│                    └─ Found similar? → Reuse pattern
│                    └─ Not found? → Create new using UI components
│
└─ Always import from @/components/ui/ when possible
```

---

## 📋 Common Patterns

### Pattern 1: Form with Validation

```tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

<form>
  <div>
    <Label htmlFor='email'>Email</Label>
    <Input
      id='email'
      type='email'
    />
  </div>
  <Button type='submit'>Submit</Button>
</form>;
```

### Pattern 2: Card with Content

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content here</p>
  </CardContent>
</Card>;
```

### Pattern 3: Modal Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>;
```

### Pattern 4: Tabs Navigation

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs defaultValue='tab1'>
  <TabsList>
    <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
    <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value='tab1'>Content 1</TabsContent>
  <TabsContent value='tab2'>Content 2</TabsContent>
</Tabs>;
```

### Pattern 5: Multiple Choice Question

```tsx
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

{
  options.map((option) => (
    <div className='flex items-center space-x-2'>
      <Checkbox id={option} />
      <Label htmlFor={option}>{option}</Label>
    </div>
  ));
}
```

---

## 🔍 Search Tips

### Find component usage:

```bash
# Search for Button usage
grep -r "<Button" components/

# Search for Input usage
grep -r "<Input" components/

# Search for Card usage
grep -r "<Card" components/

# Search for specific pattern
grep -r "RadioGroup" components/
```

### Find component definition:

```bash
# Find where component is defined
find components/ui -name "button.tsx"
find components/ui -name "input.tsx"
```

---

## 📚 Resources

- **Full Architecture Guide:** [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Quick Checklist:** [COMPONENT-CHECKLIST.md](./COMPONENT-CHECKLIST.md)
- **Consistency Report:** [CONSISTENCY-REPORT.md](./CONSISTENCY-REPORT.md)
- **shadcn/ui Docs:** https://ui.shadcn.com
- **Radix UI Primitives:** https://www.radix-ui.com/primitives

---

**Pro Tip:** Always check `/components/ui/` first before creating custom implementations. 95% of UI needs are already covered! 🎯

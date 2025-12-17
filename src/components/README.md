# Health OS - Component Library

A comprehensive collection of reusable React components built with TypeScript, Framer Motion, and modern CSS.

## Components

### Form Components
- **Input** - Text input with label, error states, and icon support
- **Checkbox** - Checkbox with indeterminate state
- **Switch** - Toggle switch with smooth animations
- **Dropdown** - Select dropdown with icons and search

### Feedback Components
- **Alert** - Alert messages with variants (info, success, warning, danger)
- **Toast** - Toast notifications with auto-dismiss
- **Modal** - Modal dialogs with keyboard support
- **LoadingSpinner** - Loading indicators
- **Skeleton** - Loading skeletons for content

### Navigation Components
- **Breadcrumb** - Breadcrumb navigation
- **Tabs** - Tabbed interface with variants
- **SearchBar** - Global search with Cmd+K support

### Display Components
- **Card** - Container cards with variants
- **Badge** - Status badges with pulse animation
- **Avatar** - User avatars with status indicators
- **Divider** - Content dividers
- **Tooltip** - Contextual tooltips
- **ProgressBar** - Progress indicators
- **Sparkline** - Mini trend charts
- **HealthScoreMeter** - Circular health score display

### Layout Components
- **Button** - Buttons with variants and loading states
- **FeatureCard** - 3D feature cards with glow effects
- **TestimonialCarousel** - Auto-rotating testimonials
- **PricingSection** - Pricing tiers display
- **FAQAccordion** - Searchable FAQ accordion
- **NewsletterSignup** - Email subscription form

### Utility Components
- **ThemeToggle** - Dark/light mode switcher
- **ParticleBackground** - Interactive particle effects

## Usage

```tsx
import { Button, Card, Input, Modal } from '@/components';

function MyComponent() {
  return (
    <Card variant="glass" padding="large">
      <Input
        label="Email"
        value={email}
        onChange={setEmail}
        error={error}
      />
      <Button variant="primary" size="large">
        Submit
      </Button>
    </Card>
  );
}
```

## Features

- 🎨 **Consistent Design** - All components follow the same design system
- 🌙 **Dark Mode** - Full dark mode support
- ⚡ **Animations** - Smooth Framer Motion animations
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 🎯 **TypeScript** - Full type safety
- 🎭 **Variants** - Multiple style variants for flexibility

## Design Tokens

All components use CSS variables for theming:
- Colors: `--color-primary`, `--color-success`, etc.
- Spacing: `--spacing-sm`, `--spacing-md`, etc.
- Shadows: `--shadow-sm`, `--shadow-xl`, etc.
- Radii: `--radius-sm`, `--radius-2xl`, etc.
- Typography: `--text-sm`, `--text-5xl`, etc.

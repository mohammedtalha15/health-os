# Health OS - Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+ (for backend)
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd health-os

# Install frontend dependencies
npm install

# Install backend dependencies (if running locally)
cd backend
pip install -r requirements.txt
```

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

```
health-os/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and helpers
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles
├── public/               # Static assets
└── backend/              # Python backend (FastAPI)
```

## Component Library

### Usage

```tsx
import { Button, Card, Input, Modal } from '@/components';

function MyComponent() {
  return (
    <Card variant="glass" padding="large">
      <Input label="Email" value={email} onChange={setEmail} />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Available Components

- **Form**: Input, Checkbox, Switch, Dropdown, RadioGroup, Slider
- **Feedback**: Alert, Toast, Modal, LoadingSpinner, Skeleton, EmptyState
- **Navigation**: Breadcrumb, Tabs, Pagination, Stepper
- **Display**: Card, Badge, Avatar, Chip, Divider, Tooltip, Popover, Rating
- **Data**: Sparkline, HealthScoreMeter, ProgressBar, Timeline

## Custom Hooks

```tsx
import { useLocalStorage, useMediaQuery, useDebounce } from '@/hooks';

// Persistent state
const [theme, setTheme] = useLocalStorage('theme', 'light');

// Responsive design
const isMobile = useMediaQuery('(max-width: 640px)');

// Debounced search
const debouncedSearch = useDebounce(handleSearch, 300);
```

## Styling

### CSS Variables

All components use CSS variables for theming:

```css
:root {
  --color-primary: #3b82f6;
  --spacing-md: 1rem;
  --radius-xl: 1rem;
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Dark Mode

Dark mode is automatically supported. Toggle with:

```tsx
import { ThemeToggle } from '@/components';

<ThemeToggle />
```

## Animation

Use Framer Motion variants from `@/lib/animations`:

```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

<motion.div {...fadeInUp}>
  Content
</motion.div>
```

## Utilities

```tsx
import { formatDate, validateEmail, debounce } from '@/lib/utils';

const formatted = formatDate(new Date(), 'long');
const isValid = validateEmail('user@example.com');
const debouncedFn = debounce(myFunction, 300);
```

## Best Practices

1. **Component Structure**: Keep components small and focused
2. **Type Safety**: Always use TypeScript types
3. **Accessibility**: Include ARIA labels and keyboard navigation
4. **Performance**: Use lazy loading and code splitting
5. **Testing**: Write tests for critical functionality

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## License

MIT

# Contributing to Health OS

Thank you for your interest in contributing to Health OS! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Use the bug report template
3. Include detailed steps to reproduce
4. Add screenshots if applicable

### Suggesting Enhancements

1. Check if the enhancement has been suggested
2. Provide a clear use case
3. Explain the expected behavior
4. Consider backwards compatibility

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Update documentation
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/health-os.git
cd health-os

# Install dependencies
npm install

# Run development server
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible

### Components

- Use functional components with hooks
- Keep components small and focused
- Use CSS Modules for styling
- Include prop types and documentation

### Naming Conventions

- Components: PascalCase (`MyComponent.tsx`)
- Files: camelCase (`myUtility.ts`)
- CSS Modules: PascalCase (`MyComponent.module.css`)
- Constants: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas
- Use semicolons
- Run `npm run lint` before committing

## Component Guidelines

### Creating New Components

1. Create component file in `src/components/`
2. Create corresponding CSS module
3. Add TypeScript interfaces for props
4. Include JSDoc comments
5. Export from `src/components/index.ts`
6. Update component README

### Example Component

```tsx
'use client';

import { motion } from 'framer-motion';
import styles from './MyComponent.module.css';

interface MyComponentProps {
  /** The title to display */
  title: string;
  /** Optional description */
  description?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * MyComponent displays a title and optional description
 * 
 * @example
 * <MyComponent title="Hello" description="World" />
 */
export default function MyComponent({
  title,
  description,
  onClick,
}: MyComponentProps) {
  return (
    <motion.div 
      className={styles.container}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
}
```

## Testing

- Write tests for new features
- Update tests for bug fixes
- Ensure all tests pass before submitting PR
- Aim for >80% code coverage

## Documentation

- Update README.md for new features
- Add JSDoc comments to functions
- Update CHANGELOG.md
- Include examples in documentation

## Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build/tooling changes

Example: `feat: add dark mode toggle component`

## Questions?

Feel free to open an issue for questions or discussions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

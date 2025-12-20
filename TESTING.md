# Health OS - Component Testing Guide

## Testing Philosophy

- Write tests that give confidence
- Test behavior, not implementation
- Keep tests simple and readable
- Aim for meaningful coverage, not 100%

## Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

## Component Testing

### Basic Component Test

```tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### Testing Hooks

```tsx
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('updates value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(result.current[0]).toBe('updated');
  });
});
```

### Testing with User Interactions

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  it('updates value on change', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'Hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
```

### Testing Async Components

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import DataComponent from './DataComponent';

describe('DataComponent', () => {
  it('loads and displays data', async () => {
    render(<DataComponent />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Data loaded')).toBeInTheDocument();
    });
  });
});
```

## Best Practices

### 1. Use Semantic Queries

```tsx
// Good
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');
screen.getByText('Welcome');

// Avoid
screen.getByTestId('submit-button');
```

### 2. Test Accessibility

```tsx
it('is accessible', () => {
  const { container } = render(<Component />);
  expect(container.querySelector('button')).toHaveAttribute('aria-label');
});
```

### 3. Mock External Dependencies

```tsx
jest.mock('@/lib/apiClient', () => ({
  apiClient: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}));
```

### 4. Test Error States

```tsx
it('displays error message', () => {
  render(<Input error="Invalid email" />);
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
});
```

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run specific file
npm test Button.test.tsx
```

## Continuous Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Pre-deployment

## Resources

- [Testing Library Docs](https://testing-library.com/)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

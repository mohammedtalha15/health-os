# Health OS - Performance Optimization Guide

## Performance Best Practices

### 1. Code Splitting

```tsx
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
```

### 2. Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority={false}
  loading="lazy"
/>
```

### 3. Memoization

```tsx
import { useMemo, useCallback } from 'react';

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### 4. Lazy Loading

```tsx
import { useIntersectionObserver } from '@/hooks';

function LazyComponent() {
  const { targetRef, isIntersecting } = useIntersectionObserver();
  
  return (
    <div ref={targetRef}>
      {isIntersecting && <HeavyContent />}
    </div>
  );
}
```

### 5. Debouncing

```tsx
import { useDebounce } from '@/hooks';

const debouncedSearch = useDebounce((query) => {
  fetchResults(query);
}, 300);
```

## Bundle Size Optimization

### Analyze Bundle

```bash
npm run analyze
```

### Tree Shaking

- Import only what you need
- Use named imports
- Avoid default exports for utilities

```tsx
// Good
import { formatDate } from '@/lib/utils';

// Bad
import utils from '@/lib/utils';
```

## Runtime Performance

### 1. Avoid Inline Functions

```tsx
// Bad
<Button onClick={() => handleClick(id)} />

// Good
const onClick = useCallback(() => handleClick(id), [id]);
<Button onClick={onClick} />
```

### 2. Use Keys Properly

```tsx
// Use stable, unique keys
{items.map((item) => (
  <Item key={item.id} {...item} />
))}
```

### 3. Virtualize Long Lists

For lists with 100+ items, use virtualization:

```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
>
  {({ index, style }) => (
    <div style={style}>{items[index]}</div>
  )}
</FixedSizeList>
```

## Network Optimization

### 1. API Caching

```tsx
const { data } = useSWR('/api/data', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000,
});
```

### 2. Prefetching

```tsx
import { useRouter } from 'next/router';

const router = useRouter();
router.prefetch('/dashboard');
```

### 3. Request Batching

Combine multiple API calls:

```tsx
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
]);
```

## CSS Performance

### 1. Use CSS Modules

- Scoped styles
- No global namespace pollution
- Automatic dead code elimination

### 2. Avoid Inline Styles

```tsx
// Bad
<div style={{ color: 'red' }} />

// Good
<div className={styles.error} />
```

### 3. Critical CSS

Extract and inline critical CSS for above-the-fold content.

## Monitoring

### Web Vitals

```tsx
export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics
}
```

### Performance Metrics

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Checklist

- [ ] Enable production mode
- [ ] Minimize bundle size
- [ ] Optimize images
- [ ] Use code splitting
- [ ] Implement caching
- [ ] Lazy load components
- [ ] Debounce expensive operations
- [ ] Monitor performance metrics

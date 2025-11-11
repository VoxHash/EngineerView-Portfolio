# Development Guide

This guide covers development tools, debugging, and best practices for working on the EnginerView Portfolio project.

## Development Tools

### Enhanced Logging

Use the `DevLogger` utility for contextual logging:

```typescript
import { DevLogger } from '@/scripts/dev-tools';

const logger = new DevLogger('ComponentName');

logger.log('Component mounted');
logger.error('Error occurred', error);
logger.warn('Warning message', data);
```

### Performance Profiling

Use the `PerformanceProfiler` to measure performance:

```typescript
import { PerformanceProfiler } from '@/scripts/dev-tools';

const profiler = new PerformanceProfiler();

profiler.start('fetchData');
await fetchData();
const duration = profiler.end('fetchData');

// Or use the measure helper
profiler.measure('renderComponent', () => {
  renderComponent();
});
```

### Environment Checking

Check the current environment setup:

```typescript
import { checkEnvironment } from '@/scripts/dev-tools';

const env = checkEnvironment();
// Logs environment details in development mode
```

## Debugging

### Error Messages

All errors are standardized through the error utilities:

```typescript
import { createErrorResponse, handleError } from '@/lib/errors';

// Create specific error
const error = createErrorResponse(ErrorCode.VALIDATION_ERROR, 'Invalid input');

// Handle unknown errors
const error = handleError(unknownError);
```

### React DevTools

1. Install React DevTools browser extension
2. Use Profiler to identify performance issues
3. Use Components tab to inspect component tree
4. Check for unnecessary re-renders

### Next.js Debugging

Enable debug mode:

```bash
DEBUG=* next dev
```

Or for specific modules:

```bash
DEBUG=next:router next dev
```

### Network Debugging

1. Use Chrome DevTools Network tab
2. Check for failed requests
3. Verify API responses
4. Monitor request/response times

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

Example test structure:

```typescript
import { render, screen } from '@testing-library/react';
import Component from '@/components/Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Test Coverage

Aim for:
- **Unit Tests**: > 80% coverage for utility functions
- **Component Tests**: Test user interactions and rendering
- **Integration Tests**: Test API routes and data flow

## Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check
```

### Formatting

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## Performance Analysis

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze
```

This will:
1. Build the application
2. Open bundle analyzer
3. Show bundle composition
4. Identify large dependencies

### Lighthouse

Run Lighthouse audits:

1. Build and start the app: `npm run build && npm run start`
2. Open Chrome DevTools
3. Go to Lighthouse tab
4. Run audit for Performance, Accessibility, Best Practices, SEO

## Best Practices

### Component Development

1. **Use Server Components when possible**: Better performance
2. **Add proper TypeScript types**: Avoid `any` types
3. **Implement error boundaries**: Catch and handle errors gracefully
4. **Add accessibility attributes**: ARIA labels, roles, etc.
5. **Test keyboard navigation**: Ensure all functionality is keyboard accessible

### API Development

1. **Use error utilities**: Standardized error responses
2. **Implement caching**: Use cache utilities for appropriate TTL
3. **Validate inputs**: Use validation utilities
4. **Handle errors gracefully**: Provide meaningful error messages

### Performance

1. **Optimize images**: Use Next.js Image component
2. **Lazy load components**: Use dynamic imports for heavy components
3. **Monitor Core Web Vitals**: Use WebVitals component
4. **Cache appropriately**: Use cache utilities

## Resources

- [Next.js Debugging](https://nextjs.org/docs/app/building-your-application/configuring/debugging)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)


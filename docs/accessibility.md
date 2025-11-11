# Accessibility Guide

This document outlines the accessibility features and best practices implemented in the EnginerView Portfolio project.

## WCAG 2.1 AA Compliance

The project aims to meet WCAG 2.1 Level AA standards for accessibility.

### Implemented Features

#### 1. Semantic HTML
- Proper use of semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`)
- Appropriate heading hierarchy (h1 → h2 → h3)
- Landmark roles for screen readers

#### 2. Keyboard Navigation
- **Skip Link**: Allows users to skip to main content
- **Focus Management**: Visible focus indicators on all interactive elements
- **Focus Trap**: Mobile menu traps focus for better navigation
- **Keyboard Shortcuts**: 
  - `Escape` key closes mobile menu
  - `Tab` navigates through interactive elements
  - `Enter` activates buttons and links

#### 3. Screen Reader Support
- **ARIA Labels**: All icon-only buttons have descriptive labels
- **ARIA Attributes**: 
  - `aria-label` for descriptive labels
  - `aria-current` for current page indicators
  - `aria-expanded` for collapsible menus
  - `aria-hidden` for decorative elements
- **Screen Reader Only Content**: `.sr-only` class for additional context
- **Live Regions**: For dynamic content announcements

#### 4. Color Contrast
- All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Focus indicators have sufficient contrast
- Color is not the only means of conveying information

#### 5. Images
- All images have descriptive `alt` text
- Decorative images use `aria-hidden="true"`
- Images use lazy loading for performance
- Responsive images with proper `sizes` attributes

#### 6. Forms
- All form inputs have associated labels
- Error messages are clearly associated with inputs
- Required fields are indicated
- Form validation provides clear feedback

#### 7. Motion and Animation
- Respects `prefers-reduced-motion` media query
- Animations can be disabled for users who prefer reduced motion
- No auto-playing animations that could cause seizures

## Accessibility Utilities

### Focus Management

```typescript
import { FocusManager } from '@/lib/accessibility';

// Trap focus within an element
const cleanup = FocusManager.trapFocus(element);

// Return focus to previous element
FocusManager.returnFocus(previousElement);

// Focus first focusable element
FocusManager.focusFirst(container);
```

### Screen Reader Announcements

```typescript
import { announceToScreenReader } from '@/lib/accessibility';

// Announce to screen readers
announceToScreenReader('Form submitted successfully', 'polite');
```

### Color Contrast Checking

```typescript
import { checkContrast } from '@/lib/accessibility';

// Check if colors meet WCAG AA standards
const meetsAA = checkContrast('#000000', '#ffffff'); // true
```

## Testing Accessibility

### Automated Testing

1. **Lighthouse**: Run Lighthouse audits for accessibility
   ```bash
   npm run build
   npm run start
   # Open Chrome DevTools > Lighthouse > Accessibility
   ```

2. **axe DevTools**: Browser extension for accessibility testing

3. **WAVE**: Web Accessibility Evaluation Tool browser extension

### Manual Testing

1. **Keyboard Navigation**: 
   - Navigate entire site using only keyboard
   - Verify all interactive elements are reachable
   - Check focus indicators are visible

2. **Screen Reader Testing**:
   - Test with NVDA (Windows)
   - Test with VoiceOver (macOS/iOS)
   - Test with JAWS (Windows)

3. **Color Contrast**:
   - Use browser DevTools to check contrast ratios
   - Verify all text meets WCAG AA standards

## Best Practices

### When Adding New Components

1. **Use Semantic HTML**: Choose appropriate HTML elements
2. **Add ARIA Labels**: For icon-only buttons and complex widgets
3. **Test Keyboard Navigation**: Ensure all functionality is keyboard accessible
4. **Check Color Contrast**: Verify text meets contrast requirements
5. **Add Focus Styles**: Ensure focus indicators are visible
6. **Test with Screen Readers**: Verify screen reader announcements

### Common Patterns

#### Icon-Only Button
```typescript
<button
  aria-label="Close menu"
  className="focus-visible:outline-2 focus-visible:outline-brand"
>
  <X className="h-4 w-4" aria-hidden="true" />
</button>
```

#### Current Page Indicator
```typescript
<Link
  href="/about"
  aria-current={pathname === '/about' ? 'page' : undefined}
>
  About
</Link>
```

#### Form Input
```typescript
<label htmlFor="email">
  Email Address
  <input
    id="email"
    type="email"
    required
    aria-describedby="email-error"
    aria-invalid={hasError}
  />
  {hasError && (
    <span id="email-error" role="alert">
      Please enter a valid email address
    </span>
  )}
</label>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)


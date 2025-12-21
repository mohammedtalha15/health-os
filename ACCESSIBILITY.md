# Health OS - Accessibility Guide

## Overview

Health OS is committed to providing an accessible experience for all users, including those with disabilities. This guide outlines our accessibility features and best practices.

## WCAG 2.1 Compliance

We strive to meet **WCAG 2.1 Level AA** standards.

## Keyboard Navigation

### Global Shortcuts

- `Tab` - Navigate forward through interactive elements
- `Shift + Tab` - Navigate backward
- `Enter` or `Space` - Activate buttons and links
- `Escape` - Close modals and dropdowns
- `Cmd/Ctrl + K` - Open global search

### Component-Specific

- **Modals**: `Escape` to close
- **Dropdowns**: Arrow keys to navigate options
- **Tabs**: Arrow keys to switch tabs
- **Accordions**: `Enter` or `Space` to expand/collapse

## Screen Reader Support

### Tested With

- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS, iOS)
- **TalkBack** (Android)

### ARIA Labels

All interactive elements include proper ARIA labels:

```tsx
<button aria-label="Close modal">
  ✕
</button>

<input
  type="text"
  aria-label="Search health reports"
  aria-describedby="search-hint"
/>
```

### Live Regions

Dynamic content updates are announced:

```tsx
<div role="status" aria-live="polite">
  Report uploaded successfully
</div>
```

## Visual Accessibility

### Color Contrast

All text meets WCAG AA contrast ratios:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Focus Indicators

Clear focus indicators on all interactive elements:

```css
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Text Sizing

- Base font size: 16px
- Supports browser zoom up to 200%
- Responsive text scaling

### Dark Mode

Full dark mode support for reduced eye strain:
- Toggle in settings
- Respects system preferences
- Maintains contrast ratios

## Motor Accessibility

### Touch Targets

Minimum touch target size: 44×44 pixels

```css
.button {
  min-width: 44px;
  min-height: 44px;
}
```

### Click Areas

Generous click areas for all interactive elements

### No Time Limits

No automatic timeouts on user actions

## Cognitive Accessibility

### Clear Language

- Simple, concise instructions
- Avoid jargon where possible
- Provide explanations for medical terms

### Consistent Navigation

- Predictable navigation patterns
- Consistent component behavior
- Clear visual hierarchy

### Error Prevention

- Confirmation for destructive actions
- Clear error messages
- Inline validation with helpful hints

### Progress Indicators

Clear feedback for all actions:
- Loading states
- Progress bars
- Success/error notifications

## Forms

### Labels

All form inputs have associated labels:

```tsx
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email
  </span>
)}
```

### Error Handling

- Errors announced to screen readers
- Clear error messages
- Focus moved to first error

### Required Fields

Clear indication of required fields:

```tsx
<label>
  Email <span aria-label="required">*</span>
</label>
```

## Media

### Images

All images include alt text:

```tsx
<Image
  src="/chart.png"
  alt="Blood pressure trend showing decrease over 3 months"
/>
```

### Videos

- Captions for all video content
- Transcripts available
- Audio descriptions where applicable

## Testing

### Automated Testing

```bash
# Run accessibility tests
npm run test:a11y
```

### Manual Testing Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Color contrast meets standards
- [ ] Focus indicators visible
- [ ] Forms are accessible
- [ ] No keyboard traps
- [ ] Zoom works up to 200%
- [ ] Touch targets adequate

### Tools We Use

- **axe DevTools** - Automated testing
- **WAVE** - Web accessibility evaluation
- **Lighthouse** - Accessibility audits
- **Screen readers** - Manual testing

## Known Issues

We maintain a list of known accessibility issues and are actively working to resolve them. See our [GitHub Issues](https://github.com/health-os/issues?label=accessibility).

## Reporting Issues

If you encounter accessibility barriers:

1. **Email**: accessibility@healthos.com
2. **GitHub**: Open an issue with `accessibility` label
3. **Response time**: Within 48 hours

Please include:
- Description of the issue
- Steps to reproduce
- Assistive technology used
- Browser and OS version

## Accessibility Statement

Health OS is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience and apply relevant accessibility standards.

### Conformance Status

**Partially conformant** - Some parts of the content do not fully conform to WCAG 2.1 Level AA.

### Feedback

We welcome feedback on the accessibility of Health OS. Please contact us if you encounter barriers.

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

## Component Accessibility

### Buttons

```tsx
<Button
  variant="primary"
  aria-label="Upload health report"
  disabled={isUploading}
  aria-busy={isUploading}
>
  {isUploading ? 'Uploading...' : 'Upload'}
</Button>
```

### Modals

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Delete</h2>
  <p id="modal-description">
    Are you sure you want to delete this report?
  </p>
</Modal>
```

### Tooltips

```tsx
<Tooltip content="View detailed report">
  <button aria-label="View detailed report">
    <InfoIcon />
  </button>
</Tooltip>
```

## Best Practices for Contributors

1. Always include ARIA labels
2. Test with keyboard only
3. Verify screen reader announcements
4. Check color contrast
5. Ensure focus management
6. Add semantic HTML
7. Test with assistive technologies

## Updates

This accessibility guide is regularly updated. Last updated: 2024-01-15

For the latest accessibility features and improvements, see our [CHANGELOG.md](./CHANGELOG.md).

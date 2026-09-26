# Accessibility Standards & WCAG 2.1 AA Compliance

- **Keyboard Navigation**: All interactive elements (drawers, modals, navigation menus, variant swatches) are fully reachable and operable via keyboard.
- **Focus Rings**: High-contrast outline (`var(--color-accent)`) with 3px offset ensures clear visual focus indicators.
- **Screen Reader Announcements**: An ARIA-live region (`#valoir-a11y-announcer`) announces cart additions, modal openings, and filter updates dynamically.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by dampening transitions and disabling sliding effects.
- **Contrast**: All typography combinations meet or exceed the 4.5:1 WCAG AA contrast ratio against their respective background surfaces.

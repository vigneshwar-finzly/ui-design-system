# Component States Reference Guide

## Universal States

All interactive components support these fundamental states:

### 1. Default State
- **Description**: Component in its normal, interactive state
- **Visual**: Standard styling with full opacity
- **Behavior**: Fully functional, responds to user input
- **Usage**: Primary state for active components

### 2. Hover State
- **Description**: Mouse cursor positioned over component
- **Visual**: Subtle background change or elevation
- **Behavior**: Indicates interactivity
- **Usage**: Desktop and tablet devices with pointer input

### 3. Focus State
- **Description**: Component has keyboard or programmatic focus
- **Visual**: Visible focus ring or outline (WCAG 2.1 compliant)
- **Behavior**: Receives keyboard input
- **Usage**: Keyboard navigation and screen readers

### 4. Active/Pressed State
- **Description**: Component being clicked or touched
- **Visual**: Pressed appearance, darker or inset
- **Behavior**: Momentary state during interaction
- **Usage**: Click/touch feedback

### 5. Disabled State
- **Description**: Component cannot be interacted with
- **Visual**: Reduced opacity (typically 0.5-0.6), cursor: not-allowed
- **Behavior**: Ignores user input, not focusable
- **Usage**: Temporarily unavailable functionality

### 6. Loading State
- **Description**: Component processing an action
- **Visual**: Spinner, skeleton, or loading indicator
- **Behavior**: May be disabled during load
- **Usage**: Async operations, data fetching

## Form-Specific States

### Input Components

#### Empty/Unfilled
- No user input
- Shows placeholder text
- Default border styling

#### Filled
- Contains user input
- Placeholder hidden
- Value visible

#### Valid
- Passes validation rules
- Optional success indicator
- Green accent (optional)

#### Invalid/Error
- Fails validation
- Red border and error icon
- Error message displayed below

#### Required
- Must be filled before submission
- Asterisk (*) or "Required" label
- May show error if submitted empty

### Checkbox & Radio States

#### Unchecked
- Empty checkbox/radio
- Default border
- No fill

#### Checked
- Filled with checkmark/dot
- Primary color background
- Selected state

#### Indeterminate (Checkbox only)
- Dash/minus icon
- Indicates partial selection
- Used for parent checkboxes

## Button States

### Visual Variants

#### Primary
- Solid background (primary color)
- High contrast text
- Most prominent button

#### Secondary
- Outlined or muted background
- Medium emphasis
- Alternative actions

#### Ghost/Text
- No background
- Text only
- Lowest emphasis

#### Danger/Destructive
- Red color scheme
- Use for delete/remove actions
- Requires confirmation

### Interactive States

#### Default
- Ready for interaction
- Standard styling

#### Hover
- Slight brightness change
- Elevation increase (shadow)

#### Active
- Pressed appearance
- Reduced elevation

#### Loading
- Spinner or progress indicator
- Text may change to "Loading..."
- Disabled during load

#### Success
- Checkmark icon
- Green color scheme
- Temporary state after success

#### Disabled
- Reduced opacity
- No hover effects
- Not clickable

## Badge States

### Semantic Variants

#### Default/Neutral
- Gray color scheme
- General information
- No specific meaning

#### Info
- Blue color scheme
- Informational content
- FYI messages

#### Success
- Green color scheme
- Positive outcomes
- Completed states

#### Warning
- Orange/amber color scheme
- Caution needed
- Non-critical issues

#### Error/Danger
- Red color scheme
- Problems or failures
- Critical issues

## Toggle/Switch States

#### Off
- Left position
- Gray background
- Inactive

#### On
- Right position
- Primary color background
- Active

#### Disabled-Off
- Gray, reduced opacity
- Cannot toggle

#### Disabled-On
- Primary color, reduced opacity
- Cannot toggle

## Size Variants

### Small (Compact)
- **Height**: 32px
- **Padding**: 8px 12px
- **Font**: 13px
- **Usage**: Dense interfaces, tables, toolbars

### Medium (Default)
- **Height**: 40px
- **Padding**: 10px 16px
- **Font**: 14px
- **Usage**: Standard forms, primary interface

### Large (Prominent)
- **Height**: 48px
- **Padding**: 12px 20px
- **Font**: 16px
- **Usage**: Hero sections, CTAs, mobile

## Accessibility States

### ARIA States

- `aria-disabled="true"`: Component is disabled
- `aria-invalid="true"`: Validation error
- `aria-required="true"`: Required field
- `aria-checked="true"`: Checkbox/radio checked
- `aria-pressed="true"`: Toggle button pressed
- `aria-expanded="true"`: Expandable content open
- `aria-busy="true"`: Loading state

### Focus States

- **Focus Ring**: 2-3px solid outline
- **Color**: High contrast (blue or accent)
- **Offset**: 2px from element
- **Visibility**: Always visible when focused

## State Transitions

### Animation Guidelines

- **Duration**: 150-300ms
- **Easing**: Ease-in-out or custom cubic-bezier
- **Properties**: Background, border, shadow, transform
- **Performance**: Use transform and opacity for best performance

### State Change Examples

```scss
.button {
  transition: all 200ms ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
}
```

## Testing Checklist

### Manual Testing

- [ ] Default state renders correctly
- [ ] Hover state provides feedback
- [ ] Focus state is clearly visible
- [ ] Active/pressed state is distinct
- [ ] Disabled state prevents interaction
- [ ] Loading state shows progress
- [ ] Error state displays message
- [ ] Success state confirms action
- [ ] Size variants maintain proportions
- [ ] Transitions are smooth

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader announces states
- [ ] ARIA attributes are correct
- [ ] Focus is visible and clear
- [ ] Color contrast meets WCAG AA
- [ ] State changes are announced
- [ ] Disabled items are not focusable

### Responsive Testing

- [ ] States work on mobile
- [ ] Touch targets are adequate (44x44px)
- [ ] Hover states on touch devices
- [ ] Focus states with keyboard
- [ ] Landscape and portrait modes

## Component State Matrix

| Component | Default | Hover | Focus | Active | Disabled | Loading | Error | Success |
|-----------|---------|-------|-------|--------|----------|---------|-------|---------|
| Input     | ✓       | ✓     | ✓     | -      | ✓        | ✓       | ✓     | ✓       |
| Button    | ✓       | ✓     | ✓     | ✓      | ✓        | ✓       | -     | ✓       |
| Checkbox  | ✓       | ✓     | ✓     | ✓      | ✓        | -       | ✓     | ✓       |
| Toggle    | ✓       | ✓     | ✓     | ✓      | ✓        | -       | -     | -       |
| Badge     | ✓       | -     | -     | -      | -        | -       | N/A   | N/A     |
| Dropdown  | ✓       | ✓     | ✓     | ✓      | ✓        | ✓       | ✓     | -       |

## Best Practices

### Do's

- Always show loading states for async operations
- Provide clear error messages
- Make disabled states visually distinct
- Maintain consistent state styling
- Test all states in all browsers
- Ensure keyboard accessibility

### Don'ts

- Don't rely solely on color to indicate state
- Don't hide focus indicators
- Don't make disabled items look clickable
- Don't skip loading states
- Don't ignore error states
- Don't forget empty states

## Resources

- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA States: https://www.w3.org/TR/wai-aria-1.1/#state_prop_def
- Material Design States: https://material.io/design/interaction/states.html

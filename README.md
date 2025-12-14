# Finzly Theme UI Kit

A comprehensive Angular UI component library with a consistent design system. Built with Angular 18+ and featuring 17+ production-ready components.

## 📦 Installation

```bash
npm install @npmswapstech/finzly-theme
```

## 🚀 Quick Start

You can use Finzly Theme in **two ways**:

### Option 1: Global HTML Theme (Recommended for new projects)

Import the global theme to automatically style all native HTML elements:

```scss
// In your main styles.scss
@import '@npmswapstech/finzly-theme/styles/finzly-theme';
```

**That's it!** All your `<button>`, `<input>`, `<select>`, `<table>`, and other HTML elements will have consistent Finzly styling.

```html
<!-- Native HTML - automatically styled -->
<button>Primary Button</button>
<input type="text" placeholder="Enter text">
<table>
  <thead><tr><th>Name</th></tr></thead>
  <tbody><tr><td>John</td></tr></tbody>
</table>
```

📖 **[See Complete HTML Theme Documentation](THEME_USAGE.md)**

### Option 2: Angular Components

Import the Angular component library for more advanced features:

#### 1. Import the Module

In your Angular application's module (e.g., `app.module.ts`):

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiKitModule } from '@npmswapstech/finzly-theme';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Required for animations
    UiKitModule              // Import the UI Kit
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2. Add Global Styles (Optional)

If you want to use the utility classes or global theme, import the styles in your `styles.scss`:

```scss
// Option A: Full theme (styles all HTML elements)
@import '@npmswapstech/finzly-theme/styles/finzly-theme';

// Option B: Just tokens and utilities (for custom styling)
@import '@npmswapstech/finzly-theme/styles/tokens';
@import '@npmswapstech/finzly-theme/styles/utilities';
```

#### 3. Setup Toast Container

For toast notifications to work globally, add the toast container to your `app.component.html`:

```html
<ui-toast-container></ui-toast-container>
<router-outlet></router-outlet>
```

## 🎨 Global HTML Theme Features

The global theme (`finzly-theme.scss`) automatically styles:

✅ **Form Elements**: `<button>`, `<input>`, `<textarea>`, `<select>`, `<checkbox>`, `<radio>`  
✅ **Content**: `<h1>`-`<h6>`, `<p>`, `<a>`, `<ul>`, `<ol>`, `<table>`, `<code>`, `<pre>`  
✅ **Components**: Cards, badges, alerts, progress bars  
✅ **Utilities**: Flexbox, spacing, colors, typography classes  

**Example:**
```html
<!-- No classes needed - just native HTML -->
<button data-variant="primary" data-size="large">Click Me</button>
<input type="email" placeholder="Email" data-size="small">
<table data-striped="true">...</table>
```

📖 **[Complete HTML Theme Guide & Examples](THEME_USAGE.md)**

---

## 📚 Angular Components Documentation

### 🔘 Button

A versatile button component with multiple variants and sizes.

```html
<ui-button 
  variant="primary" 
  size="m" 
  [loading]="isLoading"
  [disabled]="isDisabled"
  (clicked)="handleClick()">
  Click Me
</ui-button>
```

**Properties:**
- `variant`: `'primary' | 'secondary' | 'danger' | 'ghost' | 'link'` (default: `'primary'`)
- `size`: `'s' | 'm' | 'l' | 'xl' | 'xxl'` (default: `'m'`)
- `loading`: `boolean` - Shows loading spinner
- `disabled`: `boolean` - Disables the button
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)
- `block`: `boolean` - Makes button full width

**Events:**
- `clicked`: Emits on button click

**Example with Icons:**
```html
<ui-button variant="primary">
  <span icon-start>📧</span>
  Send Email
</ui-button>
```

---

### ⭐ Finzly Input Components (NEW)

**FinzlyInputComponent** & **FinzlyAmountInputComponent** - Production-ready input components with built-in validation, formatting, and consistent styling.

```typescript
import { FinzlyInputComponent, FinzlyAmountInputComponent } from '@npmswapstech/finzly-theme';
```

**Basic Input:**
```html
<finzly-input
  label="Full Name"
  placeholder="Enter your name"
  [required]="true"
  [(ngModel)]="name">
</finzly-input>
```

**Amount Input with Formatting:**
```html
<finzly-amount-input
  label="Price"
  [prefix]="'$'"
  [decimalPrecision]="2"
  [minValue]="0"
  [maxValue]="10000"
  [(ngModel)]="price">
</finzly-amount-input>
```

**Features:**
- ✅ Template-driven and reactive forms support
- ✅ Built-in validation states (success, error, warning)
- ✅ Automatic thousand separator formatting for amounts (1,234.56)
- ✅ Configurable decimal precision (0-10 places)
- ✅ Min/Max value validation
- ✅ Custom prefix/suffix (currency symbols, units, percentages)
- ✅ Multiple sizes (sm, md, lg)
- ✅ Helper text and error messages
- ✅ Required field indicators (red asterisk)

📖 **[Complete Documentation](README_INPUTS.md)** | **[Quick Reference](QUICK_REFERENCE_INPUTS.md)**

---

### 📝 Input

Form input with validation support, labels, and prefix/suffix.

```html
<ui-input
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  [(ngModel)]="email"
  [error]="emailError"
  [required]="true"
  size="m"
  prefix="@"
  hint="We'll never share your email">
</ui-input>
```

**Properties:**
- `type`: `'text' | 'password' | 'number' | 'email' | 'tel' | 'url'` (default: `'text'`)
- `label`: `string` - Label text
- `placeholder`: `string` - Placeholder text
- `size`: `'s' | 'm' | 'l' | 'xl'` (default: `'m'`)
- `prefix`: `string` - Text before input
- `suffix`: `string` - Text after input
- `error`: `string` - Error message
- `hint`: `string` - Help text
- `disabled`: `boolean`
- `readonly`: `boolean`
- `required`: `boolean`

**Works with Angular Forms:**
```typescript
// Template-driven
<ui-input [(ngModel)]="username"></ui-input>

// Reactive forms
<ui-input [formControl]="emailControl"></ui-input>
```

---

### 📄 Textarea

Auto-resizing textarea with character counter.

```html
<ui-textarea
  label="Description"
  placeholder="Enter description"
  [(ngModel)]="description"
  [autoResize]="true"
  [showCharCounter]="true"
  [maxlength]="500"
  size="m"
  [rows]="3">
</ui-textarea>
```

**Properties:**
- `label`: `string`
- `placeholder`: `string`
- `size`: `'s' | 'm' | 'l'` (default: `'m'`)
- `rows`: `number` (default: `3`)
- `autoResize`: `boolean` (default: `true`)
- `showCharCounter`: `boolean` (default: `false`)
- `maxlength`: `number`
- `error`: `string`
- `hint`: `string`

---

### 📋 Select

Dropdown select with search and multi-select support.

```html
<ui-select
  label="Select Country"
  [options]="countries"
  [(ngModel)]="selectedCountry"
  [searchable]="true"
  [multiple]="false"
  placeholder="Choose a country"
  size="m">
</ui-select>
```

**TypeScript:**
```typescript
import { SelectOption } from '@npmswapstech/finzly-theme';

countries: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada', disabled: true }
];
```

**Properties:**
- `options`: `SelectOption[]` - Array of options
- `label`: `string`
- `placeholder`: `string`
- `size`: `'s' | 'm' | 'l' | 'xl'` (default: `'m'`)
- `multiple`: `boolean` - Enable multi-select
- `searchable`: `boolean` - Enable search
- `disabled`: `boolean`
- `error`: `string`
- `hint`: `string`

---

### ☑️ Checkbox

Checkbox with indeterminate state support.

```html
<ui-checkbox
  label="Accept Terms & Conditions"
  [(ngModel)]="accepted"
  color="primary"
  [indeterminate]="false"
  [disabled]="false">
</ui-checkbox>
```

**Properties:**
- `label`: `string`
- `color`: `'primary' | 'accent' | 'danger'` (default: `'primary'`)
- `disabled`: `boolean`
- `indeterminate`: `boolean`

---

### 🔘 Radio

Radio button component.

```html
<ui-radio
  label="Option 1"
  name="options"
  value="option1"
  [(ngModel)]="selectedOption"
  color="primary">
</ui-radio>

<ui-radio
  label="Option 2"
  name="options"
  value="option2"
  [(ngModel)]="selectedOption"
  color="primary">
</ui-radio>
```

**Properties:**
- `label`: `string`
- `name`: `string` - Group name
- `value`: `any` - Radio value
- `color`: `'primary' | 'accent' | 'danger'` (default: `'primary'`)
- `disabled`: `boolean`

---

### 🔀 Switch

Toggle switch component.

```html
<ui-switch
  label="Enable Notifications"
  [(ngModel)]="notificationsEnabled"
  color="primary"
  size="m">
</ui-switch>
```

**Properties:**
- `label`: `string`
- `color`: `'primary' | 'accent' | 'danger' | 'success'` (default: `'primary'`)
- `size`: `'s' | 'm' | 'l'` (default: `'m'`)
- `disabled`: `boolean`

---

### 💬 Dialog / Modal

Modal dialog with header, body, and footer.

```html
<ui-dialog
  [(open)]="showDialog"
  title="Confirm Action"
  size="m"
  [closeOnBackdrop]="true"
  [closeOnEscape]="true"
  [showClose]="true">
  
  <p>Are you sure you want to delete this item?</p>
  
  <div dialog-footer>
    <ui-button variant="ghost" (clicked)="showDialog = false">
      Cancel
    </ui-button>
    <ui-button variant="danger" (clicked)="confirmDelete()">
      Delete
    </ui-button>
  </div>
</ui-dialog>
```

**Properties:**
- `open`: `boolean` - Controls visibility (two-way binding)
- `title`: `string` - Dialog title
- `size`: `'s' | 'm' | 'l' | 'xl'` (default: `'m'`)
- `closeOnBackdrop`: `boolean` (default: `true`)
- `closeOnEscape`: `boolean` (default: `true`)
- `showClose`: `boolean` (default: `true`)

**Events:**
- `closed`: Emits when dialog closes
- `openChange`: Emits when open state changes

---

### 💡 Tooltip

Directive for adding tooltips to any element.

```html
<button
  uiTooltip="This is a helpful tooltip"
  [tooltipPosition]="'top'"
  [tooltipTheme]="'dark'"
  [tooltipDisabled]="false">
  Hover Me
</button>
```

**Properties:**
- `uiTooltip`: `string` - Tooltip text
- `tooltipPosition`: `'top' | 'bottom' | 'left' | 'right'` (default: `'top'`)
- `tooltipTheme`: `'dark' | 'light'` (default: `'dark'`)
- `tooltipDisabled`: `boolean`

---

### 🔔 Toast / Snackbar

Toast notification service for displaying temporary messages.

**Setup in Component:**
```typescript
import { UiToastService } from '@npmswapstech/finzly-theme';

constructor(private toastService: UiToastService) {}

showNotification() {
  // Success toast (3 seconds)
  this.toastService.success('Operation completed successfully!');
  
  // Error toast (5 seconds)
  this.toastService.error('Something went wrong!');
  
  // Warning toast
  this.toastService.warning('Please review your changes');
  
  // Info toast
  this.toastService.info('New update available');
  
  // Custom duration
  this.toastService.show('Custom message', 'info', 10000);
}
```

**Service Methods:**
- `success(message, duration?)`: Show success toast
- `error(message, duration?)`: Show error toast
- `warning(message, duration?)`: Show warning toast
- `info(message, duration?)`: Show info toast
- `show(message, type, duration?, dismissible?)`: Show custom toast

---

### 🃏 Card

Container component with elevation and sections.

```html
<ui-card elevation="md" [padding]="true">
  <div card-header>
    <h3>Card Title</h3>
  </div>
  
  <p>This is the card content area.</p>
  
  <div card-footer>
    <ui-button variant="primary">Action</ui-button>
  </div>
</ui-card>
```

**Properties:**
- `elevation`: `'none' | 'sm' | 'md' | 'lg' | 'xl'` (default: `'md'`)
- `padding`: `boolean` (default: `true`) - Add padding to content

**Slots:**
- `card-header`: Header section
- Default: Main content
- `card-footer`: Footer section

---

### 🏷️ Badge

Small status indicator or label.

```html
<ui-badge color="primary" size="m">New</ui-badge>
<ui-badge color="danger" size="s">99+</ui-badge>
<ui-badge color="success" [dot]="true"></ui-badge>
```

**Properties:**
- `color`: `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'` (default: `'primary'`)
- `size`: `'s' | 'm' | 'l'` (default: `'m'`)
- `dot`: `boolean` - Show as dot instead of text

---

### 🎯 Chip

Removable tag or filter chip.

```html
<ui-chip
  color="primary"
  size="m"
  [dismissible]="true"
  [disabled]="false"
  (dismissed)="onChipRemove()">
  Angular
</ui-chip>
```

**Properties:**
- `color`: `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'` (default: `'primary'`)
- `size`: `'s' | 'm' | 'l'` (default: `'m'`)
- `dismissible`: `boolean` - Show close button
- `disabled`: `boolean`

**Events:**
- `dismissed`: Emits when close button clicked

---

### 👤 Avatar

User avatar with image, initials, or icon fallback.

```html
<ui-avatar
  [src]="user.imageUrl"
  [alt]="user.name"
  [initials]="user.name"
  shape="circle"
  size="m">
</ui-avatar>

<!-- With icon fallback -->
<ui-avatar shape="circle" size="l">
  👤
</ui-avatar>
```

**Properties:**
- `src`: `string` - Image URL
- `alt`: `string` - Image alt text
- `initials`: `string` - Show initials if no image
- `shape`: `'circle' | 'square'` (default: `'circle'`)
- `size`: `'s' | 'm' | 'l' | 'xl' | 'xxl'` (default: `'m'`)

---

### 📊 Table

Data table with sorting and styling options.

```html
<ui-table
  [columns]="columns"
  [data]="tableData"
  [striped]="true"
  [hoverable]="true"
  [bordered]="false"
  [loading]="isLoading"
  (sortChange)="onSort($event)"
  (rowClick)="onRowClick($event)">
</ui-table>
```

**TypeScript:**
```typescript
import { TableColumn, SortEvent } from '@npmswapstech/finzly-theme';

columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true, width: '200px' },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: false }
];

tableData = [
  { name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
];

onSort(event: SortEvent) {
  console.log('Sort by:', event.column, event.direction);
  // Implement your sorting logic
}
```

**Properties:**
- `columns`: `TableColumn[]` - Column definitions
- `data`: `any[]` - Table data
- `striped`: `boolean` - Alternate row colors
- `hoverable`: `boolean` - Hover effect on rows
- `bordered`: `boolean` - Show borders
- `loading`: `boolean` - Show loading state

**Events:**
- `sortChange`: Emits sort events
- `rowClick`: Emits when row clicked

---

### ⏳ Loader

Loading spinner with multiple animation types.

```html
<ui-loader
  type="spinner"
  size="m"
  color="#0066cc"
  text="Loading...">
</ui-loader>
```

**Properties:**
- `type`: `'spinner' | 'dots' | 'pulse'` (default: `'spinner'`)
- `size`: `'s' | 'm' | 'l' | 'xl'` (default: `'m'`)
- `color`: `string` - Custom color
- `text`: `string` - Loading text

---

### 📈 Progress Bar

Progress indicator with value.

```html
<ui-progress-bar
  [value]="uploadProgress"
  [max]="100"
  color="primary"
  size="m"
  [striped]="true"
  [animated]="true"
  [showLabel]="true">
</ui-progress-bar>
```

**Properties:**
- `value`: `number` - Current value (default: `0`)
- `max`: `number` - Maximum value (default: `100`)
- `color`: `'primary' | 'success' | 'warning' | 'danger' | 'info'` (default: `'primary'`)
- `size`: `'s' | 'm' | 'l'` (default: `'m'`)
- `striped`: `boolean` - Show stripes
- `animated`: `boolean` - Animate stripes
- `showLabel`: `boolean` - Show percentage label

---

### 📭 Empty State

Display when no data is available.

```html
<ui-empty-state
  icon="📭"
  title="No Messages"
  message="You don't have any messages yet. Start a conversation!"
  size="m">
  
  <ui-button variant="primary">
    Create New Message
  </ui-button>
</ui-empty-state>
```

**Properties:**
- `icon`: `string` - Icon or emoji
- `title`: `string` (default: `'No data'`)
- `message`: `string` - Description text
- `size`: `'s' | 'm' | 'l'` (default: `'m'`)

---

## 🎨 Design Tokens

Access design tokens in your SCSS:

```scss
@import '@npmswapstech/finzly-theme/styles/tokens';

.my-component {
  color: $finzly-primary;
  padding: $finzly-spacing-4;
  border-radius: $finzly-radius-md;
  box-shadow: $finzly-shadow-md;
  font-size: $finzly-font-size-base;
}
```

**Available Token Categories:**
- **Colors:** Primary, secondary, success, danger, warning, info, gray scales
- **Spacing:** `$finzly-spacing-1` through `$finzly-spacing-16`
- **Typography:** Font sizes, weights, line heights
- **Border Radius:** `$finzly-radius-sm` through `$finzly-radius-full`
- **Shadows:** `$finzly-shadow-sm` through `$finzly-shadow-2xl`
- **Transitions:** `$finzly-transition-fast`, `base`, `slow`

## 🛠️ Mixins

Use built-in mixins for consistent styling:

```scss
@import '@npmswapstech/finzly-theme/styles/mixins';

.custom-button {
  @include button-base;
  @include button-variant($finzly-primary, $finzly-primary, $finzly-white);
}

.custom-input {
  @include input-base;
}

.custom-card {
  @include card($finzly-spacing-6, $finzly-shadow-lg);
}
```

## 🎯 Utility Classes

Quick styling with utility classes:

```html
<div class="d-flex justify-content-between align-items-center p-4 mb-3">
  <span class="text-primary font-semibold">Title</span>
  <button class="cursor-pointer">Action</button>
</div>
```

Categories: Display, Flexbox, Spacing, Typography, Colors, Borders, Shadows

## 📱 Responsive Design

All components are responsive and work across devices. Use breakpoint mixins:

```scss
@import '@npmswapstech/finzly-theme/styles/mixins';

.my-component {
  padding: $finzly-spacing-2;
  
  @include respond-to('md') {
    padding: $finzly-spacing-4;
  }
  
  @include respond-to('lg') {
    padding: $finzly-spacing-6;
  }
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Build for Production

To use this library in your project:

```bash
# Install dependencies
npm install

# Build the library
npm run build

# The build output will be in dist/
```

## 🤝 Contributing

When adding new components:
1. Follow the existing component structure
2. Use design tokens from `_tokens.scss`
3. Implement `ControlValueAccessor` for form controls
4. Add comprehensive tests
5. Update this README

## 📄 License

Proprietary - @npmswapstech

## 🆘 Support

For issues, questions, or feature requests, please contact the development team.

---

**Made with ❤️ by the Finzly Team**

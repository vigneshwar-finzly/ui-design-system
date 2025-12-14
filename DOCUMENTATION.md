# Finzly Component Library Documentation

A comprehensive Angular documentation application for the Finzly UI component library.

## Overview

This documentation application provides an interactive, searchable guide to all Finzly components. It includes:

- **30+ Production-ready Components** across 7 categories
- **Interactive Playground** for testing components
- **Complete API Documentation** with props, events, and methods
- **Code Examples** with syntax highlighting and copy-to-clipboard
- **Accessibility Guidelines** for each component
- **Theming Documentation** with CSS variables
- **Dark/Light Mode** toggle
- **Full-text Search** across all components
- **Responsive Design** optimized for mobile, tablet, and desktop

## Architecture

### Core Structure

```
demo/src/app/
├── models/                 # TypeScript interfaces
│   └── component-doc.model.ts
├── services/              # Core services
│   ├── component-data.service.ts
│   ├── theme.service.ts
│   ├── search.service.ts
│   └── code-generator.service.ts
├── data/                  # Component documentation data
│   └── component-docs.data.ts
├── shared/                # Reusable components
│   ├── code-example/
│   └── component-playground/
└── pages/                 # Route components
    ├── overview/
    ├── getting-started/
    ├── design-principles/
    └── components/
        ├── components-list/
        ├── category-page/
        └── component-detail/
```

### Key Features

#### 1. Component Categories

Components are organized into 7 categories:

- **Inputs**: Text fields, textareas, email inputs, checkboxes, radio buttons, toggles
- **Buttons**: Custom buttons, save/cancel buttons, back buttons, dropdown buttons
- **Pickers**: Date pickers, time pickers, datetime pickers, dropdowns
- **Navigation**: (Extensible for future components)
- **Feedback**: Dialogs, toasts, badges
- **Layout**: Containers, sections
- **Data Display**: Headings, text, labels, badges

#### 2. Interactive Documentation

Each component page includes:

- **Overview Tab**: Basic usage, import instructions, use cases
- **API Tab**: Complete properties table with types, defaults, and descriptions
- **Examples Tab**: Multiple code examples for different scenarios
- **Accessibility Tab**: ARIA support, keyboard navigation, screen reader info
- **Theming Tab**: CSS variables and customization options

#### 3. Search Functionality

Full-text search supports:
- Component names
- Descriptions
- Tags
- Property names

#### 4. Theme Switching

Toggle between light and dark themes with:
- Persistent storage
- System preference detection
- Smooth transitions
- CSS variable-based theming

#### 5. Code Generation

Automatically generates:
- HTML component usage
- TypeScript component code
- Module import statements

## Services

### ComponentDataService

Manages all component metadata:
- Retrieves components by ID or category
- Tracks recently viewed components
- Provides category information

### ThemeService

Handles theme switching:
- Persists theme preference
- Applies CSS theme classes
- Detects system preferences

### SearchService

Implements full-text search:
- Searches across component properties
- Returns matched results with context
- Supports real-time filtering

### CodeGeneratorService

Generates code examples:
- Creates HTML templates
- Formats TypeScript code
- Handles property serialization

## Running the Documentation

### Development

```bash
npm run demo
```

This starts the development server and opens the documentation at `http://localhost:4200`

### Building

```bash
npm run build:demo
```

Outputs production-ready files to `dist/finzly-css-demo`

## Adding New Components

To add a new component to the documentation:

1. **Add component metadata** to `demo/src/app/data/component-docs.data.ts`:

```typescript
{
  id: 'component-id',
  name: 'Component Name',
  category: 'inputs',
  description: 'Component description',
  selector: 'component-selector',
  module: '@npmswapstech/finzly-theme',
  tags: ['tag1', 'tag2'],
  properties: [...],
  examples: [...],
  useCases: [...],
  accessibility: {...},
  theming: {...}
}
```

2. **The component** will automatically appear in:
   - Search results
   - Category pages
   - Component list
   - Navigation

## Design Principles

The documentation follows these principles:

- **Consistency**: Uniform patterns across all pages
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Lazy-loaded routes for fast initial load
- **Responsiveness**: Mobile-first design
- **Usability**: Clear navigation and intuitive interface

## Technology Stack

- **Angular 18+**: Standalone components
- **TypeScript 5.5+**: Type-safe code
- **SCSS**: Advanced styling
- **RxJS**: Reactive state management
- **Material Icons**: Icon system

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Support

Fully responsive with:
- Collapsible sidebar
- Touch-friendly interactions
- Optimized layouts for small screens

## Performance

- **Lazy Loading**: Routes loaded on demand
- **Tree Shaking**: Unused code eliminated
- **Code Splitting**: Optimized chunk sizes
- **Minimal Bundle**: ~100KB initial load (gzipped)

## Deployment

The documentation can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Build the production bundle with:

```bash
npm run build:demo
```

Then deploy the `dist/finzly-css-demo` directory.

## Customization

### Adding Categories

Add to `ComponentDataService.categories`:

```typescript
{
  id: 'new-category',
  name: 'New Category',
  description: 'Category description',
  icon: 'material_icon_name'
}
```

### Modifying Theme Colors

Update CSS variables in `demo/src/app/app.component.scss`:

```scss
.dark-theme {
  --primary: #your-color;
  --background: #your-background;
}
```

### Adding Navigation Links

Update sidebar in `demo/src/app/app.component.html`

## Future Enhancements

Potential improvements:
- Component playground with live editing
- Download code examples as files
- Figma integration
- Stackblitz/CodeSandbox integration
- Version comparison
- Component usage analytics
- API documentation generation from source
- Interactive tutorials
- Video tutorials

## License

This documentation is part of the Finzly Theme package and follows the same license.

## Support

For issues, questions, or contributions, please visit:
https://github.com/npmswapstech/finzly-theme

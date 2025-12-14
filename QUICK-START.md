# Quick Start Guide - Finzly Documentation

## Installation

```bash
npm install
```

## Run Documentation

```bash
npm run demo
```

Visit: `http://localhost:4200`

## Build for Production

```bash
npm run build:demo
```

Output: `dist/finzly-css-demo/`

## Navigation

### Main Routes
- `/` or `/overview` - Home page
- `/getting-started` - Installation guide
- `/design-principles` - Design system
- `/components` - All components
- `/components/:category` - Category view
- `/components/:category/:id` - Component docs
- `/components/:category/:id/showcase` - Interactive playground

### Component Categories
1. **Inputs** - Forms and data entry
2. **Buttons** - Action triggers
3. **Pickers** - Date/time selection
4. **Feedback** - Alerts and notifications
5. **Layout** - Containers and structure
6. **Data Display** - Text and badges

## Key Features

### Interactive Playground
- Real-time property manipulation
- Visual state toggles
- Live preview updates
- Code generation

### State Showcase
- Complete visual state matrix
- Size variants display
- Interactive demonstrations
- Usage guidelines

### Documentation Tabs
1. **Playground** - Interactive testing
2. **States** - Visual states matrix
3. **API** - Property reference
4. **Examples** - Code samples
5. **Accessibility** - A11y guidelines

## Keyboard Shortcuts

- `/` - Focus search
- `Esc` - Close/clear
- `Tab` - Navigate
- `Arrow Keys` - Navigate lists

## Adding Components

Edit `demo/src/app/data/component-docs.data.ts`:

```typescript
{
  id: 'component-id',
  name: 'Component Name',
  category: 'inputs',
  description: 'Description',
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

## Themes

Toggle light/dark mode:
- Click theme button in header
- Preference saved automatically
- CSS variables used throughout

## Search

Full-text search across:
- Component names
- Descriptions
- Properties
- Tags

## Documentation Files

- `README.md` - Project overview
- `DOCUMENTATION.md` - Complete guide
- `INTERACTIVE-DOCUMENTATION-GUIDE.md` - Features guide
- `COMPONENT-STATES-REFERENCE.md` - States guide
- `DOCUMENTATION-SUMMARY.md` - Complete summary
- `QUICK-START.md` - This file

## Support

- GitHub: https://github.com/npmswapstech/finzly-theme
- Email: support@npmswapstech.com

## Technology Stack

- Angular 18+
- TypeScript 5.5+
- SCSS
- RxJS 7+
- Material Icons

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

**Need help?** Check the complete guides in the project root.

# Finzly CSS Demo Application

A comprehensive demo application showcasing the Finzly Design System and all its components.

## Features

- **Overview** - Introduction to the design system, color palette, typography, and spacing
- **Buttons** - All button variants, sizes, and states
- **Inputs & Forms** - Text inputs, textareas, selects, checkboxes, radios, toggles, and complete form examples
- **Alerts & Toasts** - Alert messages and toast notification system
- **Badges** - Status indicators with various styles
- **Dialogs** - Modal dialogs with different sizes
- **Tooltips** - Tooltip structure and additional components (progress bars, avatars, spinners, skeleton loaders)
- **Utilities** - Comprehensive utility class reference

## Running the Demo

```bash
# Install dependencies (if not already done)
npm install

# Serve the demo app
npm run demo

# Or use Angular CLI directly
ng serve finzly-css-demo --open
```

The application will open at `http://localhost:4200`

## Project Structure

```
demo/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── overview/
│   │   │   ├── buttons/
│   │   │   ├── inputs/
│   │   │   ├── alerts/
│   │   │   ├── badges/
│   │   │   ├── dialogs/
│   │   │   ├── tooltips/
│   │   │   └── utilities/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss (imports finzly_theme.scss)
└── tsconfig.app.json
```

## Technologies

- Angular 18+
- Standalone Components
- Angular Router with Lazy Loading
- SCSS
- Finzly Theme Design System

## Features Demonstrated

### Components
- Buttons (all variants, sizes, states)
- Form Controls (inputs, selects, checkboxes, radios, toggles)
- Alerts & Toast Notifications
- Badges
- Dialogs/Modals
- Cards
- Progress Bars
- Avatars
- Spinners
- Skeleton Loaders

### Design System
- Color Palette
- Typography Scale
- Spacing System
- Border Radius
- Elevation (Shadows)
- Utility Classes

### Angular Features
- Standalone Components
- Lazy Loaded Routes
- Reactive Programming (RxJS)
- Dependency Injection
- Angular Animations

## Customization

The demo uses the Finzly Theme SCSS files located in `src/lib/styles/`. To customize:

1. Modify variables in `src/lib/styles/_variables.scss`
2. Adjust mixins in `src/lib/styles/_mixins.scss`
3. Update component styles in respective partial files

## Building for Production

```bash
ng build finzly-css-demo --configuration production
```

Output will be in `dist/finzly-css-demo/`

## License

UNLICENSED - For internal use only


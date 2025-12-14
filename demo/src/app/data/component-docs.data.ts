import { ComponentDocumentation } from '../models/component-doc.model';

export const COMPONENT_DOCS_DATA: ComponentDocumentation[] = [
  {
    id: 'finzly-input',
    name: 'Finzly Input',
    category: 'inputs',
    description: 'A styled text input component with label, error handling, and validation support.',
    selector: 'finzly-input',
    module: '@npmswapstech/finzly-theme',
    tags: ['input', 'form', 'text', 'validation'],
    properties: [
      { name: 'label', type: 'string', description: 'Label text for the input field', required: false },
      { name: 'placeholder', type: 'string', description: 'Placeholder text', required: false },
      { name: 'value', type: 'string', description: 'Input value', required: false },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled', required: false },
      { name: 'required', type: 'boolean', default: 'false', description: 'Whether the input is required', required: false },
      { name: 'errorMessage', type: 'string', description: 'Error message to display', required: false }
    ],
    examples: [
      {
        title: 'Basic Usage',
        description: 'Simple text input with label',
        code: `<finzly-input
  label="Username"
  placeholder="Enter username">
</finzly-input>`,
        language: 'html'
      },
      {
        title: 'With Validation',
        description: 'Input with required validation and error message',
        code: `<finzly-input
  label="Email"
  placeholder="Enter email"
  [required]="true"
  errorMessage="Email is required">
</finzly-input>`,
        language: 'html'
      }
    ],
    useCases: [
      'User registration and login forms',
      'Data entry forms',
      'Search fields',
      'Profile information editing'
    ],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-required', 'aria-invalid'],
      keyboardNavigation: ['Tab to focus', 'Enter to submit'],
      screenReaderInfo: 'Announces label and error messages'
    },
    theming: {
      cssVariables: ['--input-border-color', '--input-background', '--input-text-color'],
      customization: 'Use CSS variables to customize colors and spacing'
    }
  },
  {
    id: 'finzly-textarea',
    name: 'Finzly Textarea',
    category: 'inputs',
    description: 'Multi-line text input component for longer text content.',
    selector: 'finzly-textarea',
    module: '@npmswapstech/finzly-theme',
    tags: ['textarea', 'form', 'multiline', 'text'],
    properties: [
      { name: 'label', type: 'string', description: 'Label text for the textarea', required: false },
      { name: 'placeholder', type: 'string', description: 'Placeholder text', required: false },
      { name: 'rows', type: 'number', default: '4', description: 'Number of visible rows', required: false },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the textarea is disabled', required: false }
    ],
    examples: [
      {
        title: 'Basic Textarea',
        description: 'Simple textarea with label',
        code: `<finzly-textarea
  label="Description"
  placeholder="Enter description"
  [rows]="6">
</finzly-textarea>`,
        language: 'html'
      }
    ],
    useCases: ['Comments and feedback', 'Long-form text entry', 'Descriptions and notes'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-multiline'],
      keyboardNavigation: ['Tab to focus', 'Arrow keys for navigation'],
      screenReaderInfo: 'Announces as multi-line text input'
    },
    theming: {
      cssVariables: ['--textarea-border-color', '--textarea-background'],
      customization: 'Customize appearance with CSS variables'
    }
  },
  {
    id: 'finzly-input-email',
    name: 'Finzly Email Input',
    category: 'inputs',
    description: 'Specialized email input with built-in validation.',
    selector: 'finzly-input-email',
    module: '@npmswapstech/finzly-theme',
    tags: ['email', 'input', 'validation', 'form'],
    properties: [
      { name: 'label', type: 'string', description: 'Label text', required: false },
      { name: 'placeholder', type: 'string', description: 'Placeholder text', required: false },
      { name: 'required', type: 'boolean', default: 'false', description: 'Whether email is required', required: false }
    ],
    examples: [
      {
        title: 'Email Input',
        description: 'Email input with validation',
        code: `<finzly-input-email
  label="Email Address"
  placeholder="you@example.com"
  [required]="true">
</finzly-input-email>`,
        language: 'html'
      }
    ],
    useCases: ['Registration forms', 'Contact forms', 'Login screens'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-required', 'aria-invalid'],
      keyboardNavigation: ['Tab to focus'],
      screenReaderInfo: 'Announces as email input field'
    },
    theming: {
      cssVariables: ['--input-border-color', '--input-background'],
      customization: 'Inherits from base input styling'
    }
  },
  {
    id: 'finzly-amount-input',
    name: 'Finzly Amount Input',
    category: 'inputs',
    description: 'Specialized input for currency amounts with formatting.',
    selector: 'finzly-amount-input',
    module: '@npmswapstech/finzly-theme',
    tags: ['amount', 'currency', 'money', 'number', 'input'],
    properties: [
      { name: 'label', type: 'string', description: 'Label text', required: false },
      { name: 'currency', type: 'string', default: 'USD', description: 'Currency code', required: false },
      { name: 'value', type: 'number', description: 'Amount value', required: false }
    ],
    examples: [
      {
        title: 'Amount Input',
        description: 'Currency amount input',
        code: `<finzly-amount-input
  label="Amount"
  currency="USD"
  [value]="1000">
</finzly-amount-input>`,
        language: 'html'
      }
    ],
    useCases: ['Payment forms', 'Financial transactions', 'Price entry'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-valuemin', 'aria-valuemax'],
      keyboardNavigation: ['Tab to focus', 'Arrow keys to adjust'],
      screenReaderInfo: 'Announces amount with currency'
    },
    theming: {
      cssVariables: ['--amount-input-color'],
      customization: 'Style currency symbol and amount display'
    }
  },
  {
    id: 'finzly-checkbox',
    name: 'Finzly Checkbox',
    category: 'inputs',
    description: 'Checkbox component for boolean selections.',
    selector: 'finzly-checkbox',
    module: '@npmswapstech/finzly-theme',
    tags: ['checkbox', 'selection', 'boolean', 'form'],
    properties: [
      { name: 'label', type: 'string', description: 'Checkbox label', required: false },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Whether checkbox is checked', required: false },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether checkbox is disabled', required: false }
    ],
    examples: [
      {
        title: 'Basic Checkbox',
        description: 'Simple checkbox with label',
        code: `<finzly-checkbox
  label="I agree to terms and conditions"
  [checked]="false">
</finzly-checkbox>`,
        language: 'html'
      }
    ],
    useCases: ['Terms acceptance', 'Feature toggles', 'Multi-select lists'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-checked'],
      keyboardNavigation: ['Space to toggle', 'Tab to focus'],
      screenReaderInfo: 'Announces checked state'
    },
    theming: {
      cssVariables: ['--checkbox-color', '--checkbox-border'],
      customization: 'Customize check mark and border'
    }
  },
  {
    id: 'finzly-radio-button',
    name: 'Finzly Radio Button',
    category: 'inputs',
    description: 'Radio button for single selection from multiple options.',
    selector: 'finzly-radio-button',
    module: '@npmswapstech/finzly-theme',
    tags: ['radio', 'selection', 'form', 'choice'],
    properties: [
      { name: 'label', type: 'string', description: 'Radio button label', required: false },
      { name: 'value', type: 'string', description: 'Radio button value', required: true },
      { name: 'name', type: 'string', description: 'Radio group name', required: true },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Whether radio is selected', required: false }
    ],
    examples: [
      {
        title: 'Radio Group',
        description: 'Group of radio buttons',
        code: `<finzly-radio-button
  label="Option 1"
  name="options"
  value="option1">
</finzly-radio-button>
<finzly-radio-button
  label="Option 2"
  name="options"
  value="option2">
</finzly-radio-button>`,
        language: 'html'
      }
    ],
    useCases: ['Single choice selections', 'Survey questions', 'Settings options'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-checked'],
      keyboardNavigation: ['Arrow keys to navigate group', 'Space to select'],
      screenReaderInfo: 'Announces position in group'
    },
    theming: {
      cssVariables: ['--radio-color', '--radio-border'],
      customization: 'Style radio indicator'
    }
  },
  {
    id: 'finzly-toggle',
    name: 'Finzly Toggle',
    category: 'inputs',
    description: 'Toggle switch for on/off states.',
    selector: 'finzly-toggle',
    module: '@npmswapstech/finzly-theme',
    tags: ['toggle', 'switch', 'boolean', 'form'],
    properties: [
      { name: 'label', type: 'string', description: 'Toggle label', required: false },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Whether toggle is on', required: false },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether toggle is disabled', required: false }
    ],
    examples: [
      {
        title: 'Basic Toggle',
        description: 'Simple on/off toggle',
        code: `<finzly-toggle
  label="Enable notifications"
  [checked]="true">
</finzly-toggle>`,
        language: 'html'
      }
    ],
    useCases: ['Feature toggles', 'Settings switches', 'Visibility controls'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-checked', 'role="switch"'],
      keyboardNavigation: ['Space to toggle', 'Tab to focus'],
      screenReaderInfo: 'Announces as toggle switch with state'
    },
    theming: {
      cssVariables: ['--toggle-on-color', '--toggle-off-color'],
      customization: 'Customize colors for on/off states'
    }
  },
  {
    id: 'finzly-custom-button',
    name: 'Finzly Custom Button',
    category: 'buttons',
    description: 'Customizable button component with various styles.',
    selector: 'finzly-custom-button',
    module: '@npmswapstech/finzly-theme',
    tags: ['button', 'action', 'custom'],
    properties: [
      { name: 'label', type: 'string', description: 'Button text', required: false },
      { name: 'type', type: 'string', default: 'button', description: 'Button type', options: ['button', 'submit', 'reset'], required: false },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether button is disabled', required: false },
      { name: 'variant', type: 'string', default: 'primary', description: 'Button style variant', options: ['primary', 'secondary', 'outline'], required: false }
    ],
    examples: [
      {
        title: 'Primary Button',
        description: 'Standard primary button',
        code: `<finzly-custom-button
  label="Click Me"
  variant="primary">
</finzly-custom-button>`,
        language: 'html'
      },
      {
        title: 'Secondary Button',
        description: 'Secondary style button',
        code: `<finzly-custom-button
  label="Cancel"
  variant="secondary">
</finzly-custom-button>`,
        language: 'html'
      }
    ],
    useCases: ['Form submissions', 'Action triggers', 'Navigation'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-disabled'],
      keyboardNavigation: ['Enter or Space to activate', 'Tab to focus'],
      screenReaderInfo: 'Announces button label and state'
    },
    theming: {
      cssVariables: ['--button-primary-bg', '--button-secondary-bg'],
      customization: 'Customize colors, padding, and border radius'
    }
  },
  {
    id: 'finzly-save-button',
    name: 'Finzly Save Button',
    category: 'buttons',
    description: 'Pre-styled save button for form submissions.',
    selector: 'finzly-save-button',
    module: '@npmswapstech/finzly-theme',
    tags: ['button', 'save', 'submit', 'form'],
    properties: [
      { name: 'label', type: 'string', default: 'Save', description: 'Button text', required: false },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether button is disabled', required: false },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading state', required: false }
    ],
    examples: [
      {
        title: 'Save Button',
        description: 'Button for saving forms',
        code: `<finzly-save-button
  label="Save Changes"
  [disabled]="!formValid">
</finzly-save-button>`,
        language: 'html'
      }
    ],
    useCases: ['Form submissions', 'Data persistence', 'Save actions'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-busy'],
      keyboardNavigation: ['Enter or Space to save'],
      screenReaderInfo: 'Announces save action'
    },
    theming: {
      cssVariables: ['--save-button-bg'],
      customization: 'Customize save button appearance'
    }
  },
  {
    id: 'finzly-cancel-button',
    name: 'Finzly Cancel Button',
    category: 'buttons',
    description: 'Pre-styled cancel button for dismissing actions.',
    selector: 'finzly-cancel-button',
    module: '@npmswapstech/finzly-theme',
    tags: ['button', 'cancel', 'dismiss', 'form'],
    properties: [
      { name: 'label', type: 'string', default: 'Cancel', description: 'Button text', required: false },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether button is disabled', required: false }
    ],
    examples: [
      {
        title: 'Cancel Button',
        description: 'Button for canceling actions',
        code: `<finzly-cancel-button
  label="Cancel">
</finzly-cancel-button>`,
        language: 'html'
      }
    ],
    useCases: ['Dismissing dialogs', 'Canceling forms', 'Abandoning changes'],
    accessibility: {
      ariaSupport: ['aria-label'],
      keyboardNavigation: ['Enter or Space to cancel', 'Escape key support'],
      screenReaderInfo: 'Announces cancel action'
    },
    theming: {
      cssVariables: ['--cancel-button-bg'],
      customization: 'Customize cancel button appearance'
    }
  },
  {
    id: 'finzly-close-button',
    name: 'Finzly Close Button',
    category: 'buttons',
    description: 'Icon button for closing dialogs and panels.',
    selector: 'finzly-close-button',
    module: '@npmswapstech/finzly-theme',
    tags: ['button', 'close', 'dismiss', 'icon'],
    properties: [
      { name: 'ariaLabel', type: 'string', default: 'Close', description: 'Accessible label', required: false }
    ],
    examples: [
      {
        title: 'Close Button',
        description: 'Button for closing dialogs',
        code: `<finzly-close-button
  ariaLabel="Close dialog">
</finzly-close-button>`,
        language: 'html'
      }
    ],
    useCases: ['Closing modals', 'Dismissing panels', 'Removing items'],
    accessibility: {
      ariaSupport: ['aria-label', 'role="button"'],
      keyboardNavigation: ['Enter or Space to close'],
      screenReaderInfo: 'Announces close action'
    },
    theming: {
      cssVariables: ['--close-button-color'],
      customization: 'Customize icon color and size'
    }
  },
  {
    id: 'finzly-back-button',
    name: 'Finzly Back Button',
    category: 'buttons',
    description: 'Navigation button for going back.',
    selector: 'finzly-back-button',
    module: '@npmswapstech/finzly-theme',
    tags: ['button', 'navigation', 'back'],
    properties: [
      { name: 'label', type: 'string', default: 'Back', description: 'Button text', required: false }
    ],
    examples: [
      {
        title: 'Back Button',
        description: 'Button for navigation',
        code: `<finzly-back-button
  label="Go Back">
</finzly-back-button>`,
        language: 'html'
      }
    ],
    useCases: ['Navigation', 'Breadcrumb actions', 'Wizard steps'],
    accessibility: {
      ariaSupport: ['aria-label'],
      keyboardNavigation: ['Enter or Space to navigate back'],
      screenReaderInfo: 'Announces back navigation'
    },
    theming: {
      cssVariables: ['--back-button-color'],
      customization: 'Customize appearance'
    }
  },
  {
    id: 'finzly-dropdown-button',
    name: 'Finzly Dropdown Button',
    category: 'buttons',
    description: 'Button that triggers a dropdown menu.',
    selector: 'finzly-dropdown-button',
    module: '@npmswapstech/finzly-theme',
    tags: ['button', 'dropdown', 'menu'],
    properties: [
      { name: 'label', type: 'string', description: 'Button text', required: false },
      { name: 'options', type: 'Array<any>', description: 'Dropdown options', required: true }
    ],
    examples: [
      {
        title: 'Dropdown Button',
        description: 'Button with dropdown menu',
        code: `<finzly-dropdown-button
  label="Actions"
  [options]="menuOptions">
</finzly-dropdown-button>`,
        language: 'html'
      }
    ],
    useCases: ['Action menus', 'Context menus', 'Option selection'],
    accessibility: {
      ariaSupport: ['aria-haspopup', 'aria-expanded'],
      keyboardNavigation: ['Enter to open', 'Arrow keys to navigate'],
      screenReaderInfo: 'Announces menu state'
    },
    theming: {
      cssVariables: ['--dropdown-button-bg'],
      customization: 'Style button and dropdown'
    }
  },
  {
    id: 'finzly-date-picker',
    name: 'Finzly Date Picker',
    category: 'pickers',
    description: 'Date selection component with calendar interface.',
    selector: 'finzly-date-picker',
    module: '@npmswapstech/finzly-theme',
    tags: ['date', 'picker', 'calendar', 'form'],
    properties: [
      { name: 'label', type: 'string', description: 'Picker label', required: false },
      { name: 'value', type: 'Date', description: 'Selected date', required: false },
      { name: 'minDate', type: 'Date', description: 'Minimum selectable date', required: false },
      { name: 'maxDate', type: 'Date', description: 'Maximum selectable date', required: false }
    ],
    examples: [
      {
        title: 'Basic Date Picker',
        description: 'Simple date selection',
        code: `<finzly-date-picker
  label="Select Date"
  [value]="selectedDate">
</finzly-date-picker>`,
        language: 'html'
      }
    ],
    useCases: ['Date selection', 'Scheduling', 'Booking systems'],
    accessibility: {
      ariaSupport: ['aria-label', 'role="dialog"'],
      keyboardNavigation: ['Arrow keys for date navigation', 'Enter to select'],
      screenReaderInfo: 'Announces selected date'
    },
    theming: {
      cssVariables: ['--date-picker-bg', '--date-picker-selected'],
      customization: 'Customize calendar appearance'
    }
  },
  {
    id: 'finzly-time-picker',
    name: 'Finzly Time Picker',
    category: 'pickers',
    description: 'Time selection component.',
    selector: 'finzly-time-picker',
    module: '@npmswapstech/finzly-theme',
    tags: ['time', 'picker', 'clock', 'form'],
    properties: [
      { name: 'label', type: 'string', description: 'Picker label', required: false },
      { name: 'value', type: 'string', description: 'Selected time', required: false },
      { name: 'format', type: 'string', default: '24h', description: 'Time format', options: ['12h', '24h'], required: false }
    ],
    examples: [
      {
        title: 'Time Picker',
        description: 'Select time',
        code: `<finzly-time-picker
  label="Select Time"
  format="12h">
</finzly-time-picker>`,
        language: 'html'
      }
    ],
    useCases: ['Appointment scheduling', 'Time entry', 'Event planning'],
    accessibility: {
      ariaSupport: ['aria-label'],
      keyboardNavigation: ['Arrow keys to adjust time'],
      screenReaderInfo: 'Announces selected time'
    },
    theming: {
      cssVariables: ['--time-picker-bg'],
      customization: 'Customize picker appearance'
    }
  },
  {
    id: 'finzly-date-time-picker',
    name: 'Finzly Date Time Picker',
    category: 'pickers',
    description: 'Combined date and time selection.',
    selector: 'finzly-date-time-picker',
    module: '@npmswapstech/finzly-theme',
    tags: ['datetime', 'picker', 'calendar', 'form'],
    properties: [
      { name: 'label', type: 'string', description: 'Picker label', required: false },
      { name: 'value', type: 'Date', description: 'Selected date and time', required: false }
    ],
    examples: [
      {
        title: 'DateTime Picker',
        description: 'Select date and time',
        code: `<finzly-date-time-picker
  label="Schedule"
  [value]="scheduledDateTime">
</finzly-date-time-picker>`,
        language: 'html'
      }
    ],
    useCases: ['Event scheduling', 'Appointments', 'Reminders'],
    accessibility: {
      ariaSupport: ['aria-label'],
      keyboardNavigation: ['Tab between date and time', 'Arrow keys to adjust'],
      screenReaderInfo: 'Announces date and time'
    },
    theming: {
      cssVariables: ['--datetime-picker-bg'],
      customization: 'Customize appearance'
    }
  },
  {
    id: 'finzly-custom-date-picker',
    name: 'Finzly Custom Date Picker',
    category: 'pickers',
    description: 'Highly customizable date picker.',
    selector: 'finzly-custom-date-picker',
    module: '@npmswapstech/finzly-theme',
    tags: ['date', 'picker', 'custom', 'calendar'],
    properties: [
      { name: 'label', type: 'string', description: 'Picker label', required: false },
      { name: 'value', type: 'Date', description: 'Selected date', required: false },
      { name: 'customFormat', type: 'string', description: 'Custom date format', required: false }
    ],
    examples: [
      {
        title: 'Custom Date Picker',
        description: 'Customized date selection',
        code: `<finzly-custom-date-picker
  label="Select Date"
  customFormat="DD/MM/YYYY">
</finzly-custom-date-picker>`,
        language: 'html'
      }
    ],
    useCases: ['Custom date formats', 'International date formats'],
    accessibility: {
      ariaSupport: ['aria-label'],
      keyboardNavigation: ['Arrow keys for navigation'],
      screenReaderInfo: 'Announces date in custom format'
    },
    theming: {
      cssVariables: ['--custom-picker-bg'],
      customization: 'Fully customizable'
    }
  },
  {
    id: 'finzly-dropdown',
    name: 'Finzly Dropdown',
    category: 'pickers',
    description: 'Dropdown select component.',
    selector: 'finzly-dropdown',
    module: '@npmswapstech/finzly-theme',
    tags: ['dropdown', 'select', 'form', 'options'],
    properties: [
      { name: 'label', type: 'string', description: 'Dropdown label', required: false },
      { name: 'options', type: 'Array<any>', description: 'Dropdown options', required: true },
      { name: 'placeholder', type: 'string', description: 'Placeholder text', required: false }
    ],
    examples: [
      {
        title: 'Dropdown',
        description: 'Select from options',
        code: `<finzly-dropdown
  label="Country"
  [options]="countries"
  placeholder="Select country">
</finzly-dropdown>`,
        language: 'html'
      }
    ],
    useCases: ['Form selections', 'Filtering', 'Option choices'],
    accessibility: {
      ariaSupport: ['aria-label', 'aria-expanded'],
      keyboardNavigation: ['Arrow keys to navigate', 'Enter to select'],
      screenReaderInfo: 'Announces options and selection'
    },
    theming: {
      cssVariables: ['--dropdown-bg', '--dropdown-border'],
      customization: 'Customize dropdown appearance'
    }
  },
  {
    id: 'finzly-dialog',
    name: 'Finzly Dialog',
    category: 'feedback',
    description: 'Modal dialog component for alerts and confirmations.',
    selector: 'finzly-dialog',
    module: '@npmswapstech/finzly-theme',
    tags: ['dialog', 'modal', 'popup', 'overlay'],
    properties: [
      { name: 'title', type: 'string', description: 'Dialog title', required: false },
      { name: 'isOpen', type: 'boolean', default: 'false', description: 'Whether dialog is open', required: false },
      { name: 'closable', type: 'boolean', default: 'true', description: 'Whether dialog can be closed', required: false }
    ],
    examples: [
      {
        title: 'Basic Dialog',
        description: 'Simple modal dialog',
        code: `<finzly-dialog
  title="Confirm Action"
  [isOpen]="showDialog">
  <p>Are you sure?</p>
</finzly-dialog>`,
        language: 'html'
      }
    ],
    useCases: ['Confirmations', 'Alerts', 'Forms in modals'],
    accessibility: {
      ariaSupport: ['role="dialog"', 'aria-labelledby', 'aria-modal'],
      keyboardNavigation: ['Escape to close', 'Tab to cycle through elements'],
      screenReaderInfo: 'Announces dialog opening and focus trap'
    },
    theming: {
      cssVariables: ['--dialog-bg', '--dialog-overlay'],
      customization: 'Customize dialog and overlay'
    }
  },
  {
    id: 'finzly-toastr',
    name: 'Finzly Toastr',
    category: 'feedback',
    description: 'Toast notification component.',
    selector: 'finzly-toastr',
    module: '@npmswapstech/finzly-theme',
    tags: ['toast', 'notification', 'alert', 'message'],
    properties: [
      { name: 'message', type: 'string', description: 'Toast message', required: true },
      { name: 'type', type: 'string', default: 'info', description: 'Toast type', options: ['success', 'error', 'warning', 'info'], required: false },
      { name: 'duration', type: 'number', default: '3000', description: 'Display duration in ms', required: false }
    ],
    examples: [
      {
        title: 'Success Toast',
        description: 'Show success message',
        code: `// In component
this.toastr.show('Success!', 'success');`,
        language: 'typescript'
      }
    ],
    useCases: ['Success messages', 'Error notifications', 'Info alerts'],
    accessibility: {
      ariaSupport: ['role="alert"', 'aria-live="polite"'],
      keyboardNavigation: ['Focus on action buttons'],
      screenReaderInfo: 'Announces toast messages'
    },
    theming: {
      cssVariables: ['--toast-success-bg', '--toast-error-bg'],
      customization: 'Customize colors per type'
    }
  },
  {
    id: 'finzly-badge',
    name: 'Finzly Badge',
    category: 'data-display',
    description: 'Badge component for labels and status indicators.',
    selector: 'finzly-badge',
    module: '@npmswapstech/finzly-theme',
    tags: ['badge', 'label', 'status', 'tag'],
    properties: [
      { name: 'text', type: 'string', description: 'Badge text', required: true },
      { name: 'variant', type: 'string', default: 'default', description: 'Badge style', options: ['default', 'success', 'warning', 'error'], required: false }
    ],
    examples: [
      {
        title: 'Status Badge',
        description: 'Show status with badge',
        code: `<finzly-badge
  text="Active"
  variant="success">
</finzly-badge>`,
        language: 'html'
      }
    ],
    useCases: ['Status indicators', 'Labels', 'Tags', 'Counts'],
    accessibility: {
      ariaSupport: ['aria-label'],
      keyboardNavigation: ['Not interactive'],
      screenReaderInfo: 'Announces badge text and type'
    },
    theming: {
      cssVariables: ['--badge-bg', '--badge-color'],
      customization: 'Customize badge colors'
    }
  },
  {
    id: 'finzly-container',
    name: 'Finzly Container',
    category: 'layout',
    description: 'Container component for content layout.',
    selector: 'finzly-container',
    module: '@npmswapstech/finzly-theme',
    tags: ['container', 'layout', 'wrapper'],
    properties: [
      { name: 'maxWidth', type: 'string', description: 'Maximum container width', required: false },
      { name: 'padding', type: 'string', description: 'Container padding', required: false }
    ],
    examples: [
      {
        title: 'Content Container',
        description: 'Wrap content in container',
        code: `<finzly-container maxWidth="1200px">
  <p>Content here</p>
</finzly-container>`,
        language: 'html'
      }
    ],
    useCases: ['Page layouts', 'Content sections', 'Centered content'],
    accessibility: {
      ariaSupport: ['Semantic HTML'],
      keyboardNavigation: ['Not interactive'],
      screenReaderInfo: 'Container structure'
    },
    theming: {
      cssVariables: ['--container-padding'],
      customization: 'Customize spacing'
    }
  },
  {
    id: 'finzly-section',
    name: 'Finzly Section',
    category: 'layout',
    description: 'Section component for content organization.',
    selector: 'finzly-section',
    module: '@npmswapstech/finzly-theme',
    tags: ['section', 'layout', 'organization'],
    properties: [
      { name: 'title', type: 'string', description: 'Section title', required: false },
      { name: 'background', type: 'string', description: 'Background color', required: false }
    ],
    examples: [
      {
        title: 'Content Section',
        description: 'Organize content in sections',
        code: `<finzly-section title="Features">
  <p>Section content</p>
</finzly-section>`,
        language: 'html'
      }
    ],
    useCases: ['Page sections', 'Content organization', 'Visual separation'],
    accessibility: {
      ariaSupport: ['role="region"', 'aria-labelledby'],
      keyboardNavigation: ['Not interactive'],
      screenReaderInfo: 'Announces section boundaries'
    },
    theming: {
      cssVariables: ['--section-bg', '--section-padding'],
      customization: 'Customize section styling'
    }
  },
  {
    id: 'finzly-heading',
    name: 'Finzly Heading',
    category: 'data-display',
    description: 'Heading component with consistent styling.',
    selector: 'finzly-heading',
    module: '@npmswapstech/finzly-theme',
    tags: ['heading', 'title', 'typography'],
    properties: [
      { name: 'level', type: 'number', default: '1', description: 'Heading level (1-6)', required: false },
      { name: 'text', type: 'string', description: 'Heading text', required: true }
    ],
    examples: [
      {
        title: 'Page Heading',
        description: 'Main page heading',
        code: `<finzly-heading
  [level]="1"
  text="Welcome">
</finzly-heading>`,
        language: 'html'
      }
    ],
    useCases: ['Page titles', 'Section headings', 'Content hierarchy'],
    accessibility: {
      ariaSupport: ['Semantic heading levels'],
      keyboardNavigation: ['Not interactive'],
      screenReaderInfo: 'Announces heading level and text'
    },
    theming: {
      cssVariables: ['--heading-color', '--heading-font'],
      customization: 'Customize typography'
    }
  },
  {
    id: 'finzly-text',
    name: 'Finzly Text',
    category: 'data-display',
    description: 'Text component with consistent styling.',
    selector: 'finzly-text',
    module: '@npmswapstech/finzly-theme',
    tags: ['text', 'typography', 'paragraph'],
    properties: [
      { name: 'content', type: 'string', description: 'Text content', required: true },
      { name: 'variant', type: 'string', default: 'body', description: 'Text variant', options: ['body', 'caption', 'subtitle'], required: false }
    ],
    examples: [
      {
        title: 'Body Text',
        description: 'Standard text content',
        code: `<finzly-text
  content="This is body text"
  variant="body">
</finzly-text>`,
        language: 'html'
      }
    ],
    useCases: ['Body text', 'Descriptions', 'Captions'],
    accessibility: {
      ariaSupport: ['Semantic text'],
      keyboardNavigation: ['Not interactive'],
      screenReaderInfo: 'Reads text content'
    },
    theming: {
      cssVariables: ['--text-color', '--text-font'],
      customization: 'Customize typography'
    }
  },
  {
    id: 'finzly-label',
    name: 'Finzly Label',
    category: 'data-display',
    description: 'Label component for form fields.',
    selector: 'finzly-label',
    module: '@npmswapstech/finzly-theme',
    tags: ['label', 'form', 'accessibility'],
    properties: [
      { name: 'text', type: 'string', description: 'Label text', required: true },
      { name: 'required', type: 'boolean', default: 'false', description: 'Show required indicator', required: false }
    ],
    examples: [
      {
        title: 'Form Label',
        description: 'Label for input field',
        code: `<finzly-label
  text="Email"
  [required]="true">
</finzly-label>`,
        language: 'html'
      }
    ],
    useCases: ['Form labels', 'Field identifiers', 'Accessibility'],
    accessibility: {
      ariaSupport: ['Associated with form controls'],
      keyboardNavigation: ['Clicking focuses associated input'],
      screenReaderInfo: 'Announces label and required state'
    },
    theming: {
      cssVariables: ['--label-color', '--label-required-color'],
      customization: 'Customize label styling'
    }
  }
];

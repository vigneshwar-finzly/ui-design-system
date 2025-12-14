import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FinzlyCustomButtonComponent,
  FinzlyBackButtonComponent,
  FinzlySaveButtonComponent,
  FinzlyCancelButtonComponent,
  FinzlyCloseButtonComponent,
  FinzlyInputComponent,
  FinzlyInputEmailComponent,
  FinzlyAmountInputComponent,
  FinzlyBadgeComponent,
  FinzlyCheckboxComponent,
  FinzlyRadioButtonComponent,
  FinzlyDropdownComponent,
  FinzlyTextareaComponent,
  FinzlyDatePickerComponent,
  FinzlyTimePickerComponent,
  FinzlyDateTimePickerComponent,
  FinzlyCustomDatePickerComponent,
  FinzlyToggleComponent,
  FinzlyDialogService,
  FinzlyToastrService
} from '@npmswapstech/finzly-theme';

// Import new components from source (until library is rebuilt)
import { FinzlyLabelComponent } from '../../../../../src/lib/components/finzly-label/finzly-label.component';
import { FinzlyHeadingComponent } from '../../../../../src/lib/components/finzly-heading/finzly-heading.component';
import { FinzlyTextComponent } from '../../../../../src/lib/components/finzly-text/finzly-text.component';
import { FinzlyContainerComponent } from '../../../../../src/lib/components/finzly-container/finzly-container.component';
import { FinzlySectionComponent } from '../../../../../src/lib/components/finzly-section/finzly-section.component';

interface ComponentSection {
  title: string;
  description: string;
  preview: string;
  code: string;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FinzlyCustomButtonComponent,
    FinzlyBackButtonComponent,
    FinzlySaveButtonComponent,
    FinzlyCancelButtonComponent,
    FinzlyCloseButtonComponent,
    FinzlyInputComponent,
    FinzlyInputEmailComponent,
    FinzlyAmountInputComponent,
    FinzlyBadgeComponent,
    FinzlyCheckboxComponent,
    FinzlyRadioButtonComponent,
    FinzlyDropdownComponent,
    FinzlyTextareaComponent,
    FinzlyDatePickerComponent,
    FinzlyTimePickerComponent,
    FinzlyDateTimePickerComponent,
    FinzlyCustomDatePickerComponent,
    FinzlyToggleComponent,
    FinzlyLabelComponent,
    FinzlyHeadingComponent,
    FinzlyTextComponent,
    FinzlyContainerComponent,
    FinzlySectionComponent
  ],
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  copiedCode: string | null = null;
  checkboxValue = false;
  radioValue = 'option1';
  searchableValue = '';
  multiSelectValue: string[] = [];
  dateValue = '';
  timeValue = '';
  datetimeValue = '';
  toggleValue = false;


  // Dropdown options
  countryOptions = [
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' }
  ];

  frameworkOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'gatsby', label: 'Gatsby' },
    { value: 'remix', label: 'Remix' }
  ];

  technologyOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' }
  ];

  roleOptions = [
    { value: '', label: 'Select a role' },
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
    { value: 'viewer', label: 'Viewer' }
  ];

  constructor(
    private dialogService: FinzlyDialogService,
    private toastrService: FinzlyToastrService
  ) {}

  ngOnInit(): void {}

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedCode = code;
      setTimeout(() => {
        this.copiedCode = null;
      }, 2000);
    });
  }

  isCopied(code: string): boolean {
    return this.copiedCode === code;
  }

  showToast(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    this.toastrService.show({
      type,
      title,
      message,
      showIcon: true,
      duration: 5000,
      dismissible: true
    });
  }

  openBasicDialog(): void {
    const dialogRef = this.dialogService.open({
      title: 'Basic Dialog',
      subtitle: 'This is a standard dialog with header, body, and footer',
      content: 'This is the dialog content area. You can put any content here including forms, text, images, and more.',
      confirmText: 'Save Changes',
      cancelText: 'Cancel',
      size: 'md'
    });

    dialogRef.afterClosed().then(result => {
      if (result) {
        this.showToast('success', 'Success!', 'Changes saved successfully.');
      }
    });
  }

  openFormDialog(): void {
    const dialogRef = this.dialogService.open({
      title: 'Add New User',
      subtitle: 'Fill in the details to create a new user account',
      content: 'This dialog would contain form fields. In a real implementation, you would use a custom dialog component with form inputs.',
      confirmText: 'Create User',
      cancelText: 'Cancel',
      size: 'md'
    });

    dialogRef.afterClosed().then(result => {
      if (result) {
        this.showToast('success', 'User Created!', 'New user account has been created successfully.');
      }
    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialogService.confirm(
      'Confirm Action',
      'Are you sure you want to proceed with this action? This will make changes to your account.',
      {
        type: 'info'
      }
    );

    dialogRef.afterClosed().then(result => {
      if (result) {
        this.showToast('success', 'Confirmed!', 'Your action has been confirmed and processed.');
      }
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialogService.confirm(
      'Delete Item',
      'Are you sure you want to delete this item? This action cannot be undone.',
      {
        type: 'error',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    );

    dialogRef.afterClosed().then(result => {
      if (result) {
        this.showToast('success', 'Deleted!', 'The item has been permanently deleted.');
      }
    });
  }

  openAlertDialog(): void {
    const dialogRef = this.dialogService.alert(
      'Operation Successful',
      'Your changes have been saved and will take effect immediately.',
      {
        type: 'success'
      }
    );
  }

  // Code examples
  buttonCode = `<finzly-custom-button variant="primary">Primary</finzly-custom-button>
<finzly-custom-button variant="secondary">Secondary</finzly-custom-button>
<finzly-custom-button variant="outline">Outline</finzly-custom-button>
<finzly-custom-button variant="ghost">Ghost</finzly-custom-button>
<finzly-custom-button variant="danger">Danger</finzly-custom-button>

<finzly-custom-button size="sm">Small</finzly-custom-button>
<finzly-custom-button size="md">Medium</finzly-custom-button>
<finzly-custom-button size="lg">Large</finzly-custom-button>

<finzly-custom-button [loading]="true">Loading</finzly-custom-button>
<finzly-custom-button [disabled]="true">Disabled</finzly-custom-button>`;

  inputCode = `<finzly-input
  label="Email"
  placeholder="Enter your email"
  [fullWidth]="true">
</finzly-input>

<finzly-input
  label="Search"
  placeholder="Search..."
  startIcon="search"
  [fullWidth]="true">
</finzly-input>

<finzly-input
  label="Error State"
  error="This field is required"
  [fullWidth]="true">
</finzly-input>

<finzly-input
  label="With Helper Text"
  helperText="Enter a valid email address"
  [fullWidth]="true">
</finzly-input>`;

  badgeCode = `<finzly-badge variant="success">Success</finzly-badge>
<finzly-badge variant="warning">Warning</finzly-badge>
<finzly-badge variant="error">Error</finzly-badge>
<finzly-badge variant="info">Info</finzly-badge>
<finzly-badge variant="default">Default</finzly-badge>

<finzly-badge variant="success" size="sm">Small</finzly-badge>
<finzly-badge variant="success" size="md">Medium</finzly-badge>
<finzly-badge variant="success" size="lg">Large</finzly-badge>

<finzly-badge variant="success" [dot]="true">With Dot</finzly-badge>
<finzly-badge variant="info" [rounded]="true">Rounded</finzly-badge>`;

  checkboxCode = `<finzly-checkbox
  label="Accept terms and conditions"
  [(ngModel)]="checkboxValue">
</finzly-checkbox>

<finzly-checkbox
  label="Subscribe to newsletter"
  helperText="Get updates about new features">
</finzly-checkbox>

<finzly-checkbox
  label="Disabled option"
  [disabled]="true">
</finzly-checkbox>`;

  radioCode = `<finzly-radio-button
  label="Credit Card"
  value="option1"
  name="payment"
  [(ngModel)]="radioValue">
</finzly-radio-button>

<finzly-radio-button
  label="PayPal"
  value="option2"
  name="payment"
  [(ngModel)]="radioValue">
</finzly-radio-button>

<finzly-radio-button
  label="Bank Transfer"
  value="option3"
  name="payment"
  [(ngModel)]="radioValue">
</finzly-radio-button>`;

  selectCode = `<finzly-dropdown
  [options]="countryOptions"
  placeholder="Select a country">
</finzly-dropdown>

// With searchable
<finzly-dropdown
  [options]="options"
  [searchable]="true"
  placeholder="Search and select...">
</finzly-dropdown>

// Multi-select
<finzly-dropdown
  [options]="options"
  [multiSelect]="true"
  placeholder="Select multiple options">
</finzly-dropdown>`;

  textareaCode = `<finzly-textarea
  label="Comments"
  placeholder="Enter your comments..."
  [rows]="4"
  helperText="Maximum 500 characters"
  [fullWidth]="true">
</finzly-textarea>`;

  datepickerCode = `<finzly-date-picker
  label="Select Date"
  helperText="Choose a date from the calendar">
</finzly-date-picker>`;

  customDatepickerCode = `<finzly-custom-date-picker
  label="Select Date"
  helperText="Advanced date picker with presets">
</finzly-custom-date-picker>`;

  timepickerCode = `<finzly-time-picker
  label="Select Time"
  helperText="Choose a time">
</finzly-time-picker>`;

  datetimepickerCode = `<finzly-date-time-picker
  label="Select Date & Time"
  helperText="Choose both date and time">
</finzly-date-time-picker>`;

  emailInputCode = `<finzly-input-email
  label="Email Address"
  placeholder="Enter your email">
</finzly-input-email>`;

  amountInputCode = `<finzly-amount-input
  label="Amount"
  placeholder="0.00">
</finzly-amount-input>`;

  toggleCode = `<finzly-toggle
  label="Enable notifications"
  [(ngModel)]="toggleValue">
</finzly-toggle>`;

  specialButtonsCode = `<finzly-back-button></finzly-back-button>
<finzly-save-button></finzly-save-button>
<finzly-cancel-button></finzly-cancel-button>
<finzly-close-button></finzly-close-button>`;

  dialogCode = `// Inject the service
constructor(private dialogService: FinzlyDialogService) {}

// Basic Dialog
openDialog() {
  const dialogRef = this.dialogService.open({
    title: 'Dialog Title',
    content: 'Dialog content goes here',
    confirmText: 'Save Changes',
    cancelText: 'Cancel',
    size: 'md'
  });

  dialogRef.afterClosed().then(result => {
    if (result) {
      console.log('Confirmed');
    }
  });
}

// Confirmation Dialog
this.dialogService.confirm(
  'Confirm Action',
  'Are you sure you want to proceed?',
  {
    type: 'error',
    confirmText: 'Delete',
    cancelText: 'Cancel'
  }
);

// Alert Dialog
this.dialogService.alert(
  'Success',
  'Operation completed successfully',
  { type: 'success' }
);`;

  toastCode = `// Inject the service
constructor(private toastrService: FinzlyToastrService) {}

// Show Toast with title, icon, and description
this.toastrService.show({
  type: 'success',
  title: 'Success!',
  message: 'Your changes have been saved successfully.',
  showIcon: true,
  duration: 5000,
  dismissible: true
});

this.toastrService.show({
  type: 'error',
  title: 'Error!',
  message: 'Unable to complete the operation. Please try again.',
  showIcon: true,
  dismissible: true
});

this.toastrService.show({
  type: 'warning',
  title: 'Warning!',
  message: 'Please review your input before proceeding.',
  showIcon: true
});

this.toastrService.show({
  type: 'info',
  title: 'Information',
  message: 'This is an informational message with important details.',
  showIcon: true
});

// Or use convenience methods
this.toastrService.success('Operation completed!', 'Success');
this.toastrService.error('Something went wrong!', 'Error');
this.toastrService.warning('Please check your input', 'Warning');
this.toastrService.info('New updates available', 'Information');`;
}


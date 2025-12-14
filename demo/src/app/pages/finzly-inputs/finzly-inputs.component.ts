import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinzlyInputComponent } from '../../../../../src/lib/components/finzly-input/finzly-input.component';
import { FinzlyAmountInputComponent } from '../../../../../src/lib/components/finzly-amount-input/finzly-amount-input.component';
import { FinzlyTextareaComponent } from '../../../../../src/lib/components/finzly-textarea/finzly-textarea.component';
import { FinzlyCheckboxComponent } from '../../../../../src/lib/components/finzly-checkbox/finzly-checkbox.component';
import { FinzlyRadioButtonComponent } from '../../../../../src/lib/components/finzly-radio-button/finzly-radio-button.component';
import { FinzlyToggleComponent } from '../../../../../src/lib/components/finzly-toggle/finzly-toggle.component';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-finzly-inputs',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    FinzlyInputComponent,
    FinzlyAmountInputComponent,
    FinzlyTextareaComponent,
    FinzlyCheckboxComponent,
    FinzlyRadioButtonComponent,
    FinzlyToggleComponent
  ],
  templateUrl: './finzly-inputs.component.html',
  styleUrls: ['./finzly-inputs.component.scss']
})
export class FinzlyInputsComponent implements OnInit, OnDestroy {
  activeSection: string = 'finzly-input';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  
  // Track active tab for each example
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'finzly-input', title: 'Finzly Input', icon: 'input' },
    { id: 'finzly-amount-input', title: 'Amount Input', icon: 'payments' },
    { id: 'finzly-textarea', title: 'Textarea', icon: 'notes' },
    { id: 'finzly-checkbox', title: 'Checkbox', icon: 'check_box' },
    { id: 'finzly-radio', title: 'Radio Button', icon: 'radio_button_checked' },
    { id: 'finzly-toggle', title: 'Toggle', icon: 'toggle_on' },
    { id: 'api-reference', title: 'API Reference', icon: 'code' }
  ];

  // Model values
  textValue = '';
  emailValue = '';
  amountValue: number | null = null;
  priceValue: number | null = 1234.56;
  textareaValue = '';
  checkboxValue = false;
  radioValue = 'option1';
  toggleValue = false;

  // Reactive forms
  inputForm: FormGroup;
  allComponentsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.allComponentsForm = this.fb.group({
      fullName: ['', Validators.required],
      price: [null, Validators.required],
      description: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      plan: ['basic', Validators.required],
      notifications: [true]
    });
  }

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-140px 0px -66%',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    // Observe all sections
    setTimeout(() => {
      this.sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element && this.observer) {
          this.observer.observe(element);
        }
      });
    }, 100);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140; // Header + nav offset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

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

  setActiveTab(exampleId: string, tab: 'preview' | 'code'): void {
    this.activeTabs[exampleId] = tab;
  }

  getActiveTab(exampleId: string): 'preview' | 'code' {
    return this.activeTabs[exampleId] || 'preview';
  }

  isTabActive(exampleId: string, tab: 'preview' | 'code'): boolean {
    return this.getActiveTab(exampleId) === tab;
  }

  getFieldState(form: FormGroup, fieldName: string): 'default' | 'error' | 'success' {
    const control = form.get(fieldName);
    if (!control || !(control.dirty || control.touched)) {
      return 'default';
    }
    return control.invalid ? 'error' : 'success';
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);
    if (!control?.errors) return '';
    
    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Invalid email format';
    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  onSubmitForm(form: FormGroup): void {
    if (form.valid) {
      console.log('Form Values:', form.value);
      alert('Form submitted! Check console for values.');
    } else {
      Object.keys(form.controls).forEach(key => {
        form.get(key)?.markAsTouched();
      });
    }
  }

  // Code examples
  examples = {
    inputBasic: `<finzly-input
  label="Full Name"
  placeholder="Enter your name"
  [(ngModel)]="textValue">
</finzly-input>`,
    
    inputRequired: `<finzly-input
  label="Email Address"
  type="email"
  [required]="true"
  placeholder="your@email.com"
  [(ngModel)]="emailValue">
</finzly-input>`,

    inputSizesCode: `<!-- Small -->
<finzly-input
  label="Small Input"
  size="sm"
  [(ngModel)]="textValue">
</finzly-input>

<!-- Medium (default) -->
<finzly-input
  label="Medium Input"
  [(ngModel)]="textValue">
</finzly-input>

<!-- Large -->
<finzly-input
  label="Large Input"
  size="lg"
  [(ngModel)]="textValue">
</finzly-input>`,

    inputStatesCode: `<!-- Success State -->
<finzly-input
  label="Success State"
  state="success"
  helperText="This looks good!"
  [(ngModel)]="textValue">
</finzly-input>

<!-- Error State -->
<finzly-input
  label="Error State"
  state="error"
  errorText="This field is required"
  [(ngModel)]="textValue">
</finzly-input>

<!-- Warning State -->
<finzly-input
  label="Warning State"
  state="warning"
  helperText="Please double-check"
  [(ngModel)]="textValue">
</finzly-input>`,
    
    inputValidation: `<finzly-input
  label="Full Name"
  [required]="true"
  [state]="getFieldState(inputForm, 'name')"
  [errorText]="getFieldError(inputForm, 'name')"
  formControlName="name">
</finzly-input>`,
    
    amountBasic: `<finzly-amount-input
  label="Amount"
  [(ngModel)]="amountValue">
</finzly-amount-input>`,
    
    amountCustom: `<finzly-amount-input
  label="Price"
  [prefix]="'$'"
  [decimalPrecision]="2"
  [minValue]="0"
  [maxValue]="10000"
  [(ngModel)]="priceValue">
</finzly-amount-input>`,

    amountSizesCode: `<!-- Small -->
<finzly-amount-input
  label="Small Amount"
  size="sm"
  [(ngModel)]="priceValue">
</finzly-amount-input>

<!-- Medium (default) -->
<finzly-amount-input
  label="Medium Amount"
  [(ngModel)]="priceValue">
</finzly-amount-input>

<!-- Large -->
<finzly-amount-input
  label="Large Amount"
  size="lg"
  [(ngModel)]="priceValue">
</finzly-amount-input>`,
    
    textareaBasic: `<finzly-textarea
  label="Description"
  placeholder="Enter description"
  [rows]="4"
  [(ngModel)]="textareaValue">
</finzly-textarea>`,
    
    textareaAdvanced: `<finzly-textarea
  label="Comments"
  [required]="true"
  [autoResize]="true"
  [showCharCount]="true"
  [maxLength]="500"
  helperText="Maximum 500 characters"
  [(ngModel)]="textareaValue">
</finzly-textarea>`,

    textareaStatesCode: `<!-- Success State -->
<finzly-textarea
  label="Success"
  state="success"
  helperText="Looks good!"
  [(ngModel)]="textareaValue">
</finzly-textarea>

<!-- Error State -->
<finzly-textarea
  label="Error"
  state="error"
  errorText="Required field"
  [(ngModel)]="textareaValue">
</finzly-textarea>`,
    
    checkboxBasic: `<finzly-checkbox
  label="Accept terms and conditions"
  [(ngModel)]="checkboxValue">
</finzly-checkbox>`,
    
    checkboxGroup: `<finzly-checkbox label="Option 1" [(ngModel)]="option1"></finzly-checkbox>
<finzly-checkbox label="Option 2" [(ngModel)]="option2"></finzly-checkbox>
<finzly-checkbox label="Option 3" [(ngModel)]="option3"></finzly-checkbox>`,

    checkboxHelperCode: `<finzly-checkbox
  label="Subscribe to newsletter"
  helperText="You can unsubscribe at any time"
  [(ngModel)]="checkboxValue">
</finzly-checkbox>`,
    
    radioBasic: `<finzly-radio-button
  label="Option 1"
  [value]="'option1'"
  name="radioGroup"
  [(ngModel)]="radioValue">
</finzly-radio-button>
<finzly-radio-button
  label="Option 2"
  [value]="'option2'"
  name="radioGroup"
  [(ngModel)]="radioValue">
</finzly-radio-button>`,

    radioHelperCode: `<finzly-radio-button
  label="Basic Plan"
  [value]="'basic'"
  name="plan"
  helperText="Free forever"
  [(ngModel)]="radioValue">
</finzly-radio-button>
<finzly-radio-button
  label="Pro Plan"
  [value]="'pro'"
  name="plan"
  helperText="$19/month"
  [(ngModel)]="radioValue">
</finzly-radio-button>`,

    radioDisabledCode: `<finzly-radio-button
  label="Active Option"
  [value]="'active'"
  name="disabled-group"
  [(ngModel)]="radioValue">
</finzly-radio-button>
<finzly-radio-button
  label="Disabled Option"
  [value]="'disabled'"
  name="disabled-group"
  [disabled]="true"
  [(ngModel)]="radioValue">
</finzly-radio-button>`,
    
    toggleBasic: `<finzly-toggle
  label="Enable notifications"
  [(ngModel)]="toggleValue">
</finzly-toggle>`,
    
    toggleLabels: `<finzly-toggle
  label="Dark Mode"
  [onLabel]="'On'"
  [offLabel]="'Off'"
  [(ngModel)]="toggleValue">
</finzly-toggle>`,

    toggleMultipleCode: `<finzly-toggle
  label="Email Notifications"
  [(ngModel)]="emailNotif">
</finzly-toggle>
<finzly-toggle
  label="SMS Notifications"
  [(ngModel)]="smsNotif">
</finzly-toggle>
<finzly-toggle
  label="Push Notifications"
  [disabled]="true"
  [(ngModel)]="pushNotif">
</finzly-toggle>`,

    toggleHelperCode: `<finzly-toggle
  label="Two-Factor Authentication"
  helperText="Adds an extra layer of security"
  [(ngModel)]="toggleValue">
</finzly-toggle>`,
    
    completeForm: `<form [formGroup]="allComponentsForm" (ngSubmit)="onSubmitForm(allComponentsForm)">
  <finzly-input
    label="Full Name"
    [required]="true"
    formControlName="fullName">
  </finzly-input>

  <finzly-amount-input
    label="Price"
    [required]="true"
    formControlName="price">
  </finzly-amount-input>

  <finzly-textarea
    label="Description"
    [required]="true"
    formControlName="description">
  </finzly-textarea>

  <finzly-checkbox
    label="I agree to terms"
    formControlName="terms">
  </finzly-checkbox>

  <finzly-radio-button
    label="Basic Plan"
    [value]="'basic'"
    name="plan"
    formControlName="plan">
  </finzly-radio-button>

  <finzly-toggle
    label="Notifications"
    formControlName="notifications">
  </finzly-toggle>

  <button type="submit">Submit</button>
</form>`
  };
}

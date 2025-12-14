import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'finzly-input-email',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finzly-input-email.component.html',
  styleUrls: ['./finzly-input-email.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyInputEmailComponent),
      multi: true
    }
  ]
})
export class FinzlyInputEmailComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'your@email.com';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() variant: 'default' | 'outlined' | 'filled' = 'default';
  @Input() fullWidth: boolean = false;
  @Input() startIcon: string = '';
  @Input() endIcon: string = '';
  @Input() helperText: string = '';
  @Input() errorText: string = '';
  @Input() autocomplete: string = 'email';

  value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  
  // Email validation state
  isValid: boolean = true;
  isTouched: boolean = false;
  validationError: string = '';

  // Email validation pattern that allows apostrophes in local part
  // Allows: letters, numbers, dots, underscores, hyphens, plus signs, and apostrophes in local part
  private readonly emailPattern = /^[a-zA-Z0-9._%+\-']+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
    if (this.isTouched) {
      this.validateEmail();
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    
    if (this.isTouched) {
      this.validateEmail();
    }
    
    this.onChange(this.value);
  }

  onInputBlur(): void {
    this.isTouched = true;
    this.validateEmail();
    this.onTouched();
  }

  private validateEmail(): void {
    // Trim the value to handle trailing spaces
    const trimmedValue = this.value.trim();
    
    if (!trimmedValue) {
      if (this.required) {
        this.isValid = false;
        this.validationError = this.errorText || 'Email is required';
      } else {
        this.isValid = true;
        this.validationError = '';
      }
      return;
    }

    // Use custom email pattern that allows apostrophes in local part
    if (!this.emailPattern.test(trimmedValue)) {
      this.isValid = false;
      this.validationError = this.errorText || 'Please enter a valid email address';
    } else {
      this.isValid = true;
      this.validationError = '';
    }
  }

  get state(): 'default' | 'success' | 'error' | 'warning' {
    if (!this.isTouched) {
      return 'default';
    }
    if (!this.isValid) {
      return 'error';
    }
    if (this.isValid && this.value) {
      return 'success';
    }
    return 'default';
  }

  get inputClass(): string {
    let classes = 'finzly-input';
    
    // Add variant class
    if (this.variant === 'default') {
      classes += ' finzly-input-default';
    } else if (this.variant === 'outlined') {
      classes += ' finzly-input-outlined';
    } else if (this.variant === 'filled') {
      classes += ' finzly-input-filled';
    }
    
    // Add error class if validation fails
    const currentState = this.state;
    if (currentState === 'error') {
      classes += ' finzly-input-error';
    }
    
    // Add icon padding classes
    if (this.startIcon) {
      classes += ' finzly-input-has-start-icon';
    }
    if (this.endIcon) {
      classes += ' finzly-input-has-end-icon';
    }
    
    // Add full width class
    if (this.fullWidth) {
      classes += ' finzly-input-full-width';
    }
    
    return classes;
  }

  get showHelper(): boolean {
    return !!this.helperText && this.state !== 'error';
  }

  get showError(): boolean {
    return !!this.validationError && this.state === 'error';
  }

  get displayErrorText(): string {
    return this.validationError || this.errorText;
  }
}


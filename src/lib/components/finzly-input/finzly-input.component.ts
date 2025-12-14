import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'finzly-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finzly-input.component.html',
  styleUrls: ['./finzly-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyInputComponent),
      multi: true
    }
  ]
})
export class FinzlyInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() state: 'default' | 'success' | 'error' | 'warning' = 'default';
  @Input() helperText: string = '';
  @Input() error: string = '';
  @Input() errorText: string = '';
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() pattern?: string;
  @Input() autocomplete?: string;
  @Input() variant: 'default' | 'outlined' | 'filled' = 'default';
  @Input() fullWidth: boolean = false;
  @Input() startIcon?: string;
  @Input() endIcon?: string;

  value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
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
    this.onChange(this.value);
  }

  onInputBlur(): void {
    this.onTouched();
  }

  get inputClass(): string {
    let classes = 'finzly-input';
    
    // Variant
    classes += ` finzly-input-${this.variant}`;
    
    // Size
    if (this.size === 'sm') {
      classes += ' finzly-input-sm';
    } else if (this.size === 'lg') {
      classes += ' finzly-input-lg';
    }
    
    // Error state
    if (this.error || this.state === 'error') {
      classes += ' finzly-input-error';
    }
    
    // Full width
    if (this.fullWidth) {
      classes += ' finzly-input-full-width';
    }
    
    // Icon padding
    if (this.startIcon) {
      classes += ' finzly-input-has-start-icon';
    }
    if (this.endIcon) {
      classes += ' finzly-input-has-end-icon';
    }
    
    return classes;
  }

  get showHelper(): boolean {
    return !!this.helperText && !this.error && this.state !== 'error';
  }

  get showError(): boolean {
    return !!(this.error || this.errorText) && (this.state === 'error' || !!this.error);
  }

  get errorMessage(): string {
    return this.error || this.errorText || '';
  }
}


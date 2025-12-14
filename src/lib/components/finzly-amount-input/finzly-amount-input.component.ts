import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AmountFormatterDirective } from '../../directives/amount-formatter.directive';

@Component({
  selector: 'finzly-amount-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AmountFormatterDirective],
  templateUrl: './finzly-amount-input.component.html',
  styleUrls: ['./finzly-amount-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyAmountInputComponent),
      multi: true
    }
  ]
})
export class FinzlyAmountInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '0.00';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() variant: 'default' | 'outlined' | 'filled' = 'default';
  @Input() fullWidth: boolean = false;
  @Input() state: 'default' | 'success' | 'error' | 'warning' = 'default';
  @Input() helperText: string = '';
  @Input() errorText: string = '';
  @Input() prefix: string = '$';
  @Input() suffix: string = '';
  @Input() decimalPrecision: number = 2;
  @Input() allowNegative: boolean = true;
  @Input() maxValue?: number;
  @Input() minValue?: number;
  @Input() showPrefix: boolean = true;
  @Input() showSuffix: boolean = false;

  value: number | null = null;
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor implementation
  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: number | null): void {
    this.value = value;
    this.onChange(value);
  }

  onInputBlur(): void {
    this.onTouched();
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
    
    // Add error class if state is error
    if (this.state === 'error') {
      classes += ' finzly-input-error';
    }
    
    // Add prefix/suffix padding classes
    if (this.showPrefix && this.prefix) {
      classes += ' finzly-input-has-start-icon';
    }
    if (this.showSuffix && this.suffix) {
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
    return !!this.errorText && this.state === 'error';
  }
}


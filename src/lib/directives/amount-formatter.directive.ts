import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[finzlyAmountFormatter]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountFormatterDirective),
      multi: true
    }
  ]
})
export class AmountFormatterDirective implements ControlValueAccessor {
  @Input() decimalPrecision: number = 2;
  @Input() allowNegative: boolean = true;
  @Input() maxValue?: number;
  @Input() minValue?: number;

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};
  private numericValue: number | null = null;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: number | null): void {
    this.numericValue = value;
    if (value !== null && value !== undefined) {
      this.el.nativeElement.value = this.formatValue(value);
    } else {
      this.el.nativeElement.value = '';
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove all non-numeric characters except decimal point, minus sign
    value = value.replace(/[^\d.-]/g, '');

    // Handle negative sign
    if (!this.allowNegative) {
      value = value.replace(/-/g, '');
    } else {
      // Only allow one minus sign at the beginning
      const hasNegative = value.startsWith('-');
      value = value.replace(/-/g, '');
      if (hasNegative) {
        value = '-' + value;
      }
    }

    // Only allow one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit decimal places
    if (parts.length === 2 && parts[1].length > this.decimalPrecision) {
      parts[1] = parts[1].substring(0, this.decimalPrecision);
      value = parts.join('.');
    }

    // Convert to number
    const numValue = value === '' || value === '-' ? null : parseFloat(value);

    // Validate min/max
    if (numValue !== null) {
      if (this.maxValue !== undefined && numValue > this.maxValue) {
        value = this.maxValue.toString();
        this.numericValue = this.maxValue;
      } else if (this.minValue !== undefined && numValue < this.minValue) {
        value = this.minValue.toString();
        this.numericValue = this.minValue;
      } else {
        this.numericValue = numValue;
      }
    } else {
      this.numericValue = null;
    }

    // Update the input value without formatting during typing
    input.value = value;
    this.onChange(this.numericValue);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
    // Format the value on blur
    if (this.numericValue !== null && this.numericValue !== undefined) {
      this.el.nativeElement.value = this.formatValue(this.numericValue);
    } else if (this.el.nativeElement.value === '-' || this.el.nativeElement.value === '') {
      this.el.nativeElement.value = '';
      this.numericValue = null;
      this.onChange(null);
    }
  }

  @HostListener('focus')
  onFocus(): void {
    // Remove formatting on focus for easier editing
    if (this.numericValue !== null && this.numericValue !== undefined) {
      this.el.nativeElement.value = this.numericValue.toString();
    }
  }

  private formatValue(value: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: this.decimalPrecision,
      maximumFractionDigits: this.decimalPrecision
    }).format(value);
  }
}


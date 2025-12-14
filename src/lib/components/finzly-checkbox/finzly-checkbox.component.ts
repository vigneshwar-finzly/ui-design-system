import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'finzly-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finzly-checkbox.component.html',
  styleUrls: ['./finzly-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyCheckboxComponent),
      multi: true
    }
  ]
})
export class FinzlyCheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() id: string = `finzly-checkbox-${Math.random().toString(36).substr(2, 9)}`;
  @Input() helperText: string = '';
  @Input() error: string = '';
  @Input() indeterminate: boolean = false;

  checked: boolean = false;
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.checked = checkbox.checked;
    this.onChange(this.checked);
  }

  onCheckboxBlur(): void {
    this.onTouched();
  }
}


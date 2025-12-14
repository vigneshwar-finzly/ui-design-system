import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'finzly-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finzly-radio-button.component.html',
  styleUrls: ['./finzly-radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyRadioButtonComponent),
      multi: true
    }
  ]
})
export class FinzlyRadioButtonComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() value: any;
  @Input() name: string = `finzly-radio-${Math.random().toString(36).substr(2, 9)}`;
  @Input() disabled: boolean = false;
  @Input() id: string = `finzly-radio-${Math.random().toString(36).substr(2, 9)}`;
  @Input() helperText: string = '';
  @Input() error: string = '';

  selectedValue: any;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onRadioChange(event: Event): void {
    const radio = event.target as HTMLInputElement;
    if (radio.checked) {
      this.selectedValue = this.value;
      this.onChange(this.selectedValue);
    }
  }

  onRadioBlur(): void {
    this.onTouched();
  }

  get isChecked(): boolean {
    return this.selectedValue === this.value;
  }
}


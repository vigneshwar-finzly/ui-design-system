import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'finzly-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finzly-toggle.component.html',
  styleUrls: ['./finzly-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyToggleComponent),
      multi: true
    }
  ]
})
export class FinzlyToggleComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() id: string = `finzly-toggle-${Math.random().toString(36).substr(2, 9)}`;
  @Input() helperText: string = '';
  @Input() onLabel: string = '';
  @Input() offLabel: string = '';

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

  onToggleChange(event: Event): void {
    const toggle = event.target as HTMLInputElement;
    this.checked = toggle.checked;
    this.onChange(this.checked);
  }

  onToggleBlur(): void {
    this.onTouched();
  }
}


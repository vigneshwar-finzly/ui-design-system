import { Component, Input, forwardRef, ViewEncapsulation, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

interface TimeValue {
  hour: number;
  minute: number;
  period?: 'AM' | 'PM';
}

@Component({
  selector: 'finzly-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finzly-time-picker.component.html',
  styleUrls: ['./finzly-time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyTimePickerComponent),
      multi: true
    }
  ]
})
export class FinzlyTimePickerComponent implements ControlValueAccessor, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select time';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() use24Hour: boolean = false;
  @Input() minuteStep: number = 1;
  @Input() state: 'default' | 'success' | 'error' | 'warning' = 'default';
  @Input() helperText: string = '';
  @Input() errorText: string = '';

  @ViewChild('inputElement', { read: ElementRef }) inputElement?: ElementRef;
  @ViewChild('timePickerDropdown', { read: ElementRef }) timePickerDropdown?: ElementRef;

  hour: number = 12;
  minute: number = 0;
  period: 'AM' | 'PM' = 'AM';
  isTimePickerOpen: boolean = false;
  dropdownPosition = { top: '0px', left: '0px' };

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    if (value) {
      this.parseTime(value);
    }
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleTimePicker(): void {
    if (!this.disabled) {
      this.isTimePickerOpen = !this.isTimePickerOpen;
      if (this.isTimePickerOpen) {
        this.calculateDropdownPosition();
        this.disableBodyScroll();
      } else {
        this.onTouched();
        this.enableBodyScroll();
      }
    }
  }

  private calculateDropdownPosition(): void {
    setTimeout(() => {
      if (this.inputElement) {
        const rect = this.inputElement.nativeElement.getBoundingClientRect();
        const dropdownHeight = 300; // Approximate time picker height
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        // Position above if not enough space below
        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
          this.dropdownPosition = {
            top: `${rect.top - dropdownHeight - 8}px`,
            left: `${rect.left}px`
          };
        } else {
          this.dropdownPosition = {
            top: `${rect.bottom + 8}px`,
            left: `${rect.left}px`
          };
        }
      }
    }, 0);
  }

  private disableBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private enableBodyScroll(): void {
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  closeTimePicker(): void {
    this.isTimePickerOpen = false;
    this.onTouched();
    this.enableBodyScroll();
  }

  incrementHour(): void {
    if (this.use24Hour) {
      this.hour = (this.hour + 1) % 24;
    } else {
      this.hour = this.hour === 12 ? 1 : this.hour + 1;
    }
    this.updateValue();
  }

  decrementHour(): void {
    if (this.use24Hour) {
      this.hour = this.hour === 0 ? 23 : this.hour - 1;
    } else {
      this.hour = this.hour === 1 ? 12 : this.hour - 1;
    }
    this.updateValue();
  }

  incrementMinute(): void {
    this.minute = (this.minute + this.minuteStep) % 60;
    this.updateValue();
  }

  decrementMinute(): void {
    this.minute = this.minute === 0 ? 60 - this.minuteStep : this.minute - this.minuteStep;
    this.updateValue();
  }

  togglePeriod(): void {
    this.period = this.period === 'AM' ? 'PM' : 'AM';
    this.updateValue();
  }

  selectTime(): void {
    // Apply the current time selection and close picker
    this.updateValue();
    this.closeTimePicker();
  }

  updateValue(): void {
    this.onChange(this.formattedTime);
  }

  private parseTime(timeString: string): void {
    const parts = timeString.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (parts) {
      this.hour = parseInt(parts[1], 10);
      this.minute = parseInt(parts[2], 10);
      if (parts[3]) {
        this.period = parts[3].toUpperCase() as 'AM' | 'PM';
      }
    }
  }

  get formattedTime(): string {
    const h = String(this.hour).padStart(2, '0');
    const m = String(this.minute).padStart(2, '0');
    return this.use24Hour ? `${h}:${m}` : `${h}:${m} ${this.period}`;
  }

  get inputClass(): string {
    let classes = 'input time-input';
    
    if (this.state === 'success') classes += ' input-success';
    else if (this.state === 'error') classes += ' input-error';
    else if (this.state === 'warning') classes += ' input-warning';
    
    return classes;
  }

  get showHelper(): boolean {
    return !!this.helperText && this.state !== 'error';
  }

  get showError(): boolean {
    return !!this.errorText && this.state === 'error';
  }

  get hours(): number[] {
    return this.use24Hour 
      ? Array.from({ length: 24 }, (_, i) => i)
      : Array.from({ length: 12 }, (_, i) => i + 1);
  }

  get minutes(): number[] {
    const count = 60 / this.minuteStep;
    return Array.from({ length: count }, (_, i) => i * this.minuteStep);
  }

  selectHour(hour: number): void {
    this.hour = hour;
    this.updateValue();
  }

  selectMinute(minute: number): void {
    this.minute = minute;
    this.updateValue();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = this.timePickerDropdown?.nativeElement?.contains(target) || 
                          this.inputElement?.nativeElement?.contains(target);
    
    if (this.isTimePickerOpen && !clickedInside) {
      this.closeTimePicker();
    }
  }
}


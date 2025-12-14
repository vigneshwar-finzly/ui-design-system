import { Component, Input, forwardRef, ViewEncapsulation, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FinzlyDateFormatPipe } from '../../pipes/finzly-date-format.pipe';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'finzly-date-time-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FinzlyDateFormatPipe],
  templateUrl: './finzly-date-time-picker.component.html',
  styleUrls: ['./finzly-date-time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyDateTimePickerComponent),
      multi: true
    }
  ]
})
export class FinzlyDateTimePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select date and time';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() use24Hour: boolean = false;
  @Input() state: 'default' | 'success' | 'error' | 'warning' = 'default';
  @Input() helperText: string = '';
  @Input() errorText: string = '';
  @Input() dateFormat: string = 'MM/dd/yyyy';
  @Input() timezone?: string;

  @ViewChild('inputElement', { read: ElementRef }) inputElement?: ElementRef;
  @ViewChild('datetimePickerDropdown', { read: ElementRef }) datetimePickerDropdown?: ElementRef;

  selectedDateTime: Date | null = null;
  displayDate: Date = new Date();
  isPickerOpen: boolean = false;
  currentView: 'date' | 'month' | 'year' = 'date';
  
  // Date picker properties
  calendarDays: CalendarDay[] = [];
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[] = [];
  
  // Time picker properties
  hour: number = 12;
  minute: number = 0;
  period: 'AM' | 'PM' = 'AM';
  
  dropdownPosition = { top: '0px', left: '0px' };

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.generateCalendar();
    this.generateYears();
  }

  ngOnDestroy(): void {
    this.enableBodyScroll();
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | null): void {
    if (value) {
      this.selectedDateTime = new Date(value);
      this.displayDate = new Date(value);
      this.extractTime(value);
      this.generateCalendar();
    } else {
      this.selectedDateTime = null;
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  togglePicker(): void {
    if (!this.disabled) {
      this.isPickerOpen = !this.isPickerOpen;
      if (this.isPickerOpen) {
        this.calculateDropdownPosition();
        this.disableBodyScroll();
      } else {
        this.onTouched();
        this.enableBodyScroll();
        this.currentView = 'date';
      }
    }
  }

  closePicker(): void {
    this.isPickerOpen = false;
    this.currentView = 'date';
    this.onTouched();
    this.enableBodyScroll();
  }

  private extractTime(date: Date): void {
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    if (this.use24Hour) {
      this.hour = hour;
    } else {
      this.hour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      this.period = hour >= 12 ? 'PM' : 'AM';
    }
    this.minute = minute;
  }

  combineDateTime(): void {
    let hour = this.hour;
    
    if (!this.use24Hour) {
      if (this.period === 'PM' && hour !== 12) hour += 12;
      if (this.period === 'AM' && hour === 12) hour = 0;
    }
    
    const combined = new Date(this.displayDate);
    combined.setHours(hour, this.minute, 0, 0);
    this.selectedDateTime = combined;
    this.onChange(combined);
    // Don't call generateCalendar here - it will be called by selectDate
  }

  // Date picker methods
  selectDate(day: CalendarDay): void {
    if (day.isCurrentMonth && !this.isDateDisabled(day.date)) {
      // Create a new date object to avoid reference issues
      this.displayDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
      this.combineDateTime(); // This updates selectedDateTime
      this.generateCalendar(); // Regenerate calendar AFTER updating selectedDateTime
    }
  }

  previousMonth(): void {
    this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  switchToMonthView(): void {
    this.currentView = 'month';
  }

  switchToYearView(): void {
    this.currentView = 'year';
  }

  switchToDateView(): void {
    this.currentView = 'date';
  }

  selectYear(year: number): void {
    this.displayDate = new Date(year, this.displayDate.getMonth(), 1);
    this.generateCalendar();
    this.currentView = 'month';
  }

  selectMonth(monthIndex: number): void {
    this.displayDate = new Date(this.displayDate.getFullYear(), monthIndex, 1);
    this.generateCalendar();
    this.currentView = 'date';
  }

  previousYear(): void {
    this.displayDate = new Date(this.displayDate.getFullYear() - 1, this.displayDate.getMonth(), 1);
  }

  nextYear(): void {
    this.displayDate = new Date(this.displayDate.getFullYear() + 1, this.displayDate.getMonth(), 1);
  }

  previousYearRange(): void {
    this.displayDate = new Date(this.displayDate.getFullYear() - 12, this.displayDate.getMonth(), 1);
  }

  nextYearRange(): void {
    this.displayDate = new Date(this.displayDate.getFullYear() + 12, this.displayDate.getMonth(), 1);
  }

  private generateCalendar(): void {
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const firstDayOfWeek = firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();

    this.calendarDays = [];

    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevLastDate - i);
      this.calendarDays.push({
        date,
        day: prevLastDate - i,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        isSelected: this.isSelected(date)
      });
    }

    // Current month days
    for (let day = 1; day <= lastDateOfMonth; day++) {
      const date = new Date(year, month, day);
      this.calendarDays.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        isSelected: this.isSelected(date)
      });
    }

    // Next month days
    const remainingDays = 42 - this.calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      this.calendarDays.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        isSelected: this.isSelected(date)
      });
    }
  }

  private generateYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 50;
    const endYear = currentYear + 50;
    this.years = [];
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  private isSelected(date: Date): boolean {
    if (!this.selectedDateTime) return false;
    return date.getDate() === this.selectedDateTime.getDate() &&
           date.getMonth() === this.selectedDateTime.getMonth() &&
           date.getFullYear() === this.selectedDateTime.getFullYear();
  }

  isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  // Time picker methods
  incrementHour(): void {
    if (this.use24Hour) {
      this.hour = (this.hour + 1) % 24;
    } else {
      this.hour = this.hour === 12 ? 1 : this.hour + 1;
    }
    this.combineDateTime();
  }

  decrementHour(): void {
    if (this.use24Hour) {
      this.hour = this.hour === 0 ? 23 : this.hour - 1;
    } else {
      this.hour = this.hour === 1 ? 12 : this.hour - 1;
    }
    this.combineDateTime();
  }

  incrementMinute(): void {
    this.minute = (this.minute + 1) % 60;
    this.combineDateTime();
  }

  decrementMinute(): void {
    this.minute = this.minute === 0 ? 59 : this.minute - 1;
    this.combineDateTime();
  }

  togglePeriod(): void {
    this.period = this.period === 'AM' ? 'PM' : 'AM';
    this.combineDateTime();
  }

  applyDateTime(): void {
    this.combineDateTime();
    this.closePicker();
  }

  private calculateDropdownPosition(): void {
    setTimeout(() => {
      if (this.inputElement) {
        const rect = this.inputElement.nativeElement.getBoundingClientRect();
        const dropdownHeight = 450;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        
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

  get inputClass(): string {
    let classes = 'input datetime-input';
    
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

  get formattedDateTime(): string {
    if (!this.selectedDateTime) return '';
    const pipe = new FinzlyDateFormatPipe();
    const dateStr = pipe.transform(this.selectedDateTime, this.dateFormat, this.timezone);
    const timeStr = this.formattedTime;
    return `${dateStr} ${timeStr}`;
  }

  get formattedTime(): string {
    const h = String(this.hour).padStart(2, '0');
    const m = String(this.minute).padStart(2, '0');
    return this.use24Hour ? `${h}:${m}` : `${h}:${m} ${this.period}`;
  }

  get currentMonthYear(): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[this.displayDate.getMonth()]} ${this.displayDate.getFullYear()}`;
  }

  get currentYear(): number {
    return this.displayDate.getFullYear();
  }

  get displayedYears(): number[] {
    const currentYear = this.displayDate.getFullYear();
    const startYear = Math.floor(currentYear / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  }

  get yearRangeLabel(): string {
    const years = this.displayedYears;
    return `${years[0]} - ${years[years.length - 1]}`;
  }

  isCurrentYear(year: number): boolean {
    return year === new Date().getFullYear();
  }

  isSelectedYear(year: number): boolean {
    return year === this.displayDate.getFullYear();
  }

  isCurrentMonth(monthIndex: number): boolean {
    const now = new Date();
    return monthIndex === now.getMonth() && this.displayDate.getFullYear() === now.getFullYear();
  }

  isSelectedMonth(monthIndex: number): boolean {
    return monthIndex === this.displayDate.getMonth();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = this.datetimePickerDropdown?.nativeElement?.contains(target) || 
                          this.inputElement?.nativeElement?.contains(target);
    
    if (this.isPickerOpen && !clickedInside) {
      this.closePicker();
    }
  }
}


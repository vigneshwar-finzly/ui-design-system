import { Component, Input, forwardRef, ViewEncapsulation, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
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

export type DatePreset = 'TODAY' | 'FDW' | 'LDW' | 'FDM' | 'LDM' | 'FDY' | 'LDY' | 'CUSTOM';

interface CustomDateConfig {
  preset: DatePreset;
  operator: '+' | '-';
  value: number;
  unit: 'day' | 'week' | 'month' | 'year';
}

@Component({
  selector: 'finzly-custom-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FinzlyDateFormatPipe],
  templateUrl: './finzly-custom-date-picker.component.html',
  styleUrls: ['./finzly-custom-date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyCustomDatePickerComponent),
      multi: true
    }
  ]
})
export class FinzlyCustomDatePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select date';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() state: 'default' | 'success' | 'error' | 'warning' = 'default';
  @Input() helperText: string = '';
  @Input() errorText: string = '';
  @Input() format: string = 'MM/dd/yyyy';

  @ViewChild('inputElement', { read: ElementRef }) inputElement?: ElementRef;
  @ViewChild('pickerDropdown', { read: ElementRef }) pickerDropdown?: ElementRef;

  selectedDate: Date | null = null;
  selectedPreset: DatePreset | null = null;
  isPickerOpen: boolean = false;
  showCustomForm: boolean = false;
  
  // Calendar properties
  displayDate: Date = new Date();
  currentView: 'date' | 'month' | 'year' = 'date';
  calendarDays: CalendarDay[] = [];
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[] = [];
  
  customConfig: CustomDateConfig = {
    preset: 'TODAY',
    operator: '+',
    value: 0,
    unit: 'day'
  };

  presets: Array<{key: DatePreset, label: string, description: string}> = [
    { key: 'TODAY', label: 'TODAY', description: 'Today' },
    { key: 'FDW', label: 'FDW', description: 'First Day of Week' },
    { key: 'LDW', label: 'LDW', description: 'Last Day of Week' },
    { key: 'FDM', label: 'FDM', description: 'First Day of Month' },
    { key: 'LDM', label: 'LDM', description: 'Last Day of Month' },
    { key: 'FDY', label: 'FDY', description: 'First Day of Year' },
    { key: 'LDY', label: 'LDY', description: 'Last Day of Year' }
  ];

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};
  private documentClickListener?: (event: Event) => void;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.generateYears();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.cleanupEventListeners();
  }

  togglePicker(): void {
    if (!this.disabled) {
      this.isPickerOpen = !this.isPickerOpen;
      if (this.isPickerOpen) {
        // No positioning calculation needed with absolute positioning
      } else {
        this.onTouched();
        this.showCustomForm = false;
        this.currentView = 'date';
      }
    }
  }

  closePicker(): void {
    this.isPickerOpen = false;
    this.showCustomForm = false;
    this.currentView = 'date';
    this.onTouched();
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
    if (!this.selectedDate) return false;
    return date.getDate() === this.selectedDate.getDate() &&
           date.getMonth() === this.selectedDate.getMonth() &&
           date.getFullYear() === this.selectedDate.getFullYear();
  }

  isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  selectDate(day: CalendarDay): void {
    if (day.isCurrentMonth && !this.isDateDisabled(day.date)) {
      this.selectedDate = day.date;
      this.displayDate = new Date(day.date);
      this.selectedPreset = null;
      this.onChange(this.selectedDate);
      this.generateCalendar();
      this.closePicker();
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

  get displayedYears(): number[] {
    const currentYear = this.displayDate.getFullYear();
    const startYear = Math.floor(currentYear / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  }

  get yearRangeLabel(): string {
    const years = this.displayedYears;
    return `${years[0]} - ${years[years.length - 1]}`;
  }

  get currentYear(): number {
    return this.displayDate.getFullYear();
  }

  get currentMonthYear(): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[this.displayDate.getMonth()]} ${this.displayDate.getFullYear()}`;
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

  writeValue(value: Date | null): void {
    this.selectedDate = value ? new Date(value) : null;
    if (this.selectedDate) {
      this.displayDate = new Date(this.selectedDate);
      this.generateCalendar();
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

  selectPreset(preset: DatePreset): void {
    if (preset === 'CUSTOM') {
      this.showCustomForm = true;
      this.selectedPreset = null;
      return;
    }

    this.showCustomForm = false;
    this.selectedPreset = preset;
    this.selectedDate = this.calculateDateFromPreset(preset);
    this.displayDate = new Date(this.selectedDate);
    this.onChange(this.selectedDate);
    this.generateCalendar();
    this.closePicker();
  }

  applyCustom(): void {
    const baseDate = this.calculateDateFromPreset(this.customConfig.preset);
    const calculatedDate = this.calculateCustomDate(baseDate, this.customConfig);
    
    this.selectedDate = calculatedDate;
    this.displayDate = new Date(calculatedDate);
    this.selectedPreset = 'CUSTOM';
    this.onChange(calculatedDate);
    this.generateCalendar();
    this.closePicker();
  }

  cancelCustom(): void {
    this.showCustomForm = false;
  }

  private calculateDateFromPreset(preset: DatePreset): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (preset) {
      case 'TODAY':
        return today;

      case 'FDW': // First Day of Week (Sunday)
        const fdw = new Date(today);
        fdw.setDate(today.getDate() - today.getDay());
        return fdw;

      case 'LDW': // Last Day of Week (Saturday)
        const ldw = new Date(today);
        ldw.setDate(today.getDate() + (6 - today.getDay()));
        return ldw;

      case 'FDM': // First Day of Month
        return new Date(today.getFullYear(), today.getMonth(), 1);

      case 'LDM': // Last Day of Month
        return new Date(today.getFullYear(), today.getMonth() + 1, 0);

      case 'FDY': // First Day of Year
        return new Date(today.getFullYear(), 0, 1);

      case 'LDY': // Last Day of Year
        return new Date(today.getFullYear(), 11, 31);

      default:
        return today;
    }
  }

  private calculateCustomDate(baseDate: Date, config: CustomDateConfig): Date {
    const result = new Date(baseDate);
    const multiplier = config.operator === '+' ? 1 : -1;
    const amount = config.value * multiplier;

    switch (config.unit) {
      case 'day':
        result.setDate(result.getDate() + amount);
        break;
      case 'week':
        result.setDate(result.getDate() + (amount * 7));
        break;
      case 'month':
        result.setMonth(result.getMonth() + amount);
        break;
      case 'year':
        result.setFullYear(result.getFullYear() + amount);
        break;
    }

    return result;
  }

  getPresetDescription(preset: DatePreset): string {
    return this.presets.find(p => p.key === preset)?.description || '';
  }

  get showHelper(): boolean {
    return !!this.helperText && this.state !== 'error';
  }

  get showError(): boolean {
    return !!this.errorText && this.state === 'error';
  }

  get formattedDate(): string {
    if (!this.selectedDate) return '';
    const pipe = new FinzlyDateFormatPipe();
    return pipe.transform(this.selectedDate, this.format);
  }

  get inputClass(): string {
    let classes = 'input date-input';
    
    if (this.state === 'success') classes += ' input-success';
    else if (this.state === 'error') classes += ' input-error';
    else if (this.state === 'warning') classes += ' input-warning';
    
    return classes;
  }

  private setupEventListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      // Document click listener for closing picker
      this.documentClickListener = (event: Event) => {
        const target = event.target as HTMLElement;
        const pickerElement = this.pickerDropdown?.nativeElement;
        const inputElement = this.inputElement?.nativeElement;
        const iconElement = inputElement?.parentElement?.querySelector('.calendar-icon');
        
        if (this.isPickerOpen && 
            pickerElement &&
            !pickerElement.contains(target) && 
            !inputElement?.contains(target) &&
            !iconElement?.contains(target)) {
          this.ngZone.run(() => {
            this.closePicker();
          });
        }
      };
      document.addEventListener('click', this.documentClickListener, true);
    });
  }

  private cleanupEventListeners(): void {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener, true);
      this.documentClickListener = undefined;
    }
  }
}


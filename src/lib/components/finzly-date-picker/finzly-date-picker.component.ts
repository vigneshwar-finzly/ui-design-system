import { Component, Input, forwardRef, ViewEncapsulation, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
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
  selector: 'finzly-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FinzlyDateFormatPipe],
  templateUrl: './finzly-date-picker.component.html',
  styleUrls: ['./finzly-date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyDatePickerComponent),
      multi: true
    }
  ]
})
export class FinzlyDatePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
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
  @Input() timezone?: string;

  @ViewChild('inputElement', { read: ElementRef }) inputElement?: ElementRef;
  @ViewChild('calendarDropdown', { read: ElementRef }) calendarDropdown?: ElementRef;

  selectedDate: Date | null = null;
  displayDate: Date = new Date();
  isCalendarOpen: boolean = false;
  calendarDays: CalendarDay[] = [];
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  // Dropdown position removed - using CSS positioning
  currentView: 'date' | 'month' | 'year' = 'date';
  years: number[] = [];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Cached values to prevent excessive recalculation
  private _formattedDate: string = '';
  private _currentMonthYear: string = '';
  private _displayedYears: number[] = [];
  private _yearRangeLabel: string = '';
  private _dateFormatPipe: FinzlyDateFormatPipe;
  
  // Event listeners cleanup
  private documentClickListener?: (event: Event) => void;

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};
  
  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this._dateFormatPipe = new FinzlyDateFormatPipe();
  }

  ngOnInit(): void {
    this.generateCalendar();
    this.generateYears();
    this.updateCachedValues();
    this.setupEventListeners();
  }

  private generateYears(): void {
    // Generate a smaller, more reasonable range of years
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 20;
    const endYear = currentYear + 20;
    this.years = [];
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | null): void {
    this.selectedDate = value ? this.createLocalDate(new Date(value)) : null;
    if (this.selectedDate) {
      this.displayDate = new Date(this.selectedDate);
    }
    this.generateCalendar();
    this.updateCachedValues();
    this.cdr.markForCheck();
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

  toggleCalendar(): void {
    if (!this.disabled) {
      this.isCalendarOpen = !this.isCalendarOpen;
      if (this.isCalendarOpen) {
        // No need for complex positioning calculation with absolute positioning
        this.cdr.markForCheck();
      } else {
        this.onTouched();
      }
      this.cdr.markForCheck();
    }
  }

  // Position calculation removed - using CSS absolute positioning

  // Body scroll methods removed for better dialog integration

  closeCalendar(): void {
    this.isCalendarOpen = false;
    this.currentView = 'date';
    this.onTouched();
    this.cdr.markForCheck();
  }

  selectDate(day: CalendarDay): void {
    if (day.isCurrentMonth && !this.isDateDisabled(day.date)) {
      // Create a new date that represents the selected day without timezone issues
      this.selectedDate = this.createLocalDate(day.date);
      this.onChange(this.selectedDate);
      this.generateCalendar();
      this.updateCachedValues();
      this.closeCalendar();
    }
  }

  previousMonth(): void {
    this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() - 1, 1);
    this.generateCalendar();
    this.updateCachedValues();
    this.cdr.markForCheck();
  }

  nextMonth(): void {
    this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 1);
    this.generateCalendar();
    this.updateCachedValues();
    this.cdr.markForCheck();
  }

  goToToday(): void {
    const today = new Date();
    this.displayDate = new Date(today);
    this.selectedDate = this.createLocalDate(today);
    this.onChange(this.selectedDate);
    this.generateCalendar();
    this.updateCachedValues();
    this.currentView = 'date';
    this.closeCalendar();
  }

  ngOnDestroy(): void {
    this.cleanupEventListeners();
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

    // Pre-calculate today's date once
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // Pre-calculate selected date values once
    const selectedYear = this.selectedDate?.getFullYear();
    const selectedMonth = this.selectedDate?.getMonth();
    const selectedDateValue = this.selectedDate?.getDate();

    this.calendarDays = [];

    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayValue = prevLastDate - i;
      const date = new Date(year, month - 1, dayValue);
      this.calendarDays.push({
        date,
        day: dayValue,
        isCurrentMonth: false,
        isToday: dayValue === todayDate && (month - 1) === todayMonth && year === todayYear,
        isSelected: this.selectedDate ? dayValue === selectedDateValue && (month - 1) === selectedMonth && year === selectedYear : false
      });
    }

    // Current month days
    for (let day = 1; day <= lastDateOfMonth; day++) {
      const date = new Date(year, month, day);
      this.calendarDays.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: day === todayDate && month === todayMonth && year === todayYear,
        isSelected: this.selectedDate ? day === selectedDateValue && month === selectedMonth && year === selectedYear : false
      });
    }

    // Next month days
    const remainingDays = 42 - this.calendarDays.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      this.calendarDays.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: day === todayDate && (month + 1) === todayMonth && year === todayYear,
        isSelected: this.selectedDate ? day === selectedDateValue && (month + 1) === selectedMonth && year === selectedYear : false
      });
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

  get formattedDate(): string {
    return this._formattedDate;
  }

  get currentMonthYear(): string {
    return this._currentMonthYear;
  }

  switchToYearView(): void {
    this.currentView = 'year';
  }

  switchToMonthView(): void {
    this.currentView = 'month';
  }

  switchToDateView(): void {
    this.currentView = 'date';
  }

  selectYear(year: number): void {
    this.displayDate = new Date(year, this.displayDate.getMonth(), 1);
    this.generateCalendar();
    this.updateCachedValues();
    this.currentView = 'month';
    this.cdr.markForCheck();
  }

  selectMonth(monthIndex: number): void {
    this.displayDate = new Date(this.displayDate.getFullYear(), monthIndex, 1);
    this.generateCalendar();
    this.updateCachedValues();
    this.currentView = 'date';
    this.cdr.markForCheck();
  }

  previousYear(): void {
    this.displayDate = new Date(this.displayDate.getFullYear() - 1, this.displayDate.getMonth(), 1);
    this.updateCachedValues();
    this.cdr.markForCheck();
  }

  nextYear(): void {
    this.displayDate = new Date(this.displayDate.getFullYear() + 1, this.displayDate.getMonth(), 1);
    this.updateCachedValues();
    this.cdr.markForCheck();
  }

  previousYearRange(): void {
    this.displayDate = new Date(this.displayDate.getFullYear() - 12, this.displayDate.getMonth(), 1);
    this.updateCachedValues();
    this.cdr.markForCheck();
  }

  nextYearRange(): void {
    this.displayDate = new Date(this.displayDate.getFullYear() + 12, this.displayDate.getMonth(), 1);
    this.updateCachedValues();
    this.cdr.markForCheck();
  }

  get displayedYears(): number[] {
    return this._displayedYears;
  }

  get yearRangeLabel(): string {
    return this._yearRangeLabel;
  }

  get currentYear(): number {
    return this.displayDate.getFullYear();
  }

  get currentMonthIndex(): number {
    return this.displayDate.getMonth();
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

  get inputClass(): string {
    let classes = 'input date-input';
    
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

  private updateCachedValues(): void {
    // Update formatted date
    if (!this.selectedDate) {
      this._formattedDate = '';
    } else {
      this._formattedDate = this._dateFormatPipe.transform(this.selectedDate, this.format, this.timezone);
    }

    // Update current month year
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    this._currentMonthYear = `${monthNames[this.displayDate.getMonth()]} ${this.displayDate.getFullYear()}`;

    // Update displayed years
    const currentYear = this.displayDate.getFullYear();
    const startYear = Math.floor(currentYear / 12) * 12;
    this._displayedYears = Array.from({ length: 12 }, (_, i) => startYear + i);

    // Update year range label
    this._yearRangeLabel = `${this._displayedYears[0]} - ${this._displayedYears[this._displayedYears.length - 1]}`;
  }

  private setupEventListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      // Document click listener for closing calendar
      this.documentClickListener = (event: Event) => {
        const target = event.target as HTMLElement;
        const calendarElement = this.calendarDropdown?.nativeElement;
        const inputElement = this.inputElement?.nativeElement;
        const iconElement = inputElement?.parentElement?.querySelector('.calendar-icon');
        
        if (this.isCalendarOpen && 
            calendarElement &&
            !calendarElement.contains(target) && 
            !inputElement?.contains(target) &&
            !iconElement?.contains(target)) {
          this.ngZone.run(() => {
            this.closeCalendar();
          });
        }
      };
      document.addEventListener('click', this.documentClickListener, true);

      // Resize and scroll listeners removed - using CSS positioning
    });
  }

  private cleanupEventListeners(): void {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = undefined;
    }
    // Resize and scroll listeners removed
  }

  // TrackBy functions for better performance
  trackByDate(index: number, day: CalendarDay): string {
    return `${day.date.getTime()}-${day.isCurrentMonth}`;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  trackByYear(index: number, year: number): number {
    return year;
  }

  /**
   * Creates a local date without timezone conversion issues
   * This ensures the selected date is exactly what the user clicked
   */
  private createLocalDate(sourceDate: Date): Date {
    const localDate = new Date(
      sourceDate.getFullYear(),
      sourceDate.getMonth(),
      sourceDate.getDate(),
      12, // Set to noon to avoid DST issues
      0,
      0,
      0
    );
    
    console.log('Created local date:', {
      original: sourceDate,
      local: localDate,
      timezone: this.timezone || 'browser default'
    });
    
    return localDate;
  }
}


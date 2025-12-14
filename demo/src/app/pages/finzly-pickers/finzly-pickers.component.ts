import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinzlyDatePickerComponent } from '../../../../../src/lib/components/finzly-date-picker/finzly-date-picker.component';
import { FinzlyTimePickerComponent } from '../../../../../src/lib/components/finzly-time-picker/finzly-time-picker.component';
import { FinzlyDateTimePickerComponent } from '../../../../../src/lib/components/finzly-date-time-picker/finzly-date-time-picker.component';
import { FinzlyCustomDatePickerComponent } from '../../../../../src/lib/components/finzly-custom-date-picker/finzly-custom-date-picker.component';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-finzly-pickers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FinzlyDatePickerComponent,
    FinzlyTimePickerComponent,
    FinzlyDateTimePickerComponent,
    FinzlyCustomDatePickerComponent
  ],
  templateUrl: './finzly-pickers.component.html',
  styleUrls: ['./finzly-pickers.component.scss']
})
export class FinzlyPickersComponent implements OnInit, OnDestroy {
  activeSection: string = 'finzly-date-picker';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'finzly-date-picker', title: 'Date Picker', icon: 'calendar_today' },
    { id: 'finzly-time-picker', title: 'Time Picker', icon: 'schedule' },
    { id: 'finzly-date-time-picker', title: 'DateTime Picker', icon: 'event' },
    { id: 'finzly-custom-date-picker', title: 'Custom Date Picker', icon: 'date_range' },
    { id: 'api-reference', title: 'API Reference', icon: 'code' }
  ];

  // Model values
  selectedDate: Date | null = null;
  appointmentDate: Date | null = new Date();
  selectedTime: string | null = null;
  meetingTime: string | null = '14:30';
  selectedDateTime: Date | null = null;
  eventDateTime: Date | null = new Date();
  ukDate: Date | null = new Date();
  usDate: Date | null = new Date();
  customDate: Date | null = null;
  presetDate: Date | null = new Date();

  // Reactive forms
  pickerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pickerForm = this.fb.group({
      appointmentDate: [null, Validators.required],
      startTime: [null, Validators.required],
      eventDateTime: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-140px 0px -66%',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    setTimeout(() => {
      this.sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element && this.observer) {
          this.observer.observe(element);
        }
      });
    }, 100);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedCode = code;
      setTimeout(() => {
        this.copiedCode = null;
      }, 2000);
    });
  }

  isCopied(code: string): boolean {
    return this.copiedCode === code;
  }

  setActiveTab(exampleId: string, tab: 'preview' | 'code'): void {
    this.activeTabs[exampleId] = tab;
  }

  getActiveTab(exampleId: string): 'preview' | 'code' {
    return this.activeTabs[exampleId] || 'preview';
  }

  isTabActive(exampleId: string, tab: 'preview' | 'code'): boolean {
    return this.getActiveTab(exampleId) === tab;
  }

  getFieldState(form: FormGroup, fieldName: string): 'default' | 'error' | 'success' {
    const control = form.get(fieldName);
    if (!control || !(control.dirty || control.touched)) {
      return 'default';
    }
    return control.invalid ? 'error' : 'success';
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);
    if (!control?.errors) return '';
    if (control.errors['required']) return 'This field is required';
    return '';
  }

  onSubmitForm(): void {
    if (this.pickerForm.valid) {
      console.log('Form Values:', this.pickerForm.value);
      alert('Form submitted! Check console for values.');
    } else {
      Object.keys(this.pickerForm.controls).forEach(key => {
        this.pickerForm.get(key)?.markAsTouched();
      });
    }
  }

  // Code examples
  examples = {
    dateBasic: `<finzly-date-picker
  label="Select Date"
  placeholder="Choose a date"
  [(ngModel)]="selectedDate">
</finzly-date-picker>`,

    dateMinMax: `<finzly-date-picker
  label="Appointment Date"
  [minDate]="minDate"
  [maxDate]="maxDate"
  [(ngModel)]="appointmentDate">
</finzly-date-picker>`,

    dateValidation: `<finzly-date-picker
  label="Appointment Date"
  [required]="true"
  [state]="getFieldState(form, 'date')"
  [errorText]="getFieldError(form, 'date')"
  formControlName="appointmentDate">
</finzly-date-picker>`,

    dateFormats: `<!-- US Format (MM/dd/yyyy) - Default -->
<finzly-date-picker
  label="US Date Format"
  format="MM/dd/yyyy"
  [(ngModel)]="usDate">
</finzly-date-picker>

<!-- UK/EU Format (dd/MM/yyyy) -->
<finzly-date-picker
  label="UK Date Format"
  format="dd/MM/yyyy"
  [(ngModel)]="ukDate">
</finzly-date-picker>

<!-- ISO Format (yyyy-MM-dd) -->
<finzly-date-picker
  label="ISO Date Format"
  format="yyyy-MM-dd"
  [(ngModel)]="selectedDate">
</finzly-date-picker>

<!-- Long Format -->
<finzly-date-picker
  label="Long Format"
  format="MMMM dd, yyyy"
  [(ngModel)]="selectedDate">
</finzly-date-picker>`,

    dateTimezone: `<!-- UTC Timezone -->
<finzly-date-picker
  label="UTC Date"
  timezone="UTC"
  [(ngModel)]="selectedDate">
</finzly-date-picker>

<!-- New York Timezone -->
<finzly-date-picker
  label="New York Date"
  timezone="America/New_York"
  [(ngModel)]="selectedDate">
</finzly-date-picker>

<!-- Tokyo Timezone -->
<finzly-date-picker
  label="Tokyo Date"
  timezone="Asia/Tokyo"
  [(ngModel)]="selectedDate">
</finzly-date-picker>

<!-- London Timezone -->
<finzly-date-picker
  label="London Date"
  timezone="Europe/London"
  [(ngModel)]="selectedDate">
</finzly-date-picker>`,

    timeBasic: `<finzly-time-picker
  label="Select Time"
  placeholder="Choose a time"
  [(ngModel)]="selectedTime">
</finzly-time-picker>`,

    time24Hour: `<finzly-time-picker
  label="Meeting Time"
  [use24Hour]="true"
  [(ngModel)]="meetingTime">
</finzly-time-picker>`,

    timeMinuteStep: `<finzly-time-picker
  label="Time Slot"
  [minuteStep]="15"
  [(ngModel)]="selectedTime">
</finzly-time-picker>`,

    dateTimeBasic: `<finzly-date-time-picker
  label="Event Date & Time"
  [(ngModel)]="selectedDateTime">
</finzly-date-time-picker>`,

    dateTime24Hour: `<finzly-date-time-picker
  label="Event Schedule"
  [use24Hour]="true"
  [(ngModel)]="eventDateTime">
</finzly-date-time-picker>`,

    dateTimeValidation: `<finzly-date-time-picker
  label="Event Date & Time"
  [required]="true"
  [state]="getFieldState(form, 'eventDateTime')"
  [errorText]="getFieldError(form, 'eventDateTime')"
  formControlName="eventDateTime">
</finzly-date-time-picker>`,

    completeForm: `<form [formGroup]="pickerForm" (ngSubmit)="onSubmit()">
  <finzly-date-picker
    label="Appointment Date"
    [required]="true"
    formControlName="appointmentDate">
  </finzly-date-picker>

  <finzly-time-picker
    label="Start Time"
    [required]="true"
    formControlName="startTime">
  </finzly-time-picker>

  <finzly-date-time-picker
    label="Event Date & Time"
    [required]="true"
    formControlName="eventDateTime">
  </finzly-date-time-picker>

  <button type="submit">Submit</button>
</form>`,

    customBasic: `<finzly-custom-date-picker
  label="Select Date with Presets"
  [(ngModel)]="customDate">
</finzly-custom-date-picker>`,

    customPresets: `<!-- With preset shortcuts -->
<finzly-custom-date-picker
  label="Quick Date Selection"
  [showPresets]="true"
  [showCustomOption]="true"
  helperText="Click presets or select manually"
  [(ngModel)]="presetDate">
</finzly-custom-date-picker>`,

    customAdvanced: `<finzly-custom-date-picker
  label="Advanced Date Selection"
  [required]="true"
  [state]="getFieldState(form, 'customDate')"
  [errorText]="getFieldError(form, 'customDate')"
  formControlName="customDate">
</finzly-custom-date-picker>`
  };
}


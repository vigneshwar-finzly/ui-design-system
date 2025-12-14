import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { FinzlyToastrComponent } from './components/finzly-toastr/finzly-toastr.component';
import { FinzlyDropdownComponent } from './components/finzly-dropdown/finzly-dropdown.component';
import { FinzlyDialogComponent } from './components/finzly-dialog/finzly-dialog.component';
import { FinzlyInputComponent } from './components/finzly-input/finzly-input.component';
import { FinzlyInputEmailComponent } from './components/finzly-input-email/finzly-input-email.component';
import { FinzlyAmountInputComponent } from './components/finzly-amount-input/finzly-amount-input.component';
import { FinzlyTextareaComponent } from './components/finzly-textarea/finzly-textarea.component';
import { FinzlyCheckboxComponent } from './components/finzly-checkbox/finzly-checkbox.component';
import { FinzlyRadioButtonComponent } from './components/finzly-radio-button/finzly-radio-button.component';
import { FinzlyToggleComponent } from './components/finzly-toggle/finzly-toggle.component';
import { FinzlyDatePickerComponent } from './components/finzly-date-picker/finzly-date-picker.component';
import { FinzlyTimePickerComponent } from './components/finzly-time-picker/finzly-time-picker.component';
import { FinzlyDateTimePickerComponent } from './components/finzly-date-time-picker/finzly-date-time-picker.component';
import { FinzlyCustomDatePickerComponent } from './components/finzly-custom-date-picker/finzly-custom-date-picker.component';
import { FinzlyBackButtonComponent } from './components/finzly-back-button/finzly-back-button.component';
import { FinzlySaveButtonComponent } from './components/finzly-save-button/finzly-save-button.component';
import { FinzlyCancelButtonComponent } from './components/finzly-cancel-button/finzly-cancel-button.component';
import { FinzlyCustomButtonComponent } from './components/finzly-custom-button/finzly-custom-button.component';
import { FinzlyCloseButtonComponent } from './components/finzly-close-button/finzly-close-button.component';
import { FinzlyDropdownButtonComponent } from './components/finzly-dropdown-button/finzly-dropdown-button.component';
import { FinzlyBadgeComponent } from './components/finzly-badge/finzly-badge.component';

// Directives
import { AmountFormatterDirective } from './directives/amount-formatter.directive';
import { DateFormatDirective } from './directives/date-format.directive';

// Pipes
import { FinzlyDateFormatPipe } from './pipes/finzly-date-format.pipe';

// Services
import { FinzlyToastrService } from './components/finzly-toastr/finzly-toastr.service';
import { FinzlyDialogService } from './components/finzly-dialog/finzly-dialog.service';

const COMPONENTS = [
  FinzlyToastrComponent,
  FinzlyDropdownComponent,
  FinzlyDialogComponent,
  FinzlyInputComponent,
  FinzlyInputEmailComponent,
  FinzlyAmountInputComponent,
  FinzlyTextareaComponent,
  FinzlyCheckboxComponent,
  FinzlyRadioButtonComponent,
  FinzlyToggleComponent,
  FinzlyDatePickerComponent,
  FinzlyTimePickerComponent,
  FinzlyDateTimePickerComponent,
  FinzlyCustomDatePickerComponent,
  FinzlyBackButtonComponent,
  FinzlySaveButtonComponent,
  FinzlyCancelButtonComponent,
  FinzlyCustomButtonComponent,
  FinzlyCloseButtonComponent,
  FinzlyDropdownButtonComponent,
  FinzlyBadgeComponent
];

const DIRECTIVES = [
  AmountFormatterDirective,
  DateFormatDirective
];

const PIPES = [
  FinzlyDateFormatPipe
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FinzlyToastrComponent,
    FinzlyDropdownComponent,
    FinzlyDialogComponent,
    FinzlyInputComponent,
    FinzlyInputEmailComponent,
    FinzlyAmountInputComponent,
    FinzlyTextareaComponent,
    FinzlyCheckboxComponent,
    FinzlyRadioButtonComponent,
    FinzlyToggleComponent,
    FinzlyDatePickerComponent,
    FinzlyTimePickerComponent,
    FinzlyDateTimePickerComponent,
    FinzlyCustomDatePickerComponent,
    FinzlyBackButtonComponent,
    FinzlySaveButtonComponent,
    FinzlyCancelButtonComponent,
    FinzlyCustomButtonComponent,
    FinzlyCloseButtonComponent,
    FinzlyDropdownButtonComponent,
    FinzlyBadgeComponent,
    AmountFormatterDirective,
    DateFormatDirective,
    FinzlyDateFormatPipe
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  providers: [
    FinzlyToastrService,
    FinzlyDialogService
  ]
})
export class UiKitModule { }







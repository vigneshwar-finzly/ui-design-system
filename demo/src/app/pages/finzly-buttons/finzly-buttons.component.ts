import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinzlyBackButtonComponent } from '../../../../../src/lib/components/finzly-back-button/finzly-back-button.component';
import { FinzlySaveButtonComponent } from '../../../../../src/lib/components/finzly-save-button/finzly-save-button.component';
import { FinzlyCancelButtonComponent } from '../../../../../src/lib/components/finzly-cancel-button/finzly-cancel-button.component';
import { FinzlyCustomButtonComponent } from '../../../../../src/lib/components/finzly-custom-button/finzly-custom-button.component';
import { FinzlyCloseButtonComponent } from '../../../../../src/lib/components/finzly-close-button/finzly-close-button.component';
import { FinzlyDropdownButtonComponent, DropdownButtonOption } from '../../../../../src/lib/components/finzly-dropdown-button/finzly-dropdown-button.component';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-finzly-buttons',
  standalone: true,
  imports: [
    CommonModule,
    FinzlyBackButtonComponent,
    FinzlySaveButtonComponent,
    FinzlyCancelButtonComponent,
    FinzlyCustomButtonComponent,
    FinzlyCloseButtonComponent,
    FinzlyDropdownButtonComponent
  ],
  templateUrl: './finzly-buttons.component.html',
  styleUrls: ['./finzly-buttons.component.scss']
})
export class FinzlyButtonsComponent implements OnInit, OnDestroy {
  activeSection: string = 'finzly-back-button';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'finzly-back-button', title: 'Back Button', icon: 'refresh' },
    { id: 'finzly-save-button', title: 'Save Button', icon: 'save' },
    { id: 'finzly-cancel-button', title: 'Cancel Button', icon: 'cancel' },
    { id: 'finzly-close-button', title: 'Close Button', icon: 'close' },
    { id: 'finzly-dropdown-button', title: 'Dropdown Button', icon: 'arrow_drop_down' },
    { id: 'finzly-custom-button', title: 'Custom Button', icon: 'tune' },
    { id: 'api-reference', title: 'API Reference', icon: 'code' }
  ];

  // Demo state
  isSaving = false;

  // Dropdown options
  exportOptions: DropdownButtonOption[] = [
    { label: 'Export as PDF', value: 'pdf', icon: 'picture_as_pdf' },
    { label: 'Export as Excel', value: 'excel', icon: 'table_chart' },
    { label: 'Export as CSV', value: 'csv', icon: 'description' },
    { label: 'Export as JSON', value: 'json', icon: 'code' }
  ];

  actionOptions: DropdownButtonOption[] = [
    { label: 'Edit', value: 'edit', icon: 'edit' },
    { label: 'Duplicate', value: 'duplicate', icon: 'content_copy' },
    { label: 'Archive', value: 'archive', icon: 'archive' },
    { label: 'Delete', value: 'delete', icon: 'delete', disabled: false }
  ];

  selectedExportOption: DropdownButtonOption | null = null;
  selectedActionOption: DropdownButtonOption | null = null;

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

  // Demo actions
  handleBack(): void {
    console.log('Back clicked');
    alert('Back button clicked!');
  }

  handleSave(): void {
    console.log('Save clicked');
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      alert('Saved successfully!');
    }, 2000);
  }

  handleCancel(): void {
    console.log('Cancel clicked');
    alert('Cancel button clicked!');
  }

  handleCustom(): void {
    console.log('Custom button clicked');
    alert('Custom action executed!');
  }

  handleClose(): void {
    console.log('Close clicked');
    alert('Close button clicked!');
  }

  handleDropdownAction(): void {
    console.log('Dropdown button main action clicked');
    alert('Main button action executed!');
  }

  onDropdownOptionSelected(option: DropdownButtonOption): void {
    console.log('Selected option:', option);
    alert(`Selected: ${option.label}`);
  }

  // Code examples
  examples = {
    backBasic: `<!-- Default: Black outlined with refresh icon -->
<finzly-back-button
  (clicked)="handleBack()">
</finzly-back-button>`,

    backNoIcon: `<finzly-back-button
  [showIcon]="false"
  (clicked)="handleBack()">
</finzly-back-button>`,

    backCustom: `<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <!-- Small -->
  <finzly-back-button
    text="Go Back"
    size="sm"
    (clicked)="handleBack()">
  </finzly-back-button>

  <!-- Medium (default) -->
  <finzly-back-button
    text="Back"
    size="md"
    (clicked)="handleBack()">
  </finzly-back-button>

  <!-- Large -->
  <finzly-back-button
    text="Return"
    size="lg"
    (clicked)="handleBack()">
  </finzly-back-button>
</div>`,

    backVariant: `<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <!-- Black Outline (Default) -->
  <finzly-back-button
    variant="black"
    (clicked)="handleBack()">
  </finzly-back-button>

  <!-- Regular Outline -->
  <finzly-back-button
    variant="default"
    (clicked)="handleBack()">
  </finzly-back-button>
</div>`,

    saveBasic: `<finzly-save-button
  (clicked)="handleSave()">
</finzly-save-button>`,

    saveNoIcon: `<finzly-save-button
  [showIcon]="false"
  (clicked)="handleSave()">
</finzly-save-button>`,

    saveLoading: `<finzly-save-button
  [loading]="isSaving"
  (clicked)="handleSave()">
</finzly-save-button>`,

    saveCustomIcon: `<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <finzly-save-button
    text="Submit"
    icon="send"
    [showIcon]="true"
    (clicked)="handleSave()">
  </finzly-save-button>

  <finzly-save-button
    text="Publish"
    icon="publish"
    [showIcon]="true"
    (clicked)="handleSave()">
  </finzly-save-button>

  <finzly-save-button
    text="Upload"
    icon="upload"
    [showIcon]="true"
    (clicked)="handleSave()">
  </finzly-save-button>
</div>`,

    cancelBasic: `<finzly-cancel-button
  (clicked)="handleCancel()">
</finzly-cancel-button>`,

    cancelNoIcon: `<finzly-cancel-button
  [showIcon]="false"
  (clicked)="handleCancel()">
</finzly-cancel-button>`,

    cancelDanger: `<finzly-cancel-button
  variant="danger"
  [showIcon]="true"
  (clicked)="handleCancel()">
</finzly-cancel-button>`,

    customBasic: `<finzly-custom-button
  text="Custom Action"
  icon="settings"
  [showIcon]="true"
  (clicked)="handleCustom()">
</finzly-custom-button>`,

    customVariants: `<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <!-- Primary (Blue) -->
  <finzly-custom-button
    text="Primary"
    icon="check"
    variant="primary"
    (clicked)="handleCustom()">
  </finzly-custom-button>

  <!-- Success (Green) -->
  <finzly-custom-button
    text="Success"
    icon="check_circle"
    variant="success"
    (clicked)="handleCustom()">
  </finzly-custom-button>

  <!-- Warning (Orange) -->
  <finzly-custom-button
    text="Warning"
    icon="warning"
    variant="warning"
    (clicked)="handleCustom()">
  </finzly-custom-button>

  <!-- Danger (Red) -->
  <finzly-custom-button
    text="Danger"
    icon="error"
    variant="danger"
    (clicked)="handleCustom()">
  </finzly-custom-button>

  <!-- Outline -->
  <finzly-custom-button
    text="Outline"
    icon="circle"
    variant="outline"
    (clicked)="handleCustom()">
  </finzly-custom-button>
</div>`,

    customIconPosition: `<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <!-- Icon Left (Default) -->
  <finzly-custom-button
    text="Download"
    icon="download"
    iconPosition="left"
    (clicked)="handleCustom()">
  </finzly-custom-button>

  <!-- Icon Right -->
  <finzly-custom-button
    text="Next"
    icon="arrow_forward"
    iconPosition="right"
    (clicked)="handleCustom()">
  </finzly-custom-button>
</div>`,

    customSizes: `<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <finzly-custom-button 
    text="Small" 
    icon="star" 
    size="sm"
    (clicked)="handleCustom()">
  </finzly-custom-button>

  <finzly-custom-button 
    text="Medium" 
    icon="star" 
    size="md"
    (clicked)="handleCustom()">
  </finzly-custom-button>

  <finzly-custom-button 
    text="Large" 
    icon="star" 
    size="lg"
    (clicked)="handleCustom()">
  </finzly-custom-button>
</div>`,

    closeBasic: `<finzly-close-button
  (clicked)="handleClose()">
</finzly-close-button>`,

    closeDialog: `<!-- In dialog header (top-right corner) -->
<div class="dialog-header">
  <h2>Dialog Title</h2>
  <finzly-close-button
    (clicked)="closeDialog()">
  </finzly-close-button>
</div>`,

    closeSizes: `<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
  <finzly-close-button 
    size="sm"
    (clicked)="handleClose()">
  </finzly-close-button>

  <finzly-close-button 
    size="md"
    (clicked)="handleClose()">
  </finzly-close-button>

  <finzly-close-button 
    size="lg"
    (clicked)="handleClose()">
  </finzly-close-button>
</div>`,

    dropdownBasic: `<finzly-dropdown-button
  text="Action"
  [options]="options"
  variant="outline"
  (buttonClicked)="handleAction()"
  (optionSelected)="onOptionSelected($event)">
</finzly-dropdown-button>`,

    dropdownExport: `<finzly-dropdown-button
  text="Export"
  icon="download"
  [options]="exportOptions"
  placeholder="Select format"
  variant="outline"
  (buttonClicked)="handleExport()"
  (optionSelected)="onFormatSelected($event)">
</finzly-dropdown-button>`,

    dropdownVariants: `<!-- Outline Variants -->
<finzly-dropdown-button
  text="Actions"
  [options]="actionOptions"
  variant="outline"
  (buttonClicked)="handleAction()"
  (optionSelected)="onOptionSelected($event)">
</finzly-dropdown-button>

<finzly-dropdown-button
  text="Export"
  [options]="exportOptions"
  variant="outline"
  (buttonClicked)="handleAction()"
  (optionSelected)="onOptionSelected($event)">
</finzly-dropdown-button>

<finzly-dropdown-button
  text="More Options"
  [options]="actionOptions"
  variant="outline"
  (buttonClicked)="handleAction()"
  (optionSelected)="onOptionSelected($event)">
</finzly-dropdown-button>`,

    allButtons: `<!-- Back Button -->
<finzly-back-button (clicked)="goBack()"></finzly-back-button>

<!-- Save Button -->
<finzly-save-button 
  [loading]="isSaving"
  (clicked)="save()">
</finzly-save-button>

<!-- Cancel Button -->
<finzly-cancel-button (clicked)="cancel()"></finzly-cancel-button>

<!-- Custom Buttons -->
<finzly-custom-button
  text="Submit"
  icon="send"
  variant="primary"
  (clicked)="submit()">
</finzly-custom-button>`
  };
}


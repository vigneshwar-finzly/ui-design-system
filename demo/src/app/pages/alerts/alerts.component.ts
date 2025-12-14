import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinzlyToastrComponent } from '../../../../../src/lib/components/finzly-toastr/finzly-toastr.component';
import { FinzlyToastrService } from '../../../../../src/lib/components/finzly-toastr/finzly-toastr.service';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, FinzlyToastrComponent],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {
  activeSection: string = 'alert-variants';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'alert-variants', title: 'Alert Variants', icon: 'notifications' },
    { id: 'dismissible-alerts', title: 'Dismissible', icon: 'close' },
    { id: 'alert-sizes', title: 'Alert Sizes', icon: 'aspect_ratio' },
    { id: 'toast-notifications', title: 'Toast Notifications', icon: 'notifications_active' },
    { id: 'toast-widths', title: 'Toast Widths', icon: 'width_wide' }
  ];
  constructor(private toastr: FinzlyToastrService) {}

  showToast(type: string) {
    switch(type) {
      case 'success':
        this.toastr.success('Operation completed successfully!', 'Success');
        break;
      case 'error':
        this.toastr.error('Something went wrong!', 'Error');
        break;
      case 'warning':
        this.toastr.warning('Please review your changes', 'Warning');
        break;
      case 'info':
        this.toastr.info('New updates are available', 'Info');
        break;
      case 'primary':
        this.toastr.primary('Welcome to the app!', 'Hello');
        break;
    }
  }

  showCustomToast() {
    this.toastr.show({
      title: 'Custom Toast',
      message: 'This is a custom configured toast with no auto-dismiss',
      type: 'success',
      duration: 0, // Won't auto-dismiss
      solid: true,
      size: 'lg'
    });
  }

  // Long message examples
  showShortMessage() {
    this.toastr.success('Saved!', 'Success', { width: 'sm' });
  }

  showMediumMessage() {
    this.toastr.info('Your changes have been saved successfully.', 'Update Complete');
  }

  showLongMessage() {
    this.toastr.success(
      'Your profile has been updated with the new information and all team members have been notified.',
      'Profile Updated',
      { width: 'lg' }
    );
  }

  showVeryLongMessage() {
    this.toastr.warning(
      'The operation you are attempting requires administrator privileges. Please contact your system administrator or try again with proper permissions.',
      'Permission Required',
      { width: 'xl' }
    );
  }

  showMultiLineMessage() {
    this.toastr.error(
      'Failed to connect to the server. This could be due to network issues, server maintenance, or firewall restrictions. Please check your internet connection and try again in a few moments.',
      'Connection Error',
      { width: 'xl', duration: 8000 }
    );
  }

  showMaxWidthMessage() {
    this.toastr.info(
      'This is an extremely long notification message that demonstrates the maximum width capability of the toast component. It will take up to 90% of the viewport width to ensure all content is visible without excessive wrapping.',
      'Maximum Width Example',
      { width: 'auto', duration: 10000 }
    );
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

  // Code examples
  examples = {
    alertVariants: `<div class="alert alert-primary">
  <div class="alert-icon">...</div>
  <div class="alert-content">
    <div class="alert-title">Primary Alert</div>
    <div class="alert-description">This is a primary alert message.</div>
  </div>
</div>`,
    dismissibleAlerts: `<div class="alert alert-success">
  <div class="alert-content">
    <div class="alert-description">This alert can be dismissed.</div>
  </div>
  <button class="alert-close">...</button>
</div>`,
    alertSizes: `<div class="alert alert-info alert-sm">...</div>
<div class="alert alert-info">...</div>
<div class="alert alert-info alert-lg">...</div>`,
    toastNotifications: `constructor(private toastr: FinzlyToastrService) {}

showToast(type: string) {
  switch(type) {
    case 'success':
      this.toastr.success('Operation completed!', 'Success');
      break;
    case 'error':
      this.toastr.error('Something went wrong!', 'Error');
      break;
    // ...
  }
}`,
    toastWidths: `// Short message
this.toastr.success('Saved!', 'Success', { width: 'sm' });

// Long message
this.toastr.success(
  'Your profile has been updated...',
  'Profile Updated',
  { width: 'lg' }
);

// Very long message
this.toastr.warning(
  'The operation requires administrator privileges...',
  'Permission Required',
  { width: 'xl' }
);`
  };
}


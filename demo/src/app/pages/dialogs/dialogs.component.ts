import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinzlyDialogService } from '../../../../../src/lib/components/finzly-dialog/finzly-dialog.service';
import { FinzlyToastrService } from '../../../../../src/lib/components/finzly-toastr/finzly-toastr.service';
import { FinzlyToastrComponent } from '../../../../../src/lib/components/finzly-toastr/finzly-toastr.component';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [CommonModule, FinzlyToastrComponent],
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit, OnDestroy {
  activeSection: string = 'basic-dialogs';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'basic-dialogs', title: 'Basic Dialogs', icon: 'chat_bubble' },
    { id: 'type-dialogs', title: 'Type-Specific', icon: 'category' },
    { id: 'dialog-sizes', title: 'Dialog Sizes', icon: 'aspect_ratio' },
    { id: 'advanced-usage', title: 'Advanced Usage', icon: 'settings' },
    { id: 'custom-buttons', title: 'Custom Buttons', icon: 'tune' },
    { id: 'api-reference', title: 'API Reference', icon: 'code' },
    { id: 'real-world-examples', title: 'Real-World Examples', icon: 'apps' }
  ];
  constructor(
    private dialogService: FinzlyDialogService,
    private toastr: FinzlyToastrService
  ) {}

  // Basic Dialogs
  openBasicDialog() {
    const dialogRef = this.dialogService.open({
      title: 'Welcome to Finzly Dialog',
      content: 'This is a modern, premium dialog component with smooth animations and beautiful design.',
      confirmText: 'Got it',
      cancelText: undefined
    });

    dialogRef.afterClosed().then(result => {
      console.log('Dialog result:', result);
    });
  }

  openConfirmDialog() {
    const dialogRef = this.dialogService.confirm(
      'Confirm Action',
      'Are you sure you want to proceed with this action? This cannot be undone.'
    );

    dialogRef.afterClosed().then(result => {
      if (result) {
        this.toastr.success('Action confirmed!', 'Success');
      } else {
        this.toastr.info('Action cancelled', 'Info');
      }
    });
  }

  // Type Dialogs
  openSuccessDialog() {
    this.dialogService.success(
      'Operation Successful!',
      'Your changes have been saved successfully and are now live.'
    );
  }

  openErrorDialog() {
    this.dialogService.error(
      'Error Occurred',
      'Unable to complete the operation. Please check your connection and try again.'
    );
  }

  openWarningDialog() {
    const dialogRef = this.dialogService.warning(
      'Unsaved Changes',
      'You have unsaved changes. Are you sure you want to leave this page?'
    );

    dialogRef.afterClosed().then(result => {
      if (result) {
        this.toastr.info('Changes discarded', 'Info');
      }
    });
  }

  openInfoDialog() {
    this.dialogService.alert(
      'Information',
      'This feature is currently in beta. Some functionality may be limited.',
      { type: 'info' }
    );
  }

  // Size Dialogs
  openSmallDialog() {
    this.dialogService.open({
      title: 'Small Dialog',
      content: 'This is a compact dialog perfect for quick messages.',
      size: 'sm'
    });
  }

  openMediumDialog() {
    this.dialogService.open({
      title: 'Medium Dialog',
      content: 'This is the default size, great for most use cases with moderate content.',
      size: 'md'
    });
  }

  openLargeDialog() {
    this.dialogService.open({
      title: 'Large Dialog',
      content: 'This is a large dialog that provides more space for content, forms, or detailed information. Perfect for complex interactions that need more room.',
      size: 'lg'
    });
  }

  openFullDialog() {
    this.dialogService.open({
      title: 'Full Width Dialog',
      content: 'This dialog uses almost the full viewport width, ideal for maximum content display like forms, tables, or rich media.',
      size: 'full'
    });
  }

  // Advanced Examples
  openDeleteDialog() {
    const dialogRef = this.dialogService.open({
      title: 'Delete Item',
      content: 'This will permanently delete the item. This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Keep',
      type: 'error'
    });

    dialogRef.afterClosed().then(result => {
      if (result) {
        this.toastr.success('Item deleted', 'Success');
      }
    });
  }

  openCustomDialog() {
    this.dialogService.open({
      title: 'Custom Configuration',
      content: 'This dialog has custom settings including no backdrop click to close.',
      confirmText: 'Close',
      cancelText: undefined,
      closeOnBackdropClick: false,
      closeOnEscape: false,
      type: 'info'
    });
  }

  // Custom Buttons Examples
  openCustomButtonsDialog() {
    this.dialogService.open({
      title: 'Select an Option',
      content: 'Choose one of the following actions:',
      customButtons: [
        {
          text: 'Cancel',
          type: 'outline',
          result: 'cancel'
        },
        {
          text: 'Save Draft',
          type: 'outline',
          result: 'draft',
          action: () => {
            this.toastr.info('Draft saved', 'Info');
          }
        },
        {
          text: 'Publish',
          type: 'primary',
          result: 'publish',
          action: () => {
            this.toastr.success('Published successfully!', 'Success');
          }
        }
      ]
    });
  }

  openMultiActionDialog() {
    this.dialogService.open({
      title: 'Document Actions',
      content: 'What would you like to do with this document?',
      customButtons: [
        {
          text: 'Delete',
          type: 'error',
          result: 'delete',
          action: () => {
            this.toastr.error('Document deleted', 'Deleted');
          }
        },
        {
          text: 'Archive',
          type: 'warning',
          result: 'archive',
          action: () => {
            this.toastr.warning('Document archived', 'Archived');
          }
        },
        {
          text: 'Download',
          type: 'info',
          result: 'download',
          action: () => {
            this.toastr.info('Download started', 'Downloading');
          }
        },
        {
          text: 'Share',
          type: 'success',
          result: 'share',
          action: () => {
            this.toastr.success('Share link copied', 'Shared');
          }
        }
      ],
      size: 'md'
    });
  }

  openAsyncButtonDialog() {
    this.dialogService.open({
      title: 'Process Data',
      content: 'Click the button below to start processing. This may take a few seconds.',
      customButtons: [
        {
          text: 'Cancel',
          type: 'outline',
          result: false
        },
        {
          text: 'Start Processing',
          type: 'primary',
          result: true,
          action: async () => {
            // Simulate async operation
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.toastr.success('Processing completed!', 'Success');
          }
        }
      ]
    });
  }

  openNoCloseButtonDialog() {
    this.dialogService.open({
      title: 'Keep Dialog Open',
      content: 'This button performs an action but keeps the dialog open.',
      customButtons: [
        {
          text: 'Close Dialog',
          type: 'outline',
          result: 'close'
        },
        {
          text: 'Action (Stay Open)',
          type: 'primary',
          closeOnClick: false,
          action: () => {
            this.toastr.info('Action performed, dialog remains open', 'Info');
          }
        }
      ]
    });
  }

  openComplexDialog() {
    this.dialogService.open({
      title: 'Payment Options',
      content: 'Choose your preferred payment method and proceed with the transaction.',
      customButtons: [
        {
          text: 'Pay with Card',
          type: 'primary',
          result: 'card',
          action: () => {
            this.toastr.success('Redirecting to card payment...', 'Processing');
          }
        },
        {
          text: 'Pay with PayPal',
          type: 'info',
          result: 'paypal',
          action: () => {
            this.toastr.info('Redirecting to PayPal...', 'Processing');
          }
        },
        {
          text: 'Pay Later',
          type: 'warning',
          result: 'later',
          action: () => {
            this.toastr.warning('Payment postponed', 'Noted');
          }
        },
        {
          text: 'Cancel Order',
          type: 'outline',
          result: 'cancel'
        }
      ],
      size: 'lg'
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

  // Code examples
  examples = {
    basicDialogs: `// Inject the service
constructor(private dialogService: FinzlyDialogService) {}

// Open basic dialog
openDialog() {
  const dialogRef = this.dialogService.open({
    title: 'Dialog Title',
    content: 'Dialog content here',
    confirmText: 'OK',
    cancelText: 'Cancel'
  });

  // Handle result
  dialogRef.afterClosed().then(result => {
    console.log('Result:', result); // true/false/null
  });
}

// Confirmation shorthand
openConfirm() {
  this.dialogService.confirm('Title', 'Content');
}`,
    typeDialogs: `// Type-specific dialogs with pre-styled icons and colors
this.dialogService.success('Title', 'Success message');
this.dialogService.error('Title', 'Error message');
this.dialogService.warning('Title', 'Warning message');
this.dialogService.alert('Title', 'Info message', { type: 'info' });`,
    dialogSizes: `// Dialog sizes
this.dialogService.open({ size: 'sm' });  // 24rem max-width
this.dialogService.open({ size: 'md' });  // 32rem (default)
this.dialogService.open({ size: 'lg' });  // 48rem
this.dialogService.open({ size: 'xl' });  // 64rem
this.dialogService.open({ size: 'full' }); // 90vw`,
    advancedUsage: `// Advanced configuration
this.dialogService.open({
  title: 'Custom Dialog',
  content: 'Custom configuration',
  size: 'lg',
  type: 'warning',
  showClose: true,               // Show close button
  closeOnBackdropClick: false,   // Prevent backdrop click close
  closeOnEscape: false,          // Prevent ESC key close
  confirmText: 'Confirm',
  cancelText: 'Cancel'
});`,
    customButtons: `// Custom buttons with actions
this.dialogService.open({
  title: 'Select an Option',
  content: 'Choose one of the following actions:',
  customButtons: [
    {
      text: 'Cancel',
      type: 'outline',
      result: 'cancel'
    },
    {
      text: 'Save Draft',
      type: 'outline',
      result: 'draft',
      action: () => {
        this.saveDraft();
      }
    },
    {
      text: 'Publish',
      type: 'primary',
      result: 'publish',
      action: async () => {
        await this.publish();
      }
    }
  ]
});`
  };
}


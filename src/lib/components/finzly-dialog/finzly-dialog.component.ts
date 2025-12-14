import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfig, DialogButton } from './finzly-dialog.service';

@Component({
  selector: 'finzly-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-dialog.component.html',
  styleUrls: ['./finzly-dialog.component.scss']
})
export class FinzlyDialogComponent {
  config: DialogConfig = {
    title: '',
    content: '',
    subtitle: '',
    confirmText: 'OK',
    cancelText: 'Cancel',
    size: 'md',
    type: 'default',
    showClose: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    footerAlign: 'right'
  };

  isOpen: boolean = false;
  closeDialog: (result?: any) => void = () => {};
  buttonLoadingStates: { [key: number]: boolean } = {};

  onBackdropClick() {
    if (this.config.closeOnBackdropClick) {
      this.close(null);
    }
  }

  onCancel() {
    this.close(false);
  }

  onConfirm() {
    this.close(true);
  }

  async onCustomButtonClick(button: DialogButton, index: number) {
    if (button.disabled || this.buttonLoadingStates[index]) {
      return;
    }

    // Execute custom action if provided
    if (button.action) {
      this.buttonLoadingStates[index] = true;
      try {
        await button.action();
      } catch (error) {
        console.error('Button action error:', error);
      } finally {
        this.buttonLoadingStates[index] = false;
      }
    }

    // Close dialog if specified
    if (button.closeOnClick !== false) {
      this.close(button.result !== undefined ? button.result : true);
    }
  }

  getButtonClass(button: DialogButton): string {
    const classes = ['btn'];
    
    switch (button.type) {
      case 'primary':
        classes.push('btn-primary');
        break;
      case 'secondary':
        classes.push('btn-secondary');
        break;
      case 'success':
        classes.push('btn-success');
        break;
      case 'warning':
        classes.push('btn-warning');
        break;
      case 'error':
        classes.push('btn-error');
        break;
      case 'info':
        classes.push('btn-info');
        break;
      case 'outline':
        classes.push('btn-outline');
        break;
      case 'ghost':
        classes.push('btn-ghost');
        break;
      default:
        classes.push('btn-outline');
    }
    
    return classes.join(' ');
  }

  hasCustomButtons(): boolean {
    return !!this.config.customButtons && this.config.customButtons.length > 0;
  }

  close(result?: any) {
    this.closeDialog(result);
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    if (this.config.closeOnEscape) {
      this.close(null);
    }
  }

  getTypeIcon(): string {
    switch (this.config.type) {
      case 'success':
        return `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`;
      case 'error':
        return `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`;
      case 'warning':
        return `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>`;
      case 'info':
        return `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>`;
      default:
        return '';
    }
  }
}


import { Injectable, ComponentRef, ApplicationRef, Injector, createComponent, EnvironmentInjector } from '@angular/core';
import { Subject } from 'rxjs';
import { FinzlyDialogComponent } from './finzly-dialog.component';

export interface DialogButton {
  text: string;
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost';
  result?: any;
  action?: () => void | Promise<void>;
  closeOnClick?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export interface DialogConfig {
  title?: string;
  subtitle?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  customButtons?: DialogButton[];
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  type?: 'default' | 'info' | 'success' | 'warning' | 'error';
  showClose?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  customClass?: string;
  footerAlign?: 'left' | 'center' | 'right' | 'space-between';
}

export interface DialogRef {
  close: (result?: any) => void;
  afterClosed: () => Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class FinzlyDialogService {
  private dialogComponentRef?: ComponentRef<FinzlyDialogComponent>;
  private closeSubject = new Subject<any>();

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open(config: DialogConfig): DialogRef {
    // Close any existing dialog
    this.close();

    // Create component
    const environmentInjector = this.appRef.injector.get(EnvironmentInjector);
    this.dialogComponentRef = createComponent(FinzlyDialogComponent, {
      environmentInjector,
      elementInjector: this.injector
    });

    // Configure the dialog
    const instance = this.dialogComponentRef.instance;
    instance.config = { ...this.getDefaultConfig(), ...config };
    instance.closeDialog = (result?: any) => this.close(result);

    // Attach to DOM
    this.appRef.attachView(this.dialogComponentRef.hostView);
    const domElem = (this.dialogComponentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Trigger open animation
    setTimeout(() => {
      if (this.dialogComponentRef) {
        this.dialogComponentRef.instance.isOpen = true;
      }
    }, 10);

    return {
      close: (result?: any) => this.close(result),
      afterClosed: () => this.afterClosed()
    };
  }

  confirm(title: string, content: string, config?: Partial<DialogConfig>): DialogRef {
    return this.open({
      title,
      content,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      ...config
    });
  }

  alert(title: string, content: string, config?: Partial<DialogConfig>): DialogRef {
    return this.open({
      title,
      content,
      confirmText: 'OK',
      cancelText: undefined,
      ...config
    });
  }

  success(title: string, content: string, config?: Partial<DialogConfig>): DialogRef {
    return this.open({
      title,
      content,
      type: 'success',
      confirmText: 'OK',
      ...config
    });
  }

  error(title: string, content: string, config?: Partial<DialogConfig>): DialogRef {
    return this.open({
      title,
      content,
      type: 'error',
      confirmText: 'OK',
      ...config
    });
  }

  warning(title: string, content: string, config?: Partial<DialogConfig>): DialogRef {
    return this.open({
      title,
      content,
      type: 'warning',
      confirmText: 'OK',
      cancelText: 'Cancel',
      ...config
    });
  }

  close(result?: any): void {
    if (this.dialogComponentRef) {
      // Trigger close animation
      this.dialogComponentRef.instance.isOpen = false;
      
      // Wait for animation to complete
      setTimeout(() => {
        if (this.dialogComponentRef) {
          this.appRef.detachView(this.dialogComponentRef.hostView);
          this.dialogComponentRef.destroy();
          this.dialogComponentRef = undefined;
          this.closeSubject.next(result);
        }
      }, 200);
    }
  }

  private afterClosed(): Promise<any> {
    return new Promise((resolve) => {
      const subscription = this.closeSubject.subscribe((result) => {
        resolve(result);
        subscription.unsubscribe();
      });
    });
  }

  private getDefaultConfig(): DialogConfig {
    return {
      title: '',
      subtitle: '',
      content: '',
      confirmText: 'OK',
      cancelText: 'Cancel',
      size: 'md',
      type: 'default',
      showClose: true,
      closeOnBackdropClick: true,
      closeOnEscape: true,
      footerAlign: 'right'
    };
  }
}


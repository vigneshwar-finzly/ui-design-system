import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
export type ToastSize = 'sm' | 'md' | 'lg';

export interface ToastConfig {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  dismissible?: boolean;
  showIcon?: boolean;
  showProgress?: boolean;
  solid?: boolean;
  size?: ToastSize;
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  onClose?: () => void;
}

export interface Toast extends Required<Omit<ToastConfig, 'onClose'>> {
  id: string;
  state: 'enter' | 'leave';
  onClose?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class FinzlyToastrService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  private positionSubject = new BehaviorSubject<ToastPosition>('top-right');
  private defaultDuration = 5000;
  private maxToasts = 5;

  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();
  public position$: Observable<ToastPosition> = this.positionSubject.asObservable();

  constructor() {}

  /**
   * Configure global toast settings
   */
  configure(config: {
    position?: ToastPosition;
    defaultDuration?: number;
    maxToasts?: number;
  }): void {
    if (config.position) {
      this.positionSubject.next(config.position);
    }
    if (config.defaultDuration !== undefined) {
      this.defaultDuration = config.defaultDuration;
    }
    if (config.maxToasts !== undefined) {
      this.maxToasts = config.maxToasts;
    }
  }

  /**
   * Show a success toast
   */
  success(message: string, title?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      message,
      title,
      type: 'success',
      ...config
    });
  }

  /**
   * Show an error toast
   */
  error(message: string, title?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      message,
      title,
      type: 'error',
      ...config
    });
  }

  /**
   * Show a warning toast
   */
  warning(message: string, title?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      message,
      title,
      type: 'warning',
      ...config
    });
  }

  /**
   * Show an info toast
   */
  info(message: string, title?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      message,
      title,
      type: 'info',
      ...config
    });
  }

  /**
   * Show a primary toast
   */
  primary(message: string, title?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      message,
      title,
      type: 'primary',
      ...config
    });
  }

  /**
   * Show a secondary toast
   */
  secondary(message: string, title?: string, config?: Partial<ToastConfig>): string {
    return this.show({
      message,
      title,
      type: 'secondary',
      ...config
    });
  }

  /**
   * Show a toast with custom configuration
   */
  show(config: ToastConfig): string {
    const toast: Toast = {
      id: this.generateId(),
      title: config.title,
      message: config.message,
      type: config.type || 'info',
      duration: config.duration !== undefined ? config.duration : this.defaultDuration,
      dismissible: config.dismissible !== undefined ? config.dismissible : true,
      showIcon: config.showIcon !== undefined ? config.showIcon : true,
      showProgress: config.showProgress !== undefined ? config.showProgress : true,
      solid: config.solid !== undefined ? config.solid : false,
      size: config.size || 'md',
      width: config.width,
      state: 'enter',
      onClose: config.onClose
    };

    const currentToasts = this.toastsSubject.value;
    
    // Remove oldest toast if max limit reached
    if (currentToasts.length >= this.maxToasts) {
      this.dismiss(currentToasts[0].id);
    }

    this.toastsSubject.next([...currentToasts, toast]);

    // Auto dismiss after duration
    if (toast.duration > 0) {
      setTimeout(() => {
        this.dismiss(toast.id);
      }, toast.duration);
    }

    return toast.id;
  }

  /**
   * Dismiss a toast by ID
   */
  dismiss(id: string): void {
    const currentToasts = this.toastsSubject.value;
    const toast = currentToasts.find(t => t.id === id);
    
    if (toast && toast.state === 'enter') {
      // Update state to trigger leave animation
      const updatedToasts = currentToasts.map(t => 
        t.id === id ? { ...t, state: 'leave' as const } : t
      );
      this.toastsSubject.next(updatedToasts);

      // Call onClose callback if provided
      if (toast.onClose) {
        toast.onClose();
      }
    }
  }

  /**
   * Remove toast from the list (called after animation completes)
   */
  remove(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    const currentToasts = this.toastsSubject.value;
    currentToasts.forEach(toast => this.dismiss(toast.id));
  }

  /**
   * Generate unique ID for toast
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}


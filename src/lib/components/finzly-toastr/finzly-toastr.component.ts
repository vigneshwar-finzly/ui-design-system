import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FinzlyToastrService, Toast } from './finzly-toastr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'finzly-toastr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-toastr.component.html',
  styleUrls: ['./finzly-toastr.component.scss'],
  animations: [
    trigger('toastAnimation', [
      state('void', style({ opacity: 0, transform: 'translateX(100%)' })),
      state('enter', style({ opacity: 1, transform: 'translateX(0)' })),
      state('leave', style({ opacity: 0, transform: 'translateX(100%)' })),
      transition('void => enter', animate('200ms ease-out')),
      transition('enter => leave', animate('200ms ease-in'))
    ])
  ]
})
export class FinzlyToastrComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  position: string = 'top-right';
  private subscription?: Subscription;

  constructor(private toastrService: FinzlyToastrService) {}

  ngOnInit(): void {
    this.subscription = this.toastrService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });

    this.toastrService.position$.subscribe(position => {
      this.position = position;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getToastClasses(toast: Toast): string {
    const classes = [`alert-${toast.type}`];
    if (toast.solid) {
      classes.push(`alert-${toast.type}-solid`);
    }
    if (toast.size) {
      classes.push(`alert-${toast.size}`);
    }
    if (toast.width) {
      classes.push(`toast-width-${toast.width}`);
    }
    return classes.join(' ');
  }

  dismiss(toast: Toast): void {
    this.toastrService.dismiss(toast.id);
  }

  trackByToastId(index: number, toast: Toast): string {
    return toast.id;
  }

  onAnimationDone(event: any, toast: Toast): void {
    if (event.toState === 'leave') {
      this.toastrService.remove(toast.id);
    }
  }
}


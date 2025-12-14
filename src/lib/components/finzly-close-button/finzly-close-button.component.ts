import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-close-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-close-button.component.html',
  styleUrls: ['./finzly-close-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyCloseButtonComponent {
  @Input() icon: string = 'close';
  @Input() ariaLabel: string = 'Close';
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

  get buttonClass(): string {
    let classes = 'finzly-close-btn';
    
    if (this.size === 'sm') classes += ' close-btn-sm';
    else if (this.size === 'lg') classes += ' close-btn-lg';
    
    return classes;
  }
}


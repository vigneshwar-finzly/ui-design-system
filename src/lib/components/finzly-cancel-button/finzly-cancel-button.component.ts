import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-cancel-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-cancel-button.component.html',
  styleUrls: ['./finzly-cancel-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyCancelButtonComponent {
  @Input() text: string = 'Cancel';
  @Input() showIcon: boolean = true;
  @Input() icon: string = 'close';
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'outline' | 'danger' = 'outline';
  
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

  get buttonClass(): string {
    let classes = 'btn';
    
    if (this.variant === 'danger') {
      classes += ' btn-danger';
    } else {
      classes += ' btn-outline';
    }
    
    if (this.size === 'sm') classes += ' btn-sm';
    else if (this.size === 'md') classes += ' btn-md';
    else if (this.size === 'lg') classes += ' btn-lg';
    
    return classes;
  }
}


import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-custom-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-custom-button.component.html',
  styleUrls: ['./finzly-custom-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyCustomButtonComponent {
  @Input() text: string = 'Button';
  @Input() icon: string = '';
  @Input() showIcon: boolean = true;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'outline' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth: boolean = false;
  
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }

  get buttonClass(): string {
    let classes = 'finzly-button';
    
    // Variant
    classes += ` finzly-button-${this.variant}`;
    
    // Size
    classes += ` finzly-button-${this.size}`;
    
    // Full width
    if (this.fullWidth) {
      classes += ' finzly-button-full-width';
    }
    
    return classes;
  }

  get hasIcon(): boolean {
    return this.showIcon && !!this.icon;
  }
}


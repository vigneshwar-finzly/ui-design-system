import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-back-button.component.html',
  styleUrls: ['./finzly-back-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyBackButtonComponent {
  @Input() text: string = 'Back';
  @Input() showIcon: boolean = true;
  @Input() icon: string = 'refresh';
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'black' | 'default' = 'black';
  
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

  get buttonClass(): string {
    let classes = 'btn';
    
    // Variant
    if (this.variant === 'black') {
      classes += ' btn-outline-black';
    } else {
      classes += ' btn-outline';
    }
    
    // Size
    if (this.size === 'sm') classes += ' btn-sm';
    else if (this.size === 'md') classes += ' btn-md';
    else if (this.size === 'lg') classes += ' btn-lg';
    
    return classes;
  }
}


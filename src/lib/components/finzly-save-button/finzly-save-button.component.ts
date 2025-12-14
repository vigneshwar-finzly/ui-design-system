import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-save-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-save-button.component.html',
  styleUrls: ['./finzly-save-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlySaveButtonComponent {
  @Input() text: string = 'Save';
  @Input() showIcon: boolean = true;
  @Input() icon: string = 'save';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }

  get buttonClass(): string {
    let classes = 'btn btn-primary';
    
    if (this.size === 'sm') classes += ' btn-sm';
    else if (this.size === 'md') classes += ' btn-md';
    else if (this.size === 'lg') classes += ' btn-lg';
    
    return classes;
  }
}


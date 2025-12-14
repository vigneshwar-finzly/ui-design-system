import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-label.component.html',
  styleUrls: ['./finzly-label.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyLabelComponent {
  @Input() required: boolean = false;
  @Input() variant: 'default' | 'medium' | 'bold' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() htmlFor: string = '';

  get labelClass(): string {
    let classes = 'finzly-label';
    
    // Variant classes
    if (this.variant === 'default') {
      classes += ' finzly-label-default';
    } else if (this.variant === 'medium') {
      classes += ' finzly-label-medium';
    } else if (this.variant === 'bold') {
      classes += ' finzly-label-bold';
    }
    
    // Size classes
    if (this.size === 'sm') {
      classes += ' finzly-label-sm';
    } else if (this.size === 'md') {
      classes += ' finzly-label-md';
    } else if (this.size === 'lg') {
      classes += ' finzly-label-lg';
    }
    
    return classes;
  }
}


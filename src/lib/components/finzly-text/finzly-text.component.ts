import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-text.component.html',
  styleUrls: ['./finzly-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyTextComponent {
  @Input() size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' = 'base';
  @Input() weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'normal';
  @Input() color: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'default';

  get textClass(): string {
    let classes = 'finzly-text';
    
    // Size classes
    if (this.size === 'xs') {
      classes += ' finzly-text-xs';
    } else if (this.size === 'sm') {
      classes += ' finzly-text-sm';
    } else if (this.size === 'base') {
      classes += ' finzly-text-base';
    } else if (this.size === 'lg') {
      classes += ' finzly-text-lg';
    } else if (this.size === 'xl') {
      classes += ' finzly-text-xl';
    }
    
    // Weight classes
    if (this.weight === 'normal') {
      classes += ' finzly-text-normal';
    } else if (this.weight === 'medium') {
      classes += ' finzly-text-medium';
    } else if (this.weight === 'semibold') {
      classes += ' finzly-text-semibold';
    } else if (this.weight === 'bold') {
      classes += ' finzly-text-bold';
    }
    
    // Color classes
    if (this.color === 'default') {
      classes += ' finzly-text-default';
    } else if (this.color === 'muted') {
      classes += ' finzly-text-muted';
    } else if (this.color === 'primary') {
      classes += ' finzly-text-primary';
    } else if (this.color === 'success') {
      classes += ' finzly-text-success';
    } else if (this.color === 'warning') {
      classes += ' finzly-text-warning';
    } else if (this.color === 'error') {
      classes += ' finzly-text-error';
    }
    
    return classes;
  }
}


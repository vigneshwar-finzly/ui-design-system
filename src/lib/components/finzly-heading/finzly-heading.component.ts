import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-heading.component.html',
  styleUrls: ['./finzly-heading.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyHeadingComponent {
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  @Input() weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'bold';

  get headingClass(): string {
    let classes = 'finzly-heading';
    
    // Level classes
    classes += ` finzly-heading-${this.level}`;
    
    // Weight classes
    if (this.weight === 'normal') {
      classes += ' finzly-heading-normal';
    } else if (this.weight === 'medium') {
      classes += ' finzly-heading-medium';
    } else if (this.weight === 'semibold') {
      classes += ' finzly-heading-semibold';
    } else if (this.weight === 'bold') {
      classes += ' finzly-heading-bold';
    }
    
    return classes;
  }
}


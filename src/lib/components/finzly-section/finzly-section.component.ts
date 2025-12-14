import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-section.component.html',
  styleUrls: ['./finzly-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlySectionComponent {
  @Input() spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() background: 'white' | 'gray' | 'blue' | 'transparent' = 'transparent';

  get sectionClass(): string {
    let classes = 'finzly-section';
    
    // Spacing classes
    if (this.spacing === 'none') {
      classes += ' finzly-section-none';
    } else if (this.spacing === 'sm') {
      classes += ' finzly-section-sm';
    } else if (this.spacing === 'md') {
      classes += ' finzly-section-md';
    } else if (this.spacing === 'lg') {
      classes += ' finzly-section-lg';
    } else if (this.spacing === 'xl') {
      classes += ' finzly-section-xl';
    }
    
    // Background classes
    if (this.background === 'white') {
      classes += ' finzly-section-white';
    } else if (this.background === 'gray') {
      classes += ' finzly-section-gray';
    } else if (this.background === 'blue') {
      classes += ' finzly-section-blue';
    } else if (this.background === 'transparent') {
      classes += ' finzly-section-transparent';
    }
    
    return classes;
  }
}


import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'finzly-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-container.component.html',
  styleUrls: ['./finzly-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyContainerComponent {
  @Input() maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'xl';
  @Input() padding: boolean = true;
  @Input() centered: boolean = true;

  get containerClass(): string {
    let classes = 'finzly-container';
    
    // Max width classes
    if (this.maxWidth === 'sm') {
      classes += ' finzly-container-sm';
    } else if (this.maxWidth === 'md') {
      classes += ' finzly-container-md';
    } else if (this.maxWidth === 'lg') {
      classes += ' finzly-container-lg';
    } else if (this.maxWidth === 'xl') {
      classes += ' finzly-container-xl';
    } else if (this.maxWidth === '2xl') {
      classes += ' finzly-container-2xl';
    } else if (this.maxWidth === 'full') {
      classes += ' finzly-container-full';
    }
    
    // Padding class
    if (this.padding) {
      classes += ' finzly-container-padded';
    }
    
    // Centered class
    if (this.centered) {
      classes += ' finzly-container-centered';
    }
    
    return classes;
  }
}


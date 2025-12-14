import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComponentDataService } from '../../services/component-data.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  totalComponents = this.componentDataService.getAllComponents().length;
  categories = this.componentDataService.getAllCategories();

  features = [
    {
      icon: 'check_circle',
      title: 'Fully Typed',
      description: 'Built with TypeScript for type safety and better developer experience'
    },
    {
      icon: 'accessibility',
      title: 'Accessible',
      description: 'WCAG compliant components with proper ARIA attributes and keyboard navigation'
    },
    {
      icon: 'palette',
      title: 'Themeable',
      description: 'Easily customize colors and styles using CSS variables'
    },
    {
      icon: 'speed',
      title: 'Performant',
      description: 'Optimized for performance with minimal bundle size'
    },
    {
      icon: 'devices',
      title: 'Responsive',
      description: 'Mobile-first design that works on all screen sizes'
    },
    {
      icon: 'code',
      title: 'Modern',
      description: 'Built with Angular 18+ using standalone components'
    }
  ];

  constructor(private componentDataService: ComponentDataService) {}
}

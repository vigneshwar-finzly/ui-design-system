import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-principles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design-principles.component.html',
  styleUrls: ['./design-principles.component.scss']
})
export class DesignPrinciplesComponent {
  principles = [
    {
      title: 'Consistency',
      description: 'Maintain consistent patterns, behaviors, and visual design across all components.',
      icon: 'design_services'
    },
    {
      title: 'Accessibility',
      description: 'Ensure all components are accessible to users with disabilities through proper ARIA labels and keyboard navigation.',
      icon: 'accessibility'
    },
    {
      title: 'Flexibility',
      description: 'Components should be flexible enough to adapt to various use cases while maintaining their core functionality.',
      icon: 'tune'
    },
    {
      title: 'Performance',
      description: 'Optimize component rendering and minimize unnecessary re-renders for better performance.',
      icon: 'speed'
    },
    {
      title: 'Simplicity',
      description: 'Keep interfaces simple and intuitive, avoiding unnecessary complexity.',
      icon: 'lightbulb'
    },
    {
      title: 'Feedback',
      description: 'Provide clear visual feedback for user interactions and system states.',
      icon: 'feedback'
    }
  ];
}

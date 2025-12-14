import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentDataService } from '../../../services/component-data.service';
import { ComponentDocumentation } from '../../../models/component-doc.model';
import { InteractiveControl, StateDemo } from '../../../models/component-state.model';
import { CodeExampleComponent } from '../../../shared/code-example/code-example.component';
import { InteractivePreviewComponent } from '../../../shared/interactive-preview/interactive-preview.component';
import { StateShowcaseComponent } from '../../../shared/state-showcase/state-showcase.component';
import {
  FinzlyInputComponent,
  FinzlyCustomButtonComponent,
  FinzlyCheckboxComponent,
  FinzlyToggleComponent,
  FinzlyBadgeComponent,
  FinzlyTextareaComponent,
  FinzlyAmountInputComponent
} from '@npmswapstech/finzly-theme';

@Component({
  selector: 'app-component-showcase',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CodeExampleComponent,
    InteractivePreviewComponent,
    StateShowcaseComponent,
    FinzlyInputComponent,
    FinzlyCustomButtonComponent,
    FinzlyCheckboxComponent,
    FinzlyToggleComponent,
    FinzlyBadgeComponent,
    FinzlyTextareaComponent,
    FinzlyAmountInputComponent
  ],
  templateUrl: './component-showcase.component.html',
  styleUrls: ['./component-showcase.component.scss']
})
export class ComponentShowcaseComponent implements OnInit {
  component?: ComponentDocumentation;
  activeTab: 'playground' | 'states' | 'api' | 'examples' | 'accessibility' = 'playground';

  interactiveControls: InteractiveControl[] = [];
  stateDemos: StateDemo[] = [];

  constructor(
    private route: ActivatedRoute,
    private componentDataService: ComponentDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const componentId = params['componentId'];
      this.component = this.componentDataService.getComponentById(componentId);

      if (this.component) {
        this.componentDataService.addToRecentlyViewed(componentId);
        this.setupInteractiveControls();
        this.setupStateDemos();
      }
    });
  }

  setActiveTab(tab: typeof this.activeTab): void {
    this.activeTab = tab;
  }

  private setupInteractiveControls(): void {
    if (!this.component) return;

    const category = this.component.category;

    if (category === 'inputs') {
      this.interactiveControls = [
        { name: 'disabled', type: 'toggle', label: 'Disabled', defaultValue: false },
        { name: 'required', type: 'toggle', label: 'Required', defaultValue: false },
        { name: 'error', type: 'toggle', label: 'Error State', defaultValue: false },
        { name: 'label', type: 'text', label: 'Label', defaultValue: 'Input Label' },
        { name: 'placeholder', type: 'text', label: 'Placeholder', defaultValue: 'Enter text...' }
      ];
    } else if (category === 'buttons') {
      this.interactiveControls = [
        { name: 'disabled', type: 'toggle', label: 'Disabled', defaultValue: false },
        { name: 'loading', type: 'toggle', label: 'Loading', defaultValue: false },
        { name: 'variant', type: 'select', label: 'Variant', options: ['primary', 'secondary', 'outline'], defaultValue: 'primary' },
        { name: 'size', type: 'select', label: 'Size', options: ['small', 'medium', 'large'], defaultValue: 'medium' }
      ];
    } else if (category === 'data-display') {
      this.interactiveControls = [
        { name: 'variant', type: 'select', label: 'Variant', options: ['default', 'success', 'warning', 'error', 'info'], defaultValue: 'default' },
        { name: 'label', type: 'text', label: 'Text', defaultValue: 'Badge' }
      ];
    }
  }

  private setupStateDemos(): void {
    if (!this.component) return;

    const category = this.component.category;

    if (category === 'inputs') {
      this.stateDemos = [
        {
          title: 'Input States',
          description: 'Different states and variations of input components',
          variants: [
            { name: 'default', description: 'Default state', state: {} },
            { name: 'disabled', description: 'Disabled state', state: { disabled: true } },
            { name: 'error', description: 'Error state', state: { error: true } },
            { name: 'required', description: 'Required field', state: { required: true } }
          ]
        },
        {
          title: 'Size Variants',
          description: 'Input components in different sizes',
          variants: [
            { name: 'small', description: 'Small size', state: { size: 'small' } },
            { name: 'medium', description: 'Medium size (default)', state: { size: 'medium' } },
            { name: 'large', description: 'Large size', state: { size: 'large' } }
          ]
        }
      ];
    } else if (category === 'buttons') {
      this.stateDemos = [
        {
          title: 'Button States',
          description: 'Interactive states of button components',
          variants: [
            { name: 'default', description: 'Default state', state: {} },
            { name: 'disabled', description: 'Disabled state', state: { disabled: true } },
            { name: 'loading', description: 'Loading state', state: { loading: true } }
          ]
        },
        {
          title: 'Button Variants',
          description: 'Different visual styles',
          variants: [
            { name: 'primary', description: 'Primary action', state: { variant: 'primary' } },
            { name: 'secondary', description: 'Secondary action', state: { variant: 'secondary' } },
            { name: 'outline', description: 'Outline style', state: { variant: 'outline' } }
          ]
        }
      ];
    } else if (category === 'data-display') {
      this.stateDemos = [
        {
          title: 'Badge Variants',
          description: 'Badge components with different semantic meanings',
          variants: [
            { name: 'default', description: 'Default badge', state: { variant: 'default' } },
            { name: 'success', description: 'Success state', state: { variant: 'success' } },
            { name: 'warning', description: 'Warning state', state: { variant: 'warning' } },
            { name: 'error', description: 'Error state', state: { variant: 'error' } },
            { name: 'info', description: 'Info state', state: { variant: 'info' } }
          ]
        }
      ];
    }
  }

  getImportCode(): string {
    if (!this.component) return '';
    const componentName = this.component.name.replace(/\s+/g, '');
    return `import { ${componentName}Component } from '${this.component.module}';

@NgModule({
  imports: [
    ${componentName}Component
  ]
})
export class YourModule { }`;
  }
}

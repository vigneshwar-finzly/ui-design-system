import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentDataService } from '../../../services/component-data.service';
import { CodeGeneratorService } from '../../../services/code-generator.service';
import { ComponentDocumentation } from '../../../models/component-doc.model';
import { CodeExampleComponent } from '../../../shared/code-example/code-example.component';
import { ComponentPlaygroundComponent } from '../../../shared/component-playground/component-playground.component';

@Component({
  selector: 'app-component-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CodeExampleComponent, ComponentPlaygroundComponent],
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.scss']
})
export class ComponentDetailComponent implements OnInit {
  component?: ComponentDocumentation;
  activeTab: 'overview' | 'api' | 'examples' | 'accessibility' | 'theming' = 'overview';
  generatedCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private componentDataService: ComponentDataService,
    private codeGenerator: CodeGeneratorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const componentId = params['componentId'];
      this.component = this.componentDataService.getComponentById(componentId);

      if (this.component) {
        this.componentDataService.addToRecentlyViewed(componentId);
        this.generateCode();
      }
    });
  }

  setActiveTab(tab: typeof this.activeTab): void {
    this.activeTab = tab;
  }

  generateCode(): void {
    if (!this.component) return;

    const config = {
      selector: this.component.selector,
      properties: this.getDefaultProperties(),
      content: 'Content'
    };

    this.generatedCode = this.codeGenerator.generateHTMLCode(config);
  }

  private getDefaultProperties(): any {
    if (!this.component) return {};

    const props: any = {};
    this.component.properties.forEach(prop => {
      if (prop.default) {
        props[prop.name] = prop.default;
      }
    });
    return props;
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

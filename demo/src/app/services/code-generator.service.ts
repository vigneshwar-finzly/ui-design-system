import { Injectable } from '@angular/core';

export interface ComponentConfig {
  selector: string;
  properties: { [key: string]: any };
  events?: { [key: string]: string };
  content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {
  generateHTMLCode(config: ComponentConfig): string {
    const props = this.formatProperties(config.properties);
    const events = config.events ? this.formatEvents(config.events) : '';
    const content = config.content || '';

    if (content) {
      return `<${config.selector}${props}${events}>\n  ${content}\n</${config.selector}>`;
    }

    return `<${config.selector}${props}${events}></${config.selector}>`;
  }

  generateTypeScriptCode(config: ComponentConfig, componentName: string): string {
    const eventHandlers = config.events
      ? Object.keys(config.events).map(event => this.generateEventHandler(event)).join('\n\n  ')
      : '';

    return `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`
    ${this.generateHTMLCode(config).split('\n').join('\n    ')}
  \`
})
export class ExampleComponent {
${eventHandlers ? '  ' + eventHandlers : '  // Component logic here'}
}`;
  }

  generateModuleImport(componentModule: string, components: string[]): string {
    return `import { ${components.join(', ')} } from '${componentModule}';

@NgModule({
  imports: [
    // ... other imports
    ${components.join(',\n    ')}
  ]
})
export class YourModule { }`;
  }

  private formatProperties(properties: { [key: string]: any }): string {
    const props = Object.entries(properties)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? `\n  [${key}]="true"` : '';
        }
        if (typeof value === 'string') {
          return `\n  ${key}="${value}"`;
        }
        return `\n  [${key}]="${value}"`;
      })
      .filter(prop => prop !== '')
      .join('');

    return props;
  }

  private formatEvents(events: { [key: string]: string }): string {
    return Object.entries(events)
      .map(([event, handler]) => `\n  (${event})="${handler}"`)
      .join('');
  }

  private generateEventHandler(eventName: string): string {
    const handlerName = `on${this.capitalize(eventName)}`;
    return `${handlerName}(event: any): void {
    console.log('${eventName} triggered:', event);
    // Handle ${eventName} event
  }`;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  formatCode(code: string, language: string): string {
    if (language === 'html') {
      return this.formatHTML(code);
    }
    return code;
  }

  private formatHTML(html: string): string {
    let formatted = '';
    let indent = 0;
    const tab = '  ';

    html.split(/>\s*</).forEach(node => {
      if (node.match(/^\/\w/)) {
        indent--;
      }

      formatted += tab.repeat(indent) + '<' + node + '>\n';

      if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith('input')) {
        indent++;
      }
    });

    return formatted.substring(1, formatted.length - 2);
  }
}

export interface ComponentProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
  options?: string[];
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: 'typescript' | 'html' | 'scss';
}

export interface ComponentDocumentation {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  selector: string;
  module: string;
  tags: string[];
  properties: ComponentProperty[];
  events?: ComponentProperty[];
  methods?: ComponentProperty[];
  examples: CodeExample[];
  useCases: string[];
  accessibility: {
    ariaSupport: string[];
    keyboardNavigation: string[];
    screenReaderInfo: string;
  };
  theming: {
    cssVariables: string[];
    customization: string;
  };
}

export type ComponentCategory =
  | 'inputs'
  | 'buttons'
  | 'pickers'
  | 'navigation'
  | 'feedback'
  | 'layout'
  | 'data-display';

export interface CategoryInfo {
  id: ComponentCategory;
  name: string;
  description: string;
  icon: string;
}

export interface SearchResult {
  component: ComponentDocumentation;
  matchType: 'name' | 'description' | 'tag' | 'property';
  matchText: string;
}

export interface ComponentState {
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: string;
  value?: any;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export interface InteractiveControl {
  name: string;
  type: 'toggle' | 'select' | 'text' | 'number';
  label: string;
  options?: string[];
  defaultValue?: any;
}

export interface ComponentVariant {
  name: string;
  description: string;
  state: ComponentState;
}

export interface StateDemo {
  title: string;
  description: string;
  variants: ComponentVariant[];
}

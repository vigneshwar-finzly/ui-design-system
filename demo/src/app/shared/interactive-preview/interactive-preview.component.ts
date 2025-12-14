import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentState, InteractiveControl } from '../../models/component-state.model';

@Component({
  selector: 'app-interactive-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interactive-preview.component.html',
  styleUrls: ['./interactive-preview.component.scss']
})
export class InteractivePreviewComponent implements OnInit {
  @Input() componentSelector: string = '';
  @Input() controls: InteractiveControl[] = [];

  state: ComponentState = {
    disabled: false,
    loading: false,
    error: false,
    size: 'medium',
    value: '',
    placeholder: 'Enter text',
    label: 'Label',
    required: false
  };

  ngOnInit(): void {
    this.controls.forEach(control => {
      if (control.defaultValue !== undefined) {
        (this.state as any)[control.name] = control.defaultValue;
      }
    });
  }

  updateState(key: string, value: any): void {
    (this.state as any)[key] = value;
  }

  getStateAsString(): string {
    return JSON.stringify(this.state, null, 2);
  }
}

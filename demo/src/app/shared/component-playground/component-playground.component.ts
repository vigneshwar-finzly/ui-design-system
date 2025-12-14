import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-component-playground',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './component-playground.component.html',
  styleUrls: ['./component-playground.component.scss']
})
export class ComponentPlaygroundComponent {
  @Input() config: any = {};
  @Output() configChange = new EventEmitter<any>();

  updateConfig(key: string, value: any): void {
    this.config = { ...this.config, [key]: value };
    this.configChange.emit(this.config);
  }
}

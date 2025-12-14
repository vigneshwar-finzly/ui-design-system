import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateDemo } from '../../models/component-state.model';

@Component({
  selector: 'app-state-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-showcase.component.html',
  styleUrls: ['./state-showcase.component.scss']
})
export class StateShowcaseComponent {
  @Input() demos: StateDemo[] = [];
}

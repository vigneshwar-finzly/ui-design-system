import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent {
  inputValue = '';
  selectValue = 'option1';
  checkboxValue = false;
  radioValue = 'option1';
  toggleValue = false;
  textareaValue = '';
}


import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownButtonOption {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'finzly-dropdown-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-dropdown-button.component.html',
  styleUrls: ['./finzly-dropdown-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinzlyDropdownButtonComponent {
  @Input() text: string = 'Action';
  @Input() icon: string = '';
  @Input() options: DropdownButtonOption[] = [];
  @Input() selectedOption: DropdownButtonOption | null = null;
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'outline' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() placeholder: string = 'Select...';
  
  @Output() buttonClicked = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<DropdownButtonOption>();

  @ViewChild('dropdownContainer') dropdownContainer?: ElementRef;

  isDropdownOpen: boolean = false;
  dropdownPosition = { top: '0px', left: '0px' };

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.calculateDropdownPosition();
      }
    }
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  selectOption(option: DropdownButtonOption, event: Event): void {
    event.stopPropagation();
    if (!option.disabled) {
      this.selectedOption = option;
      this.optionSelected.emit(option);
      this.closeDropdown();
    }
  }

  onButtonClick(): void {
    if (!this.disabled) {
      this.buttonClicked.emit();
    }
  }

  private calculateDropdownPosition(): void {
    setTimeout(() => {
      if (this.dropdownContainer) {
        const rect = this.dropdownContainer.nativeElement.getBoundingClientRect();
        this.dropdownPosition = {
          top: `${rect.bottom + 4}px`,
          left: `${rect.left}px`
        };
      }
    }, 0);
  }

  get buttonClass(): string {
    let classes = 'btn dropdown-main-btn';
    
    if (this.variant === 'primary') classes += ' btn-primary';
    else if (this.variant === 'outline') classes += ' btn-outline';
    else if (this.variant === 'secondary') classes += ' btn-secondary';
    else if (this.variant === 'success') classes += ' btn-success';
    else if (this.variant === 'warning') classes += ' btn-warning';
    else if (this.variant === 'danger') classes += ' btn-danger';
    
    if (this.size === 'sm') classes += ' btn-sm';
    else if (this.size === 'md') classes += ' btn-md';
    else if (this.size === 'lg') classes += ' btn-lg';
    
    return classes;
  }

  get dropdownToggleClass(): string {
    let classes = 'btn dropdown-toggle-btn';
    
    if (this.variant === 'primary') classes += ' btn-primary';
    else if (this.variant === 'outline') classes += ' btn-outline';
    else if (this.variant === 'secondary') classes += ' btn-secondary';
    else if (this.variant === 'success') classes += ' btn-success';
    else if (this.variant === 'warning') classes += ' btn-warning';
    else if (this.variant === 'danger') classes += ' btn-danger';
    
    if (this.size === 'sm') classes += ' btn-sm';
    else if (this.size === 'md') classes += ' btn-md';
    else if (this.size === 'lg') classes += ' btn-lg';
    
    return classes;
  }

  get displayText(): string {
    return this.selectedOption ? this.selectedOption.label : this.placeholder;
  }
}


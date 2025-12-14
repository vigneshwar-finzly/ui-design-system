import { Component, Input, Output, EventEmitter, forwardRef, HostListener, ElementRef, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface DropdownOption {
  value: any;
  label: string;
  disabled?: boolean;
  icon?: string;
  description?: string;
}

@Component({
  selector: 'finzly-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finzly-dropdown.component.html',
  styleUrls: ['./finzly-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyDropdownComponent),
      multi: true
    }
  ]
})
export class FinzlyDropdownComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() searchable: boolean = false;
  @Input() multiSelect: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() maxHeight: string = '300px';
  @Input() error: boolean = false;
  @Input() clearable: boolean = true;
  @Input() showCheckboxes: boolean = false;
  
  @Output() selectionChange = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<string>();
  
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  isOpen: boolean = false;
  searchTerm: string = '';
  selectedValue: any = null;
  selectedValues: any[] = [];
  filteredOptions: DropdownOption[] = [];
  private lastOptionsLength: number = 0;
  private lastOptionsReference: DropdownOption[] | null = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredOptions = [...this.options];
    this.lastOptionsLength = this.options.length;
    this.lastOptionsReference = this.options;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Ultra-lightweight: only track that options changed (ZERO array operations)
    // All array operations deferred to when dropdown opens (prevents UI blocking)
    if (changes['options'] && !changes['options'].firstChange) {
      const currentOptions = changes['options'].currentValue;
      
      // Quick reference check - skip if same reference (no work needed)
      if (currentOptions === this.lastOptionsReference) {
        return;
      }
      
      // Just update tracking variables (NO expensive operations - just assignments)
      this.lastOptionsLength = currentOptions?.length || 0;
      this.lastOptionsReference = currentOptions;
      
      // NO array operations here - all updates happen in toggleDropdown when user opens it
      // This ensures change detection never blocks the UI
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (this.multiSelect) {
      this.selectedValues = Array.isArray(value) ? value : [];
    } else {
      // Normalize null, undefined, and empty string to null
      this.selectedValue = (value === null || value === undefined || value === '') ? null : value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Dropdown methods
  toggleDropdown() {
    if (this.disabled) return;
    
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      // Always refresh filteredOptions when opening to ensure latest options are shown
      // Update references to track current state
      this.lastOptionsLength = this.options.length;
      this.lastOptionsReference = this.options;
      this.searchTerm = '';
      this.filteredOptions = [...this.options];
      this.onTouched();
      setTimeout(() => {
        if (this.searchable && this.searchInput) {
          this.searchInput.nativeElement.focus();
        }
      }, 0);
    } else {
      this.searchTerm = '';
      // Don't update filteredOptions when closing to avoid unnecessary work
    }
  }

  selectOption(option: DropdownOption) {
    if (option.disabled) return;

    if (this.multiSelect) {
      const index = this.selectedValues.indexOf(option.value);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      } else {
        this.selectedValues.push(option.value);
      }
      this.onChange([...this.selectedValues]);
      this.selectionChange.emit([...this.selectedValues]);
    } else {
      this.selectedValue = option.value;
      this.onChange(this.selectedValue);
      this.selectionChange.emit(this.selectedValue);
      this.isOpen = false;
      this.searchTerm = '';
      this.filteredOptions = [...this.options];
    }
  }

  isSelected(option: DropdownOption): boolean {
    if (this.multiSelect) {
      return this.selectedValues.includes(option.value);
    }
    return this.selectedValue === option.value;
  }

  getDisplayText(): string {
    if (this.multiSelect) {
      if (this.selectedValues.length === 0) return this.placeholder;
      if (this.selectedValues.length === 1) {
        const option = this.options.find(opt => opt.value === this.selectedValues[0]);
        return option?.label || this.placeholder;
      }
      return `${this.selectedValues.length} items selected`;
    } else {
      // For single select, always check if we have a valid selection first
      if (!this.hasSelection()) {
        return this.placeholder;
      }
      const option = this.options.find(opt => {
        // Use strict equality for comparison
        return opt.value === this.selectedValue;
      });
      // Only return the label if we found a matching option, otherwise return placeholder
      return option?.label || this.placeholder;
    }
  }

  getSelectedLabel(): string {
    if (this.multiSelect) {
      if (this.selectedValues.length === 0) return this.placeholder;
      if (this.selectedValues.length === 1) {
        const option = this.options.find(opt => opt.value === this.selectedValues[0]);
        return option?.label || this.placeholder;
      }
      return `${this.selectedValues.length} items selected`;
    } else {
      // Ensure we handle null, undefined, and empty string cases
      if (this.selectedValue === null || this.selectedValue === undefined || this.selectedValue === '') {
        return this.placeholder;
      }
      const option = this.options.find(opt => {
        // Use strict equality for comparison
        return opt.value === this.selectedValue;
      });
      // Only return the label if we found a matching option, otherwise return placeholder
      return option?.label || this.placeholder;
    }
  }

  getOptionLabel(value: any): string {
    const option = this.options.find(opt => opt.value === value);
    return option?.label || '';
  }

  removeValue(value: any, event: Event) {
    event.stopPropagation();
    if (this.disabled) return;

    const index = this.selectedValues.indexOf(value);
    if (index > -1) {
      this.selectedValues.splice(index, 1);
      this.onChange([...this.selectedValues]);
      this.selectionChange.emit([...this.selectedValues]);
    }
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.filterOptions();
    this.searchChange.emit(this.searchTerm);
  }

  filterOptions() {
    if (!this.searchTerm) {
      this.filteredOptions = [...this.options];
    } else {
      const search = this.searchTerm.toLowerCase();
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(search) ||
        option.description?.toLowerCase().includes(search)
      );
    }
  }

  clearSelection(event: Event) {
    event.stopPropagation();
    if (this.multiSelect) {
      this.selectedValues = [];
      this.onChange([]);
      this.selectionChange.emit([]);
    } else {
      this.selectedValue = null;
      this.onChange(null);
      this.selectionChange.emit(null);
    }
  }

  hasSelection(): boolean {
    if (this.multiSelect) {
      return this.selectedValues.length > 0;
    }
    // For single select, check for null, undefined, and empty string
    return this.selectedValue !== null && 
           this.selectedValue !== undefined && 
           this.selectedValue !== '';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.isOpen = false;
        this.searchTerm = '';
        this.filteredOptions = [...this.options];
      }
    }
  }

  @HostListener('keydown.escape')
  onEscape() {
    this.isOpen = false;
    this.searchTerm = '';
    this.filteredOptions = [...this.options];
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: Event) {
    if (this.isOpen && this.filteredOptions.length === 1) {
      event.preventDefault();
      this.selectOption(this.filteredOptions[0]);
    }
  }
}


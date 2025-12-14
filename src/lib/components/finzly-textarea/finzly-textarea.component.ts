import { Component, Input, forwardRef, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'finzly-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finzly-textarea.component.html',
  styleUrls: ['./finzly-textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FinzlyTextareaComponent),
      multi: true
    }
  ]
})
export class FinzlyTextareaComponent implements ControlValueAccessor, AfterViewInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() rows: number = 4;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() state: 'default' | 'success' | 'error' | 'warning' = 'default';
  @Input() helperText: string = '';
  @Input() error: string = '';
  @Input() errorText: string = '';
  @Input() autoResize: boolean = true;
  @Input() showCharCount: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
    if (this.autoResize && this.textareaRef) {
      setTimeout(() => this.adjustHeight(), 0);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.onChange(this.value);
    
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  onInputBlur(): void {
    this.onTouched();
  }

  private adjustHeight(): void {
    if (this.textareaRef) {
      const textarea = this.textareaRef.nativeElement;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  get textareaClass(): string {
    let classes = 'finzly-textarea';
    
    if (this.error || this.state === 'error') {
      classes += ' finzly-textarea-error';
    }
    
    if (this.fullWidth) {
      classes += ' finzly-textarea-full-width';
    }
    
    // Resize
    if (this.resize === 'none') {
      classes += ' finzly-textarea-resize-none';
    } else if (this.resize === 'vertical') {
      classes += ' finzly-textarea-resize-vertical';
    } else if (this.resize === 'horizontal') {
      classes += ' finzly-textarea-resize-horizontal';
    } else if (this.resize === 'both') {
      classes += ' finzly-textarea-resize-both';
    }
    
    return classes;
  }

  get showHelper(): boolean {
    return !!this.helperText && !this.error && this.state !== 'error';
  }

  get showError(): boolean {
    return !!(this.error || this.errorText) && (this.state === 'error' || !!this.error);
  }

  get errorMessage(): string {
    return this.error || this.errorText || '';
  }

  get charCount(): number {
    return this.value ? this.value.length : 0;
  }
}


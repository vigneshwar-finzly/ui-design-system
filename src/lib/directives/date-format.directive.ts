import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FinzlyDateFormatPipe } from '../pipes/finzly-date-format.pipe';

@Directive({
  selector: '[finzlyDateFormat]',
  standalone: true,
  providers: [FinzlyDateFormatPipe]
})
export class DateFormatDirective implements OnInit, OnChanges {
  @Input() finzlyDateFormat: Date | string | null = null;
  @Input() dateFormat: string = 'MM/dd/yyyy';
  @Input() timezone?: string;

  constructor(
    private el: ElementRef,
    private datePipe: FinzlyDateFormatPipe
  ) {}

  ngOnInit(): void {
    this.updateDisplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['finzlyDateFormat'] || changes['dateFormat'] || changes['timezone']) {
      this.updateDisplay();
    }
  }

  private updateDisplay(): void {
    if (this.finzlyDateFormat) {
      const formatted = this.datePipe.transform(this.finzlyDateFormat, this.dateFormat, this.timezone);
      this.el.nativeElement.textContent = formatted;
    } else {
      this.el.nativeElement.textContent = '';
    }
  }
}


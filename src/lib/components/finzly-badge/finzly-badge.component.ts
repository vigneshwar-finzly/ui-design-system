import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type BadgeType = 'solid' | 'soft' | 'outline';
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'danger' | 'info' | 'neutral' | 'default' | 'custom';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'finzly-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finzly-badge.component.html',
  styleUrls: ['./finzly-badge.component.scss']
})
export class FinzlyBadgeComponent {
  /**
   * Badge type: solid (filled), soft (subtle), or outline
   */
  @Input() type: BadgeType = 'solid';

  /**
   * Badge color variant - matching React: success, warning, error, info, default
   */
  @Input() variant: 'success' | 'warning' | 'error' | 'info' | 'default' | BadgeVariant = 'default';

  /**
   * Badge size - matching React: sm, md, lg
   */
  @Input() size: BadgeSize = 'md';

  /**
   * Makes the badge fully rounded (pill shape) - matching React "rounded"
   */
  @Input() pill: boolean = false;
  @Input() rounded: boolean = false;

  /**
   * Adds a colored dot before the text
   */
  @Input() dot: boolean = false;

  /**
   * For count badges - displays as a small round badge
   */
  @Input() count: boolean = false;

  /**
   * Custom color (hex) for badge-custom variant
   * Only works when variant="custom"
   */
  @Input() customColor?: string;

  /**
   * Icon HTML or SVG string to display before text
   */
  @Input() icon?: string;

  /**
   * Icon HTML or SVG string to display after text
   */
  @Input() iconAfter?: string;

  /**
   * Makes badge removable with a close button
   */
  @Input() removable: boolean = false;

  /**
   * Click handler for the badge
   */
  @Input() clickable: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

  getBadgeClasses(): string {
    const classes: string[] = ['finzly-badge'];

    // Variant - matching React design
    classes.push(`finzly-badge-${this.variant}`);

    // Size
    classes.push(`finzly-badge-${this.size}`);

    // Modifiers
    if (this.rounded || this.pill) {
      classes.push('finzly-badge-rounded');
    }
    if (this.dot) {
      classes.push('finzly-badge-dot');
    }
    if (this.count) {
      classes.push('finzly-badge-count');
    }
    if (this.clickable) {
      classes.push('finzly-badge-clickable');
    }

    return classes.join(' ');
  }

  getCustomStyles(): { [key: string]: string } | null {
    if (this.variant === 'custom' && this.customColor) {
      return { '--badge-color': this.customColor };
    }
    return null;
  }

  getSafeIcon(iconString?: string): SafeHtml | null {
    if (!iconString) return null;
    return this.sanitizer.bypassSecurityTrustHtml(iconString);
  }

  onRemove(event: Event): void {
    event.stopPropagation();
    // Emit remove event or handle removal
  }
}


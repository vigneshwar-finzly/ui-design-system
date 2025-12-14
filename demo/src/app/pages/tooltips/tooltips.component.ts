import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-tooltips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.scss']
})
export class TooltipsComponent implements OnInit, OnDestroy {
  activeSection: string = 'tooltip-structure';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'tooltip-structure', title: 'Tooltip Structure', icon: 'code' },
    { id: 'tooltip-positions', title: 'Positions', icon: 'navigation' },
    { id: 'tooltip-variants', title: 'Variants', icon: 'palette' },
    { id: 'tooltip-sizes', title: 'Sizes', icon: 'aspect_ratio' },
    { id: 'progress-bar', title: 'Progress Bar', icon: 'linear_scale' },
    { id: 'avatar-component', title: 'Avatar', icon: 'account_circle' },
    { id: 'spinner-loading', title: 'Spinner', icon: 'refresh' },
    { id: 'skeleton-loaders', title: 'Skeleton', icon: 'view_column' },
    { id: 'divider', title: 'Divider', icon: 'horizontal_rule' }
  ];

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-140px 0px -66%',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    setTimeout(() => {
      this.sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element && this.observer) {
          this.observer.observe(element);
        }
      });
    }, 100);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedCode = code;
      setTimeout(() => {
        this.copiedCode = null;
      }, 2000);
    });
  }

  isCopied(code: string): boolean {
    return this.copiedCode === code;
  }

  setActiveTab(exampleId: string, tab: 'preview' | 'code'): void {
    this.activeTabs[exampleId] = tab;
  }

  getActiveTab(exampleId: string): 'preview' | 'code' {
    return this.activeTabs[exampleId] || 'preview';
  }

  isTabActive(exampleId: string, tab: 'preview' | 'code'): boolean {
    return this.getActiveTab(exampleId) === tab;
  }

  // Code examples
  examples = {
    tooltipStructure: `<div class="tooltip-wrapper">
  <button class="btn btn-primary">Hover me</button>
  <div class="tooltip tooltip-top tooltip-visible">
    Tooltip content
  </div>
</div>`,
    tooltipPositions: `.tooltip-top - Appears above the element
.tooltip-bottom - Appears below the element
.tooltip-left - Appears to the left
.tooltip-right - Appears to the right`,
    tooltipVariants: `.tooltip (default) - Dark background
.tooltip-primary - Primary color
.tooltip-success - Success color
.tooltip-warning - Warning color
.tooltip-error - Error color
.tooltip-light - Light background with border`,
    tooltipSizes: `.tooltip-sm - Small tooltip
.tooltip (default) - Medium tooltip
.tooltip-lg - Large tooltip`
  };
}


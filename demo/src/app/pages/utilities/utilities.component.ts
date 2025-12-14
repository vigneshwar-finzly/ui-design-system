import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent implements OnInit, OnDestroy {
  activeSection: string = 'spacing-utilities';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'spacing-utilities', title: 'Spacing', icon: 'space_bar' },
    { id: 'typography-utilities', title: 'Typography', icon: 'text_fields' },
    { id: 'display-utilities', title: 'Display', icon: 'view_module' },
    { id: 'flexbox-utilities', title: 'Flexbox', icon: 'view_column' },
    { id: 'border-shadow', title: 'Border & Shadow', icon: 'border_style' },
    { id: 'text-colors', title: 'Text Colors', icon: 'format_color_text' },
    { id: 'width-height', title: 'Width & Height', icon: 'aspect_ratio' },
    { id: 'position-overflow', title: 'Position & Overflow', icon: 'open_with' },
    { id: 'quick-examples', title: 'Quick Examples', icon: 'apps' }
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
}


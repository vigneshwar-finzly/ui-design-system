import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  activeSection: string = 'design-tokens';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;

  sections: Section[] = [
    { id: 'design-tokens', title: 'Design Tokens', icon: 'palette' },
    { id: 'quick-start', title: 'Quick Start', icon: 'rocket_launch' },
    { id: 'explore-components', title: 'Explore Components', icon: 'apps' }
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

  // Code examples for copy functionality
  codeExamples = {
    install: 'npm install @npmswapstech/finzly-theme',
    importStyles: '@import \'~@npmswapstech/finzly-theme/styles/finzly_theme.scss\';',
    importModule: `import { UiKitModule } from '@npmswapstech/finzly-theme';

@NgModule({
  imports: [UiKitModule]
})`
  };
}


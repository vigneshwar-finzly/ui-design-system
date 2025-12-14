import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinzlyBadgeComponent } from '../../../../../src/lib/components/finzly-badge/finzly-badge.component';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [CommonModule, FinzlyBadgeComponent],
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit, OnDestroy {
  activeSection: string = 'solid-badges';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'solid-badges', title: 'Solid Badges', icon: 'label' },
    { id: 'soft-badges', title: 'Soft Badges', icon: 'label_outline' },
    { id: 'outline-badges', title: 'Outline Badges', icon: 'border_color' },
    { id: 'badge-sizes', title: 'Badge Sizes', icon: 'aspect_ratio' },
    { id: 'pill-badges', title: 'Pill Badges', icon: 'radio_button_unchecked' },
    { id: 'dot-badges', title: 'Dot Badges', icon: 'fiber_manual_record' },
    { id: 'custom-colors', title: 'Custom Colors', icon: 'palette' },
    { id: 'badges-icons', title: 'Badges with Icons', icon: 'add_circle' }
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

  // SVG Icons for examples
  checkIcon = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
  infoIcon = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  userIcon = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>';
  starIcon = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>';

  // Code examples
  examples = {
    solidBadges: `<finzly-badge variant="primary">Primary</finzly-badge>
<finzly-badge variant="success">Success</finzly-badge>
<finzly-badge variant="warning">Warning</finzly-badge>
<finzly-badge variant="error">Error</finzly-badge>
<finzly-badge variant="info">Info</finzly-badge>
<finzly-badge variant="neutral">Neutral</finzly-badge>`,
    
    softBadges: `<finzly-badge type="soft" variant="primary">Primary</finzly-badge>
<finzly-badge type="soft" variant="success">Success</finzly-badge>
<finzly-badge type="soft" variant="warning">Warning</finzly-badge>
<finzly-badge type="soft" variant="error">Error</finzly-badge>
<finzly-badge type="soft" variant="info">Info</finzly-badge>
<finzly-badge type="soft" variant="neutral">Neutral</finzly-badge>`,
    
    outlineBadges: `<finzly-badge type="outline" variant="primary">Primary</finzly-badge>
<finzly-badge type="outline" variant="success">Success</finzly-badge>
<finzly-badge type="outline" variant="warning">Warning</finzly-badge>
<finzly-badge type="outline" variant="error">Error</finzly-badge>
<finzly-badge type="outline" variant="info">Info</finzly-badge>
<finzly-badge type="outline" variant="neutral">Neutral</finzly-badge>`,
    
    badgeSizes: `<finzly-badge variant="primary" size="sm">Small</finzly-badge>
<finzly-badge variant="primary" size="md">Medium</finzly-badge>
<finzly-badge variant="primary" size="lg">Large</finzly-badge>`,
    
    pillBadges: `<finzly-badge variant="primary" [pill]="true">Pill Badge</finzly-badge>
<finzly-badge variant="success" [pill]="true">Active</finzly-badge>
<finzly-badge variant="warning" [pill]="true">Pending</finzly-badge>
<finzly-badge type="soft" variant="info" [pill]="true">Soft Pill</finzly-badge>
<finzly-badge type="outline" variant="error" [pill]="true">Outline Pill</finzly-badge>`,
    
    dotBadges: `<finzly-badge variant="success" [dot]="true">Online</finzly-badge>
<finzly-badge variant="warning" [dot]="true">Away</finzly-badge>
<finzly-badge variant="error" [dot]="true">Offline</finzly-badge>
<finzly-badge variant="neutral" [dot]="true">Idle</finzly-badge>
<finzly-badge type="soft" variant="success" [dot]="true">Available</finzly-badge>`,
    
    customColors: `<finzly-badge variant="custom" customColor="#f97316">Orange</finzly-badge>
<finzly-badge variant="custom" customColor="#14b8a6">Teal</finzly-badge>
<finzly-badge variant="custom" customColor="#8b5cf6">Purple</finzly-badge>
<finzly-badge variant="custom" customColor="#ec4899">Pink</finzly-badge>
<finzly-badge variant="custom" customColor="#84cc16">Lime</finzly-badge>`,
    
    badgesIcons: `<finzly-badge variant="success" [icon]="checkIcon">Verified</finzly-badge>
<finzly-badge variant="info" [icon]="infoIcon">Info</finzly-badge>
<finzly-badge variant="warning" [icon]="userIcon">User</finzly-badge>
<finzly-badge variant="primary" [icon]="starIcon">Featured</finzly-badge>
<finzly-badge type="soft" variant="success" [icon]="checkIcon">Approved</finzly-badge>`
  };
}


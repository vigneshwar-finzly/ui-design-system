import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinzlyDropdownComponent, DropdownOption } from '../../../../../src/lib/components/finzly-dropdown/finzly-dropdown.component';

interface Section {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [CommonModule, FormsModule, FinzlyDropdownComponent],
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit, OnDestroy {
  activeSection: string = 'simple-dropdown';
  copiedCode: string | null = null;
  private observer?: IntersectionObserver;
  activeTabs: { [key: string]: 'preview' | 'code' } = {};

  sections: Section[] = [
    { id: 'simple-dropdown', title: 'Simple Dropdown', icon: 'arrow_drop_down' },
    { id: 'searchable-dropdown', title: 'Searchable', icon: 'search' },
    { id: 'multi-select-dropdown', title: 'Multi-Select', icon: 'checklist' },
    { id: 'icons-descriptions', title: 'Icons & Descriptions', icon: 'label' },
    { id: 'dropdown-sizes', title: 'Sizes', icon: 'aspect_ratio' },
    { id: 'disabled-states', title: 'Disabled States', icon: 'block' },
    { id: 'error-state', title: 'Error State', icon: 'error' },
    { id: 'form-example', title: 'Form Example', icon: 'description' },
    { id: 'api-reference', title: 'API Reference', icon: 'code' },
    { id: 'key-features', title: 'Key Features', icon: 'star' }
  ];
  // Simple Dropdown
  selectedCountry: string = '';
  countries: DropdownOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' }
  ];

  // Searchable Dropdown
  selectedUser: string = '';
  users: DropdownOption[] = [
    { value: '1', label: 'John Doe', description: 'john.doe&#64;example.com' },
    { value: '2', label: 'Jane Smith', description: 'jane.smith&#64;example.com' },
    { value: '3', label: 'Bob Johnson', description: 'bob.johnson&#64;example.com' },
    { value: '4', label: 'Alice Williams', description: 'alice.w&#64;example.com' },
    { value: '5', label: 'Charlie Brown', description: 'charlie.b&#64;example.com' },
    { value: '6', label: 'Diana Prince', description: 'diana.p&#64;example.com' },
    { value: '7', label: 'Edward Norton', description: 'edward.n&#64;example.com' },
    { value: '8', label: 'Fiona Green', description: 'fiona.g&#64;example.com' }
  ];

  // Multi-Select Dropdown
  selectedTags: string[] = [];
  tags: DropdownOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'scss', label: 'SCSS' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'nodejs', label: 'Node.js' }
  ];

  // Dropdown with Icons
  selectedStatus: string = 'active';
  statuses: DropdownOption[] = [
    { value: 'active', label: 'Active', icon: '🟢', description: 'User is currently active' },
    { value: 'away', label: 'Away', icon: '🟡', description: 'User is away' },
    { value: 'busy', label: 'Busy', icon: '🔴', description: 'User is busy' },
    { value: 'offline', label: 'Offline', icon: '⚫', description: 'User is offline' }
  ];

  // Priority Dropdown
  selectedPriority: string = 'medium';
  priorities: DropdownOption[] = [
    { value: 'critical', label: 'Critical', icon: '🔥' },
    { value: 'high', label: 'High', icon: '⚠️' },
    { value: 'medium', label: 'Medium', icon: '➖' },
    { value: 'low', label: 'Low', icon: '⬇️' },
    { value: 'none', label: 'None', icon: '⚪' }
  ];

  // Disabled Options
  selectedRole: string = '';
  roles: DropdownOption[] = [
    { value: 'admin', label: 'Administrator', description: 'Full system access' },
    { value: 'editor', label: 'Editor', description: 'Can edit content' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
    { value: 'superadmin', label: 'Super Admin', description: 'Reserved role', disabled: true }
  ];

  // Form Example
  formData = {
    country: 'us',
    department: '',
    skills: [] as string[],
    timezone: ''
  };

  departments: DropdownOption[] = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  skills: DropdownOption[] = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'devops', label: 'DevOps' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'testing', label: 'QA Testing' },
    { value: 'management', label: 'Project Management' }
  ];

  timezones: DropdownOption[] = [
    { value: 'EST', label: 'Eastern Time (EST)', description: 'UTC-5' },
    { value: 'CST', label: 'Central Time (CST)', description: 'UTC-6' },
    { value: 'MST', label: 'Mountain Time (MST)', description: 'UTC-7' },
    { value: 'PST', label: 'Pacific Time (PST)', description: 'UTC-8' },
    { value: 'GMT', label: 'Greenwich Mean Time (GMT)', description: 'UTC+0' },
    { value: 'CET', label: 'Central European Time (CET)', description: 'UTC+1' },
    { value: 'JST', label: 'Japan Standard Time (JST)', description: 'UTC+9' }
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

  onSelectionChange(event: any, type: string) {
    console.log(`${type} selection changed:`, event);
  }

  submitForm() {
    console.log('Form submitted:', this.formData);
    alert('Form submitted! Check console for data.');
  }

  // Code examples
  examples = {
    simpleDropdown: `<finzly-dropdown
  [options]="countries"
  [(ngModel)]="selectedCountry"
  placeholder="Choose a country">
</finzly-dropdown>

// TypeScript
countries: DropdownOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  // ...
];`,

    searchableDropdown: `<finzly-dropdown
  [options]="users"
  [(ngModel)]="selectedUser"
  [searchable]="true"
  placeholder="Search users...">
</finzly-dropdown>

// Options with descriptions
users: DropdownOption[] = [
  { 
    value: '1', 
    label: 'John Doe', 
    description: 'john.doe@example.com' 
  },
  // ...
];`,

    multiSelectDropdown: `<finzly-dropdown
  [options]="tags"
  [(ngModel)]="selectedTags"
  [multiSelect]="true"
  [searchable]="true"
  placeholder="Select multiple tags">
</finzly-dropdown>

// Multi-select model
selectedTags: string[] = [];`,

    iconsDescriptions: `// Options with icons
statuses: DropdownOption[] = [
  { 
    value: 'active', 
    label: 'Active', 
    icon: '🟢',
    description: 'User is currently active' 
  },
  // ...
];`,

    dropdownSizes: `<finzly-dropdown size="sm" ...></finzly-dropdown>
<finzly-dropdown size="md" ...></finzly-dropdown>
<finzly-dropdown size="lg" ...></finzly-dropdown>`,

    disabledStates: `// Disabled option
{ value: 'superadmin', label: 'Super Admin', disabled: true }

// Disabled dropdown
<finzly-dropdown [disabled]="true" ...></finzly-dropdown>`,

    errorState: `<finzly-dropdown [error]="true" ...></finzly-dropdown>`
  };
}


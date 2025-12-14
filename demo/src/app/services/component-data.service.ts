import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentDocumentation, CategoryInfo, ComponentCategory } from '../models/component-doc.model';
import { COMPONENT_DOCS_DATA } from '../data/component-docs.data';

@Injectable({
  providedIn: 'root'
})
export class ComponentDataService {
  private componentsSubject = new BehaviorSubject<ComponentDocumentation[]>(COMPONENT_DOCS_DATA);
  public components$: Observable<ComponentDocumentation[]> = this.componentsSubject.asObservable();

  private categories: CategoryInfo[] = [
    {
      id: 'inputs',
      name: 'Inputs',
      description: 'Form input components for data entry',
      icon: 'edit'
    },
    {
      id: 'buttons',
      name: 'Buttons',
      description: 'Interactive button components',
      icon: 'touch_app'
    },
    {
      id: 'pickers',
      name: 'Pickers',
      description: 'Date, time, and selection pickers',
      icon: 'calendar_today'
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'Navigation and routing components',
      icon: 'menu'
    },
    {
      id: 'feedback',
      name: 'Feedback',
      description: 'Alerts, notifications, and user feedback',
      icon: 'notifications'
    },
    {
      id: 'layout',
      name: 'Layout',
      description: 'Container and layout components',
      icon: 'dashboard'
    },
    {
      id: 'data-display',
      name: 'Data Display',
      description: 'Components for displaying data',
      icon: 'view_list'
    }
  ];

  getAllComponents(): ComponentDocumentation[] {
    return this.componentsSubject.value;
  }

  getComponentById(id: string): ComponentDocumentation | undefined {
    return this.componentsSubject.value.find(comp => comp.id === id);
  }

  getComponentsByCategory(category: ComponentCategory): ComponentDocumentation[] {
    return this.componentsSubject.value.filter(comp => comp.category === category);
  }

  getAllCategories(): CategoryInfo[] {
    return this.categories;
  }

  getCategoryInfo(categoryId: ComponentCategory): CategoryInfo | undefined {
    return this.categories.find(cat => cat.id === categoryId);
  }

  getRecentlyViewed(): ComponentDocumentation[] {
    const recentIds = this.getRecentlyViewedIds();
    return recentIds
      .map(id => this.getComponentById(id))
      .filter(comp => comp !== undefined) as ComponentDocumentation[];
  }

  addToRecentlyViewed(componentId: string): void {
    const RECENT_KEY = 'finzly-recent-components';
    const MAX_RECENT = 10;

    let recent = this.getRecentlyViewedIds();
    recent = recent.filter(id => id !== componentId);
    recent.unshift(componentId);
    recent = recent.slice(0, MAX_RECENT);

    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  }

  private getRecentlyViewedIds(): string[] {
    const RECENT_KEY = 'finzly-recent-components';
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}

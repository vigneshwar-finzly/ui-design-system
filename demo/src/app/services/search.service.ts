import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentDocumentation, SearchResult } from '../models/component-doc.model';
import { ComponentDataService } from './component-data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  constructor(private componentDataService: ComponentDataService) {}

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query.toLowerCase().trim());
  }

  search(query: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      return [];
    }

    const components = this.componentDataService.getAllComponents();
    const results: SearchResult[] = [];

    components.forEach(component => {
      if (component.name.toLowerCase().includes(normalizedQuery)) {
        results.push({
          component,
          matchType: 'name',
          matchText: component.name
        });
      } else if (component.description.toLowerCase().includes(normalizedQuery)) {
        results.push({
          component,
          matchType: 'description',
          matchText: this.extractMatchContext(component.description, normalizedQuery)
        });
      } else if (component.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
        const matchingTag = component.tags.find(tag => tag.toLowerCase().includes(normalizedQuery));
        results.push({
          component,
          matchType: 'tag',
          matchText: matchingTag || ''
        });
      } else {
        const matchingProp = component.properties.find(prop =>
          prop.name.toLowerCase().includes(normalizedQuery) ||
          prop.description.toLowerCase().includes(normalizedQuery)
        );
        if (matchingProp) {
          results.push({
            component,
            matchType: 'property',
            matchText: matchingProp.name
          });
        }
      }
    });

    return results;
  }

  searchComponents(query: string): Observable<SearchResult[]> {
    return this.searchQuery$.pipe(
      map(q => this.search(q || query))
    );
  }

  private extractMatchContext(text: string, query: string, contextLength: number = 50): string {
    const index = text.toLowerCase().indexOf(query);
    if (index === -1) return text.substring(0, contextLength) + '...';

    const start = Math.max(0, index - contextLength);
    const end = Math.min(text.length, index + query.length + contextLength);

    let context = text.substring(start, end);
    if (start > 0) context = '...' + context;
    if (end < text.length) context = context + '...';

    return context;
  }
}

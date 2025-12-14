import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { SearchService } from './services/search.service';
import { ComponentDataService } from './services/component-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Finzly Component Library';
  sidebarOpen = true;
  searchQuery = '';
  currentTheme = 'light';
  categories = this.componentDataService.getAllCategories();

  constructor(
    private themeService: ThemeService,
    private searchService: SearchService,
    private componentDataService: ComponentDataService
  ) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    this.searchService.setSearchQuery(query);
  }
}

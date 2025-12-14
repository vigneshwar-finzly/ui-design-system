import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FinzlyToastrComponent } from '@npmswapstech/finzly-theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FinzlyToastrComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Finzly CSS Demo';
  isShowcaseRoute = false;

  constructor(private router: Router) {
    // Check initial route
    this.checkRoute(this.router.url);
    
    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.url);
      });
  }

  private checkRoute(url: string): void {
    this.isShowcaseRoute = url === '/' || url === '/showcase' || url.startsWith('/showcase');
  }
}


import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent)
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./pages/getting-started/getting-started.component').then(m => m.GettingStartedComponent)
  },
  {
    path: 'components',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/components/components-list/components-list.component').then(m => m.ComponentsListComponent)
      },
      {
        path: ':category',
        loadComponent: () => import('./pages/components/category-page/category-page.component').then(m => m.CategoryPageComponent)
      },
      {
        path: ':category/:componentId',
        loadComponent: () => import('./pages/components/component-detail/component-detail.component').then(m => m.ComponentDetailComponent)
      },
      {
        path: ':category/:componentId/showcase',
        loadComponent: () => import('./pages/components/component-showcase/component-showcase.component').then(m => m.ComponentShowcaseComponent)
      }
    ]
  },
  {
    path: 'design-principles',
    loadComponent: () => import('./pages/design-principles/design-principles.component').then(m => m.DesignPrinciplesComponent)
  },
  {
    path: '**',
    redirectTo: 'overview'
  }
];


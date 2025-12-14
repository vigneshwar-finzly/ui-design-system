import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/showcase/showcase.component').then(m => m.ShowcaseComponent)
  },
  {
    path: 'overview',
    loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent)
  },
  {
    path: 'buttons',
    loadComponent: () => import('./pages/buttons/buttons.component').then(m => m.ButtonsComponent)
  },
  {
    path: 'inputs',
    loadComponent: () => import('./pages/inputs/inputs.component').then(m => m.InputsComponent)
  },
  {
    path: 'dropdowns',
    loadComponent: () => import('./pages/dropdowns/dropdowns.component').then(m => m.DropdownsComponent)
  },
  {
    path: 'alerts',
    loadComponent: () => import('./pages/alerts/alerts.component').then(m => m.AlertsComponent)
  },
  {
    path: 'badges',
    loadComponent: () => import('./pages/badges/badges.component').then(m => m.BadgesComponent)
  },
  {
    path: 'dialogs',
    loadComponent: () => import('./pages/dialogs/dialogs.component').then(m => m.DialogsComponent)
  },
  {
    path: 'tooltips',
    loadComponent: () => import('./pages/tooltips/tooltips.component').then(m => m.TooltipsComponent)
  },
  {
    path: 'utilities',
    loadComponent: () => import('./pages/utilities/utilities.component').then(m => m.UtilitiesComponent)
  },
  {
    path: 'finzly-inputs',
    loadComponent: () => import('./pages/finzly-inputs/finzly-inputs.component').then(m => m.FinzlyInputsComponent)
  },
  {
    path: 'finzly-pickers',
    loadComponent: () => import('./pages/finzly-pickers/finzly-pickers.component').then(m => m.FinzlyPickersComponent)
  },
  {
    path: 'finzly-buttons',
    loadComponent: () => import('./pages/finzly-buttons/finzly-buttons.component').then(m => m.FinzlyButtonsComponent)
  },
  {
    path: 'icons',
    loadComponent: () => import('./pages/icons/icons.component').then(m => m.IconsComponent)
  },
  {
    path: 'showcase',
    loadComponent: () => import('./pages/showcase/showcase.component').then(m => m.ShowcaseComponent)
  }
];


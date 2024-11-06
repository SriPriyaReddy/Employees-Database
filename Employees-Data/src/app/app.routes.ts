import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'employees',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'employees',
      },
];

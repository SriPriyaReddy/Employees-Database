import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'employees',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'addEmployee',
        loadComponent: () => import('./modules/add-employee/add-employee.component').then((c) => c.AddEmployeeComponent),
      }, 
      {
        path: 'editEmployee',
        loadComponent: () => import('./modules/add-employee/add-employee.component').then((c) => c.AddEmployeeComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'employees',
      },
];

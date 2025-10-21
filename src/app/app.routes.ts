import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard)},
      { path: 'products', loadChildren: () => import('./features/products/product.routes').then((m) => m.routes) },
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    /* children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component') },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component') },
    ], */
  },
];

import { SettingsComponent } from './settings.component';
import { BranchesComponent } from './pages/branches/branches.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'branches', component: BranchesComponent },
      /* { path: '', loadComponent: () => import('./features/dashboard/dashboard.component') }, */
      /* { path: 'products', loadChildren: () => import('./features/products/products.routes') }, */
    ],
  }
];
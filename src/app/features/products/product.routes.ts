import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';

export const routes: Routes = [
  {
    path: '',
    component: ProductList,
    children: [
      /* { path: '', loadComponent: () => import('./features/dashboard/dashboard.component') }, */
      /* { path: 'products', loadChildren: () => import('./features/products/products.routes') }, */
    ],
  }
];

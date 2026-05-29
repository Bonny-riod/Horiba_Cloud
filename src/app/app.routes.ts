import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'devices', loadComponent: () => import('./pages/devices/devices').then(m => m.DevicesComponent) },
  { path: 'device-detail/:id', loadComponent: () => import('./pages/device-detail/device-detail').then(m => m.DeviceDetailComponent) },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

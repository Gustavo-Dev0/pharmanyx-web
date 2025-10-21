import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  navItems = signal([
    { label: 'Dashboard', icon: 'dashboard', path: '', active: false },
    { label: 'Products', icon: 'inventory_2', path: 'products', active: false },
    { label: 'Inventory', icon: 'inventory', path: 'inventory', active: false },
    { label: 'Sales', icon: 'receipt_long', path: 'sales', active: false },
    { label: 'Reports', icon: 'bar_chart', path: 'reports', active: false },
    { label: 'Settings', icon: 'settings', path: 'settings', active: false },
  ]);

}

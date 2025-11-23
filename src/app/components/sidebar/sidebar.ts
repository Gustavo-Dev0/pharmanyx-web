import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  icon: string;
  path?: string;
  active?: boolean;
  expanded?: boolean;
  subItems?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  navItems = signal<NavItem[]>([
    { label: 'Dashboard', icon: 'dashboard', path: '', active: false },
    { label: 'Products', icon: 'inventory_2', path: 'products', active: false },
    { label: 'Inventory', icon: 'inventory', path: 'inventory', active: false },
    { label: 'Sales', icon: 'receipt_long', path: 'sales', active: false },
    { label: 'Reports', icon: 'bar_chart', path: 'reports', active: false },
    {
      label: 'Settings',
      icon: 'settings',
      path: 'settings',
      expanded: false,
      subItems: [
        { label: 'Branches', icon: 'store', path: 'settings/branches' },
        // Add more settings submenus here
      ]
    },
  ]);

  toggleSubmenu(item: NavItem) {
    if (item.subItems && item.subItems.length > 0) {
      item.expanded = !item.expanded;
      this.navItems.set([...this.navItems()]);
    }
  }
}

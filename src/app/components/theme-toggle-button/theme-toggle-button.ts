import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle-button',
  imports: [],
  templateUrl: './theme-toggle-button.html',
  styleUrl: './theme-toggle-button.css'
})
export class ThemeToggleButton {
  isDark: boolean = false;

  constructor() {
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

}

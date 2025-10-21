import { Component } from '@angular/core';
import { ThemeToggleButton } from "../theme-toggle-button/theme-toggle-button";

@Component({
  selector: 'app-header',
  imports: [ThemeToggleButton],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}

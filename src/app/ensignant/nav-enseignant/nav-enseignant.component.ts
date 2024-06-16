import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-nav-enseignant',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-enseignant.component.html',
  styleUrl: './nav-enseignant.component.css'
})
export class NavEnseignantComponent {

  logout() {

  }
}

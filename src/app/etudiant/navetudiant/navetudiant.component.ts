import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navetudiant',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navetudiant.component.html',
  styleUrl: './navetudiant.component.css'
})
export class NavetudiantComponent {

  logout() {

  }
}

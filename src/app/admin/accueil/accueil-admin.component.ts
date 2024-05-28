import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-accueil',
  standalone: true,
    imports: [
        NavComponent
    ],
  templateUrl: './accueil-admin.component.html',
  styleUrl: './accueil-admin.component.css'
})
export class AccueilAdminComponent {

  protected readonly sessionStorage = sessionStorage;
}

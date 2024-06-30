import { Component } from '@angular/core';
import {NavetudiantComponent} from "../navetudiant/navetudiant.component";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NavetudiantComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilEtudiantComponent {

  protected readonly sessionStorage = sessionStorage;
}

import { Component } from '@angular/core';
import {NavComponent} from "../../admin/nav/nav.component";
import {NavEnseignantComponent} from "../nav-enseignant/nav-enseignant.component";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    NavComponent,
    NavEnseignantComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilEnseignantComponent {

  protected readonly sessionStorage = sessionStorage;
}

export class AccueilComponent {
}

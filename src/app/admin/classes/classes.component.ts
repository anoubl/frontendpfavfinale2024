// classes.component.ts

import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NavComponent} from "../nav/nav.component";

interface Classe {
  anneeUniversitaire: string;
  niveau: string;
  specialite: string;
  nombreGroupes: number;
}

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NavComponent
  ],
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  classes: Classe[] = [];
  anneeSelectionnee: string = '';
  nouvelleClasse: Classe = {
    anneeUniversitaire: '',
    niveau: '',
    specialite: '',
    nombreGroupes: 0
  };

  anneesUniversitaires: string[] = ['2023-2024', '2024-2025', '2025-2026']; // Exemple de valeurs

  ajouterClasse() {
    this.classes.push({ ...this.nouvelleClasse });
    this.nouvelleClasse = {
      anneeUniversitaire: '',
      niveau: '',
      specialite: '',
      nombreGroupes: 0
    };
  }

  filtrerClasses() {
    // Simuler une récupération des classes par année universitaire depuis un service ou une liste existante
    this.classes = [
      { anneeUniversitaire: '2023-2024', niveau: 'Licence 1', specialite: 'Informatique', nombreGroupes: 2 },
      { anneeUniversitaire: '2023-2024', niveau: 'Master 1', specialite: 'Gestion', nombreGroupes: 3 },
      { anneeUniversitaire: '2024-2025', niveau: 'Licence 1', specialite: 'Informatique', nombreGroupes: 2 }
      // Ajoutez d'autres classes selon vos besoins
    ].filter(classe => classe.anneeUniversitaire === this.anneeSelectionnee);
  }
}

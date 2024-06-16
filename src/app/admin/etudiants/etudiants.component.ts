import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

interface Etudiant {
  matricule: string;
  prenom: string;
  nom: string;
  email: string;
}

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  standalone: true,
  imports: [
    NavComponent,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent {
  etudiants: Etudiant[] = [];
  nouveauEtudiant: Etudiant = {
    matricule: '',
    prenom: '',
    nom: '',
    email: ''
  };
  etudiantSelectionne: Etudiant | null = null;

  constructor() {
    // Initialisation avec des données d'exemple
    this.etudiants = [
      { matricule: '12345', prenom: 'Jean', nom: 'Dupont', email: 'jean.dupont@example.com' },
      { matricule: '67890', prenom: 'Alice', nom: 'Martin', email: 'alice.martin@example.com' }
    ];
  }

  ajouterEtudiant(): void {
    this.etudiants.push({ ...this.nouveauEtudiant });
    this.nouveauEtudiant = {
      matricule: '',
      prenom: '',
      nom: '',
      email: ''
    };
  }

  selectionnerEtudiant(etudiant: Etudiant): void {
    this.etudiantSelectionne = { ...etudiant };
  }
}

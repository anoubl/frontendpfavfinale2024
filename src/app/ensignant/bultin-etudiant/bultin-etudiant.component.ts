import { Component } from '@angular/core';
import {NavEnseignantComponent} from "../nav-enseignant/nav-enseignant.component";
import {FormsModule} from "@angular/forms";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-saisie-notes',
  templateUrl: './bultin-etudiant.component.html',
  standalone: true,
  imports: [
    NavEnseignantComponent,
    FormsModule,
    NgForOf,
    NgIf,
    DecimalPipe
  ],
  styleUrls: ['./bultin-etudiant.component.css']
})
export class SaisieNotesComponent {
  semestre = 'S1';
  matiere = '';
  classe = '';
  groupe = '';
  tableVisible = false;

  optionsMatiere = [];
  optionsClasse = [];
  optionsGroupe = [];

  allOptionsMatiere = {
    S1: ['math'],
    S2: ['math', 'physique'],
    S3: ['chimie'],
    S4: ['math', 'physique', 'chimie']
  };

  allOptionsClasse = {
    math: ['classe1', 'classe2'],
    physique: ['classe2', 'classe3'],
    chimie: ['classe3', 'classe1']
  };

  allOptionsGroupe = {
    classe1: ['groupe1', 'groupe2'],
    classe2: ['groupe2', 'groupe3'],
    classe3: ['groupe1', 'groupe3']
  };

  etudiants = [
    { nom: 'Dupont', prenom: 'Jean', tp: '', projet: '', controle1: '', controle2: '', moyenne: 0 },
    { nom: 'Martin', prenom: 'Marie', tp: '', projet: '', controle1: '', controle2: '', moyenne: 0 },
    { nom: 'Durand', prenom: 'Paul', tp: '', projet: '', controle1: '', controle2: '', moyenne: 0 }
  ];

  constructor() {
    this.updateMatiereOptions();
  }

  updateMatiereOptions() {
    // @ts-ignore
    this.optionsMatiere = this.allOptionsMatiere[this.semestre] || [];
    this.matiere = this.optionsMatiere[0];
    this.updateClasseOptions();
  }

  updateClasseOptions() {
    // @ts-ignore
    this.optionsClasse = this.allOptionsClasse[this.matiere] || [];
    this.classe = this.optionsClasse[0];
    this.updateGroupeOptions();
  }

  updateGroupeOptions() {
    // @ts-ignore
    this.optionsGroupe = this.allOptionsGroupe[this.classe] || [];
    this.groupe = this.optionsGroupe[0];
  }

  selectionner() {
    this.tableVisible = true;
  }

  calculerMoyenne(etudiant: any) {
    const tp = parseFloat(etudiant.tp) || 0;
    const projet = parseFloat(etudiant.projet) || 0;
    const controle1 = parseFloat(etudiant.controle1) || 0;
    const controle2 = parseFloat(etudiant.controle2) || 0;
    etudiant.moyenne = Number(((tp + projet + controle1 + controle2) / 4).toFixed(2));
  }

  enregistrer() {
    // Placeholder pour envoyer les données au serveur ou les enregistrer localement.
    alert('Les notes ont été enregistrées avec succès.');
  }
}

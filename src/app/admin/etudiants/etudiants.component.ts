import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import axios from 'axios';
import {baseUrl} from "../../../main";

interface Etudiant {
  matricule: string;
  prenom: string;
  nom: string;
  email: string;
  password ?:String ;
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
export class EtudiantsComponent implements OnInit {
  etudiants: Etudiant[] = [];
  nouveauEtudiant: Etudiant = {
    matricule: '',
    prenom: '',
    nom: '',
    email: '',
    password : ''
  };
  etudiantSelectionne: Etudiant | null = null;

  ngOnInit(): void {
    this.fetchEtudiants();
  }

  private async fetchEtudiants(): Promise<void> {
    try {
      const response = await axios.get<Etudiant[]>(`${baseUrl}/Utilisateurs/students`);
      this.etudiants = response.data;
    } catch (error) {
      console.error('Error fetching etudiants:', error);
      // Handle error (e.g., display an error message to the user)
    }
  }

  async ajouterEtudiant(): Promise<void> {
    try {
      const response = await axios.post<Etudiant>(`${baseUrl}/Utilisateurs/etudiant`, this.nouveauEtudiant);
      this.etudiants.push(response.data);
      this.nouveauEtudiant = {
        matricule: '',
        prenom: '',
        nom: '',
        email: ''
      };
    } catch (error) {
      console.error('Error adding etudiant:', error);
      // Handle error (e.g., display an error message to the user)
    }
  }

  selectionnerEtudiant(etudiant: Etudiant): void {
    this.etudiantSelectionne = { ...etudiant };
  }
}

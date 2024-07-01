import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { NavComponent } from "../nav/nav.component";
import { FormsModule } from "@angular/forms";
import { baseUrl } from "../../../main";
import { NgClass, NgForOf, NgIf } from "@angular/common";

interface Etudiant {
  prenom :String;
  nom: string;
  id: number;
}

@Component({
  selector: 'app-etu-class',
  templateUrl: './etu-class.component.html',
  standalone: true,
  imports: [
    NavComponent,
    FormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  styleUrls: ['./etu-class.component.css']
})
export class EtuClassComponent implements OnInit {
  annee: string = ''; // Initialiser avec la valeur appropriée
  selectedGroupe: number = 0; // Initialiser avec la valeur par défaut
  groupes: any[] = []; // Remplacez par vos données de groupes
  etudiants: Etudiant[] = [];
  allEtudiants: Etudiant[] = []; // Liste de tous les étudiants
  classId: number = 0; // Propriété pour stocker l'ID de la classe
  showModal: boolean = false;
  selectedEtudiant: number = 0; // ID de l'étudiant sélectionné

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.classId = +params['id']; // Convertissez l'ID en nombre
      this.getGroupData(this.classId);
    });
  }

  async getGroupData(classId: number): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/groupes/classeWithGroupe/${classId}`);
      this.groupes = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du groupe :', error);
    }
  }

  async afficherListeEtudiants(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/groupes/groupeWithStudents/${this.selectedGroupe}`);
      this.etudiants = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  }

  async afficherModalAjouterEtudiant(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/Utilisateurs/students`);
      this.allEtudiants = response.data;
      this.showModal = true;
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des étudiants :', error);
    }
  }

  async enregistrerEtudiant(): Promise<void> {
    try {
      await axios.post(`${baseUrl}/groupes/${this.selectedEtudiant}/${this.selectedGroupe}`
      );
      this.showModal = false;
      this.afficherListeEtudiants(); // Mettre à jour la liste des étudiants
    } catch (error) {
      console.error('Erreur lors de l\'affectation de l\'étudiant :', error);
    }
  }
}

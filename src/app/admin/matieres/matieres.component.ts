import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {NgForOf, NgIf} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
import {FormsModule} from "@angular/forms";
import {baseUrl} from "../../../main";

// Définition de l'interface Matiere
interface Matiere {
  code: string;
  label: string;
}

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  standalone: true,
  imports: [
    NgIf,
    NavComponent,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {

  matieres: Matiere[] = []; // Tableau pour stocker les matières récupérées depuis l'API
  nouvelleMatiere: Matiere = { code: '', label: '' }; // Modèle pour une nouvelle matière
  notification: { type: string, message: string } | null = null; // Notification

  constructor() { }

  ngOnInit(): void {
    // Au chargement du composant, récupérer la liste des matières depuis l'API
    this.fetchMatieres();
  }

  fetchMatieres() {
    axios.get<Matiere[]>(`${baseUrl}/matieres`)
      .then(response => {
        this.matieres = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des matières', error);
        this.showNotification('danger', 'Erreur lors de la récupération des matières.');
      });
  }

  ajouterMatiere() {
    if (this.nouvelleMatiere.code && this.nouvelleMatiere.label) {
      axios.post<Matiere>(`${baseUrl}/matieres`, this.nouvelleMatiere)
        .then(response => {
          this.matieres.push(response.data); // Ajouter la nouvelle matière à la liste affichée
          this.nouvelleMatiere = { code: '', label: '' }; // Réinitialiser le modèle de nouvelle matière
          this.showNotification('success', 'Matière ajoutée avec succès.');
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la matière', error);
          this.showNotification('danger', 'Erreur lors de l\'ajout de la matière.');
        });
    }
  }

  // Méthode pour afficher une notification
  showNotification(type: string, message: string) {
    this.notification = { type, message };
    setTimeout(() => {
      this.notification = null;
    }, 3000); // Masquer la notification après 3 secondes
  }

}

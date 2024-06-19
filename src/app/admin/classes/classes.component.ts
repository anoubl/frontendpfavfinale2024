import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { NavComponent } from "../nav/nav.component";
import axios from 'axios';
import { baseUrl } from "../../../main";

interface Classe {
  annee: string;
  niveau: string;
  specialite: string;
  groupes: number;
}

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NavComponent
  ],
})
export class ClassesComponent implements OnInit {
  classes: Classe[] = [];
  anneeSelectionnee: string = '';
  nouvellesClasses: Classe[] = [];
  notification: { message: string, type: string } | null = null;

  anneesUniversitaires: string[] = ['2021', '2022', '2023', '2024', '2025'];

  constructor(private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.ajouterNouvelleClasse();  // Initialise la liste de nouvelles classes
  }

  // Récupère les classes pour l'année sélectionnée
  private async fetchClasses(): Promise<void> {
    if (!this.anneeSelectionnee) return;
    try {
      const response = await axios.get<Classe[]>(`${baseUrl}/classes/annee/${this.anneeSelectionnee}`);
      this.classes = response.data;
    } catch (error) {
      this.showNotification('Erreur lors de la récupération des classes', 'danger');
    }
  }

  // Ajoute toutes les classes de la liste nouvellesClasses
  async ajouterClasses(): Promise<void> {
    try {
      for (let classe of this.nouvellesClasses) {
        classe.annee = this.anneeSelectionnee;
        const response = await axios.post<Classe>(`${baseUrl}/classes`, classe);
        this.classes.push(response.data);
      }
      this.showNotification('Classes ajoutées avec succès', 'success');
      this.nouvellesClasses = [];  // Réinitialise la liste des nouvelles classes
      this.ajouterNouvelleClasse();  // Ajoute une nouvelle classe vide
    } catch (error) {
      this.showNotification('Erreur lors de l\'ajout des classes', 'danger');
    }
  }

  // Ajoute une nouvelle classe vide à la liste nouvellesClasses
  ajouterNouvelleClasse() {
    this.nouvellesClasses.push({
      annee: this.anneeSelectionnee,
      niveau: '',
      specialite: '',
      groupes: 0
    });
  }

  // Appelée lors du changement de l'année sélectionnée
  onAnneeChange(): void {
    this.fetchClasses();
  }

  // Affiche une notification avec un message et un type
  showNotification(message: string, type: string) {
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  // Méthode pour naviguer vers une autre route
  redirectToAnotherRoute(): void {
    this.router.navigate(['/etu-class']); // Replace '/other-route' with your desired route path
  }

  protected readonly parseInt = parseInt;  // Permet de convertir les chaînes en nombres
}

import { Component, OnInit } from '@angular/core';
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

interface AnneeResponse {
  annee: string;
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
  nouvelleClasse: Classe = {
    annee: '',  // Initialement vide
    niveau: '',
    specialite: '',
    groupes: 0
  };

  anneesUniversitaires: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchAnnees();
  }

  private async fetchAnnees(): Promise<void> {
    try {
      const response = await axios.get<AnneeResponse[]>(`${baseUrl}/classes/listeAnnees`);
      this.anneesUniversitaires = response.data.map(element => element.annee);
      console.log(this.anneesUniversitaires);
    } catch (error) {
      console.error('Error fetching annees:', error);
    }
  }

  private async fetchClasses(): Promise<void> {
    if (!this.anneeSelectionnee) return;
    try {
      const response = await axios.get<Classe[]>(`${baseUrl}/classes/annee/${this.anneeSelectionnee}`);
      this.classes = response.data;
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  }

  async ajouterClasse(): Promise<void> {
    try {
      // Assurez-vous que nouvelleClasse.année est mise à jour avec anneeSelectionnee actuel
      this.nouvelleClasse.annee = this.anneeSelectionnee;

      const response = await axios.post<Classe>(`${baseUrl}/classes`, this.nouvelleClasse);
      this.classes.push(response.data);

      // Réinitialiser nouvelleClasse après l'ajout
      this.nouvelleClasse = {
        annee: this.anneeSelectionnee, // Mettre à jour avec l'année sélectionnée
        niveau: '',
        specialite: '',
        groupes: 0
      };
    } catch (error) {
      console.error('Error adding class:', error);
    }
  }

  onAnneeChange(): void {
    this.fetchClasses();
  }

  protected readonly parseInt = parseInt;
}

import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import axios from 'axios';
import { baseUrl } from "../../../main";

interface Etudiant {
  matricule: string;
  prenom: string;
  nom: string;
  email: string;
  password?: string;
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
  nouveauxEtudiants: Etudiant[] = [{
    matricule: '',
    prenom: '',
    nom: '',
    email: '',
    password: ''
  }];
  etudiantSelectionne: Etudiant | null = null;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.fetchEtudiants();
  }

  private async fetchEtudiants(): Promise<void> {
    try {
      const response = await axios.get<Etudiant[]>(`${baseUrl}/Utilisateurs/students`);
      this.etudiants = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  }

  async ajouterEtudiants(): Promise<void> {
    try {
      for (const etudiant of this.nouveauxEtudiants) {
        const response = await axios.post<Etudiant>(`${baseUrl}/Utilisateurs/etudiant`, etudiant);
        this.etudiants.push(response.data);
      }
      this.nouveauxEtudiants = [{
        matricule: '',
        prenom: '',
        nom: '',
        email: '',
        password: ''
      }];
      this.showNotification('Étudiants ajoutés avec succès', 'success');
    } catch (error) {
      console.error('Erreur lors de l\'ajout des étudiants :', error);
      this.showNotification('Erreur lors de l\'ajout des étudiants', 'danger');
    }
  }

  ajouterNouveauEtudiant(): void {
    this.nouveauxEtudiants.push({
      matricule: '',
      prenom: '',
      nom: '',
      email: '',
      password: ''
    });
  }

  supprimerEtudiant(index: number): void {
    this.nouveauxEtudiants.splice(index, 1);
  }

  selectionnerEtudiant(etudiant: Etudiant): void {
    this.etudiantSelectionne = { ...etudiant };
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async uploadCsv(event: Event): Promise<void> {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        await axios.post(`${baseUrl}/Utilisateurs/upload-csv`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.fetchEtudiants(); // Refresh the list of students after successful upload
        this.showNotification('Fichier CSV uploadé avec succès', 'success');
      } catch (error) {
        console.error('Erreur lors de l\'upload du fichier CSV :', error);
        this.showNotification('Erreur lors de l\'upload du fichier CSV', 'danger');
      }
    } else {
      this.showNotification('Veuillez sélectionner un fichier CSV', 'warning');
    }
  }

  showNotification(message: string, type: string): void {
    // Implement notification display logic here (e.g., using a toast library)
    console.log(`Notification: ${message} (${type})`);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { NavComponent } from "../nav/nav.component";
import axios from 'axios';
import { baseUrl } from "../../../main";

interface Enseignant {
  prenom: string;
  nom: string;
  email: string;
}

@Component({
  selector: 'app-add-enseignant',
  templateUrl: './add-enseignant.component.html',
  styleUrls: ['./add-enseignant.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NavComponent
  ],
})
export class AddEnseignantComponent implements OnInit {
  enseignants: Enseignant[] = [];
  nouveauxEnseignants: Enseignant[] = [];
  data : any ;
  form: FormGroup;
  notification: { message: string, type: string } | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.ajouterNouvelEnseignant();  // Initialise la liste de nouveaux enseignants
    this.fetchEnseignants(); // Récupérer les enseignants existants au démarrage
  }

  async fetchEnseignants(): Promise<void> {
    try {
      const response = await axios.get<Enseignant[]>(`${baseUrl}/Utilisateurs/profs`);
      this.enseignants = response.data;
    } catch (error) {
      this.showNotification('Erreur lors de la récupération des enseignants', 'danger');
    }
  }

  async ajouterEnseignants(): Promise<void> {
    try {
      for (let enseignant of this.nouveauxEnseignants) {
        const response = await axios.post<Enseignant>(`${baseUrl}/Utilisateurs/enseignant`, enseignant);
        this.enseignants.push(response.data);
      }
      this.showNotification('Enseignants ajoutés avec succès', 'success');
      this.nouveauxEnseignants = [];  // Réinitialise la liste des nouveaux enseignants
      this.ajouterNouvelEnseignant();  // Ajoute un nouvel enseignant vide
    } catch (error) {
      this.showNotification('Erreur lors de l\'ajout des enseignants', 'danger');
    }
  }

  ajouterNouvelEnseignant() {
    this.nouveauxEnseignants.push({
      prenom: '',
      nom: '',
      email: ''
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.nouveauxEnseignants.push(this.form.value);
      this.form.reset();
    } else {
      this.showNotification('Veuillez remplir tous les champs correctement', 'danger');
    }
  }

  showNotification(message: string, type: string) {
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
}

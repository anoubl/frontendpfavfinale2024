import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavComponent } from "../nav/nav.component";
import { NgForOf } from "@angular/common";
import axios from 'axios';
import {baseUrl} from "../../../main";

interface Enseignant {
  prenom: string;
  nom: string;
  email: string;
  fullName ? : String ;

}

interface addEnseignant {
  prenom: string;
  nom: string;
  email: string;
  password ? : String ;

}
@Component({
  selector: 'app-add-enseignant',
  templateUrl: './add-enseignant.component.html',
  standalone: true,
  imports: [
    NavComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./add-enseignant.component.css']
})
export class AddEnseignantComponent implements OnInit {
  enseignants: Enseignant[] = []; // Initialize with an empty array
  form: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.fetchEnseignants();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private async fetchEnseignants(): Promise<void> {
    try {
      const response = await axios.get<Enseignant[]>(`${baseUrl}/Utilisateurs/profs`);
      this.enseignants = response.data;
    } catch (error) {
      console.error('Error fetching enseignants:', error);
      this.snackBar.open('Erreur lors de la récupération des enseignants', 'Fermer', {
        duration: 3000
      });
    }
  }

  async onSubmit(): Promise<void> {
    const enseignant: addEnseignant = {
      prenom: this.form.value.prenom,
      nom: this.form.value.nom,
      email: this.form.value.email,
      password : ''
    };

    try {
      const response = await axios.post(`${baseUrl}/Utilisateurs/enseignant`, enseignant);
      if (response.status === 200) {
        this.enseignants.push(response.data)

        this.snackBar.open(`Enseignant ${enseignant.prenom} ajouté avec succès`, 'Fermer', {
          duration: 3000
        });

        this.form.reset();
      } else {
        throw new Error('Failed to add enseignant');
      }
    } catch (error) {
      console.error('Error adding enseignant:', error);
      this.snackBar.open('Erreur lors de l\'ajout de l\'enseignant', 'Fermer', {
        duration: 3000
      });
    }
  }
}

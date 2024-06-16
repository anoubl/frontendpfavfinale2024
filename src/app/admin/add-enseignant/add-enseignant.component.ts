import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NavComponent} from "../nav/nav.component";
import {NgForOf} from "@angular/common";

interface Enseignant {
  prenom: string;
  nom: string;
  email: string;
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
export class AddEnseignantComponent {
  enseignants: Enseignant[] = [
    { prenom: 'Jean', nom: 'Dupont', email: 'jean.dupont@example.com' },
    { prenom: 'Marie', nom: 'Lefevre', email: 'marie.lefevre@example.com' },
    { prenom: 'Pierre', nom: 'Martin', email: 'pierre.martin@example.com' }
  ]; // Array initialized with static enseignant data

  form: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {


    const enseignant: Enseignant = {
      prenom: this.form.value.prenom,
      nom: this.form.value.nom,
      email: this.form.value.email
    };

    // Normally, you would add this teacher to a database or make an API call to save them
    this.enseignants.push(enseignant);

    // Show success message using MatSnackBar (or any other method you prefer)
    this.snackBar.open(`Enseignant ${enseignant.prenom} ajouté avec succès`, 'Fermer', {
      duration: 3000
    });

    // Reset the form after submission
    this.form.reset();
  }
}

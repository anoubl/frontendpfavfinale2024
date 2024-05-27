import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavComponent } from "../nav/nav.component";
import { NgForOf } from "@angular/common";
import axios from 'axios';
import {baseUrl} from "../../../main"; // Import Axios

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavComponent,
    NgForOf
  ],
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent {
  form: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.createForm();
    this.addUser(); // Initialize with one user form group
  }

  private createForm(): FormGroup {
    return this.fb.group({
      users: this.fb.array([])
    });
  }

  get users(): FormArray {
    return this.form.get('users') as FormArray;
  }

  private createUserGroup(): FormGroup {
    return this.fb.group({
      matricule: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addUser(): void {
    this.users.push(this.createUserGroup());
  }

  removeUser(index: number): void {
    this.users.removeAt(index);
  }

  async onSubmit(): Promise<void> {
    if (this.submitting) return;
    this.submitting = true;

    try {
      const uniqueUsers = this.getUniqueUsers(this.users.controls);

      for (const user of uniqueUsers) {
        // Generate a password for the user
        user.password = this.generatePassword();

        await axios.post(baseUrl+'/Utilisateurs/etudiant', user)
          .then(response => {
            this.snackBar.open(`Étudiant ${user.prenom} ajouté avec succès`, 'Fermer', {
              duration: 3000
            });
          })
          .catch(error => {
            console.error('Error submitting user:', error);
            this.snackBar.open(`Erreur lors de l'ajout de l'étudiant ${user.prenom}`, 'Fermer', {
              duration: 3000
            });
          });
      }
    } finally {
      this.submitting = false;
    }
  }

  private generatePassword(): string {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  private getUniqueUsers(userControls: any[]): any[] {
    const seen = new Set();
    return userControls
      .map(control => control.value)
      .filter(user => {
        const duplicate = seen.has(user.email);
        seen.add(user.email);
        return !duplicate;
      });
  }
}

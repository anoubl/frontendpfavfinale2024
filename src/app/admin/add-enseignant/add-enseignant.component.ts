import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForOf } from '@angular/common';
import axios from 'axios';
import { NavComponent } from '../nav/nav.component';
import { baseUrl } from '../../../main';

@Component({
  selector: 'app-add-enseignant',
  standalone: true,
  imports: [
    NavComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './add-enseignant.component.html',
  styleUrls: ['./add-enseignant.component.css']
})
export class AddEnseignantComponent {
  form: FormGroup;
  submitting = false; // Flag to prevent multiple submissions

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

  private generatePassword(): string {
    // Generate a simple password. You can replace this with more complex logic if needed.
    return Math.random().toString(36).slice(-8);
  }

  async onSubmit(): Promise<void> {
    if (this.submitting) return; // Prevent multiple submissions
    this.submitting = true;

    try {
      const userControls = this.users.controls;
      const uniqueUsers = this.getUniqueUsers(userControls);

      const promises = uniqueUsers.map(async (data) => {
        const response = await axios.post(`${baseUrl}/Utilisateurs/enseignant`, {
          prenom: data.prenom,
          nom: data.nom,
          password: this.generatePassword(),
          email: data.email
        });
        this.snackBar.open(`Enseignant ${data.prenom} ajouté avec succès`, 'Fermer', {
          duration: 3000
        });
        console.log(response.data);
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Error adding enseignant:', error);
      this.snackBar.open('Erreur lors de l\'ajout de l\'enseignant', 'Fermer', {
        duration: 3000
      });
    } finally {
      this.submitting = false; // Reset the flag after submission
    }
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

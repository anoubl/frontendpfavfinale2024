import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { NgForOf, NgIf } from '@angular/common';
import axios from "axios";
import { baseUrl } from "../../../main";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  form: FormGroup;
  anneeUniversitaireSelected: boolean[] = [];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      classes: this.fb.array([])
    });

    this.addClass(); // Initialize with one class form group
  }

  get classes(): FormArray {
    return this.form.get('classes') as FormArray;
  }

  addClass(): void {
    const classFormGroup = this.fb.group({
      annee: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      groupes: ['', Validators.required]
    });
    this.classes.push(classFormGroup);
    this.anneeUniversitaireSelected.push(false); // Initialize the selected state for this class
  }

  removeClass(index: number): void {
    this.classes.removeAt(index);
    this.anneeUniversitaireSelected.splice(index, 1); // Remove the selected state for this class
  }

  selectAnneeUniversitaire(index: number): void {
    const anneeUniversitaireControl = this.classes.at(index).get('anneeUniversitaire');
    if (anneeUniversitaireControl && anneeUniversitaireControl.valid) {
      this.anneeUniversitaireSelected[index] = true;
    }
  }

  onSubmit(): void {
    console.log(this.form.value);

    this.classes.controls.forEach((classe) => {
      axios.post(`${baseUrl}/classes`, classe.value)
        .then((res) => {
          console.log(res);
          this.snackBar.open('Classe ajoutée avec succès', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
          });
        })
        .catch((err) => {
          console.log(err);
          this.snackBar.open('Erreur lors de l\'ajout de la classe', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
          });
        });
    });
  }
}

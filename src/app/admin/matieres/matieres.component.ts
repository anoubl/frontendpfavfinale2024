import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications
import { NgForOf } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import axios from 'axios';
import {baseUrl} from "../../../main"; // Axios for HTTP requests

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NavComponent,
     // Ensure MatSnackBar is included in standalone components
  ]
})
export class MatieresComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      matieres: this.fb.array([])
    });
    this.addMatiere();
  }

  get matieres(): FormArray {
    return this.form.get('matieres') as FormArray;
  }

  addMatiere(): void {
    const matiereFormGroup = this.fb.group({
      code: ['', Validators.required],
      label: ['', Validators.required]
    });
    this.matieres.push(matiereFormGroup);
  }

  removeMatiere(index: number): void {
    this.matieres.removeAt(index);
  }

  onSubmit(): void {
    this.matieres.controls.forEach((matiere, index) => {
      axios.post(baseUrl+'/matieres', matiere.value)
        .then(response => {
          this.snackBar.open(`Submission successful for Matiere ${index + 1}`, 'Close', { duration: 3000 });
        })
        .catch(error => {
          this.snackBar.open(`Failed to submit Matiere ${index + 1}: ${error.message}`, 'Close', { duration: 3000 });
        });
    });
  }
}

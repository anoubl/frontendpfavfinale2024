import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import { NgForOf } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NavComponent
  ]
})
export class MatieresComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      matieres: this.fb.array([])
    });

    this.addMatiere(); // Initialize with one matiere form group
  }

  get matieres(): FormArray {
    return this.form.get('matieres') as FormArray;
  }

  addMatiere(): void {
    const matiereFormGroup = this.fb.group({
      code: ['', Validators.required],
      intitule: ['', Validators.required]
    });
    this.matieres.push(matiereFormGroup);
  }

  removeMatiere(index: number): void {
    this.matieres.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);
    // Handle the form submission logic here
  }
}

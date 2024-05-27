import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import {NgForOf, NgIf} from '@angular/common';

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

  constructor(private fb: FormBuilder) {
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
      anneeUniversitaire: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      groupe: ['', Validators.required]
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
    // Handle the form submission logic here
  }
}

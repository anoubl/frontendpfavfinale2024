import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import {NgForOf} from "@angular/common"; // Import du composant de navigation

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavComponent,
    NgForOf
  ],
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  form: FormGroup;
  students: any[] = [
    { id: 1, matricule: '001', nom: 'Doe', prenom: 'John' },
    { id: 2, matricule: '002', nom: 'Smith', prenom: 'Alice' },
    { id: 3, matricule: '003', nom: 'Johnson', prenom: 'Bob' }
    // Add more student objects as needed
  ];

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
      groupe: ['', Validators.required],
      student: [''] // Ajout du champ student dans le formulaire
    });
    this.classes.push(classFormGroup);
  }

  removeClass(index: number): void {
    this.classes.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);
    // Handle the form submission logic here
  }
}

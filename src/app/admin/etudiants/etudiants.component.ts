import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {NavComponent} from "../nav/nav.component";
import {NgForOf} from "@angular/common";

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
export class EtudiantsComponent  {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      users: this.fb.array([])
    });

    this.addUser(); // Initialize with one user form group
  }

  get users(): FormArray {
    return this.form.get('users') as FormArray;
  }

  addUser(): void {
    const userFormGroup = this.fb.group({
      matricule: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.users.push(userFormGroup);
  }

  removeUser(index: number): void {
    this.users.removeAt(index);
  }

  onSubmit(): void {

      console.log(this.form.value);
      // Handle the form submission logic here

  }
}

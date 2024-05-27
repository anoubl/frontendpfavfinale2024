import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-add-enseignant',
  standalone: true,
  imports: [
    NavComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './add-enseignant.component.html',
  styleUrl: './add-enseignant.component.css'
})
export class AddEnseignantComponent {
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

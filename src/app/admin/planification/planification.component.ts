import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NavComponent,
    NgIf
  ]
})
export class PlanificationComponent {
  form: FormGroup;
  groupSelected = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      semestre: ['', Validators.required],
      classe: ['', Validators.required],
      groupe: ['', Validators.required],
      details: this.fb.array([])
    });
  }

  get details(): FormArray {
    return this.form.get('details') as FormArray;
  }

  addDetail(): void {
    const detailFormGroup = this.fb.group({
      matiere: ['', Validators.required],
      enseignant: ['', Validators.required]
    });
    this.details.push(detailFormGroup);
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

  selectGroup(): void {
    if (this.form.controls['semestre'].valid && this.form.controls['classe'].valid && this.form.controls['groupe'].valid) {
      this.groupSelected = true;
      if (this.details.length === 0) {
        this.addDetail(); // Initialize with one detail form group if none exist
      }
    } else {
      this.groupSelected = false;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // Handle the form submission logic here
    } else {
      console.error('Form is invalid');
    }
  }
}

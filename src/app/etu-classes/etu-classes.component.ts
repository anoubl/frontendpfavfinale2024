import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavComponent} from "../admin/nav/nav.component";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-etu-classes',
  templateUrl: './etu-classes.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavComponent,
    NgForOf
  ],
  styleUrls: ['./etu-classes.component.css']
})
export class EtuClassesComponent {
  form: FormGroup;
  classes: any[] = [
    { anneeUniversitaire: '2023/2024', niveau: '1', specialite: 'IIR', groupe: '1' },
    { anneeUniversitaire: '2023/2024', niveau: '2', specialite: 'Finance', groupe: '2' }
    // Add more classes as needed
  ];
  students: any[] = [
    { id: 1, matricule: '001', nom: 'Doe', prenom: 'John' },
    { id: 2, matricule: '002', nom: 'Smith', prenom: 'Alice' },
    { id: 3, matricule: '003', nom: 'Johnson', prenom: 'Bob' }
    // Add more students as needed
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      classStudentAssignments: this.fb.array([])
    });

    this.addClassStudentAssignment(); // Initialize with one assignment form group
  }

  get classStudentAssignments(): FormArray {
    return this.form.get('classStudentAssignments') as FormArray;
  }

  addClassStudentAssignment(): void {
    const assignmentFormGroup = this.fb.group({
      class: [null, Validators.required],
      student: [null, Validators.required]
    });
    this.classStudentAssignments.push(assignmentFormGroup);
  }

  removeClassStudentAssignment(index: number): void {
    this.classStudentAssignments.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);
    // Handle the form submission logic here
  }
}

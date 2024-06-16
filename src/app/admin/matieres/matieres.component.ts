import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from "@angular/common";
import {NavComponent} from "../nav/nav.component";

interface Matiere {
  code: string;
  intitule: string;
}

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NavComponent
  ],
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent {
  matieres: Matiere[] = [
    { code: 'M001', intitule: 'Mathématiques' },
    { code: 'F002', intitule: 'Physique' },
    { code: 'C003', intitule: 'Chimie' }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      intitule: ['', Validators.required]
    });
  }

  ajouterMatiere(): void {
    const newMatiere: Matiere = {
      code: this.form.value.code,
      intitule: this.form.value.intitule
    };
    this.matieres.push(newMatiere);
    this.form.reset(); // Reset form after adding matière
  }


}

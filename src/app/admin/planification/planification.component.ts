import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import axios from 'axios';
import { baseUrl } from "../../../main";
import {NavComponent} from "../nav/nav.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  standalone: true,
  imports: [
    NavComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {
  form: FormGroup;
  semesters: any[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      semestre: ['', Validators.required],
      // Other form controls
    });
  }

  ngOnInit(): void {
    // Fetch semesters data
    axios.get(baseUrl + '/semestres/labels')
      .then((res) => {
        this.semesters = res.data;
      })
      .catch((err) => {
        console.error('Error fetching semesters:', err);
      });

    // Subscribe to value changes of semestre control
    this.form.get('semestre')?.valueChanges.subscribe((semesterId: string) => {
      // Handle the change here
     axios.get(baseUrl +`/semestres/ClassesByLabel/${semesterId}`)
       .then((res) => console.log(res))
       .catch((err) => console.log(err))
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form values:', this.form.value);
      // Handle form submission logic here
    } else {
      console.error('Form is invalid');
    }
  }
}

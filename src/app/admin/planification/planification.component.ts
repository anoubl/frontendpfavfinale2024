import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  standalone: true,
  imports: [
    NavComponent,
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent {
  selection = {
    semester: '',
    classe: '',
    groupe: ''
  };

  semesters: string[] = ['Semestre 1', 'Semestre 2', 'Semestre 3'];
  classes: { [key: string]: string[] } = {
    'Semestre 1': ['Classe 1A', 'Classe 1B'],
    'Semestre 2': ['Classe 2A', 'Classe 2B'],
    'Semestre 3': ['Classe 3A', 'Classe 3B']
  };
  groups: { [key: string]: string[] } = {
    'Classe 1A': ['Groupe 1', 'Groupe 2'],
    'Classe 1B': ['Groupe 3', 'Groupe 4'],
    'Classe 2A': ['Groupe 5', 'Groupe 6'],
    'Classe 2B': ['Groupe 7', 'Groupe 8'],
    'Classe 3A': ['Groupe 9', 'Groupe 10'],
    'Classe 3B': ['Groupe 11', 'Groupe 12']
  };

  availableClasses: string[] = [];
  availableGroups: string[] = [];
  selectedSubjects: { name: string, teacher: string | undefined }[] = [];

  subjects = [
    { name: 'Mathématiques', teacher: undefined },
    { name: 'Physique', teacher: undefined },
    { name: 'Chimie', teacher: undefined }
  ];

  teachers: string[] = ['Mme Dupont', 'M. Martin', 'Mme Durand'];

  onSemesterChange() {
    this.availableClasses = this.classes[this.selection.semester] || [];
    this.availableGroups = [];
    this.selection.classe = '';
    this.selection.groupe = '';
  }

  onClassChange() {
    this.availableGroups = this.groups[this.selection.classe] || [];
    this.selection.groupe = '';
  }

  onSubmit() {
    this.selectedSubjects = [...this.subjects]; // Ex: réinitialiser la liste des matières
  }

  onTeacherChange(subject: { name: string, teacher: string | undefined }, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    subject.teacher = selectElement.value || undefined;
  }
}

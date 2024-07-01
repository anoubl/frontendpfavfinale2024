import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { baseUrl } from "../../../main"; // Assurez-vous que cette importation est correcte
import { NavComponent } from "../../admin/nav/nav.component";
import { NavEnseignantComponent } from "../nav-enseignant/nav-enseignant.component";

interface Student {
  id: number;
  nom: string;
  tp: number;
  projet: number;
  controle1: number;
  controle2: number;
  moyenne: number;
}

interface Note {
  id: number;
  tp: number;
  projet: number;
  controle1: number;
  controle2: number;
  moyenne: number;
}

@Component({
  selector: 'app-saisie-notes',
  templateUrl: './saisie-notes.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, NavComponent, NavEnseignantComponent],
})
export class SaisieNotesComponent implements OnInit {
  semesters: any[] = [];
  classes: any[] = [];
  groups: any[] = [];
  subjects: any[] = [];
  students: Student[] = [];
  notes: Note[] = [];
  selectedSemester: number = 0;
  selectedClass: number = 0;
  selectedGroup: number = 0;
  selectedSubject: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getSemesters();
    this.getClasses();
  }

  async getSemesters(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/semestres/labels`);
      this.semesters = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des semestres :', error);
    }
  }

  async onSemesterChange(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/semestres/matieresBySemId/${this.selectedSemester}`);
      this.subjects = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des matières :', error);
    }
  }

  async getClasses(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/classes`);
      this.classes = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des classes :', error);
    }
  }

  async onClassChange(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/groupes/classeWithGroupe/${this.selectedClass}`);
      this.groups = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des groupes :', error);
    }
  }

  async fetchStudentsAndNotes(): Promise<void> {
    try {
      const studentsResponse = await axios.get(`${baseUrl}/groupes/groupeWithStudents/${this.selectedGroup}`);
      // const notesResponse = await axios.post(`${baseUrl}/notes/NotesbyGroupId`, {
      //   id: this.selectedSemester,
      //   label: this.selectedSubject,
      //   groupId: this.selectedGroup
      // });

      this.students = studentsResponse.data;
  //    this.notes = notesResponse.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants et des notes :', error);
    }
  }

  calculateAverage(student: Student): void {
    student.moyenne = (student.tp + student.projet + student.controle1 + student.controle2) / 4;
  }

  async saveNotes(): Promise<void> {
    try {
      for (let student of this.students) {
        await axios.post(`${baseUrl}/notes`, {
          etudiant_id: student.id,
          semestre_id: this.selectedSemester,
          matiere_id: this.selectedSubject,
          tp: student.tp,
          projet: student.projet,
          controle1: student.controle1,
          controle2: student.controle2
        });
      }
      alert('Notes enregistrées avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des notes :', error);
      alert('Erreur lors de l\'enregistrement des notes');
    }
  }
}

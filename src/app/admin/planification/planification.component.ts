import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { baseUrl } from "../../../main";

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, NavComponent],
})
export class PlanificationComponent implements OnInit {
  semesters: any[] = [];
  classes: any[] = [];
  groups: any[] = [];
  tableData: any[] = [];
  matieres: any[] = [];
  enseignants: any[] = [];
  selectedSemester: number = 0;
  selectedClass: number = 0;
  selectedGroup: number = 0;
  showModal: boolean = false;
  selectedMatiere: string = '';
  selectedEnseignant: number = 0;

  constructor(public dialog: MatDialog) {}

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

  async onGroupChange(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/groupes/matierewithenseignant/${this.selectedGroup}`);
      this.tableData = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données du tableau :', error);
    }
  }

  openDialog(): void {
    this.showModal = true;
    this.getMatieres();
    this.getEnseignants();
  }

  async getMatieres(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/matieres`);
      this.matieres = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des matières :', error);
    }
  }

  async getEnseignants(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/Utilisateurs/profs`);
      this.enseignants = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des enseignants :', error);
    }
  }

  async save(): Promise<void> {
    try {
      await axios.post(`${baseUrl}/matieres/planification`, {
        groupeId: this.selectedGroup,
        semestreId: this.selectedSemester,
        assignments: [{
          enseignantId: this.selectedEnseignant,
          matiereId: this.selectedMatiere
        }]
      });
      this.showModal = false;
      this.onGroupChange(); // Refresh the table data after adding new assignment
    } catch (error) {
      console.error('Erreur lors de l\'affectation de la matière :', error);
    }
  }

  onNoClick(): void {
    this.showModal = false;
  }
}

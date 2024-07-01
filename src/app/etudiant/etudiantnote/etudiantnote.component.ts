import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {baseUrl} from "../../../main";
import {NgForOf, NgIf} from "@angular/common";
import {NavetudiantComponent} from "../navetudiant/navetudiant.component";

@Component({
  selector: 'app-etudiant-note',
  templateUrl: './etudiantnote.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NavetudiantComponent
  ],
  styleUrls: ['./etudiantnote.component.css']
})
export class EtudiantNoteComponent implements OnInit {
  semesters: any[] = [];
  selectedSemesterId: number = 0;
  bulletin: any;

  constructor() {}

  ngOnInit(): void {
    this.loadSemesters();
  }

  async loadSemesters(): Promise<void> {
    try {
      const response = await axios.get(`${baseUrl}/semestres/labels`);
      this.semesters = response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des semestres', error);
    }
  }

  onSemesterChange(event: any): void {
    this.selectedSemesterId = event.target.value;
  }

  async fetchBulletin(): Promise<void> {
    const userId = sessionStorage.getItem("userId"); // Remplacez par l'ID utilisateur réel
    const apiUrl = `${baseUrl}/notes/Bulletin/${userId}/${this.selectedSemesterId}`;

    try {
      const response = await axios.get(apiUrl);
      this.bulletin = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du bulletin', error);
    }
  }
}

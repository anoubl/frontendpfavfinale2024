import { Component } from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavetudiantComponent} from "../navetudiant/navetudiant.component";

@Component({
  selector: 'app-etudiantnote',
  templateUrl: './etudiantnote.component.html',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    NgIf,
    NgForOf,
    NavetudiantComponent
  ],
  styleUrls: ['./etudiantnote.component.css']
})
export class EtudiantNoteComponent {
  selectedAnneeSemestre: string = '';
  tableVisible: boolean = false;

  optionsAnneeSemestre: string[] = ['2024/2025 S1', '2023/2024 S1', '2023/2024 S2', '2022/2023 S2'];

  dataParAnneeSemestre: { [key: string]: any[] } = {
    '2024/2025 S1': [
      { matiere: 'Mathématiques', coefficient: 40, projet: 20, controle1: 20, controle2: 20 },
      { matiere: 'Physique', coefficient: 50, projet: 20, controle1: 15, controle2: 15 },
    ],
    '2023/2024 S1': [
      { matiere: 'Biologie', coefficient: 45, projet: 25, controle1: 15, controle2: 15 },
      { matiere: 'Chimie', coefficient: 50, projet: 20, controle1: 15, controle2: 15 }
    ],
    '2023/2024 S2': [
      { matiere: 'Mathématiques', coefficient: 30, projet: 25, controle1: 20, controle2: 25 },
      { matiere: 'Physique', coefficient: 50, projet: 20, controle1: 15, controle2: 15 },
    ],
    '2022/2023 S2': [
      { matiere: 'Chimie', coefficient: 30, projet: 25, controle1: 25, controle2: 20 },
    ]
  };

  notes: { [key: string]: any } = {
    'Mathématiques': { projet: 15, controle1: 16, controle2: 14 },
    'Physique': { projet: 17, controle1: 18, controle2: 16 },
    'Chimie': { projet: 19, controle1: 18, controle2: 17 },
    'Biologie': { projet: 18, controle1: 17, controle2: 16 }
  };

  selectedData: any[] = [];

  selectionner() {
    this.selectedData = this.dataParAnneeSemestre[this.selectedAnneeSemestre] || [];
    this.tableVisible = this.selectedData.length > 0;
  }

  calculerMoyenne(matiere: any): number {
    const notes = this.notes[matiere.matiere] || { projet: 0, controle1: 0, controle2: 0 };
    const projetNote = notes.projet * (matiere.projet / 100);
    const controle1Note = notes.controle1 * (matiere.controle1 / 100);
    const controle2Note = notes.controle2 * (matiere.controle2 / 100);
    const totalCoefficient = matiere.projet + matiere.controle1 + matiere.controle2;

    if (totalCoefficient === 0) return 0;

    return (projetNote + controle1Note + controle2Note) / (totalCoefficient / 100);
  }
}

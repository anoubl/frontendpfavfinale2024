import { Component } from '@angular/core';

interface Matiere {
  id: number;
  nom: string;
}

interface Enseignant {
  id: number;
  nom: string;
  prenom: string;
}

interface PlanMatiere {
  id: number;
  semestre: number;
  classe: string;
  groupe: number;
  matiere: Matiere;
  enseignants: Enseignant[];
}

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent {
  semestre: number = 1;
  classe: string = 'A';
  groupe: number = 1;
  matieres: Matiere[] = [
    { id: 1, nom: 'Mathématiques' },
    { id: 2, nom: 'Physique' },
    { id: 3, nom: 'Chimie' },
    { id: 4, nom: 'Informatique' }
  ];
  enseignants: Enseignant[] = [
    { id: 1, nom: 'Durand', prenom: 'Jean' },
    { id: 2, nom: 'Lefevre', prenom: 'Sophie' },
    { id: 3, nom: 'Garcia', prenom: 'Pierre' },
    { id: 4, nom: 'Martin', prenom: 'Marie' }
  ];
  planMatiere: PlanMatiere[] = [
    {
      id: 1,
      semestre: 1,
      classe: 'A',
      groupe: 1,
      matiere: { id: 1, nom: 'Mathématiques' },
      enseignants: [
        { id: 1, nom: 'Durand', prenom: 'Jean' },
        { id: 2, nom: 'Lefevre', prenom: 'Sophie' }
      ]
    },
    {
      id: 2,
      semestre: 1,
      classe: 'A',
      groupe: 2,
      matiere: { id: 2, nom: 'Physique' },
      enseignants: [
        { id: 3, nom: 'Garcia', prenom: 'Pierre' },
        { id: 4, nom: 'Martin', prenom: 'Marie' }
      ]
    }
  ];

  ajouterPlanMatiere(): void {
    this.planMatiere.push({
      id: this.planMatiere.length + 1,
      semestre: this.semestre,
      classe: this.classe,
      groupe: this.groupe,
      matiere: { id: 0, nom: '' },
      enseignants: []
    });
  }

  enregistrerPlanMatiere(plan: PlanMatiere): void {
    console.log('Plan de matière à enregistrer :', plan);
    // Logique d'enregistrement à implémenter
  }

  getMatiereEnseignants(plan: PlanMatiere): string {
    const enseignants = plan.enseignants.map(e => e.nom).join(', ');
    return `${plan.matiere.nom} - ${enseignants}`;
  }
}

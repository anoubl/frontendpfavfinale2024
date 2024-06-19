import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { baseUrl } from "../../../main";
import {NavComponent} from "../nav/nav.component";
import {NgForOf} from "@angular/common";

interface Etudiant {
  nom: string;
  prenom: string;
  matricule: string;
}

@Component({
  selector: 'app-etu-class',
  templateUrl: './etu-class.component.html',
  standalone: true,
  imports: [
    NavComponent,
    NgForOf
  ],
  styleUrls: ['./etu-class.component.css']
})
export class EtuClassComponent implements OnInit {
  annee: string=" ";
  groupe: number = 0;
  etudiants: Etudiant[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.annee = params['annee'];
      this.groupe = +params['groupe']; // Convertit le paramètre de chaîne en nombre
      this.fetchEtudiants(); // Charge les étudiants pour le groupe spécifié
    });
  }

  async fetchEtudiants(): Promise<void> {
    try {
      const response = await axios.get<Etudiant[]>(`${baseUrl}/etu-class/${this.annee}/${this.groupe}`);
      this.etudiants = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants', error);
    }
  }
}

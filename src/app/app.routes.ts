import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AccueilAdminComponent} from "./admin/accueil/accueil-admin.component";
import {AccueilEnseignantComponent} from "./ensignant/accueil/accueil.component";
import {AccueilEtudiantComponent} from "./etudiant/accueil/accueil.component";

export const routes: Routes = [
  {path : '' , component : LoginComponent},
  {path : '/accueil-admin' , component : AccueilAdminComponent},
  {path : '/accueil-enseignant' , component : AccueilEnseignantComponent},
  {path : '/accueil-etudiant' , component : AccueilEtudiantComponent},

];

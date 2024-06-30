import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilAdminComponent } from './admin/accueil/accueil-admin.component';
import { AccueilEtudiantComponent } from './etudiant/accueil/accueil.component';
import { AddEnseignantComponent } from './admin/add-enseignant/add-enseignant.component';
import { EtudiantsComponent } from './admin/etudiants/etudiants.component';
import { ClassesComponent } from './admin/classes/classes.component';
import { PlanificationComponent } from './admin/planification/planification.component';
import { MatieresComponent } from './admin/matieres/matieres.component';
import {AuthGuardService} from "./admin/auth-guard.service";
import {AccueilEnseignantComponent} from "./ensignant/accueil/accueil.component";
import {SaisieNotesComponent} from "./ensignant/bultin-etudiant/bultin-etudiant.component";
import {EtudiantNoteComponent} from "./etudiant/etudiantnote/etudiantnote.component";
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut vers /login
  { path: 'login', component: LoginComponent },
  { path: 'accueil-admin', component: AccueilAdminComponent, canActivate: [AuthGuardService] },
  { path: 'accueil-etudiant', component: AccueilEtudiantComponent, canActivate: [AuthGuardService] },
  { path: 'add-enseignant', component: AddEnseignantComponent, canActivate: [AuthGuardService] },
  { path: 'etudiants', component: EtudiantsComponent, canActivate: [AuthGuardService] },
  { path: 'classes', component: ClassesComponent, canActivate: [AuthGuardService] },
  { path: 'matieres', component: MatieresComponent, canActivate: [AuthGuardService] },
  { path: 'planification', component: PlanificationComponent, canActivate: [AuthGuardService] },
  { path: 'accueil-enseignant', component: AccueilEnseignantComponent, canActivate: [AuthGuardService] },
  { path: 'saisie des notes', component: SaisieNotesComponent, canActivate: [AuthGuardService] },
  { path: 'note-etudiant', component: EtudiantNoteComponent, canActivate: [AuthGuardService] },
  // Autres routes sécurisées par l'AuthGuard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AccueilAdminComponent} from "./admin/accueil/accueil-admin.component";
import {AccueilEnseignantComponent} from "./ensignant/accueil/accueil.component";
import {AccueilEtudiantComponent} from "./etudiant/accueil/accueil.component";
import {AddEnseignantComponent} from "./admin/add-enseignant/add-enseignant.component";
import {EtudiantsComponent} from "./admin/etudiants/etudiants.component";
import {ClassesComponent} from "./admin/classes/classes.component";
import {MatieresComponent} from "./admin/matieres/matieres.component";
import {PlanificationComponent} from "./admin/planification/planification.component";


export const routes: Routes = [
  {path : '' , component : LoginComponent},
  {path : 'accueil-admin' , component : AccueilAdminComponent},
  {path : 'accueil-enseignant' , component : AccueilEnseignantComponent},
  {path : 'accueil-etudiant' , component : AccueilEtudiantComponent},
  {path : 'add-enseignant' , component : AddEnseignantComponent},
  { path: 'etudiants', component: EtudiantsComponent },
  { path: 'classes', component: ClassesComponent },

  { path: 'matieres', component: MatieresComponent },
  { path: 'planification', component: PlanificationComponent },
  /*{ path: 'enseignant', component: EnseignantComponent}
  { path: 'bulletin-etudiant', component: BulletinEtudiantComponent }
*/
];

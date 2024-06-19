import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Vérifiez ici si votre variable dans la session est égale à true
    const isAuthenticated = this.checkSession(); // Exemple de fonction pour vérifier l'état de la session

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige vers la page de login si non authentifié
      return false;
    }
  }

  // Fonction factice pour simuler la vérification de session
  private checkSession(): boolean {
    // Ici, vous devriez vérifier la session réelle
    // Par exemple, vérifier si une variable dans localStorage ou sessionStorage est définie à true
    // Retourne true si l'utilisateur est authentifié, sinon false
    return sessionStorage.getItem('isAuthentifie') === 'true'; // Exemple basique avec localStorage
  }

}

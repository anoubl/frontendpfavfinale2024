import { Injectable } from '@angular/core';
import axios from "axios";
import {baseUrl} from "../../main";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  async  login(username : String , password : String)
  {
    return axios.post(baseUrl +"/Utilisateurs/login", {email : username , password : password})
  }



  async addEnseignant()
  {

  }
  getStudents(): Observable<any[]> {
    return of([
      { matricule: '001', nom: 'Doe', prenom: 'John' },
      { matricule: '002', nom: 'Smith', prenom: 'Alice' },
      { matricule: '003', nom: 'Johnson', prenom: 'Bob' }
    ]);
  }
}

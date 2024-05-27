import { Injectable } from '@angular/core';
import axios from "axios";
import {baseUrl} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  async  login(username : String , password : String)
  {
    return axios.post(baseUrl +"/Utilisateurs/login", {email : username , password : password})
  }




}

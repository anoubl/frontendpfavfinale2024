import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: any;
  password: any;

  constructor(private logins: LoginService) {


  }

  login() {
  this.logins.
  login(this.username , this.password)
    .then((data) =>
    {

    })
    .catch((error) => console.log(error))
  }

  resetForm() {
  this.username = ''
    this.password = ''
  }
}

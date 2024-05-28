import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  fullName : string = ''
  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.username, this.password)
      .then((response: any) => {
        this.role = response.data.role;
        this.fullName = response.data.username
        sessionStorage.setItem("userName" , this.fullName)
        if (this.role === 'ADMIN') {
          this.router.navigate(['/accueil-admin']);
        } else if (this.role == "ENSEIGNANT") {
          this.router.navigate(['/accueil-enseignant']);
        }
        else
        {
          this.router.navigate(['/accueil-etudiant']);
        }
      })
      .catch((error: any) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your username and password.');
      });
  }

  resetForm() {
    this.username = '';
    this.password = '';
  }
}

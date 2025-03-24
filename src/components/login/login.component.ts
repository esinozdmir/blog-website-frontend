import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {

  constructor(private authService: AuthService,private router:Router) {}

  email: string = '';
  password: string = '';

  onLoginClicked() {
    this.authService.login(this.email, this.password);
  }
  goToHome(){
    this.router.navigate(['/home']);
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

}

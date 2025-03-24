import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/authservice';
@Component({
  selector: 'app-register',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService,private router:Router) {}

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmpassword: string = '';

  onRegisterClicked(): void {

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmpassword: this.confirmpassword
    };

    this.authService?.register(payload);
    console.log();

  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }



}
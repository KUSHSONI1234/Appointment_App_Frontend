import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

import {
  HttpClient,
  HttpErrorResponse,
  HttpClientModule,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
    HttpClientModule,
  ],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('fullNameInput') fullNameInput!: ElementRef;

  loginData = {
    email: '',
    password: '',
  };

  showAlert = false;
  showSuccess = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    this.fullNameInput.nativeElement.focus();
  }

  onSubmit() {
    const { email, password } = this.loginData;

    if (!email.trim() || !password.trim()) {
      this.showAlert = true;
      this.errorMessage = 'Please enter email and password.';
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
      return;
    }

    // const apiUrl = 'http://localhost:5052/api/auth/login';
    const apiUrl = `${environment.apiBaseUrl}/auth/login`;


    this.http.post(apiUrl, this.loginData).subscribe({
      next: (res: any) => {
        console.log('Login Success:', res);
        this.showSuccess = true;
        this.showAlert = false;


        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']).then(() => {
         
        });

        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login failed:', err);
        this.showAlert = true;
        this.errorMessage = err.error?.message || 'Invalid email or password';
        this.showSuccess = false;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
    });


    this.loginData = {
      email: '',
      password: '',
    };
  }
}

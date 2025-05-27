import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Route, Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    RouterLink, FooterComponent
  ],
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('fullNameInput') fullNameInput!: ElementRef;

  registerData = {
    fullName: '',
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
    const { fullName, email, password } = this.registerData;

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      this.showAlert = true;
      this.showSuccess = false;
      this.errorMessage = 'Please fill in all fields.';

      this.autoHideAlert();
      return;
    }

    this.http
      .post(`${environment.apiUrl}/auth/register`, this.registerData)
      .subscribe({
        next: (res: any) => {
          this.showAlert = false;
          this.showSuccess = true;

          console.log('Backend Response:', res);
          this.router.navigateByUrl('/login');

          this.registerData = {
            fullName: '',
            email: '',
            password: '',
          };

          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        },
        error: (err) => {
          this.showSuccess = false;
          this.showAlert = true;

          if (err.status === 400 && err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again.';
          }

          this.autoHideAlert();
        },
      });
  }

  autoHideAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}

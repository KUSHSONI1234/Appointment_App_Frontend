import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';

  showAlert = false;
  showSuccess = false;
  errorMessage = '';
  successMessage = '';

  @ViewChild('fullNameInput') fullNameInput!: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.fullNameInput.nativeElement.focus();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.showAlert = true;
      this.errorMessage = 'All fields are required!';
      setTimeout(() => (this.showAlert = false), 3000);
      return;
    }

    const payload = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:5052/api/Admin/login', payload).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.showSuccess = true;
        this.showAlert = false;
        setTimeout(() => (this.showSuccess = false), 3000);
        this.resetBtn();
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
        this.showAlert = true;
        this.showSuccess = false;
        setTimeout(() => (this.showAlert = false), 3000);
      },
    });
  }

  resetBtn()
  {
    this.email='',
    this.password=''
  }
}

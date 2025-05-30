import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css'],
})
export class DoctorLoginComponent implements AfterViewInit {
  @ViewChild('fullNameInput') fullNameInput!: ElementRef;

  email: string = '';
  password: string = '';

  showAlert = false;
  showSuccess = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.fullNameInput.nativeElement.focus();
  }

  onSubmit(): void {
    const payload = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:5052/api/Doctor/login', payload).subscribe({
      next: (res) => {
        this.showSuccess = true;
        this.showAlert = false;
        this.errorMessage = '';
        this.resetFields();

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      },
      error: (err) => {
        this.showSuccess = false;
        this.showAlert = true;
        this.errorMessage = err.error.message || 'Login failed';
        this.resetFields();

        // Hide error message after 3 seconds
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    });
  }

  resetFields(): void {
    this.email = '';
    this.password = '';
    this.fullNameInput.nativeElement.focus();
  }
}

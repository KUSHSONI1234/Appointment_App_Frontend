import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent
  ]
})
export class RegisterComponent {
  registerData = {
    fullName: '',
    email: '',
    password: '',
  };

  showAlert = false;
  showSuccess = false;

  onSubmit() {
    const { fullName, email, password } = this.registerData;

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      this.showAlert = true;
      this.showSuccess = false;

      // Hide alert after 3 seconds
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
      return;
    }

    // Success
    this.showAlert = false;
    this.showSuccess = true;

    console.log('Form Submitted:', this.registerData);

    // Optionally reset the form fields
    this.registerData = {
      fullName: '',
      email: '',
      password: '',
    };

    // Hide success message after 3 seconds
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }
}

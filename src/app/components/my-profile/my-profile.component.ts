import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, FooterComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent implements OnInit {
  fullName = '';
  email = '';
  phone = '';
  address = '';
  gender = '';
  birthday = '';

  editMode = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';
  userExists = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';

    if (this.email) {
      this.http.get<any[]>('http://localhost:5052/api/UserProfile').subscribe({
        next: (users) => {
          const user = users.find((u) => u.email === this.email);
          if (user) {
            this.userExists = true;
            this.fullName = user.fullName;
            this.phone = user.phone;
            this.address = user.address;
            this.gender = user.gender;
            this.birthday = user.birthday;
          }
        },
        error: (error) => {
          console.error('Error fetching profile:', error);
        },
      });
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;

    if (!this.editMode) {
      const payload = {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        address: this.address,
        gender: this.gender,
        birthday: this.birthday,
      };

      const request = this.userExists
        ? this.http.put('http://localhost:5052/api/UserProfile', payload)
        : this.http.post('http://localhost:5052/api/UserProfile', payload);

      request.subscribe({
        next: (response) => {
          this.alertMessage = this.userExists
            ? 'Profile updated successfully!'
            : 'Profile created successfully!';
          this.alertType = 'success';
          this.userExists = true;
          setTimeout(() => {
            this.alertMessage = '';
          }, 3000); // 3 seconds
        },
        error: (error) => {
          this.alertMessage = 'Error saving profile. Please try again.';
          this.alertType = 'error';
          console.error('Error saving profile:', error);
          setTimeout(() => {
            this.alertMessage = '';
          }, 3000);
        },
      });
    }
  }
}

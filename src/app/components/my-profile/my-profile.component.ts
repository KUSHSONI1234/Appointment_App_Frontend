import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  imports: [NavbarComponent,FormsModule,CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  fullName = '';
  email = '';
  phone = '0000000000';
  address = 'Your address here';
  gender = 'Not specified';
  birthday = '';

  editMode = false;

  ngOnInit(): void {
    this.fullName = localStorage.getItem('fullName') || '';
    this.email = localStorage.getItem('email') || '';
    // You can set others or fetch from API
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;

    if (!this.editMode) {
      console.log('Saving...', {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        address: this.address,
        gender: this.gender,
        birthday: this.birthday
      });
    }
  }
}

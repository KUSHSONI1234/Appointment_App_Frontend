import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports:[FormsModule,CommonModule,RouterLink]
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  showDropdown = false;


  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout() {
  localStorage.removeItem('token');
  window.location.reload(); 
}

}

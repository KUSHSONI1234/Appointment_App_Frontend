import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements AfterViewInit {
  @ViewChild('fullNameInput') fullNameInput!: ElementRef;

  email: string = '';
  password: string = '';
  

  constructor() {}

  ngAfterViewInit() {
    this.fullNameInput.nativeElement.focus();
  }

  onSubmit(): void {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // You can now call your API here using HttpClient.
  }
}

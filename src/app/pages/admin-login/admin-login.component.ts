import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { FormsModule } from '@angular/forms'; // ✅ Needed for [(ngModel)]
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginAdmin(event: Event) {
    event.preventDefault();
    this.errorMessage = ''; // Clear previous errors

    // Client-side validation
    if (!this.email || !this.password) {
        this.errorMessage = 'Both email and password are required!';
        return;
    }

    if (!this.validateEmail(this.email)) {
        this.errorMessage = 'Please enter a valid email address!';
        return;
    }

    if (this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters long!';
        return;
    }

    // Backend authentication request
    this.http.post<any>('http://localhost:3000/api/users/login', { email: this.email, password: this.password })
    .subscribe(response => {
        if (response.token) {
            localStorage.setItem('adminToken', response.token);
            this.router.navigate(['/dashboard']);
        } else {
            this.errorMessage = 'Invalid login credentials';
        }
    }, error => {
        // Handle server errors
        this.errorMessage = error.error.message || 'Login failed. Please try again.';
    });
}

// Email validation function
validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
}

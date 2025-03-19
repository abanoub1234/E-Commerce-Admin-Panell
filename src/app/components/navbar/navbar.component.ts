import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin-login']);
  }
}

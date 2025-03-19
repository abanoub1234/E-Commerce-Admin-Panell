import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

interface User {
  _id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf], // ✅ Removed BrowserModule
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  editingUser: User | null = null;
  apiUrl = 'http://localhost:3000/api/users/users';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.error("❌ No token found, user is not authenticated!");
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  fetchUsers() {
    console.trace("🔍 fetchUsers() called");

    this.http.get<User[]>(this.apiUrl, { headers: this.getAuthHeaders() }).subscribe({
      next: (data) => {
        console.trace("✅ Users fetched successfully!", data);
        this.users = data.map(user => ({
          ...user,
          lastName: user.lastName || 'N/A' // Handle missing values
        }));
      },
      error: (err) => {
        console.error("❌ Error fetching users:", err);
      }
    });
  }

  editUser(user: User) {
    this.editingUser = { ...user }; // Clone object to avoid modifying original data
  }

  updateUser() {
    if (!this.editingUser) return;

    this.http.put(`${this.apiUrl}/${this.editingUser._id}`, this.editingUser, { headers: this.getAuthHeaders() }).subscribe(() => {
      this.users = this.users.map(user => 
        user._id === this.editingUser!._id ? this.editingUser! : user
      );
      this.cancelEdit();
    });
  }

  cancelEdit() {
    this.editingUser = null;
  }

  deleteUser(id: string) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).subscribe(() => {
        this.users = this.users.filter(user => user._id !== id);
      });
    }
  }
}

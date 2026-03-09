import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  errorText: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    // If already logged in, redirect to home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.loading = true;
    this.errorText = null;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorText = 'Invalid email or password.';
        } else {
          this.errorText = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}


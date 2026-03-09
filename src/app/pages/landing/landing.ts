import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  constructor(public auth: AuthService, private router: Router) {
    // Redirect students to their own dashboard
    if (auth.hasRole('STUDENT')) {
      this.router.navigate(['/student']);
    }
  }

  logout() {
    this.auth.logout();
  }
}

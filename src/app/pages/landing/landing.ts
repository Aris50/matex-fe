import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ApiService, HomeworkResponse, StudentResponse } from '../../api.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit {
  recentHomeworks: HomeworkResponse[] = [];
  students: StudentResponse[] = [];
  loadingHomeworks = true;
  loadingStudents = true;

  // Active sidebar section
  activeSection: 'overview' | 'homeworks' | 'students' | 'accounts' = 'overview';

  constructor(
    public auth: AuthService,
    private router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    if (auth.hasRole('STUDENT')) {
      this.router.navigate(['/student']);
    }
  }

  ngOnInit() {
    this.api.getAllHomeworks(true).subscribe({
      next: (res) => {
        this.recentHomeworks = res;
        this.loadingHomeworks = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingHomeworks = false;
        this.cdr.detectChanges();
      }
    });

    this.api.getStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.loadingStudents = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingStudents = false;
        this.cdr.detectChanges();
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}


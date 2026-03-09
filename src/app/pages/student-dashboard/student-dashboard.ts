import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ApiService, StudentAssignmentListItem } from '../../api.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard implements OnInit {
  assignments: StudentAssignmentListItem[] = [];
  loading = true;

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.api.getMyAssignments().subscribe({
      next: (res) => {
        this.assignments = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
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

  get pendingCount(): number {
    return this.assignments.filter(a => a.status === 'ASSIGNED').length;
  }

  get completedCount(): number {
    return this.assignments.filter(a => a.status !== 'ASSIGNED').length;
  }

  statusClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'status-completed';
      case 'IN_PROGRESS': return 'status-progress';
      default: return 'status-pending';
    }
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'Completed';
      case 'IN_PROGRESS': return 'In Progress';
      default: return 'Pending';
    }
  }
}


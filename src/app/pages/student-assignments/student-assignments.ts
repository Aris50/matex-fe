import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, StudentAssignmentListItem } from '../../api.service';

@Component({
  selector: 'app-student-assignments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-assignments.html',
  styleUrl: './student-assignments.css'
})
export class StudentAssignments implements OnInit {
  assignments: StudentAssignmentListItem[] = [];
  loading = true;
  errorText: string | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getMyAssignments().subscribe({
      next: (res) => {
        this.assignments = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorText = 'Failed to load assignments.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  statusClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'status-completed';
      case 'IN_PROGRESS': return 'status-progress';
      default: return 'status-assigned';
    }
  }
}


import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  ApiService,
  TeacherStudentAssignment,
  StudentAssignmentDetails,
  ExerciseWithSubmission
} from '../../api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teacher-student-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-student-detail.html',
  styleUrl: './teacher-student-detail.css'
})
export class TeacherStudentDetail implements OnInit {
  studentId!: number;
  studentName = '';
  assignments: TeacherStudentAssignment[] = [];
  loading = true;
  errorText: string | null = null;

  // Expanded assignment details
  expandedAssignmentId: number | null = null;
  assignmentDetails: StudentAssignmentDetails | null = null;
  loadingDetails = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('studentId'));
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.api.getStudents().subscribe({
      next: (students) => {
        const s = students.find(st => st.id === this.studentId);
        if (s) this.studentName = s.fullName;
        this.cdr.detectChanges();
      }
    });

    this.api.getStudentAssignments(this.studentId).subscribe({
      next: (res) => {
        this.assignments = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorText = 'Failed to load assignments.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleAssignment(assignmentId: number) {
    if (this.expandedAssignmentId === assignmentId) {
      this.expandedAssignmentId = null;
      this.assignmentDetails = null;
      return;
    }

    this.expandedAssignmentId = assignmentId;
    this.assignmentDetails = null;
    this.loadingDetails = true;

    this.api.getTeacherAssignmentDetails(this.studentId, assignmentId).subscribe({
      next: (res) => {
        this.assignmentDetails = res;
        this.loadingDetails = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingDetails = false;
        this.cdr.detectChanges();
      }
    });
  }

  buildImageUrl(path: string | null): string {
    if (!path) return '';
    return `${environment.apiBaseUrl}/storage/${path}`;
  }

  buildFileUrl(storageKey: string): string {
    return `${environment.apiBaseUrl}/storage/${storageKey}`;
  }

  isImage(contentType: string): boolean {
    return contentType?.startsWith('image/') ?? false;
  }

  statusClass(status: string): string {
    switch (status) {
      case 'DELIVERED': return 'status-delivered';
      case 'DELIVERED_LATE': return 'status-late';
      case 'PARTLY_DELIVERED': return 'status-partial';
      case 'UNDELIVERED': return 'status-undelivered';
      default: return '';
    }
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'DELIVERED': return 'Delivered';
      case 'DELIVERED_LATE': return 'Delivered Late';
      case 'PARTLY_DELIVERED': return 'Partly Delivered';
      case 'UNDELIVERED': return 'Undelivered';
      default: return status;
    }
  }
}


import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, StudentResponse } from '../../api.service';

@Component({
  selector: 'app-teacher-students',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-students.html',
  styleUrl: './teacher-students.css'
})
export class TeacherStudents implements OnInit {
  students: StudentResponse[] = [];
  loading = true;
  errorText: string | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getStudents().subscribe({
      next: (res) => {
        this.students = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorText = 'Failed to load students.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}


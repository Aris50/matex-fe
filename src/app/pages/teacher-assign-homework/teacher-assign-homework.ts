import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ApiService,
  AssignmentResponse,
  CreateAssignmentRequest
} from '../../api.service';

@Component({
  selector: 'app-teacher-assign-homework',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe, RouterLink],
  templateUrl: './teacher-assign-homework.html',
  styleUrl: './teacher-assign-homework.css'
})
export class TeacherAssignHomework {
  homeworkId = 1;
  studentIdsText = '';

  loading = false;
  errorText: string | null = null;
  createdAssignments: AssignmentResponse[] | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  assignHomework() {
    this.loading = true;
    this.errorText = null;
    this.createdAssignments = null;

    const parsedIds = this.studentIdsText
      .split(',')
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .map((x) => Number(x))
      .filter((x) => !Number.isNaN(x));

    const payload: CreateAssignmentRequest = {
      studentIds: parsedIds
    };

    this.api.assignHomework(this.homeworkId, payload).subscribe({
      next: (res) => {
        this.createdAssignments = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorText = JSON.stringify(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ApiService,
  CreateHomeworkRequest,
  HomeworkResponse
} from '../../api.service';

@Component({
  selector: 'app-teacher-create-homework',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe, RouterLink],
  templateUrl: './teacher-create-homework.html',
  styleUrl: './teacher-create-homework.css'
})
export class TeacherCreateHomework {
  teacherId = 1;
  title = '';
  description = '';
  dueAt = '';

  loading = false;
  errorText: string | null = null;
  createdHomework: HomeworkResponse | null = null;

  constructor(private api: ApiService) {}

  createHomework() {
    this.loading = true;
    this.errorText = null;
    this.createdHomework = null;

    const payload: CreateHomeworkRequest = {
      teacherId: this.teacherId,
      title: this.title,
      description: this.description,
      dueAt: this.dueAt
    };

    this.api.createHomework(payload).subscribe({
      next: (res) => {
        this.createdHomework = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorText = JSON.stringify(err);
        this.loading = false;
      }
    });
  }
}
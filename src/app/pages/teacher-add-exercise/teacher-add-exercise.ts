import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, CreateExerciseRequest } from '../../api.service';

@Component({
  selector: 'app-teacher-add-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe, RouterLink],
  templateUrl: './teacher-add-exercise.html',
  styleUrl: './teacher-add-exercise.css'
})
export class TeacherAddExercise {
  homeworkId = 1;
  orderIndex = 1;
  instructionText = '';

  loading = false;
  errorText: string | null = null;
  createdExercise: any = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  addExercise() {
    this.loading = true;
    this.errorText = null;
    this.createdExercise = null;

    const payload: CreateExerciseRequest = {
      orderIndex: this.orderIndex,
      instructionText: this.instructionText
    };

    this.api.addExercise(this.homeworkId, payload).subscribe({
      next: (res) => {
        this.createdExercise = res;
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
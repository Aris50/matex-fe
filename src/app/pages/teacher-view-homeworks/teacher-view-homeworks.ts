import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ApiService,
  HomeworkResponse,
  ExerciseResponse
} from '../../api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teacher-view-homeworks',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-view-homeworks.html',
  styleUrl: './teacher-view-homeworks.css'
})
export class TeacherViewHomeworks {
  homeworks: HomeworkResponse[] = [];
  expandedHomeworkId: number | null = null;

  exercisesByHomeworkId: Record<number, ExerciseResponse[]> = {};
  loadingExercisesByHomeworkId: Record<number, boolean> = {};

  loading = true;
  errorText: string | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {
    this.loadHomeworks();
  }

  loadHomeworks() {
    this.loading = true;
    this.errorText = null;

    this.api.getAllHomeworks().subscribe({
      next: (res) => {
        this.homeworks = res;
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

  toggleHomework(homeworkId: number) {
    if (this.expandedHomeworkId === homeworkId) {
      this.expandedHomeworkId = null;
      return;
    }

    this.expandedHomeworkId = homeworkId;

    if (this.exercisesByHomeworkId[homeworkId]) {
      return;
    }

    this.loadingExercisesByHomeworkId[homeworkId] = true;

    this.api.getExercises(homeworkId).subscribe({
      next: (res) => {
        this.exercisesByHomeworkId[homeworkId] = res;
        this.loadingExercisesByHomeworkId[homeworkId] = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorText = JSON.stringify(err);
        this.loadingExercisesByHomeworkId[homeworkId] = false;
        this.cdr.detectChanges();
      }
    });
  }

  buildExerciseImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) {
      return '';
    }
    return `${environment.apiBaseUrl}/storage/${imagePath}`;
  }
}
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, HomeworkResponse } from '../../api.service';

@Component({
  selector: 'app-teacher-add-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe, RouterLink],
  templateUrl: './teacher-add-exercise.html',
  styleUrl: './teacher-add-exercise.css'
})
export class TeacherAddExercise implements OnInit {
  homeworks: HomeworkResponse[] = [];
  selectedHomework: HomeworkResponse | null = null;
  showHomeworkPicker = false;
  showAllHomeworks = false;

  instructionText = '';
  selectedImage: File | null = null;

  loading = false;
  loadingHomeworks = false;
  errorText: string | null = null;
  createdExercise: any = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadHomeworks();
  }

  loadHomeworks() {
    this.loadingHomeworks = true;
    this.api.getAllHomeworks(!this.showAllHomeworks).subscribe({
      next: (res) => {
        this.homeworks = res;
        this.loadingHomeworks = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingHomeworks = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleShowAll() {
    this.showAllHomeworks = !this.showAllHomeworks;
    this.loadHomeworks();
  }

  openPicker() {
    this.showHomeworkPicker = true;
  }

  closePicker() {
    this.showHomeworkPicker = false;
  }

  selectHomework(hw: HomeworkResponse) {
    this.selectedHomework = hw;
    this.showHomeworkPicker = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedImage = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  addExercise() {
    if (!this.selectedHomework) return;

    this.loading = true;
    this.errorText = null;
    this.createdExercise = null;

    this.api.addExercise(
      this.selectedHomework.id,
      this.instructionText,
      this.selectedImage
    ).subscribe({
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


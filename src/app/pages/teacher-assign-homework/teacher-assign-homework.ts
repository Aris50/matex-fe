import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ApiService,
  AssignmentResponse,
  CreateAssignmentRequest,
  HomeworkResponse,
  StudentResponse
} from '../../api.service';

@Component({
  selector: 'app-teacher-assign-homework',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe, RouterLink],
  templateUrl: './teacher-assign-homework.html',
  styleUrl: './teacher-assign-homework.css'
})
export class TeacherAssignHomework implements OnInit {
  homeworks: HomeworkResponse[] = [];
  students: StudentResponse[] = [];

  selectedHomework: HomeworkResponse | null = null;
  selectedStudentIds: Set<number> = new Set();

  showHomeworkPicker = false;
  showStudentPicker = false;
  showAllHomeworks = false;

  loadingHomeworks = false;
  loadingStudents = false;
  loading = false;
  errorText: string | null = null;
  createdAssignments: AssignmentResponse[] | null = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadHomeworks();
    this.loadStudents();
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

  toggleShowAllHomeworks() {
    this.showAllHomeworks = !this.showAllHomeworks;
    this.loadHomeworks();
  }

  loadStudents() {
    this.loadingStudents = true;
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

  openHomeworkPicker() { this.showHomeworkPicker = true; }
  closeHomeworkPicker() { this.showHomeworkPicker = false; }

  selectHomework(hw: HomeworkResponse) {
    this.selectedHomework = hw;
    this.showHomeworkPicker = false;
  }

  openStudentPicker() { this.showStudentPicker = true; }
  closeStudentPicker() { this.showStudentPicker = false; }

  toggleStudent(id: number) {
    if (this.selectedStudentIds.has(id)) {
      this.selectedStudentIds.delete(id);
    } else {
      this.selectedStudentIds.add(id);
    }
  }

  isStudentSelected(id: number): boolean {
    return this.selectedStudentIds.has(id);
  }

  get selectedStudentCount(): number {
    return this.selectedStudentIds.size;
  }

  getSelectedStudentNames(): string {
    return this.students
      .filter(s => this.selectedStudentIds.has(s.id))
      .map(s => s.fullName)
      .join(', ');
  }

  assignHomework() {
    if (!this.selectedHomework || this.selectedStudentIds.size === 0) return;

    this.loading = true;
    this.errorText = null;
    this.createdAssignments = null;

    const payload: CreateAssignmentRequest = {
      studentIds: Array.from(this.selectedStudentIds)
    };

    this.api.assignHomework(this.selectedHomework.id, payload).subscribe({
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


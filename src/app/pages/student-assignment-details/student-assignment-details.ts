import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  ApiService,
  StudentAssignmentDetails,
  ExerciseWithSubmission
} from '../../api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-assignment-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-assignment-details.html',
  styleUrl: './student-assignment-details.css'
})
export class StudentAssignmentDetailsPage implements OnInit {
  assignmentId!: number;
  details: StudentAssignmentDetails | null = null;
  loading = true;
  errorText: string | null = null;

  // Submission state per exercise
  submissionText: Record<number, string> = {};
  submissionFiles: Record<number, File[]> = {};
  submitting: Record<number, boolean> = {};
  submitSuccess: Record<number, string> = {};
  submitError: Record<number, string> = {};

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.assignmentId = Number(this.route.snapshot.paramMap.get('assignmentId'));
    this.loadDetails();
  }

  loadDetails() {
    this.loading = true;
    this.errorText = null;

    this.api.getAssignmentDetails(this.assignmentId).subscribe({
      next: (res) => {
        this.details = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorText = 'Failed to load assignment details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  buildImageUrl(imagePath: string | null): string {
    if (!imagePath) return '';
    return `${environment.apiBaseUrl}/storage/${imagePath}`;
  }

  onFilesSelected(exerciseId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.submissionFiles[exerciseId] = Array.from(input.files);
    }
  }

  canSubmit(exerciseId: number): boolean {
    const hasText = !!this.submissionText[exerciseId]?.trim();
    const hasFiles = (this.submissionFiles[exerciseId]?.length ?? 0) > 0;
    return hasText || hasFiles;
  }

  submitExercise(exerciseId: number) {
    if (!this.canSubmit(exerciseId)) return;

    this.submitting[exerciseId] = true;
    this.submitSuccess[exerciseId] = '';
    this.submitError[exerciseId] = '';

    const text = this.submissionText[exerciseId]?.trim() || null;
    const files = this.submissionFiles[exerciseId] || [];

    this.api.submitExercise(this.assignmentId, exerciseId, text, files).subscribe({
      next: (res) => {
        this.submitting[exerciseId] = false;
        this.submitSuccess[exerciseId] = `Submitted! Attempt #${res.attemptNo}`;
        this.submissionText[exerciseId] = '';
        this.submissionFiles[exerciseId] = [];
        // Reload to show latest submission
        this.loadDetails();
      },
      error: () => {
        this.submitting[exerciseId] = false;
        this.submitError[exerciseId] = 'Submission failed. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface HealthResponse {
  status: string;
}

export interface CreateHomeworkRequest {
  title: string;
  description: string;
  dueAt: string;
}

export interface HomeworkResponse {
  id: number;
  teacherId: number;
  title: string;
  description: string;
  dueAt: string;
  createdAt: string;
}

export interface CreateExerciseRequest {
  orderIndex: number;
  instructionText: string;
}

export interface ExerciseResponse {
  id: number;
  homeworkId: number;
  orderIndex: number;
  instructionText: string;
  createdAt: string;
  imagePath: string | null;
  imageOriginalName: string | null;
  imageContentType: string | null;
  imageSizeBytes: number | null;
}

export interface CreateAssignmentRequest {
  studentIds: number[];
}

export interface AssignmentResponse {
  id: number;
  homeworkId: number;
  studentId: number;
  status: string;
  assignedAt: string;
}

export interface StudentResponse {
  id: number;
  email: string;
  fullName: string;
}

// --- Student-side DTOs ---

export interface StudentAssignmentListItem {
  assignmentId: number;
  homeworkId: number;
  homeworkTitle: string;
  dueAt: string | null;
  status: string;
  assignedAt: string;
}

export interface SubmissionFileResponse {
  fileId: number;
  originalFilename: string;
  contentType: string;
  sizeBytes: number;
}

export interface LatestSubmissionResponse {
  submissionId: number;
  attemptNo: number;
  textResult: string | null;
  submittedAt: string;
  files: SubmissionFileResponse[];
}

export interface ExerciseWithSubmission {
  exerciseId: number;
  orderIndex: number;
  instructionText: string;
  createdAt: string;
  imagePath: string | null;
  latestSubmission: LatestSubmissionResponse | null;
}

export interface StudentAssignmentDetails {
  assignmentId: number;
  status: string;
  assignedAt: string;
  homeworkId: number;
  homeworkTitle: string;
  homeworkDescription: string | null;
  dueAt: string | null;
  exercises: ExerciseWithSubmission[];
}

export interface SubmissionCreatedResponse {
  submissionId: number;
  attemptNo: number;
  submittedAt: string;
  textResult: string | null;
  fileIds: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  health() {
    return this.http.get<HealthResponse>(`${this.baseUrl}/api/v1/health`);
  }

  createHomework(body: CreateHomeworkRequest) {
    return this.http.post<HomeworkResponse>(`${this.baseUrl}/api/v1/teacher/homeworks`, body);
  }

  getAllHomeworks() {
    return this.http.get<HomeworkResponse[]>(`${this.baseUrl}/api/v1/teacher/homeworks`);
  }

  addExercise(homeworkId: number, instructionText: string, imageFile?: File | null) {
  const formData = new FormData();
  formData.append('instructionText', instructionText);

  if (imageFile) {
    formData.append('image', imageFile);
  }

  return this.http.post<any>(
    `${this.baseUrl}/api/v1/teacher/homeworks/${homeworkId}/exercises`,
    formData
  );
}

  getExercises(homeworkId: number) {
    return this.http.get<ExerciseResponse[]>(
      `${this.baseUrl}/api/v1/teacher/homeworks/${homeworkId}/exercises`
    );
  }

  assignHomework(homeworkId: number, body: CreateAssignmentRequest) {
    return this.http.post<AssignmentResponse[]>(
      `${this.baseUrl}/api/v1/teacher/homeworks/${homeworkId}/assignments`,
      body
    );
  }

  getStudents() {
    return this.http.get<StudentResponse[]>(`${this.baseUrl}/api/v1/teacher/students`);
  }

  // --- Student endpoints ---

  getMyAssignments() {
    return this.http.get<StudentAssignmentListItem[]>(`${this.baseUrl}/api/v1/student/assignments`);
  }

  getAssignmentDetails(assignmentId: number) {
    return this.http.get<StudentAssignmentDetails>(
      `${this.baseUrl}/api/v1/student/assignments/${assignmentId}`
    );
  }

  submitExercise(assignmentId: number, exerciseId: number, textResult: string | null, files: File[]) {
    const formData = new FormData();
    if (textResult) {
      formData.append('textResult', textResult);
    }
    for (const file of files) {
      formData.append('files', file);
    }
    return this.http.post<SubmissionCreatedResponse>(
      `${this.baseUrl}/api/v1/student/assignments/${assignmentId}/exercises/${exerciseId}/submissions`,
      formData
    );
  }
}

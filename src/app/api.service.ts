import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface HealthResponse {
  status: string;
}

export interface CreateHomeworkRequest {
  teacherId: number;
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

  addExercise(homeworkId: number, body: CreateExerciseRequest) {
    return this.http.post<any>(
      `${this.baseUrl}/api/v1/teacher/homeworks/${homeworkId}/exercises`,
      body
    );
  }
}
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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  health() {
    const url = `${this.baseUrl}/api/v1/health`;
    return this.http.get<HealthResponse>(url);
  }

  createHomework(body: CreateHomeworkRequest) {
    const url = `${this.baseUrl}/api/v1/teacher/homeworks`;
    return this.http.post<HomeworkResponse>(url, body);
  }
}
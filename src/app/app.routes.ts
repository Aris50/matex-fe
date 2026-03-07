import { Routes } from '@angular/router';
import { HealthComponent } from './pages/health/health.component';
import { TeacherCreateHomework } from './pages/teacher-create-homework/teacher-create-homework';
import { Landing } from './pages/landing/landing';
import { TeacherAddExercise } from './pages/teacher-add-exercise/teacher-add-exercise';
import { TeacherAssignHomework } from './pages/teacher-assign-homework/teacher-assign-homework';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'health', component: HealthComponent },
  { path: 'teacher/create-homework', component: TeacherCreateHomework },
  { path: 'teacher/add-exercise', component: TeacherAddExercise },
  { path: 'teacher/assign-homework', component: TeacherAssignHomework }
];
import { Routes } from '@angular/router';
import { HealthComponent } from './pages/health/health.component';
import { TeacherCreateHomework } from './pages/teacher-create-homework/teacher-create-homework';
import { Landing } from './pages/landing/landing';
import { TeacherAddExercise } from './pages/teacher-add-exercise/teacher-add-exercise';
import { TeacherAssignHomework } from './pages/teacher-assign-homework/teacher-assign-homework';
import { TeacherViewHomeworks } from './pages/teacher-view-homeworks/teacher-view-homeworks';
import { LoginPage } from './pages/login/login';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', component: Landing, canActivate: [authGuard] },
  { path: 'health', component: HealthComponent },
  { path: 'teacher/create-homework', component: TeacherCreateHomework, canActivate: [roleGuard('OWNER', 'TEACHER')] },
  { path: 'teacher/add-exercise', component: TeacherAddExercise, canActivate: [roleGuard('OWNER', 'TEACHER')] },
  { path: 'teacher/assign-homework', component: TeacherAssignHomework, canActivate: [roleGuard('OWNER', 'TEACHER')] },
  { path: 'teacher/view-homeworks', component: TeacherViewHomeworks, canActivate: [roleGuard('OWNER', 'TEACHER')] }
];

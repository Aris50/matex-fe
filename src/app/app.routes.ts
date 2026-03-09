import { Routes } from '@angular/router';
import { HealthComponent } from './pages/health/health.component';
import { TeacherCreateHomework } from './pages/teacher-create-homework/teacher-create-homework';
import { Landing } from './pages/landing/landing';
import { TeacherAddExercise } from './pages/teacher-add-exercise/teacher-add-exercise';
import { TeacherAssignHomework } from './pages/teacher-assign-homework/teacher-assign-homework';
import { TeacherViewHomeworks } from './pages/teacher-view-homeworks/teacher-view-homeworks';
import { TeacherStudents } from './pages/teacher-students/teacher-students';
import { TeacherStudentDetail } from './pages/teacher-student-detail/teacher-student-detail';
import { OwnerAccounts } from './pages/owner-accounts/owner-accounts';
import { LoginPage } from './pages/login/login';
import { StudentDashboard } from './pages/student-dashboard/student-dashboard';
import { StudentAssignments } from './pages/student-assignments/student-assignments';
import { StudentAssignmentDetailsPage } from './pages/student-assignment-details/student-assignment-details';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', component: Landing, canActivate: [authGuard] },
  { path: 'health', component: HealthComponent },

  // Teacher routes
  { path: 'teacher/create-homework', component: TeacherCreateHomework, canActivate: [roleGuard('OWNER', 'TEACHER')] },
  { path: 'teacher/add-exercise', component: TeacherAddExercise, canActivate: [roleGuard('OWNER', 'TEACHER')] },
  { path: 'teacher/assign-homework', component: TeacherAssignHomework, canActivate: [roleGuard('OWNER', 'TEACHER')] },
  { path: 'teacher/view-homeworks', component: TeacherViewHomeworks, canActivate: [roleGuard('OWNER', 'TEACHER')] },
  { path: 'teacher/students', component: TeacherStudents, canActivate: [roleGuard('OWNER', 'TEACHER')] },
  { path: 'teacher/students/:studentId', component: TeacherStudentDetail, canActivate: [roleGuard('OWNER', 'TEACHER')] },

  // Owner routes
  { path: 'owner/accounts', component: OwnerAccounts, canActivate: [roleGuard('OWNER')] },

  // Student routes
  { path: 'student', component: StudentDashboard, canActivate: [roleGuard('STUDENT')] },
  { path: 'student/assignments', component: StudentAssignments, canActivate: [roleGuard('STUDENT')] },
  { path: 'student/assignments/:assignmentId', component: StudentAssignmentDetailsPage, canActivate: [roleGuard('STUDENT')] },
];

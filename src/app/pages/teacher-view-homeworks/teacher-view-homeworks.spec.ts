import { TestBed } from '@angular/core/testing';
import { TeacherViewHomeworks } from './teacher-view-homeworks';
import { ApiService } from '../../api.service';
import { of } from 'rxjs';

describe('TeacherViewHomeworks', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherViewHomeworks],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getAllHomeworks: () =>
              of([
                {
                  id: 1,
                  teacherId: 1,
                  title: 'Math Week 1',
                  description: 'Equations',
                  dueAt: '2026-03-10T18:30:00',
                  createdAt: '2026-03-07T20:00:00Z'
                }
              ]),
            getExercises: () =>
              of([
                {
                  id: 1,
                  homeworkId: 1,
                  orderIndex: 1,
                  instructionText: 'Solve equation x + 2 = 5',
                  createdAt: '2026-03-07T20:00:00Z'
                }
              ])
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherViewHomeworks);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
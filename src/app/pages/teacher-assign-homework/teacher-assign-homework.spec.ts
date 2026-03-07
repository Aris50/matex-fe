import { TestBed } from '@angular/core/testing';
import { TeacherAssignHomework } from './teacher-assign-homework';
import { ApiService } from '../../api.service';
import { of } from 'rxjs';

describe('TeacherAssignHomework', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAssignHomework],
      providers: [
        {
          provide: ApiService,
          useValue: {
            assignHomework: () =>
              of([
                {
                  id: 1,
                  homeworkId: 1,
                  studentId: 2,
                  status: 'ASSIGNED',
                  assignedAt: '2026-03-07T20:00:00Z'
                }
              ])
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherAssignHomework);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
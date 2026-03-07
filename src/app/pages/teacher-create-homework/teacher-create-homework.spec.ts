import { TestBed } from '@angular/core/testing';
import { TeacherCreateHomework } from './teacher-create-homework';
import { ApiService } from '../../api.service';
import { of } from 'rxjs';

describe('TeacherCreateHomework', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCreateHomework],
      providers: [
        {
          provide: ApiService,
          useValue: {
            createHomework: () =>
              of({
                id: 1,
                teacherId: 1,
                title: 'Test',
                description: 'Test',
                dueAt: '2026-03-10T10:00',
                createdAt: '2026-03-10T10:00:00Z'
              })
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherCreateHomework);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
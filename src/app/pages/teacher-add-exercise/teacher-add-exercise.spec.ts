import { TestBed } from '@angular/core/testing';
import { TeacherAddExercise } from './teacher-add-exercise';
import { ApiService } from '../../api.service';
import { of } from 'rxjs';

describe('TeacherAddExercise', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAddExercise],
      providers: [
        {
          provide: ApiService,
          useValue: {
            addExercise: () =>
              of({
                id: 1,
                homeworkId: 1,
                orderIndex: 1,
                instructionText: 'Solve equation x + 2 = 5',
                createdAt: '2026-03-07T20:00:00Z',
                imagePath: 'exercises/1/test.png',
                imageOriginalName: 'test.png',
                imageContentType: 'image/png',
                imageSizeBytes: 12345
              })
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherAddExercise);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
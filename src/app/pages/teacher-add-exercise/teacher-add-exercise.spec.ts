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
                instructionText: 'Solve equation x + 2 = 5'
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
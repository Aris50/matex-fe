import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssignHomework } from './teacher-assign-homework';

describe('TeacherAssignHomework', () => {
  let component: TeacherAssignHomework;
  let fixture: ComponentFixture<TeacherAssignHomework>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAssignHomework],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherAssignHomework);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { HealthComponent } from './health.component';
import { ApiService } from '../../api.service';
import { of } from 'rxjs';

describe('HealthComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            health: () => of({ status: 'ok' }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HealthComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
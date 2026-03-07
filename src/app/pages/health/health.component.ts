import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

type Vm =
  | { state: 'loading' }
  | { state: 'ok'; status: string }
  | { state: 'error'; error: any };

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.component.html',
})
export class HealthComponent {
  vm$!: Observable<Vm>;

  constructor(private api: ApiService) {
    this.vm$ = this.api.health().pipe(
      map((res) => ({ state: 'ok', status: res.status } as Vm)),
      startWith({ state: 'loading' } as Vm),
      catchError((err) => of({ state: 'error', error: err } as Vm))
    );
  }
}
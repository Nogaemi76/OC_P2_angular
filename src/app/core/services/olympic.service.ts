import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { OlympicCountry } from '../models/OlympicCountry'

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error('Found error ' + error.status + ' : ' + error.message);
        this.olympics$.next([]);
        return of([]);
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

}

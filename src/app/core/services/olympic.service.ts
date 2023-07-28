import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/OlympicCountry'

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error('error', error);

        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        //return caught;
        console.log('Caught in CatchError. Throwing error');
        return throwError(() => new Error('Found error ' + error.status + ' : ' + error.message));
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getCountry() {
    console.log('getCountry', this.olympics$.asObservable());
    return this.olympics$.asObservable();
  }
}

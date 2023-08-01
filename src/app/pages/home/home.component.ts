import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, map, of } from 'rxjs';

import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  subscription!: Subscription;
  olympicsData!: OlympicCountry[];

  countryNames!: string[];
  numberOfJOs!: number;
  medalsArray: number[] = [];
  medals!: number;

  clickedCountry: string = '';
  idClickedCountry!: number | undefined;

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.subscription = this.olympics$.pipe(map(value => {
      this.olympicsData = value;

      if(this.olympicsData) {
        this.countryNames = this.olympicsData
          .map((olympicCountry: OlympicCountry) => {
            return olympicCountry.country;
          });

        if (this.olympicsData[0]) {
          this.numberOfJOs = this.olympicsData[0].participations.length;
        };

        this.olympicsData.map((olympicCountry: OlympicCountry) => {
          this.medals = olympicCountry.participations
            .map((a: { medalsCount: number; }) => a.medalsCount)
            .reduce((a:number, b:number)=> a + b,0);

          this.medalsArray.push(this.medals);
          return this.medalsArray;
        });

      } else {
        this.router.navigate(['**']);
      }

    })).subscribe();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

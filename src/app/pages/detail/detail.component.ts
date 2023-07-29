import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map, of } from 'rxjs';

import { OlympicCountry } from 'src/app/core/models/OlympicCountry';
import { Participation } from 'src/app/core/models/Participation';

import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  subscription!: Subscription;

  countryId!: number;
  countryData: OlympicCountry[] = [];
  countryName!: string;
  countryColor!: string;

  participations!: Participation[];
  numberOfparticipations!: number;
  participationYearsArr!: number[];

  totalNumberOfMedals!: number;
  numberOfMedalsArr!: number[];
  totalNumberOfAthletes!: number;

  // Line chart variables
  data: any;
  chartOptions: any;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.countryId = +this.route.snapshot.params['id'];

    this.subscription = this.olympics$
      .pipe(map(element => {
        this.countryData = element.filter(element => element.id === this.countryId);
      }))
      .subscribe();

    if (this.countryData.length !== 0) {

      this.countryName = this.countryData[0].country;
      this.countryColor = this.getCountryColor(this.countryName);

      this.participations = this.countryData[0].participations;
      this.numberOfparticipations = this.countryData[0].participations.length;

      this.participationYearsArr = this.participations
        .map((participation: Participation) => {
          return participation.year;
        });

      this.totalNumberOfMedals = this.sumOfNumbersInArr(this.participations
        .map((a: { medalsCount: number; }) => a.medalsCount));

      this.numberOfMedalsArr = this.participations
        .map((participation: Participation) => {
          return participation.medalsCount;
        });

      this.totalNumberOfAthletes = this.sumOfNumbersInArr(this.participations
        .map((a: { athleteCount: number; }) => a.athleteCount));

    } else {
      this.router.navigate(['**']);
    }

    // Line Chart
    const labels = this.participationYearsArr;
    const chartData = this.numberOfMedalsArr;
    const borderColor = this.countryColor

    this.data = {
      labels: labels,
      datasets: [{
        data: chartData,
        label: '',
        fill: false,
        borderColor: borderColor,
        tension: 0,
      }]
    };

    this.chartOptions = {
      plugins: {
        tooltip: {
          backgroundColor: '#04838F',
          displayColors: false,
          bodyFont: {
            family: 'Yorkten Thin',
            size: 14
          },
          titleFont: {
            family: 'Yorkten Thin',
            size: 14
          },
          bodyAlign: 'center',
          titleAlign: 'center',
          caretSize: 10,
          yAlign: 'bottom',
        },
        legend: {
            display: false,
        },
      },
      layout: {
        autoPadding: false,
        padding: {
          top: 60
        }
      },
      // scales: {
      //     y: {
      //         suggestedMin: 20,
      //         suggestedMax: 150
      //     },
      // }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCountryColor(country: string) {
    switch(country) {
      case 'Italy':
        return '#956065';
      case 'Spain':
        return '#793D52'
      case 'United States':
        return '#89A1DB'
      case 'Germany':
        return '#9780A1'
      case 'France':
        return '#BFE0F1'
      default:
        return '#04838F'
    }
  }

  sumOfNumbersInArr(array: any) {
    return array.reduce((a:number, b:number)=> a + b,0);
  }

}

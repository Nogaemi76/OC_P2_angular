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

  countryData!: any;
  countryName!: string;
  countryColor!: string;

  numberOfparticipations!: number;
  participations!: Participation[];
  participationYearsArr!: number[];

  totalNumberOfAthletes!: number;
  totalNumberOfMedals!: number;
  numberOfMedalsArr!: number[];

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

    const countryId = +this.route.snapshot.params['id'];

    //console.log('countryId', countryId);

    this.subscription = this.olympics$
      .pipe(map(element => {
        this.countryData = element.filter(element => element.id === countryId);
      }))
      .subscribe();

    //console.log('countryData', this.countryData);

    if (this.countryData) {
      console.log('this.countryData', this.countryData);

      this.countryName = this.countryData[0].country;
      this.participations = this.countryData[0].participations;
      this.numberOfparticipations = this.countryData[0].participations.length;

      this.totalNumberOfMedals = this.participations.map((a: { medalsCount: number; }) => a.medalsCount)
              .reduce((a:number, b:number)=> a + b,0);

      //console.log('this.totalNumberOfMedals', this.totalNumberOfMedals);

      this.totalNumberOfAthletes = this.participations.map((a: { athleteCount: number; }) => a.athleteCount)
              .reduce((a:number, b:number)=> a + b,0);

      this.numberOfMedalsArr = this.participations
            .map((participation: Participation) => {
              return participation.medalsCount;
            });
      //console.log('numberOfMedalsArr', this.numberOfMedalsArr);

      this.participationYearsArr = this.participations
            .map((participation: Participation) => {
              return participation.year;
            });
      //console.log('participationYearsArr', this.participationYearsArr);

      this.countryColor = this.getCountryColor(this.countryName);
      //console.log('this.countryColor', this.countryColor);

    }
    else {
      this.router.navigate(['**']);
    }

    // Line Chart
    const labels = this.participationYearsArr;

    this.data = {
      labels: labels,
      datasets: [{
        label: '',
        data: this.numberOfMedalsArr,
        fill: false,
        borderColor: this.countryColor,
        tension: 0,
      }],
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

}

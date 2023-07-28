import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Router } from '@angular/router';

import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  olympicsData!: OlympicCountry[];
  subscription!: Subscription;

  countryNames!: string[];
  numberOfJOs!: number;
  medalsArray: number[] = [];
  medals!: number;
  clickedCountry: string = '';
  idClickedCountry!: number | undefined;

  // Pie chart variables
  data: any;
  chartOptions: any;
  backgroundColor: string[] = ["#956065", "#793D52", "#89A1DB", "#9780A1", "#BFE0F1"];

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.subscription = this.olympics$.subscribe(value => {
      this.olympicsData = value;
      console.log('this.olympicsData', this.olympicsData);
      console.log('this.olympicsData.length', this.olympicsData.length);

      if(this.olympicsData) {
          this.countryNames = this.olympicsData
            .map((olympicCountry: OlympicCountry) => {
              return olympicCountry.country;
            });
        //console.log('this.countryNames', this.countryNames);

        if (this.olympicsData[0]) {
          this.numberOfJOs = this.olympicsData[0].participations.length;
          // console.log('this.numberOfJOs', this.numberOfJOs);
        };

        this.olympicsData.map((olympicCountry: OlympicCountry) => {

            this.medals = olympicCountry.participations
              .map((a: { medalsCount: number; }) => a.medalsCount)
              .reduce((a:number, b:number)=> a + b,0);

            this.medalsArray.push(this.medals);
            return this.medalsArray;
        });
        // console.log('this.medalsArray', this.medalsArray);
      }

      // Pie chart
      this.data = {
        labels: this.countryNames,
        datasets: [
            {
                data: this.medalsArray,
                backgroundColor: this.backgroundColor,
                borderWidth: 0
            }
        ]
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
            position: 'bottom',
          }
        },
        onClick: (e: any) => {

          this.clickedCountry = e.chart.tooltip.title[0];
          console.log(this.clickedCountry);

          this.idClickedCountry = this.olympicsData
            .find(element => element.country === this.clickedCountry)?.id;
          console.log( this.idClickedCountry);

          this.router.navigateByUrl(`detail/${this.idClickedCountry}`);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

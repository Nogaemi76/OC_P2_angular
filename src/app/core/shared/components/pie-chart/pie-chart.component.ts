import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicCountry } from '../../../models/OlympicCountry';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() olympicsData!: OlympicCountry[];
  @Input() countryNames!: string[];
  @Input() medalsArray: number[] = [];

  clickedCountry: string = '';
  idClickedCountry!: number | undefined;

  // Pie chart variables
  data: any;
  chartOptions: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    // Pie Chart Data
    const labels = this.countryNames;
    const chartData = this.medalsArray;

    this.data = {
      labels: labels,
      datasets: [{
          data: chartData,
          backgroundColor: ["#956065", "#793D52", "#89A1DB", "#9780A1", "#BFE0F1"],
          borderWidth: 0
      }]
    };

    // Pie Chart Options

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

            this.idClickedCountry = this.olympicsData
              .find(element => element.country === this.clickedCountry)?.id;

            this.router.navigateByUrl(`detail/${this.idClickedCountry}`);
          }
    };
  }

}

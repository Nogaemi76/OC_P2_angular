import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  // Line chart variables
  data: any;
  chartOptions: any;

  @Input() participationYearsArr!: number[];
  @Input() numberOfMedalsArr!: number[];
  @Input() countryColor!: string;

  constructor() { }

  ngOnInit() {

    // Line Chart Data
    const labels = this.participationYearsArr;
    const chartData = this.numberOfMedalsArr;
    const borderColor = this.countryColor;

    this.data = {
      labels: labels,
      datasets: [{
        data: chartData,
        label: '',
        fill: false,
        borderColor: borderColor,
        tension: 0.1,
      }]
    };

    // Line Chart Options

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

}

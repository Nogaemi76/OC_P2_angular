import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { ChartModule } from 'primeng/chart';
import { DetailComponent } from './pages/detail/detail.component';
import { PieChartComponent } from './core/shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from './core/shared/components/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    DetailComponent,
    PieChartComponent,
    LineChartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

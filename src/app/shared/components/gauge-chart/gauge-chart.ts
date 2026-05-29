import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

@Component({
  selector: 'gauge-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './gauge-chart.html',
  styleUrls: ['./gauge-chart.css']
})
export class GaugeChartComponent implements OnInit, AfterViewInit {
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {};
  public updateFlag: boolean = false;
  public chartInstance!: Highcharts.Chart;

  @Input() public set value(val: number) {
    this._value = val;
    this.updateChart();
  }
  public get value(): number { return this._value; }
  private _value: number = 50;

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.updateChart();
  }

  public chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartInstance = chart;
  };


  public updateChart(): void {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        backgroundColor: 'transparent',
        height: 220,
        spacingTop: 0,
        spacingBottom: 0
      },
      title: {
        text: 'Frequency Hz',
        align: 'left',
        x: 10,
        y: 20,
        style: { fontSize: '16px', fontWeight: '600', color: '#333' }
      },
      credits: { enabled: false },
      pane: {
        startAngle: -90,
        endAngle: 90,
        background: undefined,
        center: ['50%', '85%'],
        size: '110%'
      },
      yAxis: {
        min: 0,
        max: 100,
        tickPixelInterval: 50,
        minorTickLength: 0,
        tickLength: 0,
        labels: {
          distance: 25,
          style: { fontSize: '12px', color: '#333' }
        },
        plotBands: [
          { from: 0, to: 40, color: '#4CAF50', thickness: 25 },
          { from: 40, to: 70, color: '#FFC107', thickness: 25 },
          { from: 70, to: 100, color: '#FF5252', thickness: 25 }
        ]
      },
      series: [{
        name: 'Frequency',
        type: 'gauge',
        data: [this.value],
        pointer: {
          width: 4,
          baseWidth: 8,
          color: '#333',
          length: '80%'
        },
        dataLabels: {
          format: '{y} Hz',
          borderWidth: 0,
          y: -25,
          style: { fontSize: '20px', fontWeight: 'bold', color: '#000' }
        }
      } as any]
    };
  
    this.updateFlag = true;
    this.cdr.detectChanges();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.chartInstance) {
        this.chartInstance.reflow();
      }
    }, 300);
  }
}
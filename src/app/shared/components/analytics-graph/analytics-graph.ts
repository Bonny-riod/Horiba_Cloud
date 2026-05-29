import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import flatpickr from 'flatpickr';

export interface GraphRecord {
  name: string;
  [key: string]: number | string;
}

export interface AnalyticsTableData {
  component: string;
  avg: string;
  min: string;
  max: string;
  limit: string;
  unit: string;
}

@Component({
  selector: 'analytics-graph',
  standalone: true,
  imports: [CommonModule, FormsModule, HighchartsChartModule],
  templateUrl: './analytics-graph.html',
  styleUrls: ['./analytics-graph.css']
})
export class AnalyticsGraph implements OnInit, OnChanges, AfterViewInit {
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {};
  public chartInstance!: Highcharts.Chart;
  public updateFlag: boolean = false;
  public oneToOneFlag: boolean = true;
  public isDateRangeValid: boolean = true; 
  @Input() public title: string = "";
  @Input() public isLoading: boolean = false;

  @Input() set graphData(data: GraphRecord[]) {
    this._graphData = data;
    this.updateGraph();
  }
  get graphData(): GraphRecord[] { return this._graphData; }
  private _graphData: GraphRecord[] = [];

  public tableData: AnalyticsTableData[] = []; 
  @Output() public dateFilterChanged = new EventEmitter<{ start: string, end: string }>();
  @ViewChild('datepicker', { static: false }) private datepicker!: ElementRef;

  private readonly SENSOR_COLORS: { [key: string]: string } = {
    co: '#ffa600', so2: '#00c5ff', nox: '#ff0055', pm10: '#8c4af0', pm25: '#27ae60'
  };

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.updateGraph(); 
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData'] && !changes['graphData'].firstChange) {
      this.updateGraph();
    }
  }

  @Input() public defaultRange: { start: string, end: string } | null = null;

  public ngAfterViewInit(): void {
    const fp = flatpickr(this.datepicker.nativeElement, {
      altInput: true,
      mode: 'range',
      dateFormat: 'Y-m-d',
      altFormat: 'm/d/y',
      onChange: (selectedDates) => {
        this.isDateRangeValid = selectedDates.length === 2;
      }
    });

    if (this.defaultRange) {
      fp.setDate([this.defaultRange.start, this.defaultRange.end]);
    }
  }

  public chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartInstance = chart;
  };

  public applyFilter(dateInput: string): void {
    if (!dateInput || !dateInput.includes("to")) {
      this.isDateRangeValid = false;
      return;
    }
    
    const [start, end] = dateInput.split("to").map(d => d.trim());
    this.dateFilterChanged.emit({ start, end });
  }

  public updateGraph(): void {
    if (!this.graphData || this.graphData.length === 0) {
      this.chartOptions = { title: { text: 'No data available for the selected range' } };
      this.tableData = [];
      return;
    }

    const allKeys = Object.keys(this.graphData[0]);
    const sensorKeys = allKeys.filter(key => 
      !['Date', 'Time', 'name', 'displayTime'].includes(key)
    );

    this.tableData = sensorKeys.map(key => {
      const values = this.graphData.map(d => d[key]).filter((v): v is number => typeof v === 'number');
      
      let minVal = '--';
      let maxVal = '--';
      let avgVal = '--';
      
      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        avgVal = (sum / values.length).toFixed(2);
        
        let min = values[0];
        let max = values[0];
        for (let i = 1; i < values.length; i++) {
          if (values[i] < min) min = values[i];
          if (values[i] > max) max = values[i];
        }
        minVal = min.toFixed(2);
        maxVal = max.toFixed(2);
      }

      return {
        component: key,
        avg: avgVal,
        min: minVal,
        max: maxVal,
        limit: 'N/A',
        unit: 'ppm'
      };
    });

    const dynamicSeries: Highcharts.SeriesOptionsType[] = sensorKeys.map(key => ({
      name: key,
      type: 'line',
      data: this.graphData.map(d => typeof d[key] === 'number' ? (d[key] as number) : null),
      color: this.SENSOR_COLORS[key.toLowerCase()] || undefined
    }));

    this.chartOptions = {
      title: { text: '' },
      xAxis: {
        categories: this.graphData.map(d => String(d.name))
      },
      series: dynamicSeries,
      credits: {
        enabled: false
      }
    };

    this.updateFlag = true;
    this.cdr.detectChanges();
  }
}
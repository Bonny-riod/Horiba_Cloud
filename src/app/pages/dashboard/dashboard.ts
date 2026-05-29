import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { KpiTile } from '../../shared/components/kpi-tile/kpi-tile';
import { GaugeChartComponent } from '../../shared/components/gauge-chart/gauge-chart';
import { AnalyticsGraph } from '../../shared/components/analytics-graph/analytics-graph';
import { LiveDataService } from '../../services/live-data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { isDevMode } from '@angular/core';

interface KpiData {
  label: string;
  value: string | number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpiTile,
    GaugeChartComponent,
    AnalyticsGraph,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {
  public kpis: KpiData[] = [];
  public kpisLoading = true;
  public connectionRate: number = 0;

  public dayRange = { start: '', end: '' };
  public weekRange = { start: '', end: '' };
  public monthRange = { start: '', end: '' };

  public dayGraph: any[] = [];
  public dayTable: any[] = [];
  public weekGraph: any[] = [];
  public weekTable: any[] = [];
  public monthGraph: any[] = [];
  public monthTable: any[] = [];

  private subscriptions: Subscription = new Subscription();
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  constructor(private liveDataService: LiveDataService) { }

  ngOnInit(): void {
    this.initDashboard();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initDashboard(): void {
    this.loadKPIs();
    
    const today = new Date();
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const todayStr = formatDate(today);

    // Calculate Day Range (Yesterday to Today)
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    this.dayRange = { start: formatDate(yesterday), end: todayStr };
    
    // Calculate Week Range (7 days ago to Today)
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    this.weekRange = { start: formatDate(lastWeek), end: todayStr };

    // Calculate Month Range (Dynamically find 1st of current month)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.monthRange = { start: formatDate(startOfMonth), end: todayStr };

    // Trigger loads using the dynamic ranges
    this.loadGraphData('day', this.dayRange.start, this.dayRange.end);
    this.loadGraphData('week', this.weekRange.start, this.weekRange.end);
    this.loadGraphData('month', this.monthRange.start, this.monthRange.end);
  }


  public loadKPIs(): void {
    this.kpisLoading = true;
    const kpiSub = this.liveDataService.getLiveData().subscribe({
      next: (res) => {
        const devices = res.deviceData || [];
        const totalDevices = devices.length;
        const airDevices = devices.filter((d: any) => d.deviceType === 'AAQMS Device');
        const waterDevices = devices.filter((d: any) => d.deviceType === 'WQMS Device');
        const connectedDevices = devices.filter((d: any) => d.deviceStatusId === 1).length;
        
        let totalSensors = 0;
        let connectedSensors = 0; 
        
        devices.forEach((d: any) => {
          if (d.analyzerData) {
            totalSensors += d.analyzerData.length;
            connectedSensors += d.analyzerData.filter((a: any) => a.isValid === 1).length;
          }
        });
        
        this.kpis = [
          { label: 'Total Devices', value: totalDevices, color: '#2371C7' },
          { label: 'Air Devices', value: airDevices.length, color: '#16a34a' },
          { label: 'Water Devices', value: waterDevices.length, color: '#0891b2' },
          { label: 'Connected Devices', value: connectedDevices, color: '#2563eb' },
          { label: 'Disconnected Devices', value: totalDevices - connectedDevices, color: '#dc2626' },
          { label: 'Total Sensors', value: totalSensors, color: '#2371C7' },
          { label: 'Connected Sensors', value: connectedSensors, color: '#16a34a' },
          { label: 'Disconnected Sensors', value: totalSensors - connectedSensors, color: '#dc2626' },
        ];

        this.connectionRate = totalDevices > 0 
          ? Math.round((connectedDevices / totalDevices) * 100) 
          : 0;

        this.kpisLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.kpisLoading = false;
        this.snackBar.open('Failed to load KPI data.', 'Close', { duration: 5000 });
        if (isDevMode()) {
          console.error('CRITICAL: KPI Data Load Failed', err);
        }
        this.kpis = [{ label: 'Error', value: '--', color: 'gray' }];
      }
    });
    this.subscriptions.add(kpiSub);
  }


  public loadGraphData(type: 'day' | 'week' | 'month', startDate: string, endDate: string): void {
    const interval = type === 'month' ? 86400 : 3600;
  
    const graphSub = this.liveDataService.getLoggedData(startDate, endDate, interval).subscribe({
      next: (res: any) => {
        let parsedData: any[] = [];

        if (Array.isArray(res) && res.length > 0) {
          parsedData = this.parseCsvArray(res);
        } else if (typeof res === 'string' && res.trim() !== '') {
          const lines = res.split(/\r?\n/).filter(l => l.trim() !== '');
          parsedData = this.parseCsvArray(lines);
        }

        if (!parsedData || parsedData.length === 0) return;

        const dataUpdate = [...parsedData];
        
        if (type === 'day') { this.dayGraph = dataUpdate; this.dayTable = dataUpdate; }
        else if (type === 'week') { this.weekGraph = dataUpdate; this.weekTable = dataUpdate; }
        else if (type === 'month') { this.monthGraph = dataUpdate; this.monthTable = dataUpdate; }

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.snackBar.open(`Error loading ${type} analytics.`, 'Retry', { duration: 3000 });
        if (isDevMode()) {
          console.error(`❌ Dashboard [${type}]: Request failed`, err);
        }
      }
    });
    this.subscriptions.add(graphSub);
  }
  

  private parseCsvArray(rows: string[]): any[] {
    if (!rows || rows.length < 2) return [];
    const headers = rows[0].split(',').map(h => h.trim());
  
    return rows.slice(1).map((row, rowIndex) => {
      const values = row.split(',');
      const obj: any = {};
      
      headers.forEach((header, index) => {
        const rawVal = values[index] ? values[index].trim() : '';
        if (header !== 'Date' && header !== 'Time' && rawVal !== '' && !isNaN(Number(rawVal))) {
          obj[header] = Number(rawVal);
        } else {
          obj[header] = rawVal || null;
        }
      });
      obj['name'] = obj['Time'] || `Point ${rowIndex}`;
      return obj;
    }).filter(item => item['Date'] !== null);
  }


  public applyDateFilter(range: { start: string, end: string }, type: 'day' | 'week' | 'month'): void {
    if (range.start && range.end) {
      this.loadGraphData(type, range.start, range.end);
    }
  }
}
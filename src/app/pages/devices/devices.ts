import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { DeviceService } from '../../core/services/device'; 
import { DeviceData, LiveDataResponse } from '../../models/live-data.model';
import { Subscription, interval, startWith, switchMap, catchError, of } from 'rxjs';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './devices.html',
  styleUrls: ['./devices.css']
})
export class DevicesComponent implements OnInit, OnDestroy {
  private deviceService = inject(DeviceService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  public devices: DeviceData[] = [];
  public lastUpdated: string = '';
  public expandedDeviceId: any = null;
  public errorMessage: string | null = null; 
  public isLoading: boolean = true;          
  
  private dataSubscription?: Subscription;

  public ngOnInit(): void {
    this.dataSubscription = interval(1000).pipe(
      startWith(0),
      switchMap(() => this.deviceService.getLiveData().pipe(
        catchError(err => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load device data. Please try again later.'; 
          if (isDevMode()) {
            console.error('API Error:', err);
          }
          this.cdr.detectChanges();
          return of(null);
        })
      ))
    ).subscribe((response: LiveDataResponse | null) => {
      if (response && response.deviceData) {
        this.isLoading = false;
        this.errorMessage = null;
        this.devices = response.deviceData;
        this.lastUpdated = response.dateTime;
        this.cdr.detectChanges();
      }
    });
  }

  public toggleExpand(event: Event, deviceId: any): void {
    event.stopPropagation();
    this.expandedDeviceId = this.expandedDeviceId === deviceId ? null : deviceId;
  }

  public loadData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.deviceService.getLiveData().subscribe({
      next: (response: LiveDataResponse) => {
        this.isLoading = false;
        if (response && response.deviceData) {
          this.devices = response.deviceData;
          this.lastUpdated = response.dateTime;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load device data. Please try again later.'; 
        if (isDevMode()) {
          console.error('API Error:', err);
        }
        this.cdr.detectChanges();
      }
    });
  }

  public getDeviceImage(device: any): string {
    const name = (device?.deviceName || '').toLowerCase().trim().replace(/[\s_]+/g, '-');
    return name ? `assets/device-images/${name}.png` : 'assets/device-images/placeholder.svg';
  }

  public onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallback']) { return; }
    img.dataset['fallback'] = '1';
    img.src = 'assets/device-images/placeholder.svg';
  }

  public goToDeviceDetail(device: any): void {
    this.router.navigate(['/device-detail', device.deviceId], {
      state: { data: { ...device, lastUpdated: (this.lastUpdated ?? '').replace(' ', 'T') } }
    });
  }

  public ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
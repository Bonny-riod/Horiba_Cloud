import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isDevMode } from '@angular/core';
import { Subscription, interval, startWith, switchMap, catchError, of } from 'rxjs';
import { DeviceService } from '../../core/services/device';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-detail.html',
  styleUrls: ['./device-detail.css']
})
export class DeviceDetailComponent implements OnInit, OnDestroy {
  public device: any = null;
  private deviceService = inject(DeviceService);
  private cdr = inject(ChangeDetectorRef);
  private dataSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state?.['data'];

    if (stateData) {
      this.device = stateData;
    }
  }

  public ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;
    
    if (!id && !this.device) {
      if (isDevMode()) {
        console.error('Device ID is null and no state data found. Redirecting...');
      }
      this.router.navigate(['/devices']);
      return;
    }

    if (id) {
      this.dataSubscription = interval(1000).pipe(
        startWith(0),
        switchMap(() => this.deviceService.getLiveData().pipe(
          catchError(err => {
            if (isDevMode()) {
              console.error('API Error:', err);
            }
            return of(null);
          })
        ))
      ).subscribe((response) => {
        if (response && response.deviceData) {
          const deviceData = response.deviceData.find((d: any) => d.deviceId === id);
          if (deviceData) {
            this.device = { ...deviceData, lastUpdated: response.dateTime };
            this.cdr.detectChanges();
          }
        }
      });
    }
  }

  public goBack(): void {
    this.router.navigate(['/devices']);
  }

  public ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LiveDataResponse, DeviceData } from '../../models/live-data.model';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  // Replace with your actual API endpoint
  private apiUrl = 'http://localhost:5000/aaqms/getLiveData'; 

  constructor(private http: HttpClient) {}

  /**
   * Fetches the entire live data payload from the server
   */
  getLiveData(): Observable<LiveDataResponse> {
    return this.http.get<LiveDataResponse>(`${this.apiUrl}?_t=${new Date().getTime()}`);
  }

  /**
   * Fetches all devices by extracting the array from the response
   */
  getAllDevices(): Observable<DeviceData[]> {
    return this.getLiveData().pipe(
      map(response => response.deviceData)
    );
  }

  /**
   * Finds a specific device by its ID from the live stream
   */
  getDeviceById(id: number): Observable<DeviceData | undefined> {
    return this.getAllDevices().pipe(
      map(devices => devices.find(d => d.deviceId === id))
    );
  }

  /**
   * Note: toggleDeviceStatus usually requires a POST/PUT request 
   * to a real backend to persist changes.
   */
  toggleDeviceStatus(id: number): Observable<any> {
    // This is a placeholder for your actual toggle API call
    return this.http.post(`${this.apiUrl}/toggle/${id}`, {});
  }
}
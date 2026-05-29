import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LiveDataResponse, LoggedDataRecord } from '../models/live-data.model';

@Injectable({
  providedIn: 'root'
})
export class LiveDataService {
  private  baseUrl = 'http://localhost:5000/aaqms';

  constructor(private http: HttpClient) {}


  public getLiveData(): Observable<LiveDataResponse> {
    return this.http.get<LiveDataResponse>(`${this.baseUrl}/getLiveData`).pipe(
      catchError(this.handleError) 
    );
  }


  public getLoggedData(startDate: string, endDate: string, intervalSeconds: number): Observable<LoggedDataRecord[]> {
    const url = `${this.baseUrl}/getLoggedData/${startDate}/${endDate}/${intervalSeconds}`;
    
    return this.http.get<LoggedDataRecord[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  apiUrl = 'http://localhost/forecastapi/api';

  constructor(private http: HttpClient) { }

  getweather(city: string): Observable<any> {
    const url = `${this.apiUrl}/getweather`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('city', city);

    return this.http.post(url, body.toString(), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  get5DayForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}/fivedaysweather`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('city', city);

    return this.http.post(url, body.toString(), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/getweatherbycoordinates`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('lat', lat.toString());
    body.set('lon', lon.toString());

    return this.http.post(url, body.toString(), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  get5DayForecastByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/fivedaysweatherbycoordinates`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('lat', lat.toString());
    body.set('lon', lon.toString());

    return this.http.post(url, body.toString(), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
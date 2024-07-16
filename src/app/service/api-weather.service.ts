import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  apiUrl = 'http://localhost/weatherapi/api';

  constructor(private http: HttpClient) { }

  getweather(city: string): Observable<any> {
    const url = `${this.apiUrl}/getweather`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('city', city);

    return this.http.post(url, body, { headers });
  }

  get5DayForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}/fivedaysweather`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('city', city);

    return this.http.post(url, body, { headers });
  }


  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/getweatherbycoordinates`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams().set('lat', lat)
                               .set('lon', lon);

    return this.http.post(url, body, { headers });
  }

  get5DayForecastByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/fivedaysweatherbycoordinates`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams().set('lat', lat)
                               .set('lon', lon);
             
    return this.http.post(url, body, { headers });
  }


  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {
  private apiKey = '4c1f4d5660d2311c4c1376f0e6ac22ae';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private geocodingUrl = 'https://api.openweathermap.org/geo/1.0/reverse';

  constructor(private http: HttpClient) { }

  getweather(city: string): Observable<any> {
    const url = `${this.weatherUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  get5DayForecast(city: string): Observable<any> {
    const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  get5DayForecastByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.forecastUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  reverseGeocode(lat: number, lon: number): Observable<any> {
    const url = `${this.geocodingUrl}?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}

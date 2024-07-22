import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiWeatherService } from '../service/api-weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  searchForm: FormGroup;
  weather: any;
  forecast: any;
  currentCity: string = '';
  currentState: string = '';
  selectedTemperatureUnit: string = 'celsius'; // default unit
  private cache: Map<string, any> = new Map(); // Add cache

  constructor(private fb: FormBuilder, private weatherService: ApiWeatherService) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Retrieve stored data
    this.currentCity = localStorage.getItem('currentCity') || '';
    this.selectedTemperatureUnit = localStorage.getItem('temperatureUnit') || 'celsius';

    // Load weather and forecast if available
    const storedWeather = localStorage.getItem('weather');
    const storedForecast = localStorage.getItem('forecast');
    if (storedWeather) {
      this.weather = JSON.parse(storedWeather);
    }
    if (storedForecast) {
      this.forecast = JSON.parse(storedForecast);
    }

    // Load temperature unit from localStorage
    const savedUnit = localStorage.getItem('temperatureUnit');
    if (savedUnit) {
      this.selectedTemperatureUnit = savedUnit;
    }
    
    // Optionally, show current location on initialization
    if (!this.currentCity) {
      this.showLocation();
    }
  }

  searchWeather(): void {
    const city = this.searchForm.get('city')?.value.trim();
    if (city) {
      if (this.cache.has(city)) { // Check cache first
        const cachedData = this.cache.get(city);
        this.weather = cachedData.weather;
        this.forecast = cachedData.forecast;
        this.currentCity = city;
        this.currentState = cachedData.state || '';
      } else {
        this.weatherService.getweather(encodeURIComponent(city)).subscribe(
          data => {
            if (data && data.main) {
              this.weather = data;
              this.currentCity = city;
              this.currentState = data.state || '';
              this.fetch5DayForecast(city, true);
            } else {
              console.error('Invalid weather data', data);
            }
          },
          error => {
            console.error('API error', error);
          }
        );
      }
    } else {
      console.error('City name cannot be empty');
    }
  }

  fetch5DayForecast(city: string, cacheData: boolean = false): void {
    this.weatherService.get5DayForecast(encodeURIComponent(city)).subscribe(
      data => {
        if (data && data.list) {
          this.forecast = this.filterForecastData(data.list);
          if (cacheData) {
            this.cache.set(city, { weather: this.weather, forecast: this.forecast, state: this.currentState }); // Cache data
            localStorage.setItem('weather', JSON.stringify(this.weather));
            localStorage.setItem('forecast', JSON.stringify(this.forecast));
            localStorage.setItem('currentCity', this.currentCity);
          }
        } else {
          console.error('Invalid forecast data', data);
        }
      },
      error => {
        console.error('API error', error);
      }
    );
  }

  filterForecastData(data: any[]): any[] {
    const dailyForecast: any[] = [];
    const dateMap = new Set<string>();

    data.forEach(entry => {
      const date = entry.dt_txt.split(' ')[0];

      if (!dateMap.has(date)) {
        dateMap.add(date);
        dailyForecast.push(entry);
      }
    });

    return dailyForecast;
  }

  showLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
            data => {
              if (data && data.main) {
                this.weather = data;
                this.currentCity = data.name;
                this.currentState = data.state || '';
                this.fetch5DayForecastByCoordinates(lat, lon, true);
              } else {
                console.error('Invalid weather data', data);
              }
            },
            error => {
              console.error('API error', error);
            }
          );
        },
        (error) => {
          console.error('Geolocation error: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  fetch5DayForecastByCoordinates(lat: number, lon: number, cacheData: boolean = false): void {
    this.weatherService.get5DayForecastByCoordinates(lat, lon).subscribe(
      data => {
        if (data && data.list) {
          this.forecast = this.filterForecastData(data.list);
          if (cacheData) {
            this.cache.set(this.currentCity, { weather: this.weather, forecast: this.forecast, state: this.currentState }); // Cache data
            localStorage.setItem('weather', JSON.stringify(this.weather));
            localStorage.setItem('forecast', JSON.stringify(this.forecast));
            localStorage.setItem('currentCity', this.currentCity);
          }
        } else {
          console.error('Invalid forecast data', data);
        }
      },
      error => {
        console.error('API error', error);
      }
    );
  }

  convertToFahrenheit(celsius: number): string {
    return ((celsius * 9/5) + 32).toFixed(1);
  }

  onTemperatureUnitChange(): void {
    // Save the selected unit to localStorage
    localStorage.setItem('temperatureUnit', this.selectedTemperatureUnit);
  }
}

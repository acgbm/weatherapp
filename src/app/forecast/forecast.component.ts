import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiWeatherService } from '../service/api-weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit {
  searchForm: FormGroup;
  weather: any;
  forecast: any;
  currentCity: any;
  currentState: any;
  selectedTemperatureUnit: string = 'celsius';

  constructor(private fb: FormBuilder, private weatherService: ApiWeatherService) {
    this.searchForm = this.fb.group({
      city: ['']
    });
  }

 ngOnInit(){
  this.showLocation();
  }

  searchWeather() {
    const city = this.searchForm.get('city')?.value.trim();
    if (city) {
      this.weatherService.getweather(city).subscribe(
        data => {
          if (data && data.main) {
            this.weather = data;
            this.currentCity = city;
            this.currentState = data.state || '';
            this.fetch5DayForecast(city);
          }
        },
      );
    } else {
      console.error('City name cannot be empty');
    }
  }

  fetch5DayForecast(city: string) {
    this.weatherService.get5DayForecast(encodeURIComponent(city)).subscribe(
      data => {
        if (data && data.list) {
          this.forecast = this.filterForecastData(data.list);
        } else {
          console.error('Invalid forecast data', data);
        }
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

  showLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
          data => {
            if (data && data.main) {
              this.weather = data;
              this.currentCity = data.name;
              this.currentState = data.state || '';
              this.fetch5DayForecastByCoordinates(lat, lon);
            } else {
              console.error('Invalid weather data', data);
            }
          }
        );
      }, (error) => {
        console.error('Geolocation error: ', error);
      });
    } else {
      console.error('SOmething is wrong.');
    }
  }


  fetch5DayForecastByCoordinates(lat: number, lon: number) {
    this.weatherService.get5DayForecastByCoordinates(lat, lon).subscribe(
      data => {
        if (data && data.list) {
          this.forecast = this.filterForecastData(data.list);
        } else {
          console.error('Invalid forecast data', data);
        }
      },
      error => {
        console.error('Invalid data please check your parameters', error);
      }
    );
  }

  convertToFahrenheit(celsius: number): string {
    return ((celsius * 9 / 5) + 32).toFixed(1);
  }
}
export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
    temp_kf?: number;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
  }
  
  export interface ForecastList {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: { all: number };
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: { '3h': number };
    sys: { pod: string };
    dt_txt: string;
  }
  
  export interface ForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastList[];
  }
  
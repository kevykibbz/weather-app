export interface WeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_deg: number;
    clouds: number;
    visibility: number;
    conditions: string;
    description: string;
    icon: string;
    location: string;
    country: string;
    sunrise: number;
    sunset: number;
    timezone: number;
    dt: number;
    coord: {
      lon: number;
      lat: number;
    };
  }
  
  export interface WeatherResponse {
    success: boolean;
    data: WeatherData;
    message: string;
  }
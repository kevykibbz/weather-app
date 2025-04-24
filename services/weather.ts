import axios from "axios";
import { WeatherResponse } from "@/types/weather";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://laravel-weather-api-6faba15eaee0.herokuapp.com/api"
    : "http://localhost:8000/api";

export const fetchWeather = async (
  location: string
): Promise<WeatherResponse> => {
  try {
    // Check if location is coordinates (lat,lon) or city name
    const isCoords = location.includes(",");
    const params = isCoords
      ? { lat: location.split(",")[0], lon: location.split(",")[1] }
      : { city: location };

    const response = await axios.get(`${API_BASE_URL}/weather`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

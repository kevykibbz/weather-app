"use client";

import { useState, useEffect } from "react";
import { fetchWeather } from "@/services/weather";
import { WeatherData } from "@/types/weather";
import { WeatherCard } from "@/components/weather-card/weather-card";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch default location (Kenya) on initial load
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      try {
        const response = await fetchWeather("Kenya");
        if (response.success) {
          setWeather(response.data);
        } else {
          setError(response.message || "Failed to fetch default weather data");
        }
      } catch (err) {
        setError(
          "Failed to fetch default weather data. Please try searching manually."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefaultWeather();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchWeather(searchQuery);
      console.log("response:", response);
      if (response.success) {
        setWeather(response.data);
      } else {
        setError(response.message || "Failed to fetch weather data");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {error ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
                <div className="flex flex-col items-center text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Weather Data Unavailable
                  </h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <WeatherCard
              weather={weather!}
              unit={unit}
              onUnitChange={setUnit}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
    </>
  );
}

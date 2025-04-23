"use client";

import { useState, useEffect } from 'react';
import { fetchWeather } from '@/services/weather';
import { WeatherData } from '@/types/weather';
import { WeatherCard } from '@/components/weather-card/weather-card';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch default location (Kenya) on initial load
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      try {
        const response = await fetchWeather('Kenya');
        if (response.success) {
          setWeather(response.data);
        } else {
          setError(response.message || 'Failed to fetch default weather data');
        }
      } catch (err) {
        setError('Failed to fetch default weather data. Please try searching manually.');
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
      console.log('response:', response);
      if (response.success) {
        setWeather(response.data);
      } else {
        setError(response.message || 'Failed to fetch weather data');
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
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
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
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
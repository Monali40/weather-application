'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import Footer from '@/components/Footer';
import Link from 'next/link';


export default function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  async function fetchAllWeather(params) {
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);

    const query = new URLSearchParams(params).toString();

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`/api/weather?${query}`),
        fetch(`/api/forecast?${query}`),
      ]);

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      if (!weatherRes.ok) {
        setError(weatherData.error || 'Something went wrong.');
      } else {
        setWeather(weatherData);
        setForecast(forecastData);
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(location) {
    fetchAllWeather({ location });
  }

  function handleLocationSearch(lat, lon) {
    fetchAllWeather({ lat, lon });
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-2">🌤️ Weather App</h1>
      
      <div className="text-center mb-4">
    <Link href="/history" className="text-blue-500 underline text-sm hover:text-blue-700">
      View Weather History & Saved Queries →
    </Link>
    </div>
    
      <p className="text-center text-gray-500 text-sm mb-8">Search any city, zip code, or use your current location</p>
      
      <SearchBar
        onSearch={handleSearch}
        onLocationSearch={handleLocationSearch}
        loading={loading}
      />
      {loading && <LoadingSpinner />}
      <ErrorMessage message={error} />
      <WeatherCard data={weather} />
      <ForecastCard data={forecast} />
      <Footer />
    </main>
  );
}
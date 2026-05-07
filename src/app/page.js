'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchWeather(params) {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/weather?${query}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        setWeather(data);
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(location) {
    fetchWeather({ location });
  }

  function handleLocationSearch(lat, lon) {
    fetchWeather({ lat, lon });
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
      <SearchBar
        onSearch={handleSearch}
        onLocationSearch={handleLocationSearch}
        loading={loading}
      />
      {loading && <p className="text-center mt-6 text-gray-500">Loading...</p>}
      <ErrorMessage message={error} />
      <WeatherCard data={weather} />
    </main>
  );
}
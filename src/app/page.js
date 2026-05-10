'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import Footer from '@/components/Footer';
import Link from 'next/link';
import YouTubeVideos from '@/components/YouTubeVideos';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState([]); // stores YouTube video results
  const [cityName, setCityName] = useState(''); // stores resolved city name for YouTube search

  async function fetchAllWeather(params) {
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);
    setVideos([]); // clear previous videos on new search
    setCityName(''); // clear previous city name on new search

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
        setCityName(weatherData.name); // save the resolved city name from OpenWeatherMap

        // fetch YouTube videos for the resolved city name
        const youtubeRes = await fetch(`/api/youtube?location=${encodeURIComponent(weatherData.name)}`);
        const youtubeData = await youtubeRes.json();
        if (youtubeData.videos) setVideos(youtubeData.videos); // store videos in state
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

      <p className="text-center text-gray-500 text-sm mb-8">
        Search any city, zip code, or use your current location
      </p>

      <SearchBar
        onSearch={handleSearch}
        onLocationSearch={handleLocationSearch}
        loading={loading}
      />
      {loading && <LoadingSpinner />}
      <ErrorMessage message={error} />
      <WeatherCard data={weather} />
      <ForecastCard data={forecast} />
      <YouTubeVideos videos={videos} location={cityName} /> {/*pass videos and city name */}
      <Footer />
    </main>
  );
}
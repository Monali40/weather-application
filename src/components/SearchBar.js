'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch, onLocationSearch, loading }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a location.');
      return;
    }
    setError('');
    onSearch(input.trim());
  }

  function handleGPS() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationSearch(latitude, longitude);
      },
      () => {
        setError('Unable to get your location. Please allow location access.');
      }
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city, zip code, or coordinates..."
          className="flex-1 border border-gray-300 rounded px-4 py-2 text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <button
        onClick={handleGPS}
        disabled={loading}
        className="text-sm text-blue-500 underline hover:text-blue-700 disabled:opacity-50"
      >
        Use My Current Location
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
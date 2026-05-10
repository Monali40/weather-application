'use client';

import { useState } from 'react';

export default function WeatherQueryForm({ onSaved }) {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, startDate, endDate, notes }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        setSuccess(`Saved! Weather for ${data.data.location}, ${data.data.country} added to history.`);
        setLocation('');
        setStartDate('');
        setEndDate('');
        setNotes('');
        if (onSaved) onSaved(); // tells parent to refresh the history table
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Save a Weather Query</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, zip code, or coordinates"
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Start Date</label>
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">End Date</label>
            <input
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Notes (optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Planning a trip"
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50 font-semibold"
        >
          {loading ? 'Saving...' : 'Save Weather Query'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mt-3">⚠️ {error}</p>}
      {success && <p className="text-green-600 text-sm mt-3">✓ {success}</p>}
    </div>
  );
}
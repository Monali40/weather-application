import { supabase } from '@/lib/supabase';
import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function POST(request) {
  const body = await request.json();
  const { location, startDate, endDate, notes } = body;

  // --- Validate inputs ---
  if (!location || !startDate || !endDate) {
    return Response.json({ error: 'Location, start date and end date are required.' }, { status: 400 });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(start) || isNaN(end)) {
    return Response.json({ error: 'Invalid date format.' }, { status: 400 });
  }

  if (start > end) {
    return Response.json({ error: 'Start date must be before end date.' }, { status: 400 });
  }

  if (end < today) {
    return Response.json({ error: 'End date cannot be in the past.' }, { status: 400 });
  }

  const diffDays = (end - start) / (1000 * 60 * 60 * 24);
  if (diffDays > 5) {
    return Response.json({ error: 'Date range cannot exceed 5 days (forecast limit).' }, { status: 400 });
  }

  // --- Validate location exists by calling OpenWeatherMap ---
  try {
    const isZipCode = /^\d{5}$/.test(location.trim());
    const query = isZipCode ? `${location.trim()},US` : location.trim();

    const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: query, appid: API_KEY, units: 'metric' },
    });

    const w = weatherRes.data;

    // --- Save to Supabase ---
    const { data, error } = await supabase.from('weather_queries').insert([
      {
        location: w.name,
        country: w.sys.country,
        latitude: w.coord.lat,
        longitude: w.coord.lon,
        start_date: startDate,
        end_date: endDate,
        avg_temp: w.main.temp,
        min_temp: w.main.temp_min,
        max_temp: w.main.temp_max,
        weather_condition: w.weather[0].description,
        humidity: w.main.humidity,
        wind_speed: w.wind.speed,
        notes: notes || null,
      },
    ]).select();

    if (error) {
      return Response.json({ error: 'Failed to save to database.' }, { status: 500 });
    }

    return Response.json({ success: true, data: data[0] }, { status: 201 });

  } catch (err) {
    if (err.response?.status === 404) {
      return Response.json({ error: 'Location not found. Please try a different search.' }, { status: 404 });
    }
    return Response.json({ error: 'Failed to fetch weather data.' }, { status: 500 });
  }
}
import { supabase } from '@/lib/supabase';
import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;
//INSERT- CREATE// --- Route to handle saving weather queries to Supabase ---
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

//GET- READ// --- Route to fetch saved weather queries from Supabase ---
export async function GET() {
  const { data, error } = await supabase
    .from('weather_queries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: 'Failed to fetch records.' }, { status: 500 });
  }

  return Response.json({ data });
}

//EDIT- UPDATE // --- Route to update a saved weather query (e.g. change notes, update location/dates)
export async function PATCH(request) {
  const body = await request.json();
  const { id, startDate, endDate, notes, location } = body;

  if (!id) {
    return Response.json({ error: 'Record ID is required.' }, { status: 400 });
  }

  // --- Validate dates if provided ---
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return Response.json({ error: 'Invalid date format.' }, { status: 400 });
    }

    if (start > end) {
      return Response.json({ error: 'Start date must be before end date.' }, { status: 400 });
    }

    const diffDays = (end - start) / (1000 * 60 * 60 * 24);
    if (diffDays > 5) {
      return Response.json({ error: 'Date range cannot exceed 5 days.' }, { status: 400 });
    }
  }

  // --- Build update object (only update fields that were provided) ---
  const updates = { updated_at: new Date().toISOString() };
  if (startDate) updates.start_date = startDate;
  if (endDate) updates.end_date = endDate;
  if (notes !== undefined) updates.notes = notes;

  // --- If location changed, re-validate and fetch new weather data ---
  if (location) {
    try {
      const isZipCode = /^\d{5}$/.test(location.trim());
      const query = isZipCode ? `${location.trim()},US` : location.trim();

      const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { q: query, appid: API_KEY, units: 'metric' },
      });

      const w = weatherRes.data;
      updates.location = w.name;
      updates.country = w.sys.country;
      updates.latitude = w.coord.lat;
      updates.longitude = w.coord.lon;
      updates.avg_temp = w.main.temp;
      updates.min_temp = w.main.temp_min;
      updates.max_temp = w.main.temp_max;
      updates.weather_condition = w.weather[0].description;
      updates.humidity = w.main.humidity;
      updates.wind_speed = w.wind.speed;
    } catch (err) {
      if (err.response?.status === 404) {
        return Response.json({ error: 'Location not found.' }, { status: 404 });
      }
      return Response.json({ error: 'Failed to fetch weather for new location.' }, { status: 500 });
    }
  }

  // --- Update in Supabase ---
  const { data, error } = await supabase
    .from('weather_queries')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    return Response.json({ error: 'Failed to update record.' }, { status: 500 });
  }

  return Response.json({ success: true, data: data[0] });
}

//DELETE  // --- Route to delete a saved weather query
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

    if (!id) {
    return Response.json({ error: 'Record ID is required.' }, { status: 400 });
  }

    const { error } = await supabase
    .from('weather_queries')
    .delete()
    .eq('id', id);

    if (error) {
    return Response.json({ error: 'Failed to delete record.' }, { status: 500 });
    }

    return Response.json({ success: true, message: 'Record deleted successfully.' });
}
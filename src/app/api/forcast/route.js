import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!API_KEY) {
    return Response.json({ error: 'API key not configured.' }, { status: 500 });
  }

  try {
    let params = { appid: API_KEY, units: 'metric' };

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else if (location) {
      params.q = location;
    } else {
      return Response.json({ error: 'Please provide a location.' }, { status: 400 });
    }

    const response = await axios.get(BASE_URL, { params });
    return Response.json(response.data);

  } catch (error) {
    if (error.response?.status === 404) {
      return Response.json({ error: 'Location not found. Please try a different search.' }, { status: 404 });
    }
    return Response.json({ error: 'Failed to fetch forecast data. Please try again.' }, { status: 500 });
  }
}
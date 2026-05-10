import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';

  // Fetch all records from Supabase
  const { data, error } = await supabase
    .from('weather_queries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: 'Failed to fetch records.' }, { status: 500 });
  }

  // --- JSON export ---
  if (format === 'json') {
    const json = JSON.stringify(data, null, 2);
    return new Response(json, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="weather_queries.json"',
      },
    });
  }

  // --- CSV export ---
  if (format === 'csv') {
    const headers = [
      'id', 'location', 'country', 'latitude', 'longitude',
      'start_date', 'end_date', 'avg_temp', 'min_temp', 'max_temp',
      'weather_condition', 'humidity', 'wind_speed', 'notes', 'created_at'
    ];

    const rows = data.map((r) =>
      headers.map((h) => {
        const val = r[h] ?? '';
        // Wrap in quotes if value contains comma or newline
        return typeof val === 'string' && (val.includes(',') || val.includes('\n'))
          ? `"${val}"`
          : val;
      }).join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="weather_queries.csv"',
      },
    });
  }

  // --- Markdown export ---
  if (format === 'markdown') {
    const header = `| Location | Country | Start Date | End Date | Avg Temp | Condition | Humidity | Wind | Notes |
|---|---|---|---|---|---|---|---|---|`;

    const rows = data.map((r) =>
      `| ${r.location} | ${r.country} | ${r.start_date} | ${r.end_date} | ${r.avg_temp?.toFixed(1)}°C | ${r.weather_condition} | ${r.humidity}% | ${r.wind_speed} m/s | ${r.notes || '—'} |`
    );

    const markdown = `# Weather Queries Export\n\n${header}\n${rows.join('\n')}`;

    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': 'attachment; filename="weather_queries.md"',
      },
    });
  }

  return Response.json({ error: 'Invalid format. Use json, csv, or markdown.' }, { status: 400 });
}
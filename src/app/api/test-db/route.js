import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('weather_queries')
    .select('*')
    .limit(1);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, message: 'Database connected!', data });
}
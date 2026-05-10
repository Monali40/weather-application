import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  if (!location) {
    return Response.json({ error: 'Location is required.' }, { status: 400 });
  }

  if (!YOUTUBE_API_KEY) {
    return Response.json({ error: 'YouTube API key not configured.' }, { status: 500 });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: YOUTUBE_API_KEY,
        q: `${location} travel weather`,
        part: 'snippet',
        type: 'video',
        maxResults: 3,
        relevanceLanguage: 'en',
      },
    });

    const videos = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle,
    }));

    return Response.json({ videos });

  } catch (error) {
    return Response.json({ error: 'Failed to fetch YouTube videos.' }, { status: 500 });
  }
}

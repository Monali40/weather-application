export default function YouTubeVideos({ videos, location }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Videos about {location}
      </h3>
      <div className="flex flex-col gap-3">
        {videos.map((video) => (
          <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 bg-white rounded-xl shadow p-3 hover:shadow-md transition-shadow"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                {video.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
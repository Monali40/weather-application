export default function GoogleMap({ lat, lon, locationName }) {
  if (!lat || !lon) return null;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  // Build the embed URL using coordinates
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lon}&zoom=11&maptype=roadmap`;

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Map of {locationName}
      </h3>
      <div className="rounded-2xl overflow-hidden shadow-md">
        <iframe
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
        />
      </div>
    </div>
  );
}
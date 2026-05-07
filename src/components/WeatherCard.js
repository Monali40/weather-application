export default function WeatherCard({ data }) {
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const country = data.sys.country;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg mx-auto mt-6 text-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{data.name}, {country}</h2>
          <p className="text-gray-500 capitalize">{data.weather[0].description}</p>
        </div>
        <img src={iconUrl} alt={data.weather[0].description} width={80} height={80} />
      </div>

      <div className="text-6xl font-bold my-4">{temp}°C</div>

      <div className="grid grid-cols-2 gap-3 text-sm mt-4">
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-gray-500">Feels Like</p>
          <p className="font-semibold">{feelsLike}°C</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-gray-500">Humidity</p>
          <p className="font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-gray-500">Wind Speed</p>
          <p className="font-semibold">{data.wind.speed} m/s</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-3">
          <p className="text-gray-500">Visibility</p>
          <p className="font-semibold">{(data.visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>
    </div>
  );
}
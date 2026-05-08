import { groupForecastByDay, formatDay } from '@/utils/forecastHelpers';

export default function ForecastCard({ data }) {
  if (!data) return null;

  const days = groupForecastByDay(data.list).slice(0, 5);

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {days.map((day) => (
          <div
            key={day.date}
            className="bg-white rounded-xl shadow p-3 flex flex-col items-center text-center text-gray-800"
          >
            <p className="text-xs font-semibold text-gray-500">{formatDay(day.date)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              width={48}
              height={48}
            />
            <p className="text-sm capitalize text-gray-500">{day.description}</p>
            <p className="font-bold text-sm mt-1">{day.tempMax}°</p>
            <p className="text-xs text-gray-400">{day.tempMin}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
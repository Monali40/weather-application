export function groupForecastByDay(forecastList) {
  const grouped = {};
  forecastList.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });
  return Object.entries(grouped).map(([date, items]) => {
    const midday = items.find((i) => i.dt_txt.includes('12:00:00')) || items[0];
    const temps = items.map((i) => i.main.temp);
    return {
      date,
      icon: midday.weather[0].icon,
      description: midday.weather[0].description,
      tempMax: Math.round(Math.max(...temps)),
      tempMin: Math.round(Math.min(...temps)),
    };
  });
}

export function formatDay(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function ForecastCard({ data }) {
  if (!data) return null;
  const days = groupForecastByDay(data.list).slice(0, 5);
  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-2">
        {days.map((day) => (
          <div key={day.date} className="bg-white rounded-xl shadow p-3 flex flex-col items-center text-center text-gray-800">
            <p className="text-xs font-semibold text-gray-500">{formatDay(day.date)}</p>
            <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} width={48} height={48} />
            <p className="text-sm capitalize text-gray-500">{day.description}</p>
            <p className="font-bold text-sm mt-1">{day.tempMax}°</p>
            <p className="text-xs text-gray-400">{day.tempMin}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
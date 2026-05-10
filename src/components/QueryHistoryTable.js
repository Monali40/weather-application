'use client';

export default function QueryHistoryTable({ records, onDelete, onEdit }) {
  if (!records || records.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8 py-8 bg-white rounded-2xl shadow-md max-w-5xl mx-auto">
        <p className="text-lg">No saved queries yet</p>
        <p className="text-sm mt-1">Use the form above to save your first weather query.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Saved Weather Queries</h2>
        <p className="text-sm text-gray-500">{records.length} record(s) found</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Date Range</th>
              <th className="px-4 py-3">Avg Temp</th>
              <th className="px-4 py-3">Condition</th>
              <th className="px-4 py-3">Humidity</th>
              <th className="px-4 py-3">Wind</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {record.location}, {record.country}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {record.start_date} → {record.end_date}
                </td>
                <td className="px-4 py-3 text-gray-800 font-bold">
                  {record.avg_temp?.toFixed(1)}°C
                </td>
                <td className="px-4 py-3 capitalize text-gray-600">
                  {record.weather_condition}
                </td>
                <td className="px-4 py-3 text-gray-600">{record.humidity}%</td>
                <td className="px-4 py-3 text-gray-600">{record.wind_speed} m/s</td>
                <td className="px-4 py-3 text-gray-400 italic">
                  {record.notes || '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(record)}
                      className="text-blue-500 hover:text-blue-700 text-xs border border-blue-300 rounded px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(record.id)}
                      className="text-red-500 hover:text-red-700 text-xs border border-red-300 rounded px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
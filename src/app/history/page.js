'use client';

import WeatherQueryForm from '@/components/WeatherQueryForm';

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <h1 className="text-3xl font-bold text-center mb-2">Weather History</h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        Save and manage your weather queries
      </p>
      <WeatherQueryForm onSaved={() => {}} />
    </main>
  );
}
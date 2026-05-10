'use client';

import { useState, useEffect, useCallback } from 'react';
import WeatherQueryForm from '@/components/WeatherQueryForm';
import QueryHistoryTable from '@/components/QueryHistoryTable';
import EditQueryModal from '@/components/EditQueryModal';


export default function HistoryPage() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [editingRecord, setEditingRecord] = useState(null);

  //FETCH // --- Function to fetch saved weather queries from Supabase ---
  const fetchRecords = useCallback(async () => {
    setLoadingRecords(true);
    setFetchError('');
    try {
      const res = await fetch('/api/queries');
      const data = await res.json();
      if (!res.ok) {
        setFetchError('Failed to load saved queries.');
      } else {
        setRecords(data.data);
      }
    } catch {
      setFetchError('Network error. Could not load records.');
    } finally {
      setLoadingRecords(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

//DELETE // --- Function to handle deleting a saved weather query ---
  async function handleDelete(id) {
  const confirmed = window.confirm('Are you sure you want to delete this record? This cannot be undone.');
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/queries?id=${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Failed to delete record.');
    } else {
      fetchRecords(); // refresh the table
    }
  } catch {
    alert('Network error. Please try again.');
  }
}
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <h1 className="text-3xl font-bold text-center mb-2">Weather History</h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        Save and manage your weather queries
      </p>

      <WeatherQueryForm onSaved={fetchRecords} />

      <div className="mt-8">
        {loadingRecords ? (
          <p className="text-center text-gray-400">Loading records...</p>
        ) : fetchError ? (
          <p className="text-center text-red-500">{fetchError}</p>
        ) : (
          <QueryHistoryTable
            records={records}
            onEdit={(record) => setEditingRecord(record)}
            onDelete={(id) => handleDelete(id)}
          />
        )}
      </div>

      {editingRecord && (
        <EditQueryModal
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onUpdated={fetchRecords}
        />
      )}

    </main>


  );
}
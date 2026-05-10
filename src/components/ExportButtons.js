'use client';

export default function ExportButtons() {
  function handleExport(format) {
    // Opens the export URL — browser automatically downloads the file
    window.open(`/api/export?format=${format}`, '_blank');
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-3">
        <p className="text-sm font-semibold text-gray-700 mr-2">Export Data:</p>

        <button
          onClick={() => handleExport('json')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Download JSON
        </button>

        <button
          onClick={() => handleExport('csv')}
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Download CSV
        </button>

        <button
          onClick={() => handleExport('markdown')}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Download Markdown
        </button>
      </div>
    </div>
  );
}
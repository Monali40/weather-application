export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-3">
      <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">Fetching weather data...</p>
    </div>
  );
}
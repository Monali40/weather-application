export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg max-w-lg mx-auto mt-4">
      <span className="text-2xl">⚠️</span>
      <div>
        <p className="font-semibold">Something went wrong</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
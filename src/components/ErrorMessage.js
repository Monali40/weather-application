export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-lg mx-auto mt-4 text-center">
      {message}
    </div>
  );
}
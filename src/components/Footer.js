export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 pt-6 pb-8 px-4 max-w-lg mx-auto text-center text-gray-500 text-sm">
      <p className="font-semibold text-gray-700 text-base mb-1">Built by Monali Khot</p>

      <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4 text-left">
        <p className="font-semibold text-blue-700 mb-1">About PM Accelerator</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Product Manager Accelerator is the largest PM learning community, helping aspiring and
          experienced product managers accelerate their careers. Through mentorship, coaching,
          job placement support, and hands-on training, PM Accelerator empowers professionals
          to break into and advance in product management at top tech companies.
        </p>
        <a
          href="https://www.linkedin.com/school/product-manager-accelerator/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-xs mt-2 inline-block hover:text-blue-700"
        >
          Visit PM Accelerator on LinkedIn →
        </a>
      </div>
    </footer>
  );
}
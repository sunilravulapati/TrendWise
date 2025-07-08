// src/components/footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} TrendWise. All rights reserved.</p>
        <p className="mt-2 text-gray-400">Built with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
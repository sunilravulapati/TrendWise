// src/app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center bg-gray-50 p-6">
      <h2 className="text-6xl font-bold text-blue-700 mb-4">404</h2>
      <p className="text-xl text-gray-800 mb-6">Article Not Found</p>
      <p className="text-gray-600 mb-8">
        The article you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-md">
        Go back to Homepage
      </Link>
    </div>
  );
}
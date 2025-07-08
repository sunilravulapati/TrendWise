// src/components/SearchBar.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!query.trim()) {
      setMessage('Please enter a search term.');
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (res.ok && data.slug) {
        router.push(`/article/${data.slug}`);
      } else {
        setMessage(data.message || 'No article found for your search.');
      }
    } catch (error) {
      console.error('Error during search:', error);
      setMessage('An error occurred while searching. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-8 md:my-10"> {/* Adjusted vertical margin */}
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-lg"> {/* Increased max-width */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an article..."
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" // More padding, rounded, shadow
          aria-label="Search articles"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // More padding, rounded, shadow, focus styles
        >
          Search
        </button>
      </form>
      {message && (
        <p className={`text-sm ${message.includes('No article found') || message.includes('error') ? 'text-red-600' : 'text-gray-700'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
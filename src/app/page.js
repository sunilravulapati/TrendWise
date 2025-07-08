// src/app/page.js

"use client";

import { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';

async function getArticles(searchTerm = '', limit = 9) { // <--- NEW: Added limit parameter with default
  const params = new URLSearchParams();
  if (searchTerm) {
    params.append('search', encodeURIComponent(searchTerm));
  }
  if (limit) { // Add limit if it exists
    params.append('limit', limit);
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`http://localhost:3000/api/article${queryString}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  return res.json();
}

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticles(searchTerm, 9); // <--- NEW: Pass the limit here
        setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The useEffect will handle the fetch when searchTerm changes
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Welcome to TrendWise</h1>
        
        <form onSubmit={handleSearchSubmit} className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for an article..."
            className="p-2 border border-gray-300 rounded-l-md w-full max-w-md"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Articles</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading articles...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : articles.length > 0 ? (
          <ArticleList articles={articles} />
        ) : (
          <p className="text-center text-gray-600">No articles found matching your search. Try generating one!</p>
        )}
      </main>
    </div>
  );
}
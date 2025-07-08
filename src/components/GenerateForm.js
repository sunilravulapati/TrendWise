'use client';
import { useState } from 'react';

export default function GenerateForm() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setMessage('Please enter a topic.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setMessage('✅ Article generated successfully!');
      setTopic('');
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Generate New Article</h2>

      <input
        type="text"
        placeholder="Enter topic (e.g., AI in Education)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Article'}
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </form>
  );
}

// src/app/components/ArticleCard.js

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ArticleCard({ article }) {
  return (
    <li className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-100 flex flex-col h-full">
      {article.media && article.media.length > 0 && article.media[0].type === 'image' && (
        <div className="mb-4 rounded-md overflow-hidden">
          <Link href={`/article/${article.slug}`}>
            <img
              src={article.media[0].url}
              alt={article.media[0].alt || article.topic}
              className="w-full h-48 object-cover" // <--- Change this line back
            />
          </Link>
        </div>
      )}
      <Link href={`/article/${article.slug}`} className="block">
        <h3 className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors mb-2 leading-tight">
          {article.topic}
        </h3>
      </Link>
      <div className="mt-3 text-gray-800 text-base overflow-hidden flex-grow prose max-w-none prose-blue line-clamp-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Posted on {new Date(article.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}
      </p>
    </li>
  );
}
// src/app/about/page.js

// You don't need "use client" for purely static content pages
// import React from 'react'; // Not strictly needed for simple functional components in Next.js 13+

export const metadata = {
  title: 'About TrendWise Bot',
  description: 'Learn about the TrendWise AI Article Generation Bot, its purpose, and how it works.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <div>
          <h1 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
            About TrendWise Bot
          </h1>
          <p className="mt-4 text-center text-lg text-gray-600">
            Your automated source for trending articles.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-gray-700 text-lg">
            TrendWise is an innovative AI-powered article generation bot designed to keep you informed about the latest trending topics across various fields. Leveraging advanced natural language processing and web-scraping techniques, TrendWise identifies hot trends and crafts comprehensive, engaging articles in real-time.
          </p>
          <p className="text-gray-700 text-lg">
            Our mission is to provide a seamless and effortless way for users to stay updated without sifting through countless news sources. Whether it's technology, sports, politics, or culture, TrendWise is constantly learning and evolving to deliver relevant and high-quality content directly to your screen.
          </p>
          <p className="text-gray-700 text-lg">
            Each article is accompanied by a relevant image fetched from Unsplash, providing a rich visual experience. We also offer a comment section for community engagement, allowing users to share their thoughts and insights on the trending discussions.
          </p>
          <p className="text-gray-700 text-lg font-semibold">
            Dive into the trends with TrendWise – your smart content companion.
          </p>
        </div>
      </div>
    </div>
  );
}
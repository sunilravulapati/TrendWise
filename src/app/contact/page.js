// src/app/contact/page.js

// You don't need "use client" for purely static content pages
// import React from 'react';

export const metadata = {
  title: 'Contact TrendWise Bot',
  description: 'Get in touch with the TrendWise AI Article Generation Bot team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <div>
          <h1 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-4 text-center text-lg text-gray-600">
            We'd love to hear from you!
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-gray-700 text-lg">
            If you have any questions, feedback, or inquiries regarding the TrendWise AI Article Generation Bot, please feel free to reach out to us. We value your input and strive to improve our service based on your suggestions.
          </p>
          <p className="text-gray-700 text-lg">
            You can reach us directly via email:
            <br />
            <a href="mailto:support@trendwisebot.com" className="text-blue-600 hover:underline font-medium">support@trendwisebot.com</a>
          </p>
          <p className="text-gray-700 text-lg">
            We aim to respond to all inquiries within 24-48 business hours. Thank you for your interest in TrendWise!
          </p>
        </div>
      </div>
    </div>
  );
}
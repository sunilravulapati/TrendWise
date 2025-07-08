// src/components/Navbar.js
'use client'; // This component needs client-side interactivity for NextAuth.js and possibly dropdowns

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react'; // For mobile menu toggle

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-700">TrendWise</span>
          {/* You can add an actual logo image here */}
          {/* <img src="/path/to/logo.png" alt="TrendWise Logo" className="h-8 w-auto" /> */}
        </Link>

        {/* Desktop Navigation & Auth */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </Link>
          {/* Example additional links */}
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
            Contact
          </Link>
          {session && (
            <Link href="/generate" className="text-gray-700 hover:text-blue-600 transition-colors">
              Generate Article
            </Link>
          )}

          {/* User Status */}
          {status === 'loading' ? (
            <span className="text-gray-500">Loading...</span>
          ) : session ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 font-medium">Hi, {session.user.name || session.user.email}!</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/api/auth/signin" className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 px-2 pb-3 border-t border-gray-200">
          <Link href="/" className="block text-gray-700 hover:text-blue-600 transition-colors py-2">
            Home
          </Link>
          <Link href="/about" className="block text-gray-700 hover:text-blue-600 transition-colors py-2">
            About
          </Link>
          <Link href="/contact" className="block text-gray-700 hover:text-blue-600 transition-colors py-2">
            Contact
          </Link>
          {session && (
            <Link href="/generate" className="block text-gray-700 hover:text-blue-600 transition-colors py-2">
              Generate Article
            </Link>
          )}
          {status === 'loading' ? (
            <span className="block text-gray-500 py-2">Loading...</span>
          ) : session ? (
            <>
              <span className="block text-gray-800 font-medium py-2">Hi, {session.user.name || session.user.email}!</span>
              <button
                onClick={() => signOut()}
                className="w-full text-left bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/api/auth/signin" className="block bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors text-center">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
// src/app/layout.js
import '../../styles/global.css';
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from '../components/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

// Initialize your Geist fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "TrendWise",
  description: "AI-powered trending topic blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 flex flex-col min-h-screen`}>
        <AuthProvider>
          <Navbar />
          
          <main className="flex-grow max-w-5xl mx-auto px-4 py-6 w-full">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
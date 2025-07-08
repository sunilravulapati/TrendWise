// src/app/layout.js
import '../../styles/global.css'; // ✅ Only CSS
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from '../components/AuthProvider'; // ✅ Client wrapper
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
      {/* Apply font variables to body and ensure a minimum height to enable sticky footer.
        - flex: Makes the body a flex container.
        - flex-col: Arranges its direct children (Navbar, main, Footer) in a vertical column.
        - min-h-screen: Ensures the body always takes up at least 100% of the viewport height.
      */}
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 flex flex-col min-h-screen`}>
        <AuthProvider>
          <Navbar />
          {/* Use <main> tag for main content.
            - flex-grow: This is crucial. It tells the `main` element to take up all available 
                         vertical space *between* the `Navbar` and `Footer`. If the content is short, 
                         `flex-grow` expands `main` to push the `Footer` to the very bottom. 
                         If the content is long, `main` naturally grows, and the footer follows it.
            - w-full: Ensures the `main` element takes the full width available within its flex container (the body), 
                      before `max-w-5xl` and `mx-auto` center its content.
          */}
          <main className="flex-grow max-w-5xl mx-auto px-4 py-6 w-full">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
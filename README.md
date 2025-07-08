# TrendWise

**AI-Powered Trending Article Bot**

---

## 🚀 Overview

TrendWise is an innovative web application that leverages AI to automatically generate articles on trending topics. It integrates with Google Trends to identify hot subjects, uses Google's Gemini AI to craft engaging content, and fetches relevant images from Unsplash. Users can explore trending articles, search for specific topics, and authenticated users can even trigger article generation. The application is built with Next.js, uses MongoDB for data storage, and is deployed on Vercel with scheduled article generation via Vercel Cron Jobs.

---

## ✨ Features

* **AI-Powered Article Generation:** Automatically creates articles using Google's Gemini AI based on trending topics.
* **Google Trends Integration:** Fetches daily trending search topics to ensure content relevance.
* **Dynamic Image Fetching:** Integrates with Unsplash to find and include relevant images for generated articles.
* **User Authentication:** Secure sign-in with Google using NextAuth.js.
* **Role-Based Access:** Allows only authenticated users (specifically, the ADMIN_EMAIL) to generate new articles.
* **Article Display:** Browse recent articles on the homepage with a clean, responsive UI.
* **Search Functionality:** Find articles by topic.
* **Article Detail Pages:** View full articles with their content and associated images.
* **Scheduled Article Generation:** Vercel Cron Jobs trigger daily generation of new trending articles.
* **Responsive Design:** Optimized for various screen sizes.

---

## 🛠️ Technologies Used

* **Frontend:**
    * [Next.js](https://nextjs.org/) (App Router)
    * [React.js](https://react.dev/)
    * [Tailwind CSS](https://tailwindcss.com/)
* **Backend / API:**
    * [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
    * [Google Gemini API](https://ai.google.dev/gemini-api) (for AI content generation)
    * [Unsplash API](https://unsplash.com/developers) (for image fetching)
    * Node.js (for server-side logic)
* **Authentication:**
    * [NextAuth.js](https://next-auth.js.org/) (for Google OAuth)
* **Database:**
    * [MongoDB](https://www.mongodb.com/) (NoSQL database for storing articles and user sessions)
    * [Mongoose](https://mongoosejs.com/) (MongoDB object modeling for Node.js)
* **Deployment & Scheduling:**
    * [Vercel](https://vercel.com/) (for deployment and Cron Jobs)
* **Utility:**
    * [Cheerio](https://cheerio.js.org/) (for web scraping Google Trends)
    * [Axios](https://axios-http.com/) (for HTTP requests)

---

## 🚀 Getting Started

Follow these steps to set up and run the TrendWise project locally.

### Prerequisites

* [Node.js](https://nodejs.org/en/download/) (v18.x or higher recommended)
* [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/en/docs/install)
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)
* A [Google Cloud Project](https://console.cloud.google.com/) for Gemini API Key and Google OAuth Credentials
* An [Unsplash Developer Account](https://unsplash.com/developers)
* A [GitHub account](https://github.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/](https://github.com/)[Your_Username]/TrendWise.git
    cd TrendWise
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables.

**Important:** For security, **do not commit your `.env` file to Git.** It is already ignored by `.gitignore`.

```env
# MongoDB Connection
MONGODB_URI="your_mongodb_atlas_connection_string"

# Google Gemini API
GEMINI_API_KEY="your_google_gemini_api_key"

# Google OAuth for NextAuth.js
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"

# NextAuth.js Secret and URL
NEXTAUTH_SECRET="your_long_random_string_for_nextauth_secret" # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000" # For local development

# Admin Email for article generation access
ADMIN_EMAIL="your_admin_email@example.com" # User with this email can access /generate route

# Unsplash API
UNSPLASH_ACCESS_KEY="your_unsplash_access_key"

# Google Trends Cookie (Optional, but often needed for scraping)
# This is highly volatile and might require frequent updates.
# Instructions to get:
# 1. Go to [https://trends.google.com/trends/trendingsearches/daily?geo=US](https://trends.google.com/trends/trendingsearches/daily?geo=US) in Incognito mode.
# 2. Open browser DevTools (F12) -> Network tab.
# 3. Refresh the page. Find a request to 'trendingsearches/daily'.

## Demo Video
(https://drive.google.com/file/d/1mjC_Tgsu0sKv-GO_6I_Fnz1QPP2eblSG/view?usp=sharing)

## Deployment
Currently under progress due to backend deployment configuration challenges. Live link will be shared once resolved.

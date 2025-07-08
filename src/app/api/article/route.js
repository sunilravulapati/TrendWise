// src/app/api/article/route.js

import { connectDB } from '../../../../lib/connectDB';
import Article from '../../../../models/Article';
import { generateArticle } from '../../../../lib/gemini';
import { GET as getTrends } from '../trends/route';

export async function POST(req) {
  try {
    const { topic: userTopic, regenerateSlug } = await req.json();

    let finalTopic = userTopic;

    if (!finalTopic) {
      const trendsResponse = await getTrends(new Request('http://localhost:3000/api/trends'));
      
      if (trendsResponse.status !== 200) {
        const errorData = await trendsResponse.json();
        return new Response(JSON.stringify({ message: "Failed to fetch trending topic for generation.", details: errorData.error || "Unknown" }), { status: 500 });
      }

      const trends = await trendsResponse.json();
      if (trends && trends.length > 0) {
        finalTopic = trends[0].title;
      } else {
        return new Response(JSON.stringify({ message: "No trending topics found to generate article." }), { status: 404 });
      }
    }

    let slug = finalTopic.toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-');

    if (!regenerateSlug) {
      let existingArticle = await Article.findOne({ slug });
      let counter = 1;
      while (existingArticle) {
        slug = `${slug}-${counter}`;
        existingArticle = await Article.findOne({ slug });
        counter++;
      }
    }

    await connectDB();

    const content = await generateArticle(finalTopic); // Generate text content first

    let fetchedMedia = [];
    try {
      // --- Fetch images from Unsplash ---
      const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
      if (unsplashAccessKey) {
        const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(finalTopic)}&per_page=1&orientation=landscape`, {
          headers: {
            Authorization: `Client-ID ${unsplashAccessKey}`,
          },
        });

        if (unsplashResponse.ok) {
          const unsplashData = await unsplashResponse.json();
          if (unsplashData.results && unsplashData.results.length > 0) {
            fetchedMedia.push({
              url: unsplashData.results[0].urls.regular, // Using 'regular' size
              alt: unsplashData.results[0].alt_description || finalTopic,
              type: 'image',
            });
          }
        } else {
          console.error(`Unsplash API error: ${unsplashResponse.status} ${unsplashResponse.statusText}`);
        }
      } else {
        console.warn("UNSPLASH_ACCESS_KEY not found in environment variables. Skipping image fetch.");
      }
    } catch (mediaError) {
      console.error("Error fetching media from Unsplash:", mediaError);
    }
    // --- End Unsplash Fetch ---

    const article = await Article.create({ 
      topic: finalTopic, 
      content, 
      slug, 
      media: fetchedMedia // Save the fetched media
    });

    return new Response(JSON.stringify(article), { status: 201 });

  } catch (err) {
    console.error('[ARTICLE GENERATION ERROR]', err);
    return new Response(
      JSON.stringify({ message: err.message || 'Internal Server Error' }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const slug = searchParams.get("slug");
    const limit = searchParams.get("limit"); // <--- NEW: Get limit from searchParams

    let query = {};
    let articles;

    if (slug) {
      // If slug is present, find a single article
      articles = await Article.findOne({ slug: slug });
      if (!articles) {
        return new Response(JSON.stringify({ message: "Article not found" }), { status: 404 });
      }
      return new Response(JSON.stringify(articles), { status: 200 });
    } else {
      // For search or general list
      if (search) {
        query = {
          topic: { $regex: search, $options: "i" }
        };
      }

      // Chain .limit() to the query for general or search results
      let articleQuery = Article.find(query).sort({ createdAt: -1 });

      if (limit) {
        const parsedLimit = parseInt(limit, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
          articleQuery = articleQuery.limit(parsedLimit);
        }
      }

      articles = await articleQuery;
    }

    return new Response(JSON.stringify(articles), { status: 200 });

  } catch (err) {
    console.error("GET Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
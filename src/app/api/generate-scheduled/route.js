// src/app/api/generate-scheduled/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/connectDB';
import Article from '../../../../models/Article';
import { fetchTrendingTopic } from '../../../../utils/googleTrends'; // Re-use your trending topic logic
import { generateArticleContent } from '../../../../utils/gemini'; // Re-use your Gemini logic
import { fetchUnsplashImage } from '../../../../utils/unsplash'; // Re-use your Unsplash logic

export const dynamic = 'force-dynamic'; // Ensures this route is dynamic and not cached

export async function POST(req) {
  // Optional: Implement a secret key check if you want to secure this endpoint
  // const authHeader = req.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }

  try {
    await connectDB();

    console.log("Starting scheduled article generation...");

    // 1. Fetch a trending topic
    const trendingTopic = await fetchTrendingTopic();
    if (!trendingTopic) {
      console.warn("No trending topic found. Skipping article generation.");
      return NextResponse.json({ message: "No trending topic found, skipped generation." }, { status: 200 });
    }
    console.log(`Trending topic fetched: ${trendingTopic}`);

    // 2. Generate article content using Gemini
    const content = await generateArticleContent(trendingTopic);
    if (!content) {
      console.error(`Failed to generate content for topic: ${trendingTopic}`);
      return NextResponse.json({ message: "Failed to generate article content." }, { status: 500 });
    }
    console.log(`Article content generated for: ${trendingTopic}`);

    // Basic slug generation (you can improve this)
    const slug = trendingTopic.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

    // 3. Fetch Unsplash Image
    let media = [];
    try {
        const imageData = await fetchUnsplashImage(trendingTopic);
        if (imageData) {
            media.push({
                url: imageData.urls.regular,
                alt: imageData.alt_description || trendingTopic,
                type: 'image',
            });
            console.log(`Unsplash image fetched for: ${trendingTopic}`);
        }
    } catch (unsplashError) {
        console.warn(`Could not fetch Unsplash image for ${trendingTopic}:`, unsplashError);
        // Continue even if image fetch fails
    }

    // 4. Save the article to MongoDB
    const newArticle = new Article({
      topic: trendingTopic,
      content: content,
      slug: slug,
      media: media,
      createdAt: new Date(),
    });

    await newArticle.save();
    console.log(`Article "${trendingTopic}" saved successfully with slug: ${slug}`);

    return NextResponse.json({
      message: "Article generated and saved successfully",
      article: { topic: newArticle.topic, slug: newArticle.slug }
    }, { status: 200 });

  } catch (error) {
    console.error("Scheduled article generation failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
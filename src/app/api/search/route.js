// src/app/api/search/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/connectDB'; // Adjust path if necessary
import Article from '../../../../models/Article';     // Adjust path if necessary

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ message: 'No search query provided' }, { status: 400 });
    }

    // Perform a case-insensitive search on article topic or slug
    // We'll search for articles where the topic OR slug contains the query string
    const article = await Article.findOne({
      $or: [
        { topic: { $regex: query, $options: 'i' } }, // Case-insensitive topic search
        { slug: { $regex: query, $options: 'i' } }   // Case-insensitive slug search
      ]
    }).lean();

    if (article) {
      // If an article is found, return its slug
      return NextResponse.json({ slug: article.slug });
    } else {
      // If no article is found
      return NextResponse.json({ message: 'No article found' }, { status: 404 });
    }

  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
import { connectDB } from '@/lib/connectDB';
import Article from '@/models/Article';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = params;

    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
    }

    const article = await Article.findOne({ slug });

    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(article), { status: 200 });

  } catch (error) {
    console.error("[ARTICLE FETCH ERROR]", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
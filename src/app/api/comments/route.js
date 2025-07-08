import { connectDB } from '@/lib/connectDB';
import Comment from '@/models/Comment';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/article/auth/[...nextauth]/route';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { articleSlug, text } = await req.json();
    if (!articleSlug || !text) {
      return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
    }

    await connectDB();

    const comment = await Comment.create({
      articleSlug,
      userEmail: session.user.email,
      userName: session.user.name,
      userImage: session.user.image,
      text,
    });

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (err) {
    console.error('POST COMMENT ERROR:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(req, authOptions);
   
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get('articleId');

    if (!articleId) {
      return new Response(JSON.stringify({ message: "Article ID is required" }), { status: 400 });
    }

    const comments = await Comment.find({ article: articleId }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(comments), { status: 200 });

  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

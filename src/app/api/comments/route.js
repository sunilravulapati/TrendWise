import { connectDB } from '@/lib/connectDB';
import Comment from '../../../../../models/Comment';
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
  const { searchParams } = new URL(req.url);
  const articleSlug = searchParams.get('slug');

  try {
    await connectDB();
    const comments = await Comment.find({ articleSlug }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (err) {
    console.error('GET COMMENT ERROR:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

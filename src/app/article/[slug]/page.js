import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "../../../../lib/connectDB";
import Article from "../../../../models/Article";
import Comment from "../../../../models/Comment";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

// Removed: import Navbar from '../../../components/Navbar';
// Removed: import Footer from '../../../components/footer';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  await connectDB();
  const article = await Article.findOne({ slug: params.slug }).lean();

  if (!article) return {};

  return {
    title: article.topic,
    description: article.content.slice(0, 150),
    openGraph: {
      title: article.topic,
      description: article.content.slice(0, 150),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = params;

  let article = null;

  try {
    await connectDB();
    article = await Article.findOne({ slug: slug }).lean();

    if (!article) {
      notFound();
    }
  } catch (err) {
    console.error(`Failed to fetch article with slug "${slug}":`, err);
    notFound();
  }

  const session = await getServerSession(authOptions);
  const comments = await Comment.find({ articleSlug: slug }).sort({ createdAt: -1 }).lean();

  const addComment = async (formData) => {
    "use server";

    const currentSession = await getServerSession(authOptions);
    if (!currentSession || !currentSession.user || !currentSession.user.name) {
      console.error("User not authenticated for comment submission.");
      return;
    }

    const text = formData.get("comment");

    if (!text || text.trim() === "") {
      console.error("Comment text cannot be empty.");
      return;
    }

    try {
      await connectDB();
      await Comment.create({
        articleSlug: slug,
        text: text,
        userName: currentSession.user.name,
        userEmail: currentSession.user.email,
      });
      revalidatePath(`/article/${slug}`);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    // The outermost div wrapping the content
    // Changed this div's classes slightly to ensure main content expands correctly
    // The min-h-screen and flex-col should ideally be in the root layout
    <div className="flex flex-col min-h-screen"> 
      {/* Removed <Navbar /> from here */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:underline mb-6 block text-lg">
          &larr; Back to Home
        </Link>
        
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 leading-tight">{article.topic}</h1>
        <p className="text-gray-600 text-sm mb-8">
          Published on {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        {article.media && article.media.length > 0 && article.media[0].type === 'image' && (
          <img
            src={article.media[0].url}
            alt={article.media[0].alt || article.topic}
            className="w-full h-80 object-cover rounded-lg shadow-md mb-10"
          />
        )}

        <div className="prose lg:prose-lg text-gray-800 leading-relaxed space-y-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

          {session ? (
            <form className="mt-4 flex flex-col gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200" action={addComment}>
              <textarea
                name="comment"
                placeholder="Write a comment..."
                rows="4"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold w-fit hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Comment
              </button>
            </form>
          ) : (
            <p className="mt-6 text-gray-600 p-4 bg-blue-50 rounded-lg border border-blue-200">
              Please <a href="/api/auth/signin" className="text-blue-700 font-semibold hover:underline">log in</a> to leave a comment.
            </p>
          )}

          <ul className="mt-8 space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((c) => (
                <li key={c._id.toString()} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <p className="font-bold text-gray-900 text-lg mb-1">{c.userName}</p>
                  <p className="text-gray-700 text-base mb-2">{c.text}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
      {/* Removed <Footer /> from here */}
    </div>
  );
}
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/connectDB";
import Article from "@/models/Article";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "your-admin-email@example.com";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
    return null;
  }

  if (session.user.email !== ADMIN_EMAIL) {
    redirect("/");
    return null;
  }

  let articles = [];
  let error = null;

  try {
    await connectDB();
    articles = await Article.find({}).sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error("Failed to fetch articles for admin panel:", err);
    error = "Failed to load articles. Please try again.";
  }

  const deleteArticle = async (articleId) => {
    "use server";

    const currentSession = await getServerSession(authOptions);
    if (!currentSession || currentSession.user.email !== ADMIN_EMAIL) {
      console.error("Unauthorized attempt to delete article.");
      return;
    }

    try {
      await connectDB();
      await Article.findByIdAndDelete(articleId);
      revalidatePath("/admin");
      revalidatePath("/");
      console.log(`Article ${articleId} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span> {error}</span>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">All Articles</h2>
        
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No articles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Topic
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published On
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article._id.toString()}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link href={`/article/${article.slug}`} className="text-blue-600 hover:underline">
                        {article.topic}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <form action={deleteArticle} className="inline-block">
                        <input type="hidden" name="articleId" value={article._id.toString()} />
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-900 ml-4 px-3 py-1 rounded-md border border-red-600 hover:border-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
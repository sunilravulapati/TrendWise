import ArticleCard from './ArticleCard';

export default function ArticleList({ articles }) {
  if (!articles.length) return <p>No articles yet.</p>;

  return (
    <ul className="space-y-6">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </ul>
  );
}

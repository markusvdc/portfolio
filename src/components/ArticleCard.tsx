import { Link } from 'react-router-dom'
import type { Article } from '../data/articles'
import { formatArticleDate } from '../utils/formatArticleDate'

function ArticleCard({ article }: { article: Article }) {
	return (
		<article className="article-card">
			<h2>{article.title}</h2>
			<div className="article-card__meta">
				<time dateTime={article.date}>{formatArticleDate(article.date)}</time>
				<span>{article.readingTime}</span>
			</div>
			<p>{article.summary}</p>
			<Link className="article-card__link" to={`/writing/${article.slug}`}>
				Read Article
			</Link>
		</article>
	)
}

export default ArticleCard

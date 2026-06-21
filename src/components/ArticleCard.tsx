import { Link } from 'react-router-dom'
import type { Article } from '../data/articles'
import { formatArticleDate } from '../utils/formatArticleDate'

function ArticleCard({ article }: { article: Article }) {
	return (
		<article className="writing__card">
			<h2>{article.title}</h2>
			<div className="writing__meta">
				<time dateTime={article.date}>{formatArticleDate(article.date)}</time>
				<span>{article.readingTime}</span>
			</div>
			<p>{article.summary}</p>
			<Link className="writing__link button button--secondary" to={`/artigos/${article.slug}`}>
				Ler Artigo
			</Link>
		</article>
	)
}

export default ArticleCard

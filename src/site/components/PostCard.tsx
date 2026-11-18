import { Link } from 'react-router-dom'
import type { Article } from '../data/posts'
import { formatPostDate } from '../utils/formatPostDate'

function PostCard({ article }: { article: Article }) {
	return (
		<article className="writing__card">
			<h2>{article.title}</h2>
			<div className="writing__meta">
				<time dateTime={article.date}>{formatPostDate(article.date)}</time>
				<span>{article.readingTime} min de leitura</span>
			</div>
			<p>{article.summary}</p>
			<Link className="writing__link button button--secondary" to={`/post/${article.slug}`}>
				Ler Post
			</Link>
		</article>
	)
}

export default PostCard

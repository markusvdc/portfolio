import { Link, Navigate, useParams } from 'react-router-dom'
import Overview from '../components/Overview'
import { articles } from '../data/articles'
import { formatArticleDate } from '../utils/formatArticleDate'

function ArticlePage() {
	const { slug } = useParams()
	const article = articles.find((item) => item.slug === slug)

	if (!article) {
		return <Navigate to="/artigos" replace />
	}

	return (
		<main>
			<Overview />
			<article className="article">
				<div className="article__container container">
					<header className="article__header">
						<h1>{article.title}</h1>
						<div className="article__meta">
							<time dateTime={article.date}>{formatArticleDate(article.date)}</time>
							<span>{article.readingTime}</span>
						</div>
					</header>
					<div className="article__content">
						{article.content.map((paragraph) => (
							<p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
						))}
					</div>
					<Link className="article__back" to="/artigos">
						Voltar Para Artigos
					</Link>
				</div>
			</article>
		</main>
	)
}

export default ArticlePage

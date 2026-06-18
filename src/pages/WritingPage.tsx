import ArticleCard from '../components/ArticleCard'
import Overview from '../components/Overview'
import { articles } from '../data/articles'

function WritingPage() {
	return (
		<main>
			<h1 className="sr-only">Writing</h1>
			<Overview />
			<section className="writing">
				<div className="writing__container container">
					<div className="writing__list">
						{articles.map((article) => (
							<ArticleCard article={article} key={article.slug} />
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

export default WritingPage

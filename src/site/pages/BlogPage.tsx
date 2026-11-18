import PostCard from '../components/PostCard'
import Overview from '../components/Overview'
import { articles } from '../data/posts'

function BlogPage() {
	return (
		<main>
			<h1 className="sr-only">Blog</h1>
			<Overview />
			<section className="writing">
				<div className="writing__container container">
					<div className="writing__list">
						{articles.map((article) => (
							<PostCard article={article} key={article.slug} />
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

export default BlogPage

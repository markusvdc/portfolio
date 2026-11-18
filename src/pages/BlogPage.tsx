import PostCard from '../components/PostCard'
import Overview from '../components/Overview'
import { posts } from '../data/posts'

function BlogPage() {
	return (
		<main>
			<h1 className="sr-only">Blog</h1>
			<Overview />
			<section className="blog">
				<div className="blog__container container">
					<div className="blog__list">
						{posts.map((post) => (
							<PostCard post={post} key={post.slug} />
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

export default BlogPage

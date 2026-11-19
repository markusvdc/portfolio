import { useState } from 'react'
import PostCard from '../components/PostCard'
import Overview from '../components/Overview'
import { posts } from '../data/posts'
import { postTags } from '../data/tags'
import type { PostTag } from '../data/tags'

function BlogPage() {
	const [activeTag, setActiveTag] = useState<PostTag | null>(null)
	const filteredPosts = activeTag
		? posts.filter((post) => post.tags.includes(activeTag))
		: posts

	return (
		<main>
			<h1 className="sr-only">Blog</h1>
			<Overview />
			<section className="blog">
				<div className="blog__container container">
					<div className="blog__filters" role="group" aria-label="Filtrar posts por tag">
						<button
							className={`blog__filter ${activeTag === null ? 'blog__filter--active' : ''}`}
							type="button"
							aria-pressed={activeTag === null}
							onClick={() => setActiveTag(null)}
						>
							Todas
						</button>
						{postTags.map((tag) => (
							<button
								className={`blog__filter ${activeTag === tag ? 'blog__filter--active' : ''}`}
								key={tag}
								type="button"
								aria-pressed={activeTag === tag}
								onClick={() => setActiveTag(tag)}
							>
								{tag}
							</button>
						))}
					</div>
					<div className="blog__list">
						{filteredPosts.map((post) => (
							<PostCard post={post} key={post.slug} />
						))}
						{filteredPosts.length === 0 && <p className="blog__empty">Ainda não há posts com essa tag.</p>}
					</div>
				</div>
			</section>
		</main>
	)
}

export default BlogPage

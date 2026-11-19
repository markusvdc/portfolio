import { Link } from 'react-router-dom'
import type { Post } from '../data/posts'
import { formatPostDate } from '../utils/PostDate'

function PostCard({ post }: { post: Post }) {
	return (
		<article className="blog__card">
			<h2>{post.title}</h2>
			<div className="blog__meta">
				<time dateTime={post.date}>{formatPostDate(post.date)}</time>
				<span>{post.readingTime} min de leitura</span>
			</div>
			<ul className="post-tags" aria-label="Tags do post">
				{post.tags.map((tag) => <li className="post-tags__item" key={tag}>{tag}</li>)}
			</ul>
			<p>{post.summary}</p>
			<Link className="blog__link button button--secondary" to={`/post/${post.slug}`}>
				Ler Post
			</Link>
		</article>
	)
}

export default PostCard

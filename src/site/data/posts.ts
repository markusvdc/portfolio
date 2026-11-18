import { parsePostMarkdown } from '../../shared/posts/PostParser'
import type { Post } from '../../shared/posts/PostParser'

export type { Post }

const postFiles = import.meta.glob('../../../content/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default',
}) as Record<string, string>

export const posts = Object.entries(postFiles)
	.map(([filePath, markdown]) => parsePostMarkdown(filePath.replace('../../../', ''), markdown))
	.sort(
		(firstPost, secondPost) =>
			new Date(secondPost.date).getTime() -
			new Date(firstPost.date).getTime()
	)

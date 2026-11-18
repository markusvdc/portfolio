import { parsePostMarkdown } from '../../shared/posts/parsePostMarkdown'
import type { Article } from '../../shared/posts/parsePostMarkdown'

export type { Article }

const articleFiles = import.meta.glob('../../../content/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default',
}) as Record<string, string>

export const articles = Object.entries(articleFiles)
	.map(([filePath, markdown]) => parsePostMarkdown(filePath.replace('../../../', ''), markdown))
	.sort(
		(firstArticle, secondArticle) =>
			new Date(secondArticle.date).getTime() -
			new Date(firstArticle.date).getTime()
	)

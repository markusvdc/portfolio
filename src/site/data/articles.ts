import { parseArticleMarkdown } from '../../shared/articles/parseArticleMarkdown'
import type { Article } from '../../shared/articles/parseArticleMarkdown'

export type { Article }

const articleFiles = import.meta.glob('../../../content/articles/*.md', {
	eager: true,
	query: '?raw',
	import: 'default',
}) as Record<string, string>

export const articles = Object.entries(articleFiles)
	.map(([filePath, markdown]) => parseArticleMarkdown(filePath.replace('../../../', ''), markdown))
	.sort(
		(firstArticle, secondArticle) =>
			new Date(secondArticle.date).getTime() -
			new Date(firstArticle.date).getTime()
	)

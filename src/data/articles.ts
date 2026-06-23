import { parseArticleMarkdown } from '../utils/parseArticleMarkdown'
import type { Article } from '../utils/parseArticleMarkdown'

export type { Article }

const articleFiles = import.meta.glob('../../content/articles/*.md', {
	eager: true,
	query: '?raw',
	import: 'default',
}) as Record<string, string>

export const articles = Object.entries(articleFiles)
	.map(([filePath, markdown]) => parseArticleMarkdown(filePath.replace('../../', ''), markdown))
	.sort((firstArticle, secondArticle) => secondArticle.date.localeCompare(firstArticle.date))

import type { ArticleFormState } from '../types/adminTypes'

function escapeFrontmatterValue(value: string) {
	return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export function buildArticleMarkdown(form: ArticleFormState, markdownContent: string) {
	return [
		'---',
		`title: "${escapeFrontmatterValue(form.title.trim())}"`,
		`slug: "${escapeFrontmatterValue(form.slug.trim())}"`,
		`date: "${escapeFrontmatterValue(form.date.trim())}"`,
		`readingTime: ${form.readingTime}`,
		`summary: "${escapeFrontmatterValue(form.summary.trim())}"`,
		'---',
		'',
		markdownContent.trim(),
		'',
	].join('\n')
}

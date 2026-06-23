export type Article = {
	title: string
	slug: string
	date: string
	readingTime: string
	summary: string
	content: string[]
	filePath: string
}

type ArticleFrontmatter = Omit<Article, 'content' | 'filePath'>

function parseFrontmatterValue(value: string) {
	const trimmedValue = value.trim()

	if (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) {
		return trimmedValue.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
	}

	return trimmedValue
}

export function parseArticleMarkdown(filePath: string, markdown: string): Article {
	const frontmatterMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

	if (!frontmatterMatch) {
		throw new Error(`Article markdown is missing frontmatter: ${filePath}`)
	}

	const [, frontmatterSource, contentSource] = frontmatterMatch
	const frontmatter = frontmatterSource.split(/\r?\n/).reduce<Partial<ArticleFrontmatter>>((fields, line) => {
		const separatorIndex = line.indexOf(':')

		if (separatorIndex === -1) {
			return fields
		}

		const key = line.slice(0, separatorIndex).trim() as keyof ArticleFrontmatter
		const value = parseFrontmatterValue(line.slice(separatorIndex + 1))

		return {
			...fields,
			[key]: value,
		}
	}, {})

	if (!frontmatter.title || !frontmatter.slug || !frontmatter.date || !frontmatter.readingTime || !frontmatter.summary) {
		throw new Error(`Article markdown has incomplete frontmatter: ${filePath}`)
	}

	return {
		title: frontmatter.title,
		slug: frontmatter.slug,
		date: frontmatter.date,
		readingTime: frontmatter.readingTime,
		summary: frontmatter.summary,
		content: contentSource.trim().split(/\r?\n\r?\n/).filter(Boolean),
		filePath,
	}
}

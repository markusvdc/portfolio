export type Post = {
	title: string
	slug: string
	date: string
	updatedAt: string
	readingTime: number
	summary: string
	content: string
	filePath: string
}

type PostFrontmatter = Omit<Post, 'content' | 'filePath'>

function parseFrontmatterValue(value: string) {
	const trimmedValue = value.trim()

	if (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) {
		return trimmedValue.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
	}

	return trimmedValue
}

export function parsePostMarkdown(filePath: string, markdown: string): Post {
	const frontmatterMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

	if (!frontmatterMatch) {
		throw new Error(`Post markdown is missing frontmatter: ${filePath}`)
	}

	const [, frontmatterSource, contentSource] = frontmatterMatch
	const frontmatter = frontmatterSource.split(/\r?\n/).reduce<Partial<PostFrontmatter>>((fields, line) => {
		const separatorIndex = line.indexOf(':')

		if (separatorIndex === -1) {
			return fields
		}

		const key = line.slice(0, separatorIndex).trim() as keyof PostFrontmatter
		const value = parseFrontmatterValue(line.slice(separatorIndex + 1))

		return {
			...fields,
			[key]: value,
		}
	}, {})

	if (!frontmatter.title || !frontmatter.slug || !frontmatter.date || !frontmatter.readingTime || !frontmatter.summary) {
		throw new Error(`Post markdown has incomplete frontmatter: ${filePath}`)
	}

	return {
		title: frontmatter.title,
		slug: frontmatter.slug,
		date: frontmatter.date,
		updatedAt: frontmatter.updatedAt || frontmatter.date,
		readingTime: frontmatter.readingTime,
		summary: frontmatter.summary,
		content: contentSource.trim(),
		filePath,
	}
}

export function normalizeMarkdownCodeBlocks(markdown: string) {
	let normalizedMarkdown = markdown.replace(/\r\n/g, '\n')
	const sequentialCodeFencePattern = /```([^\n]*)\n([\s\S]*?)\n```\s*\n```([^\n]*)\n([\s\S]*?)\n```/

	while (sequentialCodeFencePattern.test(normalizedMarkdown)) {
		normalizedMarkdown = normalizedMarkdown.replace(
			sequentialCodeFencePattern,
			(_, firstLanguage: string, firstBlock: string, secondLanguage: string, secondBlock: string) => {
				const language = firstLanguage.trim() || secondLanguage.trim()

				return `\`\`\`${language}\n${firstBlock}\n${secondBlock}\n\`\`\``
			}
		)
	}

	return normalizedMarkdown
}

import type { Article } from '../../shared/articles/parseArticleMarkdown'

export type AdminResult = {
	status: 'success' | 'error'
	message: string
	link?: string
	repositoryName?: string
	defaultBranch?: string
}

export type GitHubContentItem = {
	name: string
	path: string
	sha: string
	type: string
	url: string
}

export type GitHubReadFileResponse = {
	message?: string
	sha?: string
	content?: string
}

export type GitHubWriteFileResponse = {
	message?: string
	content?: {
		html_url?: string
		sha?: string
	}
	commit?: {
		html_url?: string
	}
}

export type AdminArticle = Article & {
	sha: string
	apiUrl: string
}

export type EditingArticle = {
	filePath: string
	sha: string
}

export type ArticleFormState = {
	title: string
	slug: string
	date: string
	readingTime: number
	summary: string
}

export type LinkDraft = {
	url: string
	hasLink: boolean
}

export type CalloutType = 'INFO' | 'TIP' | 'WARNING'

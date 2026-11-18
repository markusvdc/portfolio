import type { Post } from '../../shared/posts/PostParser'

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

export type AdminPost = Post & {
	sha: string
	apiUrl: string
}

export type EditingPost = {
	filePath: string
	sha: string
}

export type PostFormState = {
	title: string
	slug: string
	date: string
	updatedAt: string
	readingTime: number
	summary: string
}

export type LinkDraft = {
	url: string
	hasLink: boolean
}

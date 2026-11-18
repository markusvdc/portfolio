import { parsePostMarkdown } from '../../shared/posts/PostParser'
import type { AdminPost, GitHubContentItem, GitHubReadFileResponse, GitHubWriteFileResponse } from '../types/adminTypes'
import { decodeBase64Content, encodeBase64Content } from '../utils/base64Content'
import {
	createGitHubHeaders,
	createGitHubJsonHeaders,
	githubPostsDirectoryUrl,
	githubRepositoryUrl,
	githubTestFileUrl,
} from './AdminConfig'

export async function testRepositoryConnection(token: string) {
	const response = await fetch(githubRepositoryUrl, {
		headers: createGitHubHeaders(token),
	})
	const data: { message?: string, full_name?: string, default_branch?: string } = await response.json()

	if (!response.ok) {
		throw new Error(data.message ?? 'Erro ao conectar com a GitHub API.')
	}

	return {
		repositoryName: data.full_name,
		defaultBranch: data.default_branch,
	}
}

export async function createAdminTestFile(token: string) {
	const fileContent = [
		'# Teste do admin',
		'',
		'Arquivo criado pela página de administração.',
		`Criado em: ${new Date().toISOString()}`,
		'',
	].join('\n')
	const response = await fetch(githubTestFileUrl, {
		method: 'PUT',
		headers: createGitHubJsonHeaders(token),
		body: JSON.stringify({
			message: 'Create admin test file',
			content: encodeBase64Content(fileContent),
		}),
	})
	const data: GitHubWriteFileResponse = await response.json()

	if (!response.ok) {
		throw new Error(data.message ?? 'Erro ao criar arquivo de teste.')
	}

	return data.commit?.html_url ?? data.content?.html_url
}

export async function listMarkdownPosts(token: string): Promise<AdminPost[]> {
	const headers = createGitHubHeaders(token)
	const directoryResponse = await fetch(githubPostsDirectoryUrl, { headers })
	const directoryData: GitHubContentItem[] | { message?: string } = await directoryResponse.json()

	if (!directoryResponse.ok) {
		throw new Error('message' in directoryData ? directoryData.message ?? 'Erro ao listar posts.' : 'Erro ao listar posts.')
	}

	if (!Array.isArray(directoryData)) {
		throw new Error('A resposta da GitHub API nao retornou uma lista de arquivos.')
	}

	const markdownFiles = directoryData.filter((item) => item.type === 'file' && item.name.endsWith('.md'))
	const postsFromGithub = await Promise.all(markdownFiles.map(async (file) => {
		const fileResponse = await fetch(file.url, { headers })
		const fileData: GitHubReadFileResponse = await fileResponse.json()

		if (!fileResponse.ok || !fileData.content) {
			throw new Error(fileData.message ?? `Erro ao carregar ${file.path}.`)
		}

		return {
			...parsePostMarkdown(file.path, decodeBase64Content(fileData.content)),
			sha: fileData.sha ?? file.sha,
			apiUrl: file.url,
		}
	}))

	return postsFromGithub.sort((firstPost, secondPost) => (
		secondPost.date.localeCompare(firstPost.date)
	))
}

export async function loadMarkdownPost(token: string, post: AdminPost) {
	const response = await fetch(post.apiUrl, {
		headers: createGitHubHeaders(token),
	})
	const data: GitHubReadFileResponse = await response.json()

	if (!response.ok || !data.content) {
		throw new Error(data.message ?? 'Erro ao carregar post para edição.')
	}

	return {
		post: parsePostMarkdown(post.filePath, decodeBase64Content(data.content)),
		sha: data.sha ?? post.sha,
	}
}

export async function saveMarkdownPost(token: string, postPath: string, markdownFile: string, sha?: string) {
	const parsedPost = parsePostMarkdown(postPath, markdownFile)
	const response = await fetch(`${githubRepositoryUrl}/contents/${postPath}`, {
		method: 'PUT',
		headers: createGitHubJsonHeaders(token),
		body: JSON.stringify({
			message: sha ? `Update post ${parsedPost.slug}` : `Create post ${parsedPost.slug}`,
			content: encodeBase64Content(markdownFile),
			...(sha ? { sha } : {}),
		}),
	})
	const data: GitHubWriteFileResponse = await response.json()

	if (!response.ok) {
		throw new Error(data.message ?? (sha ? 'Erro ao atualizar post.' : 'Erro ao criar post.'))
	}

	return {
		savedPost: {
			...parsedPost,
			sha: data.content?.sha ?? sha ?? '',
			apiUrl: `${githubRepositoryUrl}/contents/${postPath}`,
		},
		link: data.content?.html_url ?? data.commit?.html_url,
	}
}

export async function deleteMarkdownPost(token: string, post: AdminPost) {
	const response = await fetch(`${githubRepositoryUrl}/contents/${post.filePath}`, {
		method: 'DELETE',
		headers: createGitHubJsonHeaders(token),
		body: JSON.stringify({
			message: `Delete post ${post.slug}`,
			sha: post.sha,
		}),
	})
	const data: GitHubWriteFileResponse = await response.json()

	if (!response.ok) {
		throw new Error(data.message ?? 'Erro ao excluir post.')
	}

	return data.commit?.html_url
}

import { parseArticleMarkdown } from '../../shared/articles/parseArticleMarkdown'
import type { AdminArticle, GitHubContentItem, GitHubReadFileResponse, GitHubWriteFileResponse } from '../types/adminTypes'
import { decodeBase64Content, encodeBase64Content } from '../utils/base64Content'
import {
	createGitHubHeaders,
	createGitHubJsonHeaders,
	githubArticlesDirectoryUrl,
	githubRepositoryUrl,
	githubTestFileUrl,
} from './githubAdminConfig'

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

export async function listMarkdownArticles(token: string): Promise<AdminArticle[]> {
	const headers = createGitHubHeaders(token)
	const directoryResponse = await fetch(githubArticlesDirectoryUrl, { headers })
	const directoryData: GitHubContentItem[] | { message?: string } = await directoryResponse.json()

	if (!directoryResponse.ok) {
		throw new Error('message' in directoryData ? directoryData.message ?? 'Erro ao listar artigos.' : 'Erro ao listar artigos.')
	}

	if (!Array.isArray(directoryData)) {
		throw new Error('A resposta da GitHub API nao retornou uma lista de arquivos.')
	}

	const markdownFiles = directoryData.filter((item) => item.type === 'file' && item.name.endsWith('.md'))
	const articlesFromGithub = await Promise.all(markdownFiles.map(async (file) => {
		const fileResponse = await fetch(file.url, { headers })
		const fileData: GitHubReadFileResponse = await fileResponse.json()

		if (!fileResponse.ok || !fileData.content) {
			throw new Error(fileData.message ?? `Erro ao carregar ${file.path}.`)
		}

		return {
			...parseArticleMarkdown(file.path, decodeBase64Content(fileData.content)),
			sha: fileData.sha ?? file.sha,
			apiUrl: file.url,
		}
	}))

	return articlesFromGithub.sort((firstArticle, secondArticle) => (
		secondArticle.date.localeCompare(firstArticle.date)
	))
}

export async function loadMarkdownArticle(token: string, article: AdminArticle) {
	const response = await fetch(article.apiUrl, {
		headers: createGitHubHeaders(token),
	})
	const data: GitHubReadFileResponse = await response.json()

	if (!response.ok || !data.content) {
		throw new Error(data.message ?? 'Erro ao carregar artigo para edição.')
	}

	return {
		article: parseArticleMarkdown(article.filePath, decodeBase64Content(data.content)),
		sha: data.sha ?? article.sha,
	}
}

export async function saveMarkdownArticle(token: string, articlePath: string, markdownFile: string, sha?: string) {
	const parsedArticle = parseArticleMarkdown(articlePath, markdownFile)
	const response = await fetch(`${githubRepositoryUrl}/contents/${articlePath}`, {
		method: 'PUT',
		headers: createGitHubJsonHeaders(token),
		body: JSON.stringify({
			message: sha ? `Update article ${parsedArticle.slug}` : `Create article ${parsedArticle.slug}`,
			content: encodeBase64Content(markdownFile),
			...(sha ? { sha } : {}),
		}),
	})
	const data: GitHubWriteFileResponse = await response.json()

	if (!response.ok) {
		throw new Error(data.message ?? (sha ? 'Erro ao atualizar artigo.' : 'Erro ao criar artigo.'))
	}

	return {
		savedArticle: {
			...parsedArticle,
			sha: data.content?.sha ?? sha ?? '',
			apiUrl: `${githubRepositoryUrl}/contents/${articlePath}`,
		},
		link: data.content?.html_url ?? data.commit?.html_url,
	}
}

export async function deleteMarkdownArticle(token: string, article: AdminArticle) {
	const response = await fetch(`${githubRepositoryUrl}/contents/${article.filePath}`, {
		method: 'DELETE',
		headers: createGitHubJsonHeaders(token),
		body: JSON.stringify({
			message: `Delete article ${article.slug}`,
			sha: article.sha,
		}),
	})
	const data: GitHubWriteFileResponse = await response.json()

	if (!response.ok) {
		throw new Error(data.message ?? 'Erro ao excluir artigo.')
	}

	return data.commit?.html_url
}

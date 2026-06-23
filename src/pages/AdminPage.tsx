import { useState } from 'react'
import type { FormEvent } from 'react'
import { parseArticleMarkdown } from '../utils/parseArticleMarkdown'
import type { Article } from '../utils/parseArticleMarkdown'

const githubTokenStorageKey = 'githubPersonalAccessToken'
const githubRepositoryUrl = 'https://api.github.com/repos/markusvdc/portfolio'
const githubTestFileUrl = 'https://api.github.com/repos/markusvdc/portfolio/contents/content/test-admin.md'
const githubArticlesDirectoryUrl = 'https://api.github.com/repos/markusvdc/portfolio/contents/content/articles'

type ConnectionResult = {
	status: 'success' | 'error'
	message: string
	repositoryName?: string
	defaultBranch?: string
}

type WriteResult = {
	status: 'success' | 'error'
	message: string
	link?: string
}

type ArticleListResult = {
	status: 'success' | 'error'
	message: string
}

type GitHubContentItem = {
	name: string
	path: string
	type: string
	url: string
}

function AdminPage() {
	const [token, setToken] = useState(() => localStorage.getItem(githubTokenStorageKey) ?? '')
	const [hasSavedToken, setHasSavedToken] = useState(() => Boolean(localStorage.getItem(githubTokenStorageKey)))
	const [message, setMessage] = useState('')
	const [connectionResult, setConnectionResult] = useState<ConnectionResult | null>(null)
	const [writeResult, setWriteResult] = useState<WriteResult | null>(null)
	const [articleListResult, setArticleListResult] = useState<ArticleListResult | null>(null)
	const [adminArticles, setAdminArticles] = useState<Article[]>([])
	const [isTestingConnection, setIsTestingConnection] = useState(false)
	const [isCreatingTestFile, setIsCreatingTestFile] = useState(false)
	const [isListingArticles, setIsListingArticles] = useState(false)

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const trimmedToken = token.trim()

		if (!trimmedToken) {
			setMessage('Cole um token antes de salvar.')
			return
		}

		localStorage.setItem(githubTokenStorageKey, trimmedToken)
		setToken(trimmedToken)
		setHasSavedToken(true)
		setMessage('Token salvo no navegador.')
		setConnectionResult(null)
		setWriteResult(null)
		setArticleListResult(null)
	}

	function handleRemoveToken() {
		localStorage.removeItem(githubTokenStorageKey)
		setToken('')
		setHasSavedToken(false)
		setMessage('Token removido do navegador.')
		setConnectionResult(null)
		setWriteResult(null)
		setArticleListResult(null)
		setAdminArticles([])
	}

	async function handleTestConnection() {
		const savedToken = localStorage.getItem(githubTokenStorageKey)

		if (!savedToken) {
			setConnectionResult({
				status: 'error',
				message: 'Nenhum token salvo para testar.'
			})
			return
		}

		setIsTestingConnection(true)
		setConnectionResult(null)

		try {
			const response = await fetch(githubRepositoryUrl, {
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `Bearer ${savedToken}`,
					'X-GitHub-Api-Version': '2022-11-28',
				},
			})
			const data: { message?: string, full_name?: string, default_branch?: string } = await response.json()

			if (!response.ok) {
				setConnectionResult({
					status: 'error',
					message: data.message ?? 'Erro ao conectar com a GitHub API.'
				})
				return
			}

			setConnectionResult({
				status: 'success',
				message: 'Conexão realizada com sucesso.',
				repositoryName: data.full_name,
				defaultBranch: data.default_branch,
			})
		} catch (error) {
			setConnectionResult({
				status: 'error',
				message: error instanceof Error ? error.message : 'Erro inesperado ao testar conexão.'
			})
		} finally {
			setIsTestingConnection(false)
		}
	}

	async function handleCreateTestFile() {
		const savedToken = localStorage.getItem(githubTokenStorageKey)

		if (!savedToken) {
			setWriteResult({
				status: 'error',
				message: 'Nenhum token salvo para criar o arquivo.'
			})
			return
		}

		setIsCreatingTestFile(true)
		setWriteResult(null)

		try {
			const fileContent = [
				'# Teste do admin',
				'',
				'Arquivo criado pela pagina de administracao.',
				`Criado em: ${new Date().toISOString()}`,
				'',
			].join('\n')
			const response = await fetch(githubTestFileUrl, {
				method: 'PUT',
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `Bearer ${savedToken}`,
					'Content-Type': 'application/json',
					'X-GitHub-Api-Version': '2022-11-28',
				},
				body: JSON.stringify({
					message: 'Create admin test file',
					content: btoa(fileContent),
				}),
			})
			const data: {
				message?: string
				content?: { html_url?: string }
				commit?: { html_url?: string }
			} = await response.json()

			if (!response.ok) {
				setWriteResult({
					status: 'error',
					message: data.message ?? 'Erro ao criar arquivo de teste.'
				})
				return
			}

			setWriteResult({
				status: 'success',
				message: 'Arquivo de teste criado com sucesso.',
				link: data.commit?.html_url ?? data.content?.html_url,
			})
		} catch (error) {
			setWriteResult({
				status: 'error',
				message: error instanceof Error ? error.message : 'Erro inesperado ao criar arquivo.'
			})
		} finally {
			setIsCreatingTestFile(false)
		}
	}

	function decodeBase64Content(content: string) {
		const binaryContent = atob(content.replace(/\n/g, ''))
		const bytes = Uint8Array.from(binaryContent, (character) => character.charCodeAt(0))

		return new TextDecoder().decode(bytes)
	}

	async function handleListArticles() {
		const savedToken = localStorage.getItem(githubTokenStorageKey)

		if (!savedToken) {
			setArticleListResult({
				status: 'error',
				message: 'Nenhum token salvo para listar artigos.'
			})
			return
		}

		setIsListingArticles(true)
		setArticleListResult(null)

		try {
			const headers = {
				Accept: 'application/vnd.github+json',
				Authorization: `Bearer ${savedToken}`,
				'X-GitHub-Api-Version': '2022-11-28',
			}
			const directoryResponse = await fetch(githubArticlesDirectoryUrl, { headers })
			const directoryData: GitHubContentItem[] | { message?: string } = await directoryResponse.json()

			if (!directoryResponse.ok) {
				setArticleListResult({
					status: 'error',
					message: 'message' in directoryData ? directoryData.message ?? 'Erro ao listar artigos.' : 'Erro ao listar artigos.'
				})
				return
			}

			if (!Array.isArray(directoryData)) {
				setArticleListResult({
					status: 'error',
					message: 'A resposta da GitHub API nao retornou uma lista de arquivos.'
				})
				return
			}

			const markdownFiles = directoryData.filter((item) => item.type === 'file' && item.name.endsWith('.md'))
			const articlesFromGithub = await Promise.all(markdownFiles.map(async (file) => {
				const fileResponse = await fetch(file.url, { headers })
				const fileData: { message?: string, content?: string } = await fileResponse.json()

				if (!fileResponse.ok || !fileData.content) {
					throw new Error(fileData.message ?? `Erro ao carregar ${file.path}.`)
				}

				return parseArticleMarkdown(file.path, decodeBase64Content(fileData.content))
			}))

			setAdminArticles(articlesFromGithub.sort((firstArticle, secondArticle) => (
				secondArticle.date.localeCompare(firstArticle.date)
			)))
			setArticleListResult({
				status: 'success',
				message: `${articlesFromGithub.length} artigo(s) Markdown encontrado(s).`
			})
		} catch (error) {
			setArticleListResult({
				status: 'error',
				message: error instanceof Error ? error.message : 'Erro inesperado ao listar artigos.'
			})
		} finally {
			setIsListingArticles(false)
		}
	}

	return (
		<main className="admin">
			<section className="admin__panel" aria-labelledby="admin-title">
				<h1 id="admin-title">Admin</h1>
				<p>GitHub Personal Access Token</p>

				<form className="admin__form" onSubmit={handleSubmit}>
					<label htmlFor="github-token">Token</label>
					<textarea
						id="github-token"
						value={token}
						onChange={(event) => {
							setToken(event.target.value)
							setMessage('')
						}}
						placeholder="Cole seu GitHub Personal Access Token aqui"
						rows={6}
					/>

					<div className="admin__actions">
						<button type="submit">Salvar token</button>
						<button type="button" onClick={handleRemoveToken} disabled={!hasSavedToken}>
							Remover token
						</button>
						<button type="button" onClick={handleTestConnection} disabled={!hasSavedToken || isTestingConnection}>
							{isTestingConnection ? 'Testando...' : 'Testar conexão'}
						</button>
						<button type="button" onClick={handleCreateTestFile} disabled={!hasSavedToken || isCreatingTestFile}>
							{isCreatingTestFile ? 'Criando...' : 'Criar arquivo de teste'}
						</button>
						<button type="button" onClick={handleListArticles} disabled={!hasSavedToken || isListingArticles}>
							{isListingArticles ? 'Listando...' : 'Listar artigos Markdown'}
						</button>
					</div>
				</form>

				{message && <p className="admin__message">{message}</p>}
				<p className="admin__status">
					Status: {hasSavedToken ? 'token salvo' : 'nenhum token salvo'}
				</p>
				{connectionResult && (
					<div className={`admin__connection admin__connection--${connectionResult.status}`}>
						<p>Status da conexão: {connectionResult.message}</p>
						{connectionResult.repositoryName && <p>Repositório: {connectionResult.repositoryName}</p>}
						{connectionResult.defaultBranch && <p>Branch padrão: {connectionResult.defaultBranch}</p>}
					</div>
				)}
				{writeResult && (
					<div className={`admin__connection admin__connection--${writeResult.status}`}>
						<p>Status da escrita: {writeResult.message}</p>
						{writeResult.link && (
							<p>
								<a href={writeResult.link} target="_blank" rel="noopener noreferrer">
									Abrir resultado no GitHub
								</a>
							</p>
						)}
					</div>
				)}
				{articleListResult && (
					<div className={`admin__connection admin__connection--${articleListResult.status}`}>
						<p>Status da listagem: {articleListResult.message}</p>
					</div>
				)}
				{adminArticles.length > 0 && (
					<section className="admin__articles" aria-labelledby="admin-articles-title">
						<h2 id="admin-articles-title">Artigos Markdown</h2>
						<ul>
							{adminArticles.map((article) => (
								<li key={article.filePath}>
									<strong>{article.title}</strong>
									<span>Slug: {article.slug}</span>
									<span>Arquivo: {article.filePath}</span>
									<span>Data: {article.date}</span>
									<span>Tempo de leitura: {article.readingTime}</span>
								</li>
							))}
						</ul>
					</section>
				)}
			</section>
		</main>
	)
}

export default AdminPage

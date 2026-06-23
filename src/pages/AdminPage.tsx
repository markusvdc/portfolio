import { useState } from 'react'
import type { FormEvent } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import { marked } from 'marked'
import TurndownService from 'turndown'
import { parseArticleMarkdown } from '../utils/parseArticleMarkdown'
import type { Article } from '../utils/parseArticleMarkdown'
import { normalizeMarkdownCodeBlocks } from '../utils/normalizeMarkdownCodeBlocks'

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

type ArticleCreateResult = {
	status: 'success' | 'error'
	message: string
	link?: string
}

type ArticleDeleteResult = {
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
	sha: string
	type: string
	url: string
}

type GitHubReadFileResponse = {
	message?: string
	sha?: string
	content?: string
}

type GitHubWriteFileResponse = {
	message?: string
	content?: {
		html_url?: string
		sha?: string
	}
	commit?: {
		html_url?: string
	}
}

type AdminArticle = Article & {
	sha: string
	apiUrl: string
}

type EditingArticle = {
	filePath: string
	sha: string
}

type CalloutType = 'INFO' | 'TIP' | 'WARNING'

const turndownService = new TurndownService({
	headingStyle: 'atx',
	bulletListMarker: '-',
	codeBlockStyle: 'fenced',
})

function createSlug(value: string) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

function escapeFrontmatterValue(value: string) {
	return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function encodeBase64Content(content: string) {
	const bytes = new TextEncoder().encode(content)
	let binaryContent = ''

	bytes.forEach((byte) => {
		binaryContent += String.fromCharCode(byte)
	})

	return btoa(binaryContent)
}

function parseMarkdownToEditorHtml(markdown: string) {
	return marked.parse(markdown, { async: false }) as string
}

function createCalloutHtml(type: CalloutType) {
	return `<blockquote><p>[!${type}]</p><p>Escreva o destaque aqui.</p></blockquote>`
}

function AdminPage() {
	const [token, setToken] = useState(() => localStorage.getItem(githubTokenStorageKey) ?? '')
	const [hasSavedToken, setHasSavedToken] = useState(() => Boolean(localStorage.getItem(githubTokenStorageKey)))
	const [message, setMessage] = useState('')
	const [connectionResult, setConnectionResult] = useState<ConnectionResult | null>(null)
	const [writeResult, setWriteResult] = useState<WriteResult | null>(null)
	const [articleListResult, setArticleListResult] = useState<ArticleListResult | null>(null)
	const [articleCreateResult, setArticleCreateResult] = useState<ArticleCreateResult | null>(null)
	const [articleDeleteResult, setArticleDeleteResult] = useState<ArticleDeleteResult | null>(null)
	const [adminArticles, setAdminArticles] = useState<AdminArticle[]>([])
	const [editingArticle, setEditingArticle] = useState<EditingArticle | null>(null)
	const [isTestingConnection, setIsTestingConnection] = useState(false)
	const [isCreatingTestFile, setIsCreatingTestFile] = useState(false)
	const [isListingArticles, setIsListingArticles] = useState(false)
	const [isCreatingArticle, setIsCreatingArticle] = useState(false)
	const [isLoadingArticleForEdit, setIsLoadingArticleForEdit] = useState(false)
	const [deletingArticlePath, setDeletingArticlePath] = useState('')
	const [articleTitle, setArticleTitle] = useState('')
	const [articleSlug, setArticleSlug] = useState('')
	const [isSlugEdited, setIsSlugEdited] = useState(false)
	const [articleDate, setArticleDate] = useState(() => new Date().toISOString().slice(0, 10))
	const [articleReadingTime, setArticleReadingTime] = useState('5 min de leitura')
	const [articleSummary, setArticleSummary] = useState('')
	const editor = useEditor({
		extensions: [
			StarterKit,
			Link.configure({
				openOnClick: false,
			}),
			Image.configure({
				inline: false,
				allowBase64: false,
			}),
		],
		content: '',
	})

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
		setArticleCreateResult(null)
		setArticleDeleteResult(null)
		setEditingArticle(null)
	}

	function handleRemoveToken() {
		localStorage.removeItem(githubTokenStorageKey)
		setToken('')
		setHasSavedToken(false)
		setMessage('Token removido do navegador.')
		setConnectionResult(null)
		setWriteResult(null)
		setArticleListResult(null)
		setArticleCreateResult(null)
		setArticleDeleteResult(null)
		setAdminArticles([])
		setEditingArticle(null)
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
					content: encodeBase64Content(fileContent),
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

	function handleArticleTitleChange(value: string) {
		setArticleTitle(value)

		if (!isSlugEdited) {
			setArticleSlug(createSlug(value))
		}
	}

	function handleArticleSlugChange(value: string) {
		setIsSlugEdited(true)
		setArticleSlug(value)
	}

	function handleSetLink() {
		if (!editor) {
			return
		}

		const previousUrl = editor.getAttributes('link').href as string | undefined
		const url = window.prompt('URL do link', previousUrl ?? '')

		if (url === null) {
			return
		}

		if (!url.trim()) {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()
			return
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run()
	}

	function handleInsertImage() {
		if (!editor) {
			return
		}

		const src = window.prompt('URL da imagem')

		if (!src?.trim()) {
			return
		}

		const alt = window.prompt('Texto alternativo da imagem') ?? ''

		editor.chain().focus().setImage({
			src: src.trim(),
			alt: alt.trim(),
		}).run()
	}

	function handleInsertCallout(type: CalloutType) {
		editor?.chain().focus().insertContent(createCalloutHtml(type)).run()
	}

	function buildArticleMarkdown(markdownContent: string) {
		return [
			'---',
			`title: "${escapeFrontmatterValue(articleTitle.trim())}"`,
			`slug: "${escapeFrontmatterValue(articleSlug.trim())}"`,
			`date: "${escapeFrontmatterValue(articleDate.trim())}"`,
			`readingTime: "${escapeFrontmatterValue(articleReadingTime.trim())}"`,
			`summary: "${escapeFrontmatterValue(articleSummary.trim())}"`,
			'---',
			'',
			markdownContent.trim(),
			'',
		].join('\n')
	}

	function resetArticleForm() {
		setArticleTitle('')
		setArticleSlug('')
		setIsSlugEdited(false)
		setArticleDate(new Date().toISOString().slice(0, 10))
		setArticleReadingTime('5 min de leitura')
		setArticleSummary('')
		setEditingArticle(null)
		editor?.commands.clearContent()
	}

	async function handleEditArticle(article: AdminArticle) {
		const savedToken = localStorage.getItem(githubTokenStorageKey)

		if (!savedToken) {
			setArticleCreateResult({
				status: 'error',
				message: 'Nenhum token salvo para editar artigo.'
			})
			return
		}

		setIsLoadingArticleForEdit(true)
		setArticleCreateResult(null)

		try {
			const response = await fetch(article.apiUrl, {
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `Bearer ${savedToken}`,
					'X-GitHub-Api-Version': '2022-11-28',
				},
			})
			const data: GitHubReadFileResponse = await response.json()

			if (!response.ok || !data.content) {
				setArticleCreateResult({
					status: 'error',
					message: data.message ?? 'Erro ao carregar artigo para edicao.'
				})
				return
			}

			const parsedArticle = parseArticleMarkdown(article.filePath, decodeBase64Content(data.content))

			setArticleTitle(parsedArticle.title)
			setArticleSlug(parsedArticle.slug)
			setIsSlugEdited(true)
			setArticleDate(parsedArticle.date)
			setArticleReadingTime(parsedArticle.readingTime)
			setArticleSummary(parsedArticle.summary)
			setEditingArticle({
				filePath: article.filePath,
				sha: data.sha ?? article.sha,
			})
			editor?.commands.setContent(parseMarkdownToEditorHtml(parsedArticle.content))
			setArticleCreateResult({
				status: 'success',
				message: 'Artigo carregado para edicao.'
			})
		} catch (error) {
			setArticleCreateResult({
				status: 'error',
				message: error instanceof Error ? error.message : 'Erro inesperado ao carregar artigo.'
			})
		} finally {
			setIsLoadingArticleForEdit(false)
		}
	}

	async function handleDeleteArticle(article: AdminArticle) {
		const savedToken = localStorage.getItem(githubTokenStorageKey)

		if (!savedToken) {
			setArticleDeleteResult({
				status: 'error',
				message: 'Nenhum token salvo para excluir artigo.'
			})
			return
		}

		const confirmed = window.confirm(`Excluir o artigo "${article.title}"?\n\nArquivo: ${article.filePath}`)

		if (!confirmed) {
			return
		}

		setDeletingArticlePath(article.filePath)
		setArticleDeleteResult(null)

		try {
			const response = await fetch(`https://api.github.com/repos/markusvdc/portfolio/contents/${article.filePath}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `Bearer ${savedToken}`,
					'Content-Type': 'application/json',
					'X-GitHub-Api-Version': '2022-11-28',
				},
				body: JSON.stringify({
					message: `Delete article ${article.slug}`,
					sha: article.sha,
				}),
			})
			const data: GitHubWriteFileResponse = await response.json()

			if (!response.ok) {
				setArticleDeleteResult({
					status: 'error',
					message: data.message ?? 'Erro ao excluir artigo.'
				})
				return
			}

			setAdminArticles((currentArticles) => currentArticles.filter((item) => item.filePath !== article.filePath))

			if (editingArticle?.filePath === article.filePath) {
				resetArticleForm()
			}

			setArticleDeleteResult({
				status: 'success',
				message: 'Artigo excluido com sucesso.',
				link: data.commit?.html_url,
			})
		} catch (error) {
			setArticleDeleteResult({
				status: 'error',
				message: error instanceof Error ? error.message : 'Erro inesperado ao excluir artigo.'
			})
		} finally {
			setDeletingArticlePath('')
		}
	}

	async function handleCreateArticle(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const savedToken = localStorage.getItem(githubTokenStorageKey)

		if (!savedToken) {
			setArticleCreateResult({
				status: 'error',
				message: 'Nenhum token salvo para criar artigo.'
			})
			return
		}

		if (!articleTitle.trim() || !articleSlug.trim() || !articleDate.trim() || !articleReadingTime.trim() || !articleSummary.trim()) {
			setArticleCreateResult({
				status: 'error',
				message: 'Preencha titulo, slug, data, tempo de leitura e resumo.'
			})
			return
		}

		if (!editor || editor.isEmpty) {
			setArticleCreateResult({
				status: 'error',
				message: 'Escreva o conteudo do artigo antes de salvar.'
			})
			return
		}

		setIsCreatingArticle(true)
		setArticleCreateResult(null)

		try {
			const markdownContent = normalizeMarkdownCodeBlocks(turndownService.turndown(editor.getHTML()))
			const markdownFile = buildArticleMarkdown(markdownContent)
			const articlePath = editingArticle?.filePath ?? `content/articles/${articleSlug.trim()}.md`
			const response = await fetch(`https://api.github.com/repos/markusvdc/portfolio/contents/${articlePath}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `Bearer ${savedToken}`,
					'Content-Type': 'application/json',
					'X-GitHub-Api-Version': '2022-11-28',
				},
				body: JSON.stringify({
					message: editingArticle ? `Update article ${articleSlug.trim()}` : `Create article ${articleSlug.trim()}`,
					content: encodeBase64Content(markdownFile),
					...(editingArticle ? { sha: editingArticle.sha } : {}),
				}),
			})
			const data: GitHubWriteFileResponse = await response.json()

			if (!response.ok) {
				setArticleCreateResult({
					status: 'error',
					message: data.message ?? (editingArticle ? 'Erro ao atualizar artigo.' : 'Erro ao criar artigo.')
				})
				return
			}

			const savedArticle = {
				...parseArticleMarkdown(articlePath, markdownFile),
				sha: data.content?.sha ?? editingArticle?.sha ?? '',
				apiUrl: `https://api.github.com/repos/markusvdc/portfolio/contents/${articlePath}`,
			}

			setAdminArticles((currentArticles) => [
				savedArticle,
				...currentArticles.filter((article) => article.filePath !== articlePath),
			].sort((firstArticle, secondArticle) => secondArticle.date.localeCompare(firstArticle.date)))
			setArticleCreateResult({
				status: 'success',
				message: editingArticle ? 'Artigo Markdown atualizado com sucesso.' : 'Artigo Markdown criado com sucesso.',
				link: data.content?.html_url ?? data.commit?.html_url,
			})
			resetArticleForm()
		} catch (error) {
			setArticleCreateResult({
				status: 'error',
				message: error instanceof Error ? error.message : 'Erro inesperado ao criar artigo.'
			})
		} finally {
			setIsCreatingArticle(false)
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

				<section className="admin__article-editor" aria-labelledby="admin-create-article-title">
					<h2 id="admin-create-article-title">{editingArticle ? 'Editar artigo Markdown' : 'Criar artigo Markdown'}</h2>
					<form className="admin__form" onSubmit={handleCreateArticle}>
						<label htmlFor="article-title">Titulo</label>
						<input
							id="article-title"
							type="text"
							value={articleTitle}
							onChange={(event) => handleArticleTitleChange(event.target.value)}
							placeholder="Titulo do artigo"
						/>

						<label htmlFor="article-slug">Slug</label>
						<input
							id="article-slug"
							type="text"
							value={articleSlug}
							onChange={(event) => handleArticleSlugChange(event.target.value)}
							placeholder="slug-do-artigo"
							disabled={Boolean(editingArticle)}
						/>

						<label htmlFor="article-date">Data</label>
						<input
							id="article-date"
							type="date"
							value={articleDate}
							onChange={(event) => setArticleDate(event.target.value)}
						/>

						<label htmlFor="article-reading-time">Tempo de leitura</label>
						<input
							id="article-reading-time"
							type="text"
							value={articleReadingTime}
							onChange={(event) => setArticleReadingTime(event.target.value)}
							placeholder="5 min de leitura"
						/>

						<label htmlFor="article-summary">Resumo</label>
						<textarea
							id="article-summary"
							value={articleSummary}
							onChange={(event) => setArticleSummary(event.target.value)}
							placeholder="Resumo curto do artigo"
							rows={4}
						/>

						<div className="admin__editor">
							<div className="admin__editor-toolbar">
								<button
									type="button"
									className={editor?.isActive('link') ? 'is-active' : ''}
									onClick={handleSetLink}
									disabled={!editor}
								>
									Link
								</button>
								<button
									type="button"
									className={editor?.isActive('code') ? 'is-active' : ''}
									onClick={() => editor?.chain().focus().toggleCode().run()}
									disabled={!editor}
								>
									Inline code
								</button>
								<button
									type="button"
									className={editor?.isActive('codeBlock') ? 'is-active' : ''}
									onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
									disabled={!editor}
								>
									Code block
								</button>
								<button
									type="button"
									className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
									onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
									disabled={!editor}
								>
									H2
								</button>
								<button
									type="button"
									className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}
									onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
									disabled={!editor}
								>
									H3
								</button>
								<button
									type="button"
									className={editor?.isActive('bulletList') ? 'is-active' : ''}
									onClick={() => editor?.chain().focus().toggleBulletList().run()}
									disabled={!editor}
								>
									Lista
								</button>
								<button
									type="button"
									className={editor?.isActive('orderedList') ? 'is-active' : ''}
									onClick={() => editor?.chain().focus().toggleOrderedList().run()}
									disabled={!editor}
								>
									Numerada
								</button>
								<button
									type="button"
									onClick={() => editor?.chain().focus().setHorizontalRule().run()}
									disabled={!editor}
								>
									Separador
								</button>
								<button
									type="button"
									className={editor?.isActive('blockquote') ? 'is-active' : ''}
									onClick={() => editor?.chain().focus().toggleBlockquote().run()}
									disabled={!editor}
								>
									Citação
								</button>
								<button
									type="button"
									onClick={handleInsertImage}
									disabled={!editor}
								>
									Imagem
								</button>
								<button
									type="button"
									onClick={() => handleInsertCallout('INFO')}
									disabled={!editor}
								>
									INFO
								</button>
								<button
									type="button"
									onClick={() => handleInsertCallout('TIP')}
									disabled={!editor}
								>
									TIP
								</button>
								<button
									type="button"
									onClick={() => handleInsertCallout('WARNING')}
									disabled={!editor}
								>
									WARNING
								</button>
							</div>
							<EditorContent editor={editor} />
						</div>

						<div className="admin__actions">
							<button type="submit" disabled={!hasSavedToken || isCreatingArticle}>
								{isCreatingArticle
									? editingArticle ? 'Atualizando artigo...' : 'Criando artigo...'
									: editingArticle ? 'Atualizar artigo' : 'Criar artigo Markdown'}
							</button>
							{editingArticle && (
								<button type="button" onClick={resetArticleForm}>
									Cancelar edicao
								</button>
							)}
						</div>
					</form>
				</section>

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
				{articleCreateResult && (
					<div className={`admin__connection admin__connection--${articleCreateResult.status}`}>
						<p>Status da criacao: {articleCreateResult.message}</p>
						{articleCreateResult.link && (
							<p>
								<a href={articleCreateResult.link} target="_blank" rel="noopener noreferrer">
									Abrir artigo no GitHub
								</a>
							</p>
						)}
					</div>
				)}
				{articleDeleteResult && (
					<div className={`admin__connection admin__connection--${articleDeleteResult.status}`}>
						<p>Status da exclusao: {articleDeleteResult.message}</p>
						{articleDeleteResult.link && (
							<p>
								<a href={articleDeleteResult.link} target="_blank" rel="noopener noreferrer">
									Abrir commit no GitHub
								</a>
							</p>
						)}
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
									<button
										type="button"
										onClick={() => handleEditArticle(article)}
										disabled={isLoadingArticleForEdit || deletingArticlePath === article.filePath}
									>
										{isLoadingArticleForEdit ? 'Carregando...' : 'Editar'}
									</button>
									<button
										type="button"
										onClick={() => handleDeleteArticle(article)}
										disabled={Boolean(deletingArticlePath)}
									>
										{deletingArticlePath === article.filePath ? 'Excluindo...' : 'Excluir'}
									</button>
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

import { useState } from 'react'
import type { FormEvent } from 'react'
import type { AdminArticle, AdminResult, ArticleFormState, EditingArticle } from '../types/adminTypes'
import { buildArticleMarkdown } from '../utils/articleMarkdownBuilder'
import { createArticleSlug } from '../utils/createArticleSlug'
import { githubTokenStorageKey } from '../services/githubAdminConfig'
import {
	createAdminTestFile,
	deleteMarkdownArticle,
	listMarkdownArticles,
	loadMarkdownArticle,
	saveMarkdownArticle,
	testRepositoryConnection,
} from '../services/githubAdminService'
import { useArticleRichTextEditor } from './useArticleRichTextEditor'

function getCurrentDatetimeLocal() {
	return new Date().toISOString().slice(0, 16)
}

const emptyArticleForm = (): ArticleFormState => {
	const currentDatetime = getCurrentDatetimeLocal()

	return {
		title: '',
		slug: '',
		date: currentDatetime,
		updatedAt: currentDatetime,
		readingTime: 1,
		summary: '',
	}
}

function getSavedToken() {
	return localStorage.getItem(githubTokenStorageKey)
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
	return error instanceof Error ? error.message : fallbackMessage
}

export function useAdminPageController() {
	const [token, setToken] = useState(() => getSavedToken() ?? '')
	const [hasSavedToken, setHasSavedToken] = useState(() => Boolean(getSavedToken()))
	const [message, setMessage] = useState('')
	const [connectionResult, setConnectionResult] = useState<AdminResult | null>(null)
	const [writeResult, setWriteResult] = useState<AdminResult | null>(null)
	const [articleListResult, setArticleListResult] = useState<AdminResult | null>(null)
	const [articleCreateResult, setArticleCreateResult] = useState<AdminResult | null>(null)
	const [articleDeleteResult, setArticleDeleteResult] = useState<AdminResult | null>(null)
	const [adminArticles, setAdminArticles] = useState<AdminArticle[]>([])
	const [editingArticle, setEditingArticle] = useState<EditingArticle | null>(null)
	const [isTestingConnection, setIsTestingConnection] = useState(false)
	const [isCreatingTestFile, setIsCreatingTestFile] = useState(false)
	const [isListingArticles, setIsListingArticles] = useState(false)
	const [isCreatingArticle, setIsCreatingArticle] = useState(false)
	const [isLoadingArticleForEdit, setIsLoadingArticleForEdit] = useState(false)
	const [deletingArticlePath, setDeletingArticlePath] = useState('')
	const [articleForm, setArticleForm] = useState<ArticleFormState>(() => emptyArticleForm())
	const [isSlugEdited, setIsSlugEdited] = useState(false)
	const richTextEditor = useArticleRichTextEditor()

	function clearResults() {
		setConnectionResult(null)
		setWriteResult(null)
		setArticleListResult(null)
		setArticleCreateResult(null)
		setArticleDeleteResult(null)
	}

	function handleTokenChange(value: string) {
		setToken(value)
		setMessage('')
	}

	function handleSaveToken(event: FormEvent<HTMLFormElement>) {
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
		clearResults()
		setEditingArticle(null)
	}

	function handleRemoveToken() {
		localStorage.removeItem(githubTokenStorageKey)
		setToken('')
		setHasSavedToken(false)
		setMessage('Token removido do navegador.')
		clearResults()
		setAdminArticles([])
		setEditingArticle(null)
	}

	async function handleTestConnection() {
		const savedToken = getSavedToken()

		if (!savedToken) {
			setConnectionResult({
				status: 'error',
				message: 'Nenhum token salvo para testar.',
			})
			return
		}

		setIsTestingConnection(true)
		setConnectionResult(null)

		try {
			const repository = await testRepositoryConnection(savedToken)

			setConnectionResult({
				status: 'success',
				message: 'Conexão realizada com sucesso.',
				repositoryName: repository.repositoryName,
				defaultBranch: repository.defaultBranch,
			})
		} catch (error) {
			setConnectionResult({
				status: 'error',
				message: getErrorMessage(error, 'Erro inesperado ao testar conexão.'),
			})
		} finally {
			setIsTestingConnection(false)
		}
	}

	async function handleCreateTestFile() {
		const savedToken = getSavedToken()

		if (!savedToken) {
			setWriteResult({
				status: 'error',
				message: 'Nenhum token salvo para criar o arquivo.',
			})
			return
		}

		setIsCreatingTestFile(true)
		setWriteResult(null)

		try {
			const link = await createAdminTestFile(savedToken)

			setWriteResult({
				status: 'success',
				message: 'Arquivo de teste criado com sucesso.',
				link,
			})
		} catch (error) {
			setWriteResult({
				status: 'error',
				message: getErrorMessage(error, 'Erro inesperado ao criar arquivo.'),
			})
		} finally {
			setIsCreatingTestFile(false)
		}
	}

	async function handleListArticles() {
		const savedToken = getSavedToken()

		if (!savedToken) {
			setArticleListResult({
				status: 'error',
				message: 'Nenhum token salvo para listar artigos.',
			})
			return
		}

		setIsListingArticles(true)
		setArticleListResult(null)

		try {
			const articlesFromGithub = await listMarkdownArticles(savedToken)

			setAdminArticles(articlesFromGithub)
			setArticleListResult({
				status: 'success',
				message: `${articlesFromGithub.length} artigo(s) encontrado(s).`,
			})
		} catch (error) {
			setArticleListResult({
				status: 'error',
				message: getErrorMessage(error, 'Erro inesperado ao listar artigos.'),
			})
		} finally {
			setIsListingArticles(false)
		}
	}

	function updateArticleForm(field: keyof ArticleFormState, value: ArticleFormState[keyof ArticleFormState]) {
		setArticleForm((currentForm) => {
			if (field === 'title' && !isSlugEdited && typeof value === 'string') {
				return {
					...currentForm,
					title: value,
					slug: createArticleSlug(value),
				}
			}

			if (field === 'slug') {
				setIsSlugEdited(true)
			}

			return {
				...currentForm,
				[field]: value,
			}
		})
	}

	function resetArticleForm() {
		setArticleForm(emptyArticleForm())
		setIsSlugEdited(false)
		setEditingArticle(null)
		richTextEditor.clearContent()
	}

	async function handleEditArticle(article: AdminArticle) {
		const savedToken = getSavedToken()

		if (!savedToken) {
			setArticleCreateResult({
				status: 'error',
				message: 'Nenhum token salvo para editar artigo.',
			})
			return
		}

		setIsLoadingArticleForEdit(true)
		setArticleCreateResult(null)

		try {
			const loadedArticle = await loadMarkdownArticle(savedToken, article)

			setArticleForm({
				title: loadedArticle.article.title,
				slug: loadedArticle.article.slug,
				date: loadedArticle.article.date,
				updatedAt: loadedArticle.article.updatedAt,
				readingTime: loadedArticle.article.readingTime,
				summary: loadedArticle.article.summary,
			})
			setIsSlugEdited(true)
			setEditingArticle({
				filePath: article.filePath,
				sha: loadedArticle.sha,
			})
			richTextEditor.setMarkdownContent(loadedArticle.article.content)
			setArticleCreateResult({
				status: 'success',
				message: 'Artigo carregado para edicão.',
			})
		} catch (error) {
			setArticleCreateResult({
				status: 'error',
				message: getErrorMessage(error, 'Erro inesperado ao carregar artigo.'),
			})
		} finally {
			setIsLoadingArticleForEdit(false)
		}
	}

	async function handleDeleteArticle(article: AdminArticle) {
		const savedToken = getSavedToken()

		if (!savedToken) {
			setArticleDeleteResult({
				status: 'error',
				message: 'Nenhum token salvo para excluir artigo.',
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
			const link = await deleteMarkdownArticle(savedToken, article)

			setAdminArticles((currentArticles) => currentArticles.filter((item) => item.filePath !== article.filePath))

			if (editingArticle?.filePath === article.filePath) {
				resetArticleForm()
			}

			setArticleDeleteResult({
				status: 'success',
				message: 'Artigo excluido com sucesso.',
				link,
			})
		} catch (error) {
			setArticleDeleteResult({
				status: 'error',
				message: getErrorMessage(error, 'Erro inesperado ao excluir artigo.'),
			})
		} finally {
			setDeletingArticlePath('')
		}
	}

	async function handleSaveArticle(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const savedToken = getSavedToken()

		if (!savedToken) {
			setArticleCreateResult({
				status: 'error',
				message: 'Nenhum token salvo para criar artigo.',
			})
			return
		}

		if (!articleForm.title.trim() || !articleForm.slug.trim() || !articleForm.date.trim() || !articleForm.readingTime || !articleForm.summary.trim()) {
			setArticleCreateResult({
				status: 'error',
				message: 'Preencha titulo, slug, data, tempo de leitura e resumo.',
			})
			return
		}

		if (richTextEditor.isContentEmpty()) {
			setArticleCreateResult({
				status: 'error',
				message: 'Escreva o conteudo do artigo antes de salvar.',
			})
			return
		}

		setIsCreatingArticle(true)
		setArticleCreateResult(null)

		try {
			const markdownContent = richTextEditor.getMarkdownContent()
			const articleFormForSave = {
				...articleForm,
				updatedAt: editingArticle ? getCurrentDatetimeLocal() : articleForm.date,
			}
			const markdownFile = buildArticleMarkdown(articleFormForSave, markdownContent)
			const articlePath = editingArticle?.filePath ?? `content/articles/${articleForm.slug.trim()}.md`
			const savedResult = await saveMarkdownArticle(savedToken, articlePath, markdownFile, editingArticle?.sha)

			setAdminArticles((currentArticles) => [
				savedResult.savedArticle,
				...currentArticles.filter((article) => article.filePath !== articlePath),
			].sort((firstArticle, secondArticle) => secondArticle.date.localeCompare(firstArticle.date)))
			setArticleCreateResult({
				status: 'success',
				message: editingArticle ? 'Artigo atualizado com sucesso.' : 'Artigo criado com sucesso.',
				link: savedResult.link,
			})
			resetArticleForm()
		} catch (error) {
			setArticleCreateResult({
				status: 'error',
				message: getErrorMessage(error, 'Erro inesperado ao criar artigo.'),
			})
		} finally {
			setIsCreatingArticle(false)
		}
	}

	return {
		token,
		hasSavedToken,
		message,
		connectionResult,
		writeResult,
		articleListResult,
		articleCreateResult,
		articleDeleteResult,
		adminArticles,
		editingArticle,
		isTestingConnection,
		isCreatingTestFile,
		isListingArticles,
		isCreatingArticle,
		isLoadingArticleForEdit,
		deletingArticlePath,
		articleForm,
		linkDraft: richTextEditor.linkDraft,
		editor: richTextEditor.editor,
		setLinkDraft: richTextEditor.setLinkDraft,
		handleTokenChange,
		handleSaveToken,
		handleRemoveToken,
		handleTestConnection,
		handleCreateTestFile,
		handleListArticles,
		updateArticleForm,
		handleSetLink: richTextEditor.openLinkPanel,
		handleApplyLink: richTextEditor.applyLink,
		handleRemoveLink: richTextEditor.removeLink,
		handleInsertImage: richTextEditor.insertImage,
		resetArticleForm,
		handleEditArticle,
		handleDeleteArticle,
		handleSaveArticle,
	}
}

import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import toast from 'react-hot-toast'
import type { AdminArticle, ArticleFormState, EditingArticle } from '../types/adminTypes'
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

function showAdminToast(type: 'success' | 'error' | 'info', message: string) {
	toast.dismiss()
	const toastOptions = {
		className: `toaster toaster--${type}`,
		icon: null,
	}

	if (type === 'success') {
		toast.success(message, toastOptions)
		return
	}

	if (type === 'error') {
		toast.error(message, toastOptions)
		return
	}

	toast(message, toastOptions)
}

export function useAdminPageController() {
	const [token, setToken] = useState(() => getSavedToken() ?? '')
	const [hasSavedToken, setHasSavedToken] = useState(() => Boolean(getSavedToken()))
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
	const hasLoadedInitialArticles = useRef(false)
	const richTextEditor = useArticleRichTextEditor()

	function handleTokenChange(value: string) {
		setToken(value)
	}

	function handleSaveToken(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const trimmedToken = token.trim()

		if (!trimmedToken) {
			showAdminToast('info', 'Cole um token antes de salvar.')
			return
		}

		localStorage.setItem(githubTokenStorageKey, trimmedToken)
		setToken(trimmedToken)
		setHasSavedToken(true)
		setEditingArticle(null)
		showAdminToast('success', 'Token salvo com sucesso.')
	}

	function handleRemoveToken() {
		localStorage.removeItem(githubTokenStorageKey)
		setToken('')
		setHasSavedToken(false)
		setAdminArticles([])
		setEditingArticle(null)
		showAdminToast('info', 'Token removido do navegador.')
	}

	async function handleTestConnection() {
		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para testar.')
			return
		}

		setIsTestingConnection(true)

		try {
			await testRepositoryConnection(savedToken)
			showAdminToast('success', 'Conexão realizada com sucesso.')
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro inesperado ao testar conexão.'))
		} finally {
			setIsTestingConnection(false)
		}
	}

	async function handleCreateTestFile() {
		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para criar o arquivo.')
			return
		}

		setIsCreatingTestFile(true)

		try {
			await createAdminTestFile(savedToken)
			showAdminToast('success', 'Arquivo de teste criado com sucesso.')
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro inesperado ao criar arquivo.'))
		} finally {
			setIsCreatingTestFile(false)
		}
	}

	const listSavedArticles = useCallback(async (savedToken: string, shouldNotify = true) => {
		setIsListingArticles(true)

		try {
			const articlesFromGithub = await listMarkdownArticles(savedToken)

			setAdminArticles(articlesFromGithub)

			if (shouldNotify) {
				showAdminToast('success', `${articlesFromGithub.length} artigo(s) encontrado(s).`)
			}
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro inesperado ao listar artigos.'))
		} finally {
			setIsListingArticles(false)
		}
	}, [])

	useEffect(() => {
		const savedToken = getSavedToken()

		if (hasLoadedInitialArticles.current || !savedToken) {
			return
		}

		hasLoadedInitialArticles.current = true
		void listSavedArticles(savedToken, false)
	}, [listSavedArticles])

	async function handleListArticles() {
		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para listar artigos.')
			return
		}

		await listSavedArticles(savedToken)
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
			showAdminToast('info', 'Nenhum token salvo para editar artigo.')
			return
		}

		setIsLoadingArticleForEdit(true)

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
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro ao carregar artigo.'))
		} finally {
			setIsLoadingArticleForEdit(false)
		}
	}

	async function handleDeleteArticle(article: AdminArticle) {
		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para excluir artigo.')
			return
		}

		const confirmed = window.confirm(`Excluir o artigo "${article.title}"?\n\nArquivo: ${article.filePath}`)

		if (!confirmed) {
			return
		}

		setDeletingArticlePath(article.filePath)

		try {
			await deleteMarkdownArticle(savedToken, article)

			setAdminArticles((currentArticles) => currentArticles.filter((item) => item.filePath !== article.filePath))

			if (editingArticle?.filePath === article.filePath) {
				resetArticleForm()
			}

			showAdminToast('success', 'Artigo removido com sucesso.')
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro inesperado ao excluir artigo.'))
		} finally {
			setDeletingArticlePath('')
		}
	}

	async function handleSaveArticle(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para criar artigo.')
			return
		}

		if (!articleForm.title.trim() || !articleForm.slug.trim() || !articleForm.date.trim() || !articleForm.readingTime || !articleForm.summary.trim()) {
			showAdminToast('info', 'Preencha título, slug, data, tempo de leitura e resumo.')
			return
		}

		if (richTextEditor.isContentEmpty()) {
			showAdminToast('info', 'Escreva o conteúdo do artigo antes de salvar.')
			return
		}

		setIsCreatingArticle(true)

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
			showAdminToast('success', editingArticle ? 'Artigo publicado com sucesso.' : 'Artigo criado com sucesso.')
			resetArticleForm()
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro inesperado ao criar artigo.'))
		} finally {
			setIsCreatingArticle(false)
		}
	}

	return {
		token,
		hasSavedToken,
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

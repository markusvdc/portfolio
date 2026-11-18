import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import toast from 'react-hot-toast'
import type { AdminPost, PostFormState, EditingPost } from '../types/adminTypes'
import { buildPostMarkdown } from '../utils/PostBuilder'
import { createPostSlug } from '../utils/PostSlug'
import { githubTokenStorageKey } from '../services/AdminConfig'
import {
	createAdminTestFile,
	deleteMarkdownPost,
	listMarkdownPosts,
	loadMarkdownPost,
	saveMarkdownPost,
	testRepositoryConnection,
} from '../services/AdminService'
import { usePostRichTextEditor } from './usePost'

function getCurrentDatetimeLocal() {
	return new Date().toISOString().slice(0, 16)
}

const emptyPostForm = (): PostFormState => {
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

function getNewPostPath(slug: string, existingPosts: AdminPost[]) {
	const [firstWord = 'post', secondWord = 'novo'] = slug.split('-').filter(Boolean)
	const filePrefix = `content/posts/${firstWord}-${secondWord}`
	const existingPaths = new Set(existingPosts.map((post) => post.filePath))
	let filePath = `${filePrefix}.md`
	let suffix = 2

	while (existingPaths.has(filePath)) {
		filePath = `${filePrefix}${suffix}.md`
		suffix += 1
	}

	return filePath
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
	const [adminPosts, setAdminPosts] = useState<AdminPost[]>([])
	const [editingPost, setEditingPost] = useState<EditingPost | null>(null)
	const [isTestingConnection, setIsTestingConnection] = useState(false)
	const [isCreatingTestFile, setIsCreatingTestFile] = useState(false)
	const [isListingPosts, setIsListingPosts] = useState(false)
	const [isCreatingPost, setIsCreatingPost] = useState(false)
	const [isLoadingPostForEdit, setIsLoadingPostForEdit] = useState(false)
	const [deletingPostPath, setDeletingPostPath] = useState('')
	const [postForm, setPostForm] = useState<PostFormState>(() => emptyPostForm())
	const [isSlugEdited, setIsSlugEdited] = useState(false)
	const hasLoadedInitialPosts = useRef(false)
	const richTextEditor = usePostRichTextEditor()

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
		setEditingPost(null)
		showAdminToast('success', 'Token salvo com sucesso.')
	}

	function handleRemoveToken() {
		localStorage.removeItem(githubTokenStorageKey)
		setToken('')
		setHasSavedToken(false)
		setAdminPosts([])
		setEditingPost(null)
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

	const listSavedPosts = useCallback(async (savedToken: string, shouldNotify = true) => {
		setIsListingPosts(true)

		try {
			const postsFromGithub = await listMarkdownPosts(savedToken)

			setAdminPosts(postsFromGithub)

			if (shouldNotify) {
				showAdminToast('success', `${postsFromGithub.length} post(s) encontrado(s).`)
			}
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro inesperado ao listar posts.'))
		} finally {
			setIsListingPosts(false)
		}
	}, [])

	useEffect(() => {
		const savedToken = getSavedToken()

		if (hasLoadedInitialPosts.current || !savedToken) {
			return
		}

		hasLoadedInitialPosts.current = true
		void listSavedPosts(savedToken, false)
	}, [listSavedPosts])

	async function handleListPosts() {
		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para listar posts.')
			return
		}

		await listSavedPosts(savedToken)
	}

	function updatePostForm(field: keyof PostFormState, value: PostFormState[keyof PostFormState]) {
		setPostForm((currentForm) => {
			if (field === 'title' && !isSlugEdited && typeof value === 'string') {
				return {
					...currentForm,
					title: value,
					slug: createPostSlug(value),
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

	function resetPostForm() {
		setPostForm(emptyPostForm())
		setIsSlugEdited(false)
		setEditingPost(null)
		richTextEditor.clearContent()
	}

	async function handleEditPost(post: AdminPost) {
		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para editar post.')
			return
		}

		setIsLoadingPostForEdit(true)

		try {
			const loadedPost = await loadMarkdownPost(savedToken, post)

			setPostForm({
				title: loadedPost.post.title,
				slug: loadedPost.post.slug,
				date: loadedPost.post.date,
				updatedAt: loadedPost.post.updatedAt,
				readingTime: loadedPost.post.readingTime,
				summary: loadedPost.post.summary,
			})
			setIsSlugEdited(true)
			setEditingPost({
				filePath: post.filePath,
				sha: loadedPost.sha,
			})
			richTextEditor.setMarkdownContent(loadedPost.post.content)
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro ao carregar post.'))
		} finally {
			setIsLoadingPostForEdit(false)
		}
	}

	async function handleDeletePost(post: AdminPost) {
		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para excluir post.')
			return
		}

		const confirmed = window.confirm(`Excluir o post "${post.title}"?\n\nArquivo: ${post.filePath}`)

		if (!confirmed) {
			return
		}

		setDeletingPostPath(post.filePath)

		try {
			await deleteMarkdownPost(savedToken, post)

			setAdminPosts((currentPosts) => currentPosts.filter((item) => item.filePath !== post.filePath))

			if (editingPost?.filePath === post.filePath) {
				resetPostForm()
			}

			showAdminToast('success', 'Post removido com sucesso.')
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro inesperado ao excluir post.'))
		} finally {
			setDeletingPostPath('')
		}
	}

	async function handleSavePost(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const savedToken = getSavedToken()

		if (!savedToken) {
			showAdminToast('info', 'Nenhum token salvo para criar post.')
			return
		}

		if (!postForm.title.trim() || !postForm.slug.trim() || !postForm.date.trim() || !postForm.readingTime || !postForm.summary.trim()) {
			showAdminToast('info', 'Preencha título, slug, data, tempo de leitura e resumo.')
			return
		}

		if (richTextEditor.isContentEmpty()) {
			showAdminToast('info', 'Escreva o conteúdo do post antes de salvar.')
			return
		}

		setIsCreatingPost(true)

		try {
			const markdownContent = richTextEditor.getMarkdownContent()
			const postFormForSave = {
				...postForm,
				updatedAt: editingPost ? getCurrentDatetimeLocal() : postForm.date,
			}
			const markdownFile = buildPostMarkdown(postFormForSave, markdownContent)
			const postPath = editingPost?.filePath ?? getNewPostPath(postForm.slug.trim(), adminPosts)
			const savedResult = await saveMarkdownPost(savedToken, postPath, markdownFile, editingPost?.sha)

			setAdminPosts((currentPosts) => [
				savedResult.savedPost,
				...currentPosts.filter((post) => post.filePath !== postPath),
			].sort((firstPost, secondPost) => secondPost.date.localeCompare(firstPost.date)))
			showAdminToast('success', editingPost ? 'Post publicado com sucesso.' : 'Post criado com sucesso.')
			resetPostForm()
		} catch (error) {
			showAdminToast('error', getErrorMessage(error, 'Erro inesperado ao criar post.'))
		} finally {
			setIsCreatingPost(false)
		}
	}

	return {
		token,
		hasSavedToken,
		adminPosts,
		editingPost,
		isTestingConnection,
		isCreatingTestFile,
		isListingPosts,
		isCreatingPost,
		isLoadingPostForEdit,
		deletingPostPath,
		postForm,
		linkDraft: richTextEditor.linkDraft,
		editor: richTextEditor.editor,
		setLinkDraft: richTextEditor.setLinkDraft,
		handleTokenChange,
		handleSaveToken,
		handleRemoveToken,
		handleTestConnection,
		handleCreateTestFile,
		handleListPosts,
		updatePostForm,
		handleSetLink: richTextEditor.openLinkPanel,
		handleApplyLink: richTextEditor.applyLink,
		handleRemoveLink: richTextEditor.removeLink,
		handleInsertImage: richTextEditor.insertImage,
		resetPostForm,
		handleEditPost,
		handleDeletePost,
		handleSavePost,
	}
}

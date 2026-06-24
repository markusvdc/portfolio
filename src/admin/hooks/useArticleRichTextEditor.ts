import { useState } from 'react'
import { useEditor } from '@tiptap/react'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { normalizeMarkdownCodeBlocks } from '../../shared/articles/normalizeMarkdownCodeBlocks'
import type { LinkDraft } from '../types/adminTypes'
import {
	ManualLink,
	convertEditorHtmlToMarkdown,
	parseMarkdownToEditorHtml,
	stripLinksFromPastedHtml,
} from '../utils/editorMarkdown'

export function useArticleRichTextEditor() {
	const [linkDraft, setLinkDraft] = useState<LinkDraft | null>(null)
	const editor = useEditor({
		extensions: [
			StarterKit,
			ManualLink.configure({
				openOnClick: false,
				enableClickSelection: false,
				autolink: false,
				linkOnPaste: false,
				shouldAutoLink: () => false,
				HTMLAttributes: {
					target: null,
					rel: null,
				},
			}),
			Image.configure({
				inline: false,
				allowBase64: false,
			}),
		],
		content: '',
		editorProps: {
			transformPastedHTML: stripLinksFromPastedHtml,
		},
	})

	function openLinkPanel() {
		if (!editor) {
			return
		}

		const previousUrl = editor.getAttributes('link').href as string | undefined

		setLinkDraft({
			url: previousUrl ?? '',
			hasLink: Boolean(previousUrl),
		})
	}

	function applyLink(isExternalLink: boolean) {
		if (!editor || !linkDraft) {
			return
		}

		const url = linkDraft.url.trim()

		if (!url) {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()
			setLinkDraft(null)
			return
		}

		editor.chain().focus().extendMarkRange('link').setLink({
			href: url,
			target: isExternalLink ? '_blank' : null,
			rel: isExternalLink ? 'noopener noreferrer' : null,
		}).run()
		setLinkDraft(null)
	}

	function removeLink() {
		editor?.chain().focus().extendMarkRange('link').unsetLink().run()
		setLinkDraft(null)
	}

	function insertImage() {
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

	function setMarkdownContent(markdown: string) {
		editor?.commands.setContent(parseMarkdownToEditorHtml(markdown))
	}

	function getMarkdownContent() {
		return editor ? normalizeMarkdownCodeBlocks(convertEditorHtmlToMarkdown(editor.getHTML())) : ''
	}

	function clearContent() {
		setLinkDraft(null)
		editor?.commands.clearContent()
	}

	function isContentEmpty() {
		return !editor || editor.isEmpty
	}

	return {
		editor,
		linkDraft,
		setLinkDraft,
		openLinkPanel,
		applyLink,
		removeLink,
		insertImage,
		setMarkdownContent,
		getMarkdownContent,
		clearContent,
		isContentEmpty,
	}
}

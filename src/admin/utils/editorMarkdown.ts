import Link from '@tiptap/extension-link'
import { marked } from 'marked'
import TurndownService from 'turndown'
import type { CalloutType } from '../types/adminTypes'

export const ManualLink = Link.extend({
	addPasteRules() {
		return []
	},
	addProseMirrorPlugins() {
		return []
	},
})

const turndownService = new TurndownService({
	headingStyle: 'atx',
	bulletListMarker: '-',
	codeBlockStyle: 'fenced',
})

function escapeHtmlAttribute(value: string) {
	return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

turndownService.addRule('externalLinks', {
	filter(node) {
		return node.nodeName === 'A' && (node as HTMLElement).getAttribute('target') === '_blank'
	},
	replacement(content, node) {
		const linkElement = node as HTMLElement
		const href = linkElement.getAttribute('href')

		if (!href) {
			return content
		}

		return `<a href="${escapeHtmlAttribute(href)}" target="_blank" rel="noopener noreferrer">${content}</a>`
	},
})

turndownService.addRule('fencedCodeBlockWithLanguage', {
	filter(node) {
		const firstChild = node.firstChild

		return node.nodeName === 'PRE' && firstChild?.nodeName === 'CODE'
	},
	replacement(_, node) {
		const codeElement = node.firstChild as HTMLElement
		const language = codeElement.className.match(/language-([a-z0-9-]+)/i)?.[1] ?? ''
		const code = codeElement.textContent ?? ''

		return `\n\n\`\`\`${language}\n${code.replace(/\n$/, '')}\n\`\`\`\n\n`
	},
})

export function parseMarkdownToEditorHtml(markdown: string) {
	return marked.parse(markdown, { async: false }) as string
}

export function convertEditorHtmlToMarkdown(html: string) {
	return turndownService.turndown(html)
}

export function stripLinksFromPastedHtml(html: string) {
	const document = new DOMParser().parseFromString(html, 'text/html')

	document.querySelectorAll('a').forEach((link) => {
		link.replaceWith(...Array.from(link.childNodes))
	})

	return document.body.innerHTML
}

export function createCalloutHtml(type: CalloutType) {
	return `<blockquote><p>[!${type}]</p><p>Escreva o destaque aqui.</p></blockquote>`
}

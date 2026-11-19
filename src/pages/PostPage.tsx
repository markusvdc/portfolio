import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { marked } from 'marked'
import Overview from '../components/Overview'
import { posts } from '../data/posts'
import { formatPostDate } from '../utils/PostDate'
import { normalizeMarkdownCodeBlocks } from '../posts/CodeBlocks'

const codeBlockTheme = 'github-dark'
const supportedLanguages = [
	'typescript',
	'javascript',
	'html',
	'css',
	'scss',
	'json',
	'bash',
	'shellscript',
	'tsx',
	'jsx',
] as const
type SupportedCodeLanguage = typeof supportedLanguages[number]
type PostCodeHighlighter = {
	codeToHtml: (code: string, options: { lang: SupportedCodeLanguage, theme: typeof codeBlockTheme }) => string
}
let highlighterPromise: Promise<PostCodeHighlighter> | null = null

function getHighlighter() {
	highlighterPromise ??= Promise.all([
		import('shiki/core'),
		import('shiki/engine/javascript'),
		import('@shikijs/themes/github-dark'),
		import('@shikijs/langs/typescript'),
		import('@shikijs/langs/javascript'),
		import('@shikijs/langs/html'),
		import('@shikijs/langs/css'),
		import('@shikijs/langs/scss'),
		import('@shikijs/langs/json'),
		import('@shikijs/langs/bash'),
		import('@shikijs/langs/shellscript'),
		import('@shikijs/langs/tsx'),
		import('@shikijs/langs/jsx'),
	]).then(async ([
		{ createHighlighterCore },
		{ createJavaScriptRegexEngine },
		githubDark,
		typescript,
		javascript,
		html,
		css,
		scss,
		json,
		bash,
		shellscript,
		tsx,
		jsx,
	]) => createHighlighterCore({
		themes: [githubDark.default],
		langs: [
			typescript.default,
			javascript.default,
			html.default,
			css.default,
			scss.default,
			json.default,
			bash.default,
			shellscript.default,
			tsx.default,
			jsx.default,
		],
		engine: createJavaScriptRegexEngine(),
	}) as Promise<PostCodeHighlighter>)

	return highlighterPromise
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}

function inferCodeLanguage(code: string): SupportedCodeLanguage | null {
	const trimmedCode = code.trim()

	if (/^</.test(trimmedCode)) {
		return 'html'
	}

	if (/^\{[\s\S]*\}$/.test(trimmedCode)) {
		return 'json'
	}

	if (/\b(interface|type|enum|implements|readonly)\b/.test(trimmedCode)) {
		return 'typescript'
	}

	if (/\b(const|let|function|import|export|return)\b/.test(trimmedCode)) {
		return 'javascript'
	}

	if (/\b(npm|git|cd|mkdir|rm|cp|mv)\b/.test(trimmedCode)) {
		return 'bash'
	}

	if (/[.#]?[a-z0-9_-]+\s*\{[\s\S]*\}/i.test(trimmedCode)) {
		return 'css'
	}

	return null
}

function resolveCodeLanguage(language = '', code = '') {
	const normalizedLanguage = language.trim().toLowerCase()
	const aliases: Record<string, SupportedCodeLanguage> = {
		ts: 'typescript',
		js: 'javascript',
		sh: 'bash',
		shell: 'bash',
	}

	return aliases[normalizedLanguage] ?? (
		supportedLanguages.includes(normalizedLanguage as SupportedCodeLanguage)
			? normalizedLanguage as SupportedCodeLanguage
			: inferCodeLanguage(code)
	)
}

async function renderPostMarkdown(content: string) {
	const normalizedContent = normalizeMarkdownCodeBlocks(content)
	const highlightedCodeBlocks: string[] = []
	const markdownWithoutCodeBlocks = normalizedContent.replace(
		/```([^\n]*)\n([\s\S]*?)\n```/g,
		(_, language: string, code: string) => {
			const placeholder = `<!--SHIKI_CODE_BLOCK_${highlightedCodeBlocks.length}-->`
			highlightedCodeBlocks.push(JSON.stringify({ language, code }))

			return placeholder
		}
	)
	const highlighter = highlightedCodeBlocks.length > 0 ? await getHighlighter() : null
	const highlightedHtml = highlightedCodeBlocks.map((serializedCodeBlock) => {
		const { language, code } = JSON.parse(serializedCodeBlock) as { language: string, code: string }
		const resolvedLanguage = resolveCodeLanguage(language, code)

		if (!resolvedLanguage || !highlighter) {
			return `<pre class="shiki post__code-block"><code>${escapeHtml(code)}</code></pre>`
		}

		return highlighter.codeToHtml(code, {
			lang: resolvedLanguage,
			theme: codeBlockTheme,
		})
	})
	let html = marked.parse(markdownWithoutCodeBlocks, { async: false }) as string

	highlightedHtml.forEach((codeBlockHtml, index) => {
		html = html.replace(`<!--SHIKI_CODE_BLOCK_${index}-->`, codeBlockHtml)
	})

	return html
}

function PostPage() {
	const { slug } = useParams()
	const post = posts.find((item) => item.slug === slug)
	const [postHtml, setPostHtml] = useState('')

	useEffect(() => {
		let isCurrentPost = true

		if (post) {
			document.title = `${post.title} - MARKUS DOMENEGHETI`
		}

		async function renderPost() {
			if (!post) {
				return
			}

			const renderedHtml = await renderPostMarkdown(post.content)

			if (isCurrentPost) {
				setPostHtml(renderedHtml)
			}
		}

		void renderPost()

		return () => {
			isCurrentPost = false
		}
	}, [post])

	if (!post) {
		return <Navigate to="/blog" replace />
	}

	return (
		<main>
			<Overview />
			<article className="post">
				<div className="post__container container">
					<header className="post__header">
						<h1>{post.title}</h1>
						<div className="post__meta">
							<time dateTime={post.date}>{formatPostDate(post.date)}</time>
							<span>{post.readingTime} min de leitura</span>
						</div>
						<ul className="post-tags" aria-label="Tags do post">
							{post.tags.map((tag) => <li className="post-tags__item" key={tag}>{tag}</li>)}
						</ul>
					</header>
					<div
						className="post__content"
						dangerouslySetInnerHTML={{ __html: postHtml }}
					/>
					<Link className="post__back button button--secondary" to="/blog">
						Voltar Para Blog
					</Link>
				</div>
			</article>
		</main>
	)
}

export default PostPage

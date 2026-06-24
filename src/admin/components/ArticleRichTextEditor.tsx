import { EditorContent } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import {
	Bold,
	Code,
	FileCode2,
	Heading2,
	Image,
	Link,
	List,
	ListOrdered,
	Minus,
	Quote,
	Unlink,
} from 'lucide-react'
import type { LinkDraft } from '../types/adminTypes'

type ArticleRichTextEditorProps = {
	editor: Editor | null
	linkDraft: LinkDraft | null
	onOpenLinkPanel: () => void
	onChangeLinkDraft: (draft: LinkDraft) => void
	onApplyLink: (isExternalLink: boolean) => void
	onRemoveLink: () => void
	onCancelLink: () => void
	onInsertImage: () => void
}

function ArticleRichTextEditor({
	editor,
	linkDraft,
	onOpenLinkPanel,
	onChangeLinkDraft,
	onApplyLink,
	onRemoveLink,
	onCancelLink,
	onInsertImage,
}: ArticleRichTextEditorProps) {
	return (
		<div className="admin__editor">
			<div className="admin__toolbar">
				<button
					type="button"
					className={editor?.isActive('bold') ? 'is-active' : ''}
					onClick={() => editor?.chain().focus().toggleBold().run()}
					disabled={!editor}
					aria-label="Negrito"
					title="Negrito"
				>
					<Bold size={24} />
				</button>
				<button
					type="button"
					className={editor?.isActive('link') ? 'is-active' : ''}
					onClick={onOpenLinkPanel}
					disabled={!editor}
					aria-label="Link"
					title="Link"
				>
					<Link size={24} />
				</button>
				<button
					type="button"
					className={editor?.isActive('code') ? 'is-active' : ''}
					onClick={() => editor?.chain().focus().toggleCode().run()}
					disabled={!editor}
					aria-label="Inline code"
					title="Inline code"
				>
					<Code size={24} />
				</button>
				<button
					type="button"
					className={editor?.isActive('codeBlock') ? 'is-active' : ''}
					onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
					disabled={!editor}
					aria-label="Code block"
					title="Code block"
				>
					<FileCode2 size={24} />
				</button>
				<button
					type="button"
					className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
					onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
					disabled={!editor}
					aria-label="Heading 2"
					title="Heading 2"
				>
					<Heading2 size={24} />
				</button>
				<button
					type="button"
					className={editor?.isActive('bulletList') ? 'is-active' : ''}
					onClick={() => editor?.chain().focus().toggleBulletList().run()}
					disabled={!editor}
					aria-label="Lista"
					title="Lista"
				>
					<List size={24} />
				</button>
				<button
					type="button"
					className={editor?.isActive('orderedList') ? 'is-active' : ''}
					onClick={() => editor?.chain().focus().toggleOrderedList().run()}
					disabled={!editor}
					aria-label="Lista numerada"
					title="Lista numerada"
				>
					<ListOrdered size={24} />
				</button>
				<button
					type="button"
					onClick={() => editor?.chain().focus().setHorizontalRule().run()}
					disabled={!editor}
					aria-label="Separador"
					title="Separador"
				>
					<Minus size={24} />
				</button>
				<button
					type="button"
					className={editor?.isActive('blockquote') ? 'is-active' : ''}
					onClick={() => editor?.chain().focus().toggleBlockquote().run()}
					disabled={!editor}
					aria-label="Citacao"
					title="Citacao"
				>
					<Quote size={24} />
				</button>
				<button type="button" onClick={onInsertImage} disabled={!editor} aria-label="Imagem" title="Imagem">
					<Image size={24} />
				</button>
			</div>
			{linkDraft && (
				<div className="admin__linkpanel">
					<label htmlFor="article-link-url">URL do link</label>
					<input
						id="article-link-url"
						type="text"
						value={linkDraft.url}
						onChange={(event) => onChangeLinkDraft({
							...linkDraft,
							url: event.target.value,
						})}
						placeholder="https://exemplo.com ou /portfolio/artigos"
					/>
					<div className="admin__linkactions">
						<button type="button" onClick={() => onApplyLink(false)}>
							Salvar como link interno
						</button>
						<button type="button" onClick={() => onApplyLink(true)}>
							Salvar como link externo
						</button>
						{linkDraft.hasLink && (
							<button type="button" onClick={onRemoveLink}>
								<Unlink size={24} />
								Remover link
							</button>
						)}
						<button type="button" onClick={onCancelLink}>
							Cancelar
						</button>
					</div>
				</div>
			)}
			<EditorContent editor={editor} />
		</div>
	)
}

export default ArticleRichTextEditor

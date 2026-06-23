import { EditorContent } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import type { CalloutType, LinkDraft } from '../types/adminTypes'

type ArticleRichTextEditorProps = {
	editor: Editor | null
	linkDraft: LinkDraft | null
	onOpenLinkPanel: () => void
	onChangeLinkDraft: (draft: LinkDraft) => void
	onApplyLink: (isExternalLink: boolean) => void
	onRemoveLink: () => void
	onCancelLink: () => void
	onInsertImage: () => void
	onInsertCallout: (type: CalloutType) => void
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
	onInsertCallout,
}: ArticleRichTextEditorProps) {
	return (
		<div className="admin__editor">
			<div className="admin__editor-toolbar">
				<button
					type="button"
					className={editor?.isActive('bold') ? 'is-active' : ''}
					onClick={() => editor?.chain().focus().toggleBold().run()}
					disabled={!editor}
				>
					Negrito
				</button>
				<button
					type="button"
					className={editor?.isActive('link') ? 'is-active' : ''}
					onClick={onOpenLinkPanel}
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
				<button type="button" onClick={onInsertImage} disabled={!editor}>
					Imagem
				</button>
				<button type="button" onClick={() => onInsertCallout('INFO')} disabled={!editor}>
					INFO
				</button>
				<button type="button" onClick={() => onInsertCallout('TIP')} disabled={!editor}>
					TIP
				</button>
				<button type="button" onClick={() => onInsertCallout('WARNING')} disabled={!editor}>
					WARNING
				</button>
			</div>
			{linkDraft && (
				<div className="admin__link-panel">
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
					<div className="admin__link-actions">
						<button type="button" onClick={() => onApplyLink(false)}>
							Salvar como link interno
						</button>
						<button type="button" onClick={() => onApplyLink(true)}>
							Salvar como link externo
						</button>
						{linkDraft.hasLink && (
							<button type="button" onClick={onRemoveLink}>
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

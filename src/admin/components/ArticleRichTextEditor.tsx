import { EditorContent, useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import {
	Bold,
	Code,
	Braces,
	Heading2,
	Link2,
	Link2Off,
	ExternalLink,
	List,
	ListOrdered,
	X,
	Quote,
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

const inactiveControls = {
	heading: false,
	bold: false,
	link: false,
	bulletList: false,
	orderedList: false,
	blockquote: false,
	codeBlock: false,
	code: false,
}

function ArticleRichTextEditor({
	editor,
	linkDraft,
	onOpenLinkPanel,
	onChangeLinkDraft,
	onApplyLink,
	onRemoveLink,
	onCancelLink,
}: ArticleRichTextEditorProps) {
	const activeControls = useEditorState({
		editor,
		selector: ({ editor: currentEditor }) => {
			if (!currentEditor) {
				return inactiveControls
			}

			return {
				heading: currentEditor.isActive('heading', { level: 2 }),
				bold: currentEditor.isActive('bold'),
				link: currentEditor.isActive('link'),
				bulletList: currentEditor.isActive('bulletList'),
				orderedList: currentEditor.isActive('orderedList'),
				blockquote: currentEditor.isActive('blockquote'),
				codeBlock: currentEditor.isActive('codeBlock'),
				code: currentEditor.isActive('code'),
			}
		},
	}) ?? inactiveControls
	const getControlClass = (isActive: boolean) => `button button--secondary tooltip tooltip--top${isActive ? ' button--active' : ''}`

	return (
		<div className="admin__editor">
			<div className="admin__toolbar">
				<button
					type="button"
					className={getControlClass(activeControls.heading)}
					onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
					disabled={!editor}
					aria-label="Heading 2"
					data-tooltip="Heading 2"
				>
					<Heading2 size={24} />
				</button>
				<button
					type="button"
					className={getControlClass(activeControls.bold)}
					onClick={() => editor?.chain().focus().toggleBold().run()}
					disabled={!editor}
					aria-label="Negrito"
					data-tooltip="Negrito"
				>
					<Bold size={24} />
				</button>
				<button
					type="button"
					className={getControlClass(activeControls.link)}
					onClick={onOpenLinkPanel}
					disabled={!editor}
					aria-label="Link"
					data-tooltip="Link"
				>
					<Link2 size={24} />
				</button>
				<button
					type="button"
					className={getControlClass(activeControls.bulletList)}
					onClick={() => editor?.chain().focus().toggleBulletList().run()}
					disabled={!editor}
					aria-label="Lista"
					data-tooltip="Lista"
				>
					<List size={24} />
				</button>
				<button
					type="button"
					className={getControlClass(activeControls.orderedList)}
					onClick={() => editor?.chain().focus().toggleOrderedList().run()}
					disabled={!editor}
					aria-label="Lista numerada"
					data-tooltip="Lista numerada"
				>
					<ListOrdered size={24} />
				</button>
				<button
					type="button"
					className={getControlClass(activeControls.blockquote)}
					onClick={() => editor?.chain().focus().toggleBlockquote().run()}
					disabled={!editor}
					aria-label="Citação"
					data-tooltip="Citação"
				>
					<Quote size={24} />
				</button>
				<button
					type="button"
					className={getControlClass(activeControls.codeBlock)}
					onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
					disabled={!editor}
					aria-label="Code block"
					data-tooltip="Code block"
				>
					<Braces size={24} />
				</button>
				<button
					type="button"
					className={getControlClass(activeControls.code)}
					onClick={() => editor?.chain().focus().toggleCode().run()}
					disabled={!editor}
					aria-label="Inline code"
					data-tooltip="Inline code"
				>
					<Code size={24} />
				</button>
			</div>
			{linkDraft && (
				<div className="admin__linkpanel">
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
						<button className="button button--secondary tooltip tooltip--top" type="button" onClick={() => onApplyLink(false)} data-tooltip="Link interno">
							<Link2 size={24} />
						</button>
						<button className="button button--secondary tooltip tooltip--top" type="button" onClick={() => onApplyLink(true)} data-tooltip="Link externo">
							<ExternalLink size={24} />
						</button>
						{linkDraft.hasLink && (
							<button className="button button--danger tooltip tooltip--top" type="button" onClick={onRemoveLink} data-tooltip="Remover link">
								<Link2Off size={24} />
							</button>
						)}
						<button className="button button--secondary tooltip tooltip--top" type="button" onClick={onCancelLink} data-tooltip="Cancelar">
							<X size={24} />
						</button>
					</div>
				</div>
			)}
			<EditorContent editor={editor} />
		</div>
	)
}

export default ArticleRichTextEditor

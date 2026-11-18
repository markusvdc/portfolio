import type { FormEvent } from 'react'
import type { Editor } from '@tiptap/react'
import PostRichTextEditor from './PostEditor'
import type { PostFormState, EditingPost, LinkDraft } from '../types/adminTypes'
import { formatPostDateTime } from '../../site/utils/PostDate'
import {
	Save,
} from 'lucide-react'

type AdminPostEditorFormProps = {
	form: PostFormState
	editingPost: EditingPost | null
	hasSavedToken: boolean
	isCreatingPost: boolean
	editor: Editor | null
	linkDraft: LinkDraft | null
	onFormChange: (field: keyof PostFormState, value: PostFormState[keyof PostFormState]) => void
	onSubmit: (event: FormEvent<HTMLFormElement>) => void
	onOpenLinkPanel: () => void
	onChangeLinkDraft: (draft: LinkDraft) => void
	onApplyLink: (isExternalLink: boolean) => void
	onRemoveLink: () => void
	onCancelLink: () => void
	onInsertImage: () => void
}

function AdminPostEditorForm({
	form,
	editingPost,
	hasSavedToken,
	isCreatingPost,
	editor,
	linkDraft,
	onFormChange,
	onSubmit,
	onOpenLinkPanel,
	onChangeLinkDraft,
	onApplyLink,
	onRemoveLink,
	onCancelLink,
	onInsertImage,
}: AdminPostEditorFormProps) {
	const visibleUpdatedAt = editingPost ? form.updatedAt : form.date

	return (
		<section className="admin__publisher" aria-labelledby="admin-create-post-title">
			<div className="admin__summary">
				<p>{editingPost ? 'Edite as informações do post e salve as alterações quando concluir.' : 'Preencha os dados do post e publique quando estiver pronto.'}</p>
			</div>
			<form className="admin__form" onSubmit={onSubmit}>
				<div className="admin__grid">
					<div className="admin__field admin__field--wide">
						<label htmlFor="post-title">
							Título
							<span className="admin__character">
								{form.title.length}/75
							</span>
						</label>
						<input
							id="post-title"
							type="text"
							value={form.title}
							onChange={(event) => onFormChange('title', event.target.value)}
							placeholder="Título do post"
						/>
					</div>

					<div className="admin__field">
						<label htmlFor="post-slug">Slug</label>
						<input
							id="post-slug"
							type="text"
							value={form.slug}
							onChange={(event) => onFormChange('slug', event.target.value)}
							placeholder="slug-do-post"
						/>
					</div>

					<div className="admin__field">
						<label htmlFor="post-reading-time">Tempo de leitura</label>
						<input
							id="post-reading-time"
							type="number"
							min={1}
							max={99}
							value={form.readingTime}
							onChange={(event) => {
								const value = Number(event.target.value)
								onFormChange(
									'readingTime',
									Math.min(99, Math.max(1, value))
								)
							}}
						/>
					</div>

					<div className="admin__field">
						<span className="admin__label">Criação</span>
						<span className="admin__value">
							{formatPostDateTime(form.date)}
						</span>
					</div>

					<div className="admin__field">
						<span className="admin__label">Editado</span>
						<span className="admin__value">
							{formatPostDateTime(visibleUpdatedAt || form.date)}
						</span>
					</div>

					<div className="admin__field admin__field--wide">
						<label htmlFor="post-summary">
							Resumo
							<span className="admin__character">
								{form.summary.length}/270
							</span>
						</label>
						<textarea
							id="post-summary"
							value={form.summary}
							onChange={(event) => onFormChange('summary', event.target.value)}
							placeholder="Resumo do post"
							rows={2}
						/>
					</div>
				</div>

				<div className="admin__cms">
					<label>Conteúdo</label>
					<PostRichTextEditor
						editor={editor}
						linkDraft={linkDraft}
						onOpenLinkPanel={onOpenLinkPanel}
						onChangeLinkDraft={onChangeLinkDraft}
						onApplyLink={onApplyLink}
						onRemoveLink={onRemoveLink}
						onCancelLink={onCancelLink}
						onInsertImage={onInsertImage}
					/>
					<div className="admin__actions">
						<button className="button button--primary tooltip tooltip--top" type="submit" disabled={!hasSavedToken || isCreatingPost} data-tooltip={editingPost ? 'Salvar post' : 'Publicar post'}>
							<Save size={24} />
						</button>
					</div>
				</div>

			</form>
		</section>
	)
}

export default AdminPostEditorForm

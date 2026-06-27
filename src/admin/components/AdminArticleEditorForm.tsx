import type { FormEvent } from 'react'
import type { Editor } from '@tiptap/react'
import ArticleRichTextEditor from './ArticleRichTextEditor'
import type { ArticleFormState, EditingArticle, LinkDraft } from '../types/adminTypes'
import { formatArticleDateTime } from '../../site/utils/formatArticleDate'
import {
	Save,
} from 'lucide-react'

type AdminArticleEditorFormProps = {
	form: ArticleFormState
	editingArticle: EditingArticle | null
	hasSavedToken: boolean
	isCreatingArticle: boolean
	editor: Editor | null
	linkDraft: LinkDraft | null
	onFormChange: (field: keyof ArticleFormState, value: ArticleFormState[keyof ArticleFormState]) => void
	onSubmit: (event: FormEvent<HTMLFormElement>) => void
	onOpenLinkPanel: () => void
	onChangeLinkDraft: (draft: LinkDraft) => void
	onApplyLink: (isExternalLink: boolean) => void
	onRemoveLink: () => void
	onCancelLink: () => void
	onInsertImage: () => void
}

function AdminArticleEditorForm({
	form,
	editingArticle,
	hasSavedToken,
	isCreatingArticle,
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
}: AdminArticleEditorFormProps) {
	const visibleUpdatedAt = editingArticle ? form.updatedAt : form.date

	return (
		<section className="admin__publisher" aria-labelledby="admin-create-article-title">
			<div className="admin__summary">
				<p>{editingArticle ? 'Edite as informações do artigo e salve as alterações quando concluir.' : 'Preencha os dados do artigo e publique quando estiver pronto.'}</p>
			</div>
			<form className="admin__form" onSubmit={onSubmit}>
				<div className="admin__grid">
					<div className="admin__field admin__field--wide">
						<label htmlFor="article-title">
							Título
							<span className="admin__character">
								{form.title.length}/75
							</span>
						</label>
						<input
							id="article-title"
							type="text"
							value={form.title}
							onChange={(event) => onFormChange('title', event.target.value)}
							placeholder="Título do artigo"
						/>
					</div>

					<div className="admin__field">
						<label htmlFor="article-slug">Slug</label>
						<input
							id="article-slug"
							type="text"
							value={form.slug}
							onChange={(event) => onFormChange('slug', event.target.value)}
							placeholder="slug-do-artigo"
						/>
					</div>

					<div className="admin__field">
						<label htmlFor="article-reading-time">Tempo de leitura</label>
						<input
							id="article-reading-time"
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
							{formatArticleDateTime(form.date)}
						</span>
					</div>

					<div className="admin__field">
						<span className="admin__label">Editado</span>
						<span className="admin__value">
							{formatArticleDateTime(visibleUpdatedAt || form.date)}
						</span>
					</div>

					<div className="admin__field admin__field--wide">
						<label htmlFor="article-summary">
							Resumo
							<span className="admin__character">
								{form.summary.length}/270
							</span>
						</label>
						<textarea
							id="article-summary"
							value={form.summary}
							onChange={(event) => onFormChange('summary', event.target.value)}
							placeholder="Resumo do artigo"
							rows={2}
						/>
					</div>
				</div>

				<div className="admin__cms">
					<label>Conteúdo</label>
					<ArticleRichTextEditor
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
						<button className="button button--primary tooltip tooltip--top" type="submit" disabled={!hasSavedToken || isCreatingArticle} data-tooltip={editingArticle ? 'Salvar artigo' : 'Publicar artigo'}>
							<Save size={24} />
						</button>
					</div>
				</div>

			</form>
		</section>
	)
}

export default AdminArticleEditorForm

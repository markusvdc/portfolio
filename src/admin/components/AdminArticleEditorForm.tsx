import type { FormEvent } from 'react'
import type { Editor } from '@tiptap/react'
import ArticleRichTextEditor from './ArticleRichTextEditor'
import type { ArticleFormState, EditingArticle, LinkDraft } from '../types/adminTypes'
import { formatArticleDateTime } from '../../site/utils/formatArticleDate'

type AdminArticleEditorFormProps = {
	form: ArticleFormState
	editingArticle: EditingArticle | null
	hasSavedToken: boolean
	isCreatingArticle: boolean
	editor: Editor | null
	linkDraft: LinkDraft | null
	onFormChange: (field: keyof ArticleFormState, value: ArticleFormState[keyof ArticleFormState]) => void
	onSubmit: (event: FormEvent<HTMLFormElement>) => void
	onCancelEdit: () => void
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
	onCancelEdit,
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
							Titulo
							<span className="admin__character">
								{form.title.length}/75
							</span>
						</label>
						<input
							id="article-title"
							type="text"
							value={form.title}
							onChange={(event) => onFormChange('title', event.target.value)}
							placeholder="Titulo do artigo"
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
						<label htmlFor="article-date">Criado em</label>
						<input
							id="article-date"
							type="datetime-local"
							value={form.date}
							onChange={(event) => onFormChange('date', event.target.value)}
						/>
					</div>

					<div className="admin__field">
						<span className="admin__label">Ultima edicao</span>
						<span className="admin__value">
							{formatArticleDateTime(visibleUpdatedAt || form.date)}
						</span>
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

				<div className="admin__field">
					<label htmlFor="article-summary">Conteudo</label>
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
				</div>

				<div className="admin__actions">
					{editingArticle && (
						<button className="admin__button" type="button" onClick={onCancelEdit}>
							Cancelar edicao
						</button>
					)}
					<button className="admin__button admin__button--primary" type="submit" disabled={!hasSavedToken || isCreatingArticle}>
						{isCreatingArticle
							? editingArticle ? 'Atualizando artigo...' : 'Criando artigo...'
							: editingArticle ? 'Atualizar artigo' : 'Criar artigo'}
					</button>
				</div>
			</form>
		</section>
	)
}

export default AdminArticleEditorForm

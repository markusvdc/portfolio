import type { FormEvent } from 'react'
import type { Editor } from '@tiptap/react'
import ArticleRichTextEditor from './ArticleRichTextEditor'
import type { ArticleFormState, CalloutType, EditingArticle, LinkDraft } from '../types/adminTypes'

type AdminArticleEditorFormProps = {
	form: ArticleFormState
	editingArticle: EditingArticle | null
	hasSavedToken: boolean
	isCreatingArticle: boolean
	editor: Editor | null
	linkDraft: LinkDraft | null
	onFormChange: (field: keyof ArticleFormState, value: string) => void
	onSubmit: (event: FormEvent<HTMLFormElement>) => void
	onCancelEdit: () => void
	onOpenLinkPanel: () => void
	onChangeLinkDraft: (draft: LinkDraft) => void
	onApplyLink: (isExternalLink: boolean) => void
	onRemoveLink: () => void
	onCancelLink: () => void
	onInsertImage: () => void
	onInsertCallout: (type: CalloutType) => void
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
	onInsertCallout,
}: AdminArticleEditorFormProps) {
	return (
		<section className="admin__article-editor" aria-labelledby="admin-create-article-title">
			<h2 id="admin-create-article-title">{editingArticle ? 'Editar artigo Markdown' : 'Criar artigo Markdown'}</h2>
			<form className="admin__form" onSubmit={onSubmit}>
				<label htmlFor="article-title">Titulo</label>
				<input
					id="article-title"
					type="text"
					value={form.title}
					onChange={(event) => onFormChange('title', event.target.value)}
					placeholder="Titulo do artigo"
				/>

				<label htmlFor="article-slug">Slug</label>
				<input
					id="article-slug"
					type="text"
					value={form.slug}
					onChange={(event) => onFormChange('slug', event.target.value)}
					placeholder="slug-do-artigo"
					disabled={Boolean(editingArticle)}
				/>

				<label htmlFor="article-date">Data</label>
				<input
					id="article-date"
					type="date"
					value={form.date}
					onChange={(event) => onFormChange('date', event.target.value)}
				/>

				<label htmlFor="article-reading-time">Tempo de leitura</label>
				<input
					id="article-reading-time"
					type="text"
					value={form.readingTime}
					onChange={(event) => onFormChange('readingTime', event.target.value)}
					placeholder="5 min de leitura"
					/>

				<label htmlFor="article-summary">Resumo</label>
				<textarea
					id="article-summary"
					value={form.summary}
					onChange={(event) => onFormChange('summary', event.target.value)}
					placeholder="Resumo do artigo"
					rows={4}
				/>
				
				<label htmlFor="article-summary">Conteúdo</label>
				<ArticleRichTextEditor
					editor={editor}
					linkDraft={linkDraft}
					onOpenLinkPanel={onOpenLinkPanel}
					onChangeLinkDraft={onChangeLinkDraft}
					onApplyLink={onApplyLink}
					onRemoveLink={onRemoveLink}
					onCancelLink={onCancelLink}
					onInsertImage={onInsertImage}
					onInsertCallout={onInsertCallout}
				/>

				<div className="admin__actions">
					<button type="submit" disabled={!hasSavedToken || isCreatingArticle}>
						{isCreatingArticle
							? editingArticle ? 'Atualizando artigo...' : 'Criando artigo...'
							: editingArticle ? 'Atualizar artigo' : 'Criar artigo Markdown'}
					</button>
					{editingArticle && (
						<button type="button" onClick={onCancelEdit}>
							Cancelar edicao
						</button>
					)}
				</div>
			</form>
		</section>
	)
}

export default AdminArticleEditorForm

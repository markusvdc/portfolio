import { FilePen, MoreHorizontal, RefreshCw, Trash2 } from 'lucide-react'
import type { AdminArticle } from '../types/adminTypes'
import { formatArticleDateTime } from '../../site/utils/formatArticleDate'

type AdminArticleListProps = {
	articles: AdminArticle[]
	isListingArticles: boolean
	isLoadingArticleForEdit: boolean
	deletingArticlePath: string
	onListArticles: () => void
	onEditArticle: (article: AdminArticle) => void
	onDeleteArticle: (article: AdminArticle) => void
}

function getArticleStatus(article: AdminArticle) {
	return article.title.toLowerCase().includes('Rascunho') ? 'Rascunho' : 'Publicado'
}

function AdminArticleList({
	articles,
	isListingArticles,
	isLoadingArticleForEdit,
	deletingArticlePath,
	onListArticles,
	onEditArticle,
	onDeleteArticle,
}: AdminArticleListProps) {
	return (
		<section className="admin__articles" aria-labelledby="admin-articles-title">
			<div className="admin__bar">
				<div className="admin__tools admin__tools--right">
					<button className="button button--secondary tooltip tooltip--left" type="button" onClick={onListArticles} disabled={isListingArticles} aria-label="Atualizar lista" data-tooltip="Atualizar listagem">
						<RefreshCw size={24} />
					</button>
				</div>
			</div>
			<div className="admin__frame">
				<table className="admin__table admin__list">
					<thead>
						<tr>
							<th>Título</th>
							<th>Ações</th>
							<th>Criação</th>
							<th>Editado</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{articles.length === 0 ? (
							<tr>
								<td colSpan={5}>
									<div className="admin__empty">
										Nenhum artigo listado ainda.
									</div>
								</td>
							</tr>
						) : articles.map((article) => {
							const status = getArticleStatus(article)
							const statusClass = status === 'Rascunho' ? 'admin__badge--Rascunho' : 'admin__badge--Publicado'

							return (
								<tr key={article.filePath}>
									<td className="admin__title">
										<span>{article.title}</span>
									</td>
									<td>
										<div className="admin__actionsrow">
											<button
												className="button button--secondary tooltip tooltip--top"
												type="button"
												onClick={() => onEditArticle(article)}
												disabled={isLoadingArticleForEdit || deletingArticlePath === article.filePath}
												aria-label="Editar artigo"
												data-tooltip="Editar artigo"
											>
												<FilePen size={24} />
											</button>
											<button
												className="button button--danger tooltip tooltip--top"
												type="button"
												onClick={() => onDeleteArticle(article)}
												disabled={Boolean(deletingArticlePath)}
												aria-label="Excluir artigo"
												data-tooltip="Excluir artigo"
											>
												{deletingArticlePath === article.filePath ? <MoreHorizontal size={24} /> : <Trash2 size={24} />}
											</button>
										</div>
									</td>
									<td>
										<time dateTime={article.date}>{formatArticleDateTime(article.date)}</time>
									</td>
									<td>
										<time dateTime={article.updatedAt}>{formatArticleDateTime(article.updatedAt)}</time>
									</td>
									<td>
										<span className={`admin__badge ${statusClass}`}>
											{status}
										</span>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</section>
	)
}

export default AdminArticleList

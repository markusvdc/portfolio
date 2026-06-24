import { Edit3, MoreHorizontal, RefreshCw, Trash2 } from 'lucide-react'
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
	return article.title.toLowerCase().includes('draft') ? 'Draft' : 'Published'
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
					<button className="admin__icon" type="button" onClick={onListArticles} disabled={isListingArticles} aria-label="Atualizar lista" title="Atualizar lista">
						<RefreshCw size={24} />
					</button>
				</div>
			</div>

			<div className="admin__frame">
				<table className="admin__table admin__table--strapi">
					<thead>
						<tr>
							<th>Title</th>
							<th>Criado em</th>
							<th>Ultima edicao</th>
							<th>Status</th>
							<th aria-label="Acoes"></th>
						</tr>
					</thead>
					<tbody>
						{articles.length === 0 ? (
							<tr>
								<td colSpan={6}>
									<div className="admin__empty">
										Nenhum artigo listado ainda.
									</div>
								</td>
							</tr>
						) : articles.map((article) => {
							const status = getArticleStatus(article)
							const statusClass = status === 'Draft' ? 'admin__badge--draft' : 'admin__badge--published'

							return (
								<tr key={article.filePath}>
									<td>
										<button
											className="admin__title"
											type="button"
											onClick={() => onEditArticle(article)}
											disabled={isLoadingArticleForEdit || deletingArticlePath === article.filePath}
										>
											{article.title}
										</button>
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
									<td>
										<div className="admin__actionsrow">
											<button
												className="admin__ghost"
												type="button"
												onClick={() => onEditArticle(article)}
												disabled={isLoadingArticleForEdit || deletingArticlePath === article.filePath}
												aria-label="Editar artigo"
												title="Editar"
											>
												<Edit3 size={24} />
											</button>
											<button
												className="admin__ghost admin__ghost--danger"
												type="button"
												onClick={() => onDeleteArticle(article)}
												disabled={Boolean(deletingArticlePath)}
												aria-label="Excluir artigo"
												title="Excluir"
											>
												{deletingArticlePath === article.filePath ? <MoreHorizontal size={24} /> : <Trash2 size={24} />}
											</button>
										</div>
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

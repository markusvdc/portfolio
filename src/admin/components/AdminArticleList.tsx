import type { AdminArticle } from '../types/adminTypes'

type AdminArticleListProps = {
	articles: AdminArticle[]
	isLoadingArticleForEdit: boolean
	deletingArticlePath: string
	onEditArticle: (article: AdminArticle) => void
	onDeleteArticle: (article: AdminArticle) => void
}

function AdminArticleList({
	articles,
	isLoadingArticleForEdit,
	deletingArticlePath,
	onEditArticle,
	onDeleteArticle,
}: AdminArticleListProps) {
	if (articles.length === 0) {
		return null
	}

	return (
		<section className="admin__articles" aria-labelledby="admin-articles-title">
			<h2 id="admin-articles-title">Artigos</h2>
			<ul>
				{articles.map((article) => (
					<li key={article.filePath}>
						<strong>{article.title}</strong>
						<span>Slug: {article.slug}</span>
						<span>Arquivo: {article.filePath}</span>
						<span>Data: {article.date}</span>
						<span>Tempo de leitura: {article.readingTime} min</span>
						<button
							type="button"
							onClick={() => onEditArticle(article)}
							disabled={isLoadingArticleForEdit || deletingArticlePath === article.filePath}
						>
							{isLoadingArticleForEdit ? 'Carregando...' : 'Editar'}
						</button>
						<button
							type="button"
							onClick={() => onDeleteArticle(article)}
							disabled={Boolean(deletingArticlePath)}
						>
							{deletingArticlePath === article.filePath ? 'Excluindo...' : 'Excluir'}
						</button>
					</li>
				))}
			</ul>
		</section>
	)
}

export default AdminArticleList

import { FilePen, MoreHorizontal, RefreshCw, Trash2 } from 'lucide-react'
import type { AdminPost } from '../types/adminTypes'
import { formatPostDateTime } from '../../site/utils/PostDate'

type AdminPostListProps = {
	posts: AdminPost[]
	isListingPosts: boolean
	isLoadingPostForEdit: boolean
	deletingPostPath: string
	onListPosts: () => void
	onEditPost: (post: AdminPost) => void
	onDeletePost: (post: AdminPost) => void
}

function getPostStatus(post: AdminPost) {
	return post.title.toLowerCase().includes('Rascunho') ? 'Rascunho' : 'Publicado'
}

function AdminPostList({
	posts,
	isListingPosts,
	isLoadingPostForEdit,
	deletingPostPath,
	onListPosts,
	onEditPost,
	onDeletePost,
}: AdminPostListProps) {
	return (
		<section className="admin__posts" aria-labelledby="admin-posts-title">
			<div className="admin__bar">
				<div className="admin__tools admin__tools--right">
					<button className="button button--secondary tooltip tooltip--left" type="button" onClick={onListPosts} disabled={isListingPosts} aria-label="Atualizar lista" data-tooltip="Atualizar listagem">
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
						{posts.length === 0 ? (
							<tr>
								<td colSpan={5}>
									<div className="admin__empty">
										Nenhum post listado ainda.
									</div>
								</td>
							</tr>
						) : posts.map((post) => {
							const status = getPostStatus(post)
							const statusClass = status === 'Rascunho' ? 'admin__badge--Rascunho' : 'admin__badge--Publicado'

							return (
								<tr key={post.filePath}>
									<td className="admin__title">
										<span>{post.title}</span>
									</td>
									<td>
										<div className="admin__actionsrow">
											<button
												className="button button--secondary tooltip tooltip--top"
												type="button"
												onClick={() => onEditPost(post)}
												disabled={isLoadingPostForEdit || deletingPostPath === post.filePath}
												aria-label="Editar post"
												data-tooltip="Editar post"
											>
												<FilePen size={24} />
											</button>
											<button
												className="button button--danger tooltip tooltip--top"
												type="button"
												onClick={() => onDeletePost(post)}
												disabled={Boolean(deletingPostPath)}
												aria-label="Excluir post"
												data-tooltip="Excluir post"
											>
												{deletingPostPath === post.filePath ? <MoreHorizontal size={24} /> : <Trash2 size={24} />}
											</button>
										</div>
									</td>
									<td>
										<time dateTime={post.date}>{formatPostDateTime(post.date)}</time>
									</td>
									<td>
										<time dateTime={post.updatedAt}>{formatPostDateTime(post.updatedAt)}</time>
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

export default AdminPostList

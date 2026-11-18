import { useState } from 'react'
import {
	FilePlus,
	FileText,
	LayoutDashboard,
	Settings,
	ShieldCheck,
	Newspaper,
	Users,
} from 'lucide-react'
import AdminPostEditorForm from '../components/PostForm'
import AdminPostList from '../components/PostList'
import AdminTokenPanel from '../components/TokenPanel'
import { useAdminPageController } from '../hooks/useAdmin'

type AdminView = 'post-list' | 'post-editor' | 'token'

function AdminPage() {
	const admin = useAdminPageController()
	const [activeView, setActiveView] = useState<AdminView>('post-list')
	const isPostSection = activeView === 'post-list' || activeView === 'post-editor'
	const isPostListView = activeView === 'post-list'
	const isPostEditorView = activeView === 'post-editor'

	function handleOpenCreatePost() {
		admin.resetPostForm()
		setActiveView('post-editor')
	}

	function handleEditPost(post: Parameters<typeof admin.handleEditPost>[0]) {
		admin.handleEditPost(post)
		setActiveView('post-editor')
	}

	return (
		<>
			<main className="admin">
				<aside className="admin__rail" aria-label="Menu principal">
					<button
						className="button button--secondary admin__brand tooltip tooltip--right"
						type="button"
						onClick={() => setActiveView('post-list')}
						aria-label="Blog"
						data-tooltip="Blog"
					>
						<LayoutDashboard size={24} />
					</button>
					<button
						className={`button button--secondary admin__shortcut tooltip tooltip--right ${isPostSection ? 'button--active' : ''}`}
						type="button"
						onClick={() => setActiveView('post-list')}
						aria-label="Blog"
						data-tooltip="Blog"
					>
						<Newspaper size={24} />
					</button>
					<button
						className={`button button--secondary admin__shortcut tooltip tooltip--right`}
						type="button"
						// onClick={() => setActiveView('token')}
						aria-label="Usuários"
						data-tooltip="Usuários"
					>
						<Users size={24} />
					</button>
					<button
						className={`button button--secondary admin__shortcut tooltip tooltip--right ${activeView === 'token' ? 'button--active' : ''}`}
						type="button"
						onClick={() => setActiveView('token')}
						aria-label="Configurações"
						data-tooltip="Configurações"
					>
						<Settings size={24} />
					</button>
				</aside>

				<aside className="admin__sidebar" aria-label="Navegação do conteúdo">
					<header className="admin__header">
						<span>Painel Administrativo</span>
					</header>

					{isPostSection && (
						<div className="admin__group">
							<button
								className={`admin__item ${isPostListView ? 'admin__item--active' : ''}`}
								type="button"
								onClick={() => setActiveView('post-list')}
							>
								<FileText size={24} />
								Listar Blog
							</button>
							<button
								className={`admin__item ${isPostEditorView ? 'admin__item--active' : ''}`}
								type="button"
								onClick={handleOpenCreatePost}
							>
								<FilePlus size={24} />
								Criar Post
							</button>
						</div>
					)}

					{activeView === 'token' && (
						<div className="admin__group">
							<button
								className="admin__item admin__item--active"
								type="button"
								onClick={() => setActiveView('token')}
							>
								<ShieldCheck size={24} />
								Token Pessoal
							</button>
						</div>
					)}
				</aside>

				<section className="admin__workspace" aria-labelledby="admin-title">
					{isPostListView && (
						<AdminPostList
							posts={admin.adminPosts}
							isListingPosts={admin.isListingPosts}
							isLoadingPostForEdit={admin.isLoadingPostForEdit}
							deletingPostPath={admin.deletingPostPath}
							onListPosts={admin.handleListPosts}
							onEditPost={handleEditPost}
							onDeletePost={admin.handleDeletePost}
						/>
					)}

					{isPostEditorView && (
						<AdminPostEditorForm
							form={admin.postForm}
							editingPost={admin.editingPost}
							hasSavedToken={admin.hasSavedToken}
							isCreatingPost={admin.isCreatingPost}
							editor={admin.editor}
							linkDraft={admin.linkDraft}
							onFormChange={admin.updatePostForm}
							onSubmit={admin.handleSavePost}
							onOpenLinkPanel={admin.handleSetLink}
							onChangeLinkDraft={admin.setLinkDraft}
							onApplyLink={admin.handleApplyLink}
							onRemoveLink={admin.handleRemoveLink}
							onCancelLink={() => admin.setLinkDraft(null)}
							onInsertImage={admin.handleInsertImage}
						/>
					)}

					{activeView === 'token' && (
						<div className="admin__publisher">
							<div className="admin__summary">
								<p>Configure o token de acesso do GitHub utilizado pelo painel administrativo.</p>
							</div>
							<AdminTokenPanel
								token={admin.token}
								hasSavedToken={admin.hasSavedToken}
								isTestingConnection={admin.isTestingConnection}
								isCreatingTestFile={admin.isCreatingTestFile}
								isListingPosts={admin.isListingPosts}
								onTokenChange={admin.handleTokenChange}
								onSaveToken={admin.handleSaveToken}
								onRemoveToken={admin.handleRemoveToken}
								onTestConnection={admin.handleTestConnection}
								onCreateTestFile={admin.handleCreateTestFile}
								onListPosts={admin.handleListPosts}
							/>
						</div>
					)}
				</section>
			</main>
		</>
	)
}

export default AdminPage

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
import AdminPostEditorForm from '../components/AdminPostEditorForm'
import AdminPostList from '../components/AdminPostList'
import AdminTokenPanel from '../components/AdminTokenPanel'
import { useAdminPageController } from '../hooks/useAdminPageController'

type AdminView = 'post-list' | 'post-editor' | 'token'

function AdminPage() {
	const admin = useAdminPageController()
	const [activeView, setActiveView] = useState<AdminView>('post-list')
	const isArticleSection = activeView === 'post-list' || activeView === 'post-editor'
	const isArticleListView = activeView === 'post-list'
	const isArticleEditorView = activeView === 'post-editor'

	function handleOpenCreateArticle() {
		admin.resetArticleForm()
		setActiveView('post-editor')
	}

	function handleEditArticle(article: Parameters<typeof admin.handleEditArticle>[0]) {
		admin.handleEditArticle(article)
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
						className={`button button--secondary admin__shortcut tooltip tooltip--right ${isArticleSection ? 'button--active' : ''}`}
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

					{isArticleSection && (
						<div className="admin__group">
							<button
								className={`admin__item ${isArticleListView ? 'admin__item--active' : ''}`}
								type="button"
								onClick={() => setActiveView('post-list')}
							>
								<FileText size={24} />
								Listar Blog
							</button>
							<button
								className={`admin__item ${isArticleEditorView ? 'admin__item--active' : ''}`}
								type="button"
								onClick={handleOpenCreateArticle}
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
					{isArticleListView && (
						<AdminPostList
							articles={admin.adminArticles}
							isListingArticles={admin.isListingArticles}
							isLoadingArticleForEdit={admin.isLoadingArticleForEdit}
							deletingArticlePath={admin.deletingArticlePath}
							onListArticles={admin.handleListArticles}
							onEditArticle={handleEditArticle}
							onDeleteArticle={admin.handleDeleteArticle}
						/>
					)}

					{isArticleEditorView && (
						<AdminPostEditorForm
							form={admin.articleForm}
							editingArticle={admin.editingArticle}
							hasSavedToken={admin.hasSavedToken}
							isCreatingArticle={admin.isCreatingArticle}
							editor={admin.editor}
							linkDraft={admin.linkDraft}
							onFormChange={admin.updateArticleForm}
							onSubmit={admin.handleSaveArticle}
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
								isListingArticles={admin.isListingArticles}
								onTokenChange={admin.handleTokenChange}
								onSaveToken={admin.handleSaveToken}
								onRemoveToken={admin.handleRemoveToken}
								onTestConnection={admin.handleTestConnection}
								onCreateTestFile={admin.handleCreateTestFile}
								onListArticles={admin.handleListArticles}
							/>
						</div>
					)}
				</section>
			</main>
		</>
	)
}

export default AdminPage

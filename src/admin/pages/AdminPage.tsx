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
import AdminArticleEditorForm from '../components/AdminArticleEditorForm'
import AdminArticleList from '../components/AdminArticleList'
import AdminTokenPanel from '../components/AdminTokenPanel'
import { useAdminPageController } from '../hooks/useAdminPageController'

type AdminView = 'article-list' | 'article-editor' | 'token'

function AdminPage() {
	const admin = useAdminPageController()
	const [activeView, setActiveView] = useState<AdminView>('article-list')
	const isArticleSection = activeView === 'article-list' || activeView === 'article-editor'
	const isArticleListView = activeView === 'article-list'
	const isArticleEditorView = activeView === 'article-editor'

	function handleOpenCreateArticle() {
		admin.resetArticleForm()
		setActiveView('article-editor')
	}

	function handleEditArticle(article: Parameters<typeof admin.handleEditArticle>[0]) {
		admin.handleEditArticle(article)
		setActiveView('article-editor')
	}

	return (
		<>
			<main className="admin">
				<aside className="admin__rail" aria-label="Menu principal">
					<button
						className="button button--secondary admin__brand tooltip tooltip--right"
						type="button"
						onClick={() => setActiveView('article-list')}
						aria-label="Artigos"
						data-tooltip="Artigos"
					>
						<LayoutDashboard size={24} />
					</button>
					<button
						className={`button button--secondary admin__shortcut tooltip tooltip--right ${isArticleSection ? 'button--active' : ''}`}
						type="button"
						onClick={() => setActiveView('article-list')}
						aria-label="Artigos"
						data-tooltip="Artigos"
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
								onClick={() => setActiveView('article-list')}
							>
								<FileText size={24} />
								Listar Artigos
							</button>
							<button
								className={`admin__item ${isArticleEditorView ? 'admin__item--active' : ''}`}
								type="button"
								onClick={handleOpenCreateArticle}
							>
								<FilePlus size={24} />
								Criar Artigo
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
						<AdminArticleList
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
						<AdminArticleEditorForm
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

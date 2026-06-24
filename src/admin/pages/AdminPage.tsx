import { useState } from 'react'
import {
	FilePlus,
	FileText,
	Home,
	LayoutDashboard,
	Settings,
	Newspaper,
} from 'lucide-react'
import AdminArticleEditorForm from '../components/AdminArticleEditorForm'
import AdminArticleList from '../components/AdminArticleList'
import AdminStatusMessages from '../components/AdminStatusMessages'
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
		<main className="admin">
			<aside className="admin__rail" aria-label="Menu principal">
				<a className="admin__brand" href="/portfolio/admin/" aria-label="Inicio do painel administrativo">
					<LayoutDashboard size={24} strokeWidth={2} />
				</a>
				<nav className="admin__shortcuts" aria-label="Ferramentas do admin">
					<a className="admin__shortcut" href="/portfolio/admin/" aria-label="Inicio do painel administrativo">
						<Home size={24} />
					</a>
					<button
						className={`admin__shortcut ${isArticleSection ? 'admin__shortcut--active' : ''}`}
						type="button"
						onClick={() => setActiveView('article-list')}
						aria-label="Conteudo"
					>
						<Newspaper size={24} />
					</button>
				</nav>
				<button
					className={`admin__shortcut admin__shortcut--bottom ${activeView === 'token' ? 'admin__shortcut--active' : ''}`}
					type="button"
					onClick={() => setActiveView('token')}
					aria-label="Configuracoes"
				>
					<Settings size={24} />
				</button>
			</aside>

			<aside className="admin__sidebar" aria-label="Navegacao do conteudo">
				<header className="admin__header">
					<span>Painel Administrativo</span>
				</header>

				<div className="admin__group">
					<div className="admin__heading">
						<span>Principal</span>
					</div>
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
			</aside>

			<section className="admin__workspace" aria-labelledby="admin-title">
				{isArticleListView && (
					<div className="admin__content">
						<AdminArticleList
							articles={admin.adminArticles}
							isListingArticles={admin.isListingArticles}
							isLoadingArticleForEdit={admin.isLoadingArticleForEdit}
							deletingArticlePath={admin.deletingArticlePath}
							onListArticles={admin.handleListArticles}
							onEditArticle={handleEditArticle}
							onDeleteArticle={admin.handleDeleteArticle}
						/>

						<section className="admin__card" aria-labelledby="admin-list-status-title">
							<h2 id="admin-list-status-title">Status</h2>
							<AdminStatusMessages
								message={admin.message}
								hasSavedToken={admin.hasSavedToken}
								connectionResult={null}
								writeResult={null}
								articleListResult={admin.articleListResult}
								articleCreateResult={null}
								articleDeleteResult={admin.articleDeleteResult}
							/>
						</section>
					</div>
				)}

				{isArticleEditorView && (
					<div className="admin__content">
						<AdminArticleEditorForm
							form={admin.articleForm}
							editingArticle={admin.editingArticle}
							hasSavedToken={admin.hasSavedToken}
							isCreatingArticle={admin.isCreatingArticle}
							editor={admin.editor}
							linkDraft={admin.linkDraft}
							onFormChange={admin.updateArticleForm}
							onSubmit={admin.handleSaveArticle}
							onCancelEdit={admin.resetArticleForm}
							onOpenLinkPanel={admin.handleSetLink}
							onChangeLinkDraft={admin.setLinkDraft}
							onApplyLink={admin.handleApplyLink}
							onRemoveLink={admin.handleRemoveLink}
							onCancelLink={() => admin.setLinkDraft(null)}
							onInsertImage={admin.handleInsertImage}
						/>

						<section className="admin__card" aria-labelledby="admin-editor-status-title">
							<h2 id="admin-editor-status-title">Status</h2>
							<AdminStatusMessages
								message={admin.message}
								hasSavedToken={admin.hasSavedToken}
								connectionResult={null}
								writeResult={null}
								articleListResult={null}
								articleCreateResult={admin.articleCreateResult}
								articleDeleteResult={null}
							/>
						</section>
					</div>
				)}

				{activeView === 'token' && (
					<div className="admin__settings">
						<section className="admin__card" aria-labelledby="admin-token-title">
							<p>Conexao de publicacao do portfolio.</p>
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
						</section>

						<section className="admin__card" aria-labelledby="admin-status-title">
							<h2 id="admin-status-title">Status</h2>
							<AdminStatusMessages
								message={admin.message}
								hasSavedToken={admin.hasSavedToken}
								connectionResult={admin.connectionResult}
								writeResult={admin.writeResult}
								articleListResult={admin.articleListResult}
								articleCreateResult={admin.articleCreateResult}
								articleDeleteResult={admin.articleDeleteResult}
							/>
						</section>
					</div>
				)}
			</section>
		</main>
	)
}

export default AdminPage

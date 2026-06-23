import AdminArticleEditorForm from '../components/AdminArticleEditorForm'
import AdminArticleList from '../components/AdminArticleList'
import AdminStatusMessages from '../components/AdminStatusMessages'
import AdminTokenPanel from '../components/AdminTokenPanel'
import { useAdminPageController } from '../hooks/useAdminPageController'

function AdminPage() {
	const admin = useAdminPageController()

	return (
		<main className="admin">
			<section className="admin__panel" aria-labelledby="admin-title">
				<h1 id="admin-title">Admin</h1>
				<p>GitHub Personal Access Token</p>

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
					onInsertCallout={admin.handleInsertCallout}
				/>

				<AdminStatusMessages
					message={admin.message}
					hasSavedToken={admin.hasSavedToken}
					connectionResult={admin.connectionResult}
					writeResult={admin.writeResult}
					articleListResult={admin.articleListResult}
					articleCreateResult={admin.articleCreateResult}
					articleDeleteResult={admin.articleDeleteResult}
				/>

				<AdminArticleList
					articles={admin.adminArticles}
					isLoadingArticleForEdit={admin.isLoadingArticleForEdit}
					deletingArticlePath={admin.deletingArticlePath}
					onEditArticle={admin.handleEditArticle}
					onDeleteArticle={admin.handleDeleteArticle}
				/>
			</section>
		</main>
	)
}

export default AdminPage

import type { FormEvent } from 'react'

type AdminTokenPanelProps = {
	token: string
	hasSavedToken: boolean
	isTestingConnection: boolean
	isCreatingTestFile: boolean
	isListingArticles: boolean
	onTokenChange: (value: string) => void
	onSaveToken: (event: FormEvent<HTMLFormElement>) => void
	onRemoveToken: () => void
	onTestConnection: () => void
	onCreateTestFile: () => void
	onListArticles: () => void
}

function AdminTokenPanel({
	token,
	hasSavedToken,
	isTestingConnection,
	isCreatingTestFile,
	isListingArticles,
	onTokenChange,
	onSaveToken,
	onRemoveToken,
	onTestConnection,
	onCreateTestFile,
	onListArticles,
}: AdminTokenPanelProps) {
	return (
		<form className="admin__form" onSubmit={onSaveToken}>
			<label htmlFor="github-token">Token</label>
			<textarea
				id="github-token"
				value={token}
				onChange={(event) => onTokenChange(event.target.value)}
				placeholder="Cole seu GitHub Personal Access Token aqui"
				rows={2}
			/>

			<div className="admin__actions">
				<button type="submit">Salvar token</button>
				<button type="button" onClick={onRemoveToken} disabled={!hasSavedToken}>
					Remover token
				</button>
				<button type="button" onClick={onTestConnection} disabled={!hasSavedToken || isTestingConnection}>
					{isTestingConnection ? 'Testando...' : 'Testar conexão'}
				</button>
				<button type="button" onClick={onCreateTestFile} disabled={!hasSavedToken || isCreatingTestFile}>
					{isCreatingTestFile ? 'Criando...' : 'Gerar teste'}
				</button>
				<button type="button" onClick={onListArticles} disabled={!hasSavedToken || isListingArticles}>
					{isListingArticles ? 'Listando...' : 'Listar artigos'}
				</button>
			</div>
		</form>
	)
}

export default AdminTokenPanel

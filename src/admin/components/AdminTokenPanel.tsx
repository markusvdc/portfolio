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
	onTokenChange,
	onSaveToken,
	onRemoveToken,
	onTestConnection,
	onCreateTestFile,
}: AdminTokenPanelProps) {
	return (
		<form className="admin__form" onSubmit={onSaveToken}>
			<label htmlFor="github-token">Token</label>
			<input
				id="github-token"
				type="text"
				value={token}
				onChange={(event) => onTokenChange(event.target.value)}
				placeholder="Cole seu GitHub Personal Access Token aqui"
			/>

			<div className="admin__actions admin__actions--stack">
				<button className="admin__button admin__button--primary" type="submit">
					Salvar token
				</button>
				<button className="admin__button" type="button" onClick={onRemoveToken} disabled={!hasSavedToken}>
					Remover
				</button>
				<button className="admin__button" type="button" onClick={onTestConnection} disabled={!hasSavedToken || isTestingConnection}>
					{isTestingConnection ? 'Testando...' : 'Testar conexao'}
				</button>
				<button className="admin__button" type="button" onClick={onCreateTestFile} disabled={!hasSavedToken || isCreatingTestFile}>
					{isCreatingTestFile ? 'Criando...' : 'Gerar teste'}
				</button>
			</div>
		</form>
	)
}

export default AdminTokenPanel

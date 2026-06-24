import type { FormEvent } from 'react'
import { FlaskConical, ListChecks, Save, Trash2, Wifi } from 'lucide-react'

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

			<div className="admin__actions admin__actions--stack">
				<button className="admin__button admin__button--primary" type="submit">
					<Save size={24} />
					Salvar token
				</button>
				<button className="admin__button" type="button" onClick={onRemoveToken} disabled={!hasSavedToken}>
					<Trash2 size={24} />
					Remover
				</button>
				<button className="admin__button" type="button" onClick={onTestConnection} disabled={!hasSavedToken || isTestingConnection}>
					<Wifi size={24} />
					{isTestingConnection ? 'Testando...' : 'Testar conexao'}
				</button>
				<button className="admin__button" type="button" onClick={onCreateTestFile} disabled={!hasSavedToken || isCreatingTestFile}>
					<FlaskConical size={24} />
					{isCreatingTestFile ? 'Criando...' : 'Gerar teste'}
				</button>
				<button className="admin__button" type="button" onClick={onListArticles} disabled={!hasSavedToken || isListingArticles}>
					<ListChecks size={24} />
					{isListingArticles ? 'Listando...' : 'Listar artigos'}
				</button>
			</div>
		</form>
	)
}

export default AdminTokenPanel

import type { FormEvent } from 'react'
import {
	Bug,
	Save,
	SaveOff,
	Zap,
} from 'lucide-react'

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
			<div className="admin__token">
				<input
					id="github-token"
					type="text"
					value={token}
					onChange={(event) => onTokenChange(event.target.value)}
					placeholder="Cole seu GitHub Personal Access Token aqui"
				/>

				<div className="admin__actions admin__actions--stack">
					<button className="button button--secondary tooltip tooltip--top" type="button" onClick={onTestConnection} disabled={!hasSavedToken || isTestingConnection} aria-label="Testar conexão" data-tooltip="Testar conexão">
						<Zap size={24} />
					</button>
					<button className="button button--secondary tooltip tooltip--top" type="button" onClick={onCreateTestFile} disabled={!hasSavedToken || isCreatingTestFile} aria-label="Gerar teste" data-tooltip="Gerar teste">
						<Bug size={24} />
					</button>
					<button className="button button--danger tooltip tooltip--top" type="button" onClick={onRemoveToken} disabled={!hasSavedToken} aria-label="Remover token" data-tooltip="Remover token">
						<SaveOff size={24} />
					</button>
					<button className="button button--secondary tooltip tooltip--top" type="submit" aria-label="Salvar token" data-tooltip="Salvar token">
						<Save size={24} />
					</button>
				</div>
			</div>
		</form>
	)
}

export default AdminTokenPanel

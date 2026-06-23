import type { AdminResult } from '../types/adminTypes'

type AdminStatusMessagesProps = {
	message: string
	hasSavedToken: boolean
	connectionResult: AdminResult | null
	writeResult: AdminResult | null
	articleListResult: AdminResult | null
	articleCreateResult: AdminResult | null
	articleDeleteResult: AdminResult | null
}

function AdminStatusMessages({
	message,
	hasSavedToken,
	connectionResult,
	writeResult,
	articleListResult,
	articleCreateResult,
	articleDeleteResult,
}: AdminStatusMessagesProps) {
	return (
		<>
			{message && <p className="admin__message">{message}</p>}
			<p className="admin__status">
				Status: {hasSavedToken ? 'token salvo' : 'nenhum token salvo'}
			</p>
			{connectionResult && (
				<div className={`admin__connection admin__connection--${connectionResult.status}`}>
					<p>Status da conexão: {connectionResult.message}</p>
					{connectionResult.repositoryName && <p>Repositório: {connectionResult.repositoryName}</p>}
					{connectionResult.defaultBranch && <p>Branch padrão: {connectionResult.defaultBranch}</p>}
				</div>
			)}
			{writeResult && (
				<div className={`admin__connection admin__connection--${writeResult.status}`}>
					<p>Status da escrita: {writeResult.message}</p>
					{writeResult.link && (
						<p>
							<a href={writeResult.link} target="_blank" rel="noopener noreferrer">
								Abrir resultado no GitHub
							</a>
						</p>
					)}
				</div>
			)}
			{articleListResult && (
				<div className={`admin__connection admin__connection--${articleListResult.status}`}>
					<p>Status da listagem: {articleListResult.message}</p>
				</div>
			)}
			{articleCreateResult && (
				<div className={`admin__connection admin__connection--${articleCreateResult.status}`}>
					<p>Status da criacao: {articleCreateResult.message}</p>
					{articleCreateResult.link && (
						<p>
							<a href={articleCreateResult.link} target="_blank" rel="noopener noreferrer">
								Abrir artigo no GitHub
							</a>
						</p>
					)}
				</div>
			)}
			{articleDeleteResult && (
				<div className={`admin__connection admin__connection--${articleDeleteResult.status}`}>
					<p>Status da exclusao: {articleDeleteResult.message}</p>
					{articleDeleteResult.link && (
						<p>
							<a href={articleDeleteResult.link} target="_blank" rel="noopener noreferrer">
								Abrir commit no GitHub
							</a>
						</p>
					)}
				</div>
			)}
		</>
	)
}

export default AdminStatusMessages

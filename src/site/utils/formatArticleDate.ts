export function formatArticleDate(date: string) {
	const formattedDate = new Intl.DateTimeFormat('pt-BR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date))

	return formattedDate.replace(
		/de ([a-zá-ú]+)/,
		(_, month: string) => `de ${month.charAt(0).toUpperCase()}${month.slice(1)}`
	)
}

export function formatArticleDateTime(date: string) {
	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(date))
}

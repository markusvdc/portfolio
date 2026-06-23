export function formatArticleDate(date: string) {
	const formattedDate = new Intl.DateTimeFormat('pt-BR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date(`${date}T00:00:00`))

	return formattedDate.replace(
		/de ([a-zá-ú]+)/,
		(_, month: string) => `de ${month.charAt(0).toUpperCase()}${month.slice(1)}`
	)
}

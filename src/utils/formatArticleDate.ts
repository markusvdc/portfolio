export function formatArticleDate(date: string) {
	return new Intl.DateTimeFormat('en', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	}).format(new Date(`${date}T00:00:00`))
}

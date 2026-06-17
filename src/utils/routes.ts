const basePath = import.meta.env.BASE_URL.endsWith('/')
	? import.meta.env.BASE_URL
	: `${import.meta.env.BASE_URL}/`

export const routes = {
	portfolio: basePath,
	resume: `${basePath}resume/`
}

export function getRouteFromPath(pathname: string) {
	const normalizedBase = basePath === '/' ? '/' : basePath.replace(/\/$/, '')
	const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`
	const resumePath = `${normalizedBase === '/' ? '' : normalizedBase}/resume/`

	return normalizedPath === resumePath ? 'resume' : 'portfolio'
}

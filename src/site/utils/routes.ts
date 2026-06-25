const basePath = import.meta.env.BASE_URL.endsWith('/')
	? import.meta.env.BASE_URL
	: `${import.meta.env.BASE_URL}/`

export const routes = {
	home: basePath,
	portfolio: `${basePath}portfolio/`,
	resume: `${basePath}curriculo/`,
	writing: `${basePath}artigos/`,
}

export function getRouteFromPath(pathname: string) {
	const normalizedBase = basePath === '/' ? '/' : basePath.replace(/\/$/, '')
	const pathnameWithoutBase = normalizedBase !== '/' && pathname.startsWith(`${normalizedBase}/`)
		? pathname.slice(normalizedBase.length) || '/'
		: pathname
	const normalizedPath = pathnameWithoutBase.endsWith('/') ? pathnameWithoutBase : `${pathnameWithoutBase}/`
	const portfolioPath = '/portfolio/'
	const resumePath = '/curriculo/'
	const writingPath = '/artigos/'

	if (normalizedPath === '/') {
		return 'home'
	}

	if (normalizedPath === portfolioPath) {
		return 'portfolio'
	}

	if (normalizedPath === resumePath) {
		return 'resume'
	}

	return normalizedPath.startsWith(writingPath) ? 'writing' : 'home'
}

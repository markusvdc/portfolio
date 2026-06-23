export const githubTokenStorageKey = 'githubPersonalAccessToken'
export const githubRepositoryUrl = 'https://api.github.com/repos/markusvdc/portfolio'
export const githubTestFileUrl = `${githubRepositoryUrl}/contents/content/test-admin.md`
export const githubArticlesDirectoryUrl = `${githubRepositoryUrl}/contents/content/articles`

export function createGitHubHeaders(token: string) {
	return {
		Accept: 'application/vnd.github+json',
		Authorization: `Bearer ${token}`,
		'X-GitHub-Api-Version': '2022-11-28',
	}
}

export function createGitHubJsonHeaders(token: string) {
	return {
		...createGitHubHeaders(token),
		'Content-Type': 'application/json',
	}
}

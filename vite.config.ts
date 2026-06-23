import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		{
			name: 'redirect-base-without-trailing-slash',
			apply: 'serve',
			configureServer(server) {
				server.middlewares.use((request, response, next) => {
					if (request.url?.startsWith('/portfolio?') || request.url === '/portfolio') {
						const redirectUrl = request.url.replace('/portfolio', '/portfolio/')

						response.statusCode = 302
						response.setHeader('Location', redirectUrl)
						response.end()
						return
					}

					next()
				})
			},
		},
		{
			name: 'copy-index-to-static-routes',
			apply: 'build',
			async closeBundle() {
				const staticRoutes = [
					{
						path: 'portfolio',
						title: 'PORTFÓLIO - MARKUS DOMENEGHETI'
					},
					{
						path: 'curriculo',
						title: 'CURRÍCULO - MARKUS DOMENEGHETI'
					},
					{
						path: 'artigos',
						title: 'ARTIGOS - MARKUS DOMENEGHETI'
					},
					{
						path: 'admin',
						title: 'ADMIN - MARKUS DOMENEGHETI'
					}
				]
				const indexHtml = await readFile(resolve('dist/index.html'), 'utf-8')
				const baseRedirectHtml = [
					'<!doctype html>',
					'<html lang="pt-BR">',
					'<head>',
					'<meta charset="UTF-8" />',
					'<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
					'<meta http-equiv="refresh" content="0; url=/portfolio/" />',
					'<title>MARKUS DOMENEGHETI</title>',
					'<script>window.location.replace("/portfolio/" + window.location.search + window.location.hash)</script>',
					'</head>',
					'<body></body>',
					'</html>',
				].join('')

				await Promise.all(staticRoutes.map(async (route) => {
					const routeDir = resolve('dist', route.path)
					const routeHtml = indexHtml.replace(
						/<title>.*<\/title>/,
						`<title>${route.title}</title>`
					)

					await mkdir(routeDir, { recursive: true })
					await writeFile(resolve(routeDir, 'index.html'), routeHtml)
				}))
				await writeFile(resolve('dist/portfolio.html'), baseRedirectHtml)
			},
		},
	],
	base: '/portfolio/',
})

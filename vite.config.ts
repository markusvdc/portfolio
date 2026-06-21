import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
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
					}
				]
				const indexHtml = await readFile(resolve('dist/index.html'), 'utf-8')

				await Promise.all(staticRoutes.map(async (route) => {
					const routeDir = resolve('dist', route.path)
					const routeHtml = indexHtml.replace(
						/<title>.*<\/title>/,
						`<title>${route.title}</title>`
					)

					await mkdir(routeDir, { recursive: true })
					await writeFile(resolve(routeDir, 'index.html'), routeHtml)
				}))
			},
		},
	],
	base: '/portfolio/',
})

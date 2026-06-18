import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		{
			name: 'copy-index-to-static-routes',
			apply: 'build',
			async closeBundle() {
				const resumeDir = resolve('dist/resume')

				await mkdir(resumeDir, { recursive: true })
				await copyFile(resolve('dist/index.html'), resolve(resumeDir, 'index.html'))
			},
		},
	],
	base: '/portfolio/',
})

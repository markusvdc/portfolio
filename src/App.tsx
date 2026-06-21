import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import ArticlePage from './pages/ArticlePage'
import PortfolioPage from './pages/PortfolioPage'
import ResumePage from './pages/ResumePage'
import WritingPage from './pages/WritingPage'
import type { Page } from './types/page'
import { getRouteFromPath } from './utils/routes'

function App() {
	const location = useLocation()
	const page: Page = getRouteFromPath(location.pathname)

	useEffect(() => {
		const normalizedPath = location.pathname.toLowerCase()

		if (normalizedPath.includes('/curriculo')) {
			document.title = 'CURRÍCULO - MARKUS DOMENEGHETI'
			return
		}

		if (normalizedPath.includes('/artigos')) {
			document.title = 'ARTIGOS - MARKUS DOMENEGHETI'
			return
		}

		document.title = 'MARKUS DOMENEGHETI'
	}, [location.pathname])

	return (
		<>
			<ScrollToTop />
			<Header page={page} />
			<Routes>
				<Route path="/" element={<PortfolioPage />} />
				<Route path="/curriculo" element={<ResumePage />} />
				<Route path="/artigos" element={<WritingPage />} />
				<Route path="/artigos/:slug" element={<ArticlePage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App

import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import AdminPage from './pages/AdminPage'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import ResumePage from './pages/ResumePage'
import WritingPage from './pages/WritingPage'
import type { Page } from './types/page'
import { getRouteFromPath } from './utils/routes'

function App() {
	const location = useLocation()
	const page: Page = getRouteFromPath(location.pathname)

	useEffect(() => {
		const pageTitles: Record<Page, string> = {
			home: 'MARKUS DOMENEGHETI',
			portfolio: 'PORTFÓLIO - MARKUS DOMENEGHETI',
			resume: 'CURRÍCULO - MARKUS DOMENEGHETI',
			writing: 'ARTIGOS - MARKUS DOMENEGHETI',
			admin: 'ADMIN - MARKUS DOMENEGHETI'
		}

		document.title = pageTitles[page]
	}, [page])

	return (
		<>
			<ScrollToTop />
			{page !== 'admin' && <Header page={page} />}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/portfolio" element={<PortfolioPage />} />
				<Route path="/curriculo" element={<ResumePage />} />
				<Route path="/artigos" element={<WritingPage />} />
				<Route path="/artigos/:slug" element={<ArticlePage />} />
				<Route path="/admin" element={<AdminPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			{page !== 'home' && page !== 'admin' && <Footer />}
		</>
	)
}

export default App

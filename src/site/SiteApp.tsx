import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import ResumePage from './pages/ResumePage'
import WritingPage from './pages/WritingPage'
import type { Page } from '../types/page'
import { getRouteFromPath } from './utils/routes'

const ArticlePage = lazy(() => import('./pages/ArticlePage'))

function SiteApp() {
	const location = useLocation()
	const page: Page = getRouteFromPath(location.pathname)

	useEffect(() => {
		const pageTitles: Record<Page, string> = {
			home: 'MARKUS DOMENEGHETI',
			portfolio: 'PORTFOLIO - MARKUS DOMENEGHETI',
			resume: 'CURRICULO - MARKUS DOMENEGHETI',
			writing: 'ARTIGOS - MARKUS DOMENEGHETI',
		}

		document.title = pageTitles[page]
	}, [page])

	return (
		<>
			<ScrollToTop />
			<Header page={page} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/portfolio" element={<PortfolioPage />} />
				<Route path="/curriculo" element={<ResumePage />} />
				<Route path="/artigos" element={<WritingPage />} />
				<Route path="/artigos/:slug" element={<Suspense fallback={null}><ArticlePage /></Suspense>} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			{page !== 'home' && <Footer />}
		</>
	)
}

export default SiteApp

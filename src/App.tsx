import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './site/components/Footer'
import Header from './site/components/Header'
import ScrollToTop from './site/components/ScrollToTop'
import HomePage from './site/pages/HomePage'
import PortfolioPage from './site/pages/PortfolioPage'
import ResumePage from './site/pages/ResumePage'
import WritingPage from './site/pages/WritingPage'
import type { Page } from './types/page'
import { getRouteFromPath } from './site/utils/routes'

const AdminPage = lazy(() => import('./admin/pages/AdminPage'))
const ArticlePage = lazy(() => import('./site/pages/ArticlePage'))

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
				<Route path="/artigos/:slug" element={<Suspense fallback={null}><ArticlePage /></Suspense>} />
				<Route path="/admin" element={<Suspense fallback={null}><AdminPage /></Suspense>} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			{page !== 'home' && page !== 'admin' && <Footer />}
		</>
	)
}

export default App

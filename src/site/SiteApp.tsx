import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollTop'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import ResumePage from './pages/ResumePage'
import BlogPage from './pages/BlogPage'
import type { Page } from '../types/page'
import { getRouteFromPath } from './utils/routes'

const PostPage = lazy(() => import('./pages/PostPage'))

function SiteApp() {
	const location = useLocation()
	const page: Page = getRouteFromPath(location.pathname)

	useEffect(() => {
		if (location.pathname.includes('/post/')) {
			return
		}

		const pageTitles: Record<Page, string> = {
			home: 'MARKUS DOMENEGHETI',
			portfolio: 'PORTFOLIO - MARKUS DOMENEGHETI',
			resume: 'CURRICULO - MARKUS DOMENEGHETI',
			blog: 'BLOG - MARKUS DOMENEGHETI',
		}

		document.title = pageTitles[page]
	}, [location.pathname, page])

	return (
		<>
			<ScrollToTop />
			<Header page={page} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/portfolio" element={<PortfolioPage />} />
				<Route path="/curriculo" element={<ResumePage />} />
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/post/:slug" element={<Suspense fallback={null}><PostPage /></Suspense>} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			{page !== 'home' && <Footer />}
		</>
	)
}

export default SiteApp

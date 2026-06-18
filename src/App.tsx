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

	return (
		<>
			<ScrollToTop />
			<Header page={page} />
			<Routes>
				<Route path="/" element={<PortfolioPage />} />
				<Route path="/resume" element={<ResumePage />} />
				<Route path="/writing" element={<WritingPage />} />
				<Route path="/writing/:slug" element={<ArticlePage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App

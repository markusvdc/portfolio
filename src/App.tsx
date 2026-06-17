import Footer from './components/Footer'
import Header from './components/Header'
import PortfolioPage from './pages/PortfolioPage'
import ResumePage from './pages/ResumePage'
import type { Page } from './types/page'
import { getRouteFromPath } from './utils/routes'

function getCurrentPage(): Page {
	return getRouteFromPath(window.location.pathname)
}

function App() {
	const page = getCurrentPage()

	return (
		<>
			<Header page={page} />
			{page === 'portfolio' ? <PortfolioPage /> : <ResumePage />}
			<Footer />
		</>
	)
}

export default App

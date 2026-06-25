import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import SiteApp from './SiteApp'
import '../styles/site/main.scss'

ReactDOM.createRoot(
	document.getElementById('root')!
).render(
	<React.StrictMode>
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<SiteApp />
		</BrowserRouter>
	</React.StrictMode>
)

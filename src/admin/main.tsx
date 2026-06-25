import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './AdminApp'
import '../styles/admin/main.scss'

ReactDOM.createRoot(
	document.getElementById('root')!
).render(
	<React.StrictMode>
		<AdminApp />
	</React.StrictMode>
)

import { Toaster } from 'react-hot-toast'
import AdminPage from './pages/AdminPage'

function AdminApp() {
	return (
		<>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 4000,
					className: 'toaster',
				}}
			/>
			<AdminPage />
		</>
	)
}

export default AdminApp

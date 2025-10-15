import ReactDOM from 'react-dom/client'
import App from './app/App'
import AuthProvider from '@/features/auth/authProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)

import { Routes, Route } from 'react-router-dom'
import Home from '@/features/home/homePage'
import Dashboard from '@/features/dashboard/dashboardPage'
import { ProtectedRoute } from '@/app/routes/protectedRoutes'
import AuthCallback from '@/features/auth/authCallback'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

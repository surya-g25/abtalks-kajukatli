import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import LoadingScreen from '@/components/common/LoadingScreen'

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    // Store original intended path in location state for seamless post-login redirect
    return <Navigate to="/signup" state={{ from: location.pathname + location.search }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute

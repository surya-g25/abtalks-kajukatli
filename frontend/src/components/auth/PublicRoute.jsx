import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import LoadingScreen from '@/components/common/LoadingScreen'

export function PublicRoute() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    const returnPath = location.state?.from || '/dashboard'
    return <Navigate to={returnPath} replace />
  }

  return <Outlet />
}

export default PublicRoute

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { AuthContext } from './AuthContext'
import * as authService from '@/services/authService'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch current user from /api/auth/me on app mount
  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()

    const handleUnauthorized = () => {
      setUser(null)
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
    }
  }, [checkAuth])

  const login = async (email, password) => {
    try {
      const loggedUser = await authService.login({ email, password })
      setUser(loggedUser)
      toast.success(`Welcome back, ${loggedUser.name}!`)
      return loggedUser
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      toast.error(message)
      throw new Error(message)
    }
  }

  const signup = async (name, email, password, confirmPassword) => {
    try {
      const newUser = await authService.signup({ name, email, password, confirmPassword })
      setUser(newUser)
      toast.success(`Account created! Welcome to ABTalks, ${newUser.name}!`)
      return newUser
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Signup failed'
      toast.error(message)
      throw new Error(message)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.warn('Logout API failed, clearing local session', err)
    } finally {
      setUser(null)
      toast.success('Logged out successfully')
    }
  }

  const updateUser = (updatedData) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null))
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
    updateUser,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

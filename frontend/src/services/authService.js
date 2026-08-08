import apiClient from '@/api/apiClient'

export const signup = async (payload) => {
  const response = await apiClient.post('/auth/signup', payload)
  return response.data.data
}

export const login = async (payload) => {
  const response = await apiClient.post('/auth/login', payload)
  return response.data.data
}

export const logout = async () => {
  const response = await apiClient.post('/auth/logout')
  return response.data
}

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/me')
    return response.data.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null
    }
    throw error
  }
}

export const updateProfile = async (payload) => {
  const response = await apiClient.put('/auth/profile', payload)
  return response.data.data
}

export const changePassword = async (payload) => {
  const response = await apiClient.put('/auth/change-password', payload)
  return response.data
}

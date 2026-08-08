import apiClient from '@/api/apiClient'

export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get('/dashboard')
    return response.data.data
  } catch (error) {
    console.warn('Backend API offline or unreachable, falling back to cached local state', error?.message)
    return null
  }
}

import apiClient from '@/api/apiClient'

export const fetchAchievements = async () => {
  try {
    const response = await apiClient.get('/achievements')
    return response.data.data
  } catch (error) {
    console.warn('Backend API offline, falling back to local achievements state', error?.message)
    return null
  }
}

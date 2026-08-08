import apiClient from '@/api/apiClient'

export const fetchLeaderboard = async () => {
  try {
    const response = await apiClient.get('/leaderboard')
    return response.data.data
  } catch (error) {
    console.warn('Backend API offline, falling back to local leaderboard state', error?.message)
    return null
  }
}

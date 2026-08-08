import apiClient from '@/api/apiClient'

export const fetchChallengeByDay = async (day = 14) => {
  try {
    const response = await apiClient.get(`/challenges/${day}`)
    return response.data.data
  } catch (error) {
    console.warn('Backend API offline, using fallback challenge spec', error?.message)
    return null
  }
}

export const submitChallenge = async (submissionPayload) => {
  try {
    const response = await apiClient.post('/submissions', submissionPayload)
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || 'Submission failed'
    throw new Error(message)
  }
}

export const updateChallengeProgress = async (day, tasks) => {
  try {
    const response = await apiClient.put(`/challenges/${day}/progress`, { tasks })
    return response.data.data
  } catch (error) {
    console.warn('Backend API offline, failed to update progress:', error?.message)
    return null
  }
}

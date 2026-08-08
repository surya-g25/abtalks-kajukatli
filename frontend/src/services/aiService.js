import apiClient from '@/api/apiClient'

/**
 * Generate AI content and cache in sessionStorage.
 */
export const generateAIContent = async (type, options = {}, forceRefresh = false) => {
  const cacheKey = `ai_cache_${type}_${JSON.stringify(options)}`

  if (!forceRefresh) {
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      try {
        return JSON.parse(cached)
      } catch (e) {
        console.warn('Failed to parse cached AI content, refetching...', e)
      }
    }
  }

  try {
    const response = await apiClient.post('/ai/generate', { type, options })
    const result = response.data?.data

    if (result && result.text) {
      sessionStorage.setItem(cacheKey, JSON.stringify(result.text))
      return result.text
    }
    return null
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'AI Generation failed'
    throw new Error(message)
  }
}

/**
 * Clear cached response to trigger regeneration.
 */
export const clearAICache = (type, options = {}) => {
  const cacheKey = `ai_cache_${type}_${JSON.stringify(options)}`
  sessionStorage.removeItem(cacheKey)
}

import ApiError from '../utils/apiError.js'

export const validateSubmission = (req, res, next) => {
  const { githubRepo, commitUrl, linkedinUrl, reflection } = req.body
  const errors = []

  if (!githubRepo || typeof githubRepo !== 'string' || !githubRepo.trim()) {
    errors.push('GitHub Repository URL/handle is required')
  }

  if (!commitUrl || typeof commitUrl !== 'string' || !commitUrl.trim()) {
    errors.push('Commit URL or hash is required')
  }

  if (!linkedinUrl || typeof linkedinUrl !== 'string' || !linkedinUrl.trim()) {
    errors.push('LinkedIn post URL/handle is required')
  }

  if (!reflection || typeof reflection !== 'string' || reflection.trim().length < 20) {
    errors.push('Reflection text must be at least 20 characters long')
  }

  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation Failed', errors))
  }

  next()
}

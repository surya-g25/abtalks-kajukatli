import ApiError from '../utils/apiError.js'

export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `API Route Not Found - ${req.originalUrl}`)
  next(error)
}

export default notFoundHandler

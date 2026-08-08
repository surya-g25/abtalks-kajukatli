import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'
import { ApiError } from '../utils/apiError.js'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-abtalks'

export const protect = async (req, res, next) => {
  let token

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ApiError(401, 'Authentication required. Please log in.'))
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await Student.findById(decoded.id)

    if (!user) {
      return next(new ApiError(401, 'User account no longer exists.'))
    }

    req.user = user
    next()
  } catch (error) {
    return next(new ApiError(401, 'Session expired or invalid token. Please log in again.'))
  }
}

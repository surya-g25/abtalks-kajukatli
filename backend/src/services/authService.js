import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Student from '../models/Student.js'
import { ApiError } from '../utils/apiError.js'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-abtalks'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

const ensureDBConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new ApiError(
      503,
      'Database connection offline. If using MongoDB Atlas, please add 0.0.0.0/0 to Network Access IP Whitelist.'
    )
  }
}

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

export const signupUser = async ({ name, email, password }) => {
  ensureDBConnected()

  const existingUser = await Student.findOne({ email: email.toLowerCase().trim() })
  if (existingUser) {
    throw new ApiError(400, 'An account with this email address already exists')
  }

  // Calculate default rank
  const totalStudents = await Student.countDocuments()
  const defaultRank = totalStudents + 1

  const user = await Student.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    rank: defaultRank,
  })

  const token = generateToken(user._id)
  
  // Return user without password
  const userJson = user.toObject()
  delete userJson.password

  return { user: userJson, token }
}

export const loginUser = async ({ email, password }) => {
  ensureDBConnected()

  const user = await Student.findOne({ email: email.toLowerCase().trim() }).select('+password')
  if (!user) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const token = generateToken(user._id)

  const userJson = user.toObject()
  delete userJson.password

  return { user: userJson, token }
}

export const getUserById = async (userId) => {
  ensureDBConnected()

  const user = await Student.findById(userId)
  if (!user) {
    throw new ApiError(404, 'User not found')
  }
  return user
}

export const updateUserProfile = async (userId, updates) => {
  ensureDBConnected()

  // Prevent password update via general profile endpoint
  const allowedUpdates = ['name', 'avatar', 'bio', 'github', 'linkedin', 'title']
  const filteredUpdates = {}
  
  Object.keys(updates).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      filteredUpdates[key] = updates[key]
    }
  })

  const user = await Student.findByIdAndUpdate(userId, filteredUpdates, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  return user
}

export const changeUserPassword = async (userId, currentPassword, newPassword) => {
  ensureDBConnected()

  const user = await Student.findById(userId).select('+password')
  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  const isMatch = await user.comparePassword(currentPassword)
  if (!isMatch) {
    throw new ApiError(400, 'Current password is incorrect')
  }

  user.password = newPassword
  await user.save()

  return { message: 'Password updated successfully' }
}


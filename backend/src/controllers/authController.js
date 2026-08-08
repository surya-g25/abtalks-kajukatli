import { asyncHandler } from '../middlewares/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import {
  validateSignupInput,
  validateLoginInput,
  validatePasswordChangeInput,
} from '../validators/authValidator.js'
import {
  signupUser,
  loginUser,
  getUserById,
  updateUserProfile,
  changeUserPassword,
} from '../services/authService.js'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

export const signup = asyncHandler(async (req, res) => {
  validateSignupInput(req.body)

  const { user, token } = await signupUser(req.body)

  res.cookie('token', token, COOKIE_OPTIONS)
  return res.status(201).json(new ApiResponse(201, user, 'Account created successfully'))
})

export const login = asyncHandler(async (req, res) => {
  validateLoginInput(req.body)

  const { user, token } = await loginUser(req.body)

  res.cookie('token', token, COOKIE_OPTIONS)
  return res.status(200).json(new ApiResponse(200, user, 'Logged in successfully'))
})

export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', { ...COOKIE_OPTIONS, maxAge: 0 })
  return res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'))
})

export const getMe = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user._id)
  return res.status(200).json(new ApiResponse(200, user, 'Current user retrieved successfully'))
})

export const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await updateUserProfile(req.user._id, req.body)
  return res.status(200).json(new ApiResponse(200, updatedUser, 'Profile updated successfully'))
})

export const changePassword = asyncHandler(async (req, res) => {
  validatePasswordChangeInput(req.body)

  const result = await changeUserPassword(req.user._id, req.body.currentPassword, req.body.newPassword)
  return res.status(200).json(new ApiResponse(200, null, result.message))
})

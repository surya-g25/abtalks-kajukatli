import { ApiError } from '../utils/apiError.js'

export const validateSignupInput = (data) => {
  const { name, email, password, confirmPassword } = data

  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new ApiError(400, 'Full Name is required')
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new ApiError(400, 'Email address is required')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    throw new ApiError(400, 'Invalid email format')
  }

  if (!password || typeof password !== 'string') {
    throw new ApiError(400, 'Password is required')
  }

  if (password.length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    throw new ApiError(400, 'Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    throw new ApiError(400, 'Password must contain at least one lowercase letter')
  }

  if (!/[0-9]/.test(password)) {
    throw new ApiError(400, 'Password must contain at least one number')
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    throw new ApiError(400, 'Password must contain at least one special character')
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, 'Passwords do not match')
  }
}

export const validateLoginInput = (data) => {
  const { email, password } = data

  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new ApiError(400, 'Email address is required')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    throw new ApiError(400, 'Invalid email format')
  }

  if (!password || typeof password !== 'string') {
    throw new ApiError(400, 'Password is required')
  }
}

export const validatePasswordChangeInput = (data) => {
  const { currentPassword, newPassword, confirmNewPassword } = data

  if (!currentPassword || typeof currentPassword !== 'string') {
    throw new ApiError(400, 'Current password is required')
  }

  if (!newPassword || typeof newPassword !== 'string') {
    throw new ApiError(400, 'New password is required')
  }

  if (newPassword.length < 8) {
    throw new ApiError(400, 'New password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(newPassword)) {
    throw new ApiError(400, 'New password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(newPassword)) {
    throw new ApiError(400, 'New password must contain at least one lowercase letter')
  }

  if (!/[0-9]/.test(newPassword)) {
    throw new ApiError(400, 'New password must contain at least one number')
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword)) {
    throw new ApiError(400, 'New password must contain at least one special character')
  }

  if (newPassword !== confirmNewPassword) {
    throw new ApiError(400, 'New passwords do not match')
  }
}

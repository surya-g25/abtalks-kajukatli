import { Router } from 'express'
import {
  signup,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
} from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = Router()

// Public Auth Routes
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

// Protected Auth Routes
router.get('/me', protect, getMe)
router.put('/profile', protect, updateProfile)
router.put('/change-password', protect, changePassword)

export default router

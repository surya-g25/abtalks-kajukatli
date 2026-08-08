import { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/profileController.js'

const router = Router()

router.route('/').get(getProfile).patch(updateProfile)

export default router

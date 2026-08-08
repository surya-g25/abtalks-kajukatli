import { Router } from 'express'
import { getMissions } from '../controllers/missionController.js'

const router = Router()

router.get('/', getMissions)

export default router

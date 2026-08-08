import { Router } from 'express'
import { getProgress } from '../controllers/statisticsController.js'

const router = Router()

router.get('/', getProgress)

export default router

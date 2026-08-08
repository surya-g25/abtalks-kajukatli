import { Router } from 'express'
import { getStatistics, getProgress } from '../controllers/statisticsController.js'

const router = Router()

router.get('/', getStatistics)
router.get('/progress', getProgress)

export default router

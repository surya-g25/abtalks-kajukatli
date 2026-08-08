import { Router } from 'express'
import healthRoutes from './health.routes.js'
import authRoutes from './authRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import profileRoutes from './profileRoutes.js'
import challengeRoutes from './challengeRoutes.js'
import submissionRoutes from './submissionRoutes.js'
import leaderboardRoutes from './leaderboardRoutes.js'
import achievementRoutes from './achievementRoutes.js'
import statisticsRoutes from './statisticsRoutes.js'
import progressRoutes from './progressRoutes.js'
import missionRoutes from './missionRoutes.js'
import aiRoutes from './aiRoutes.js'
import notificationRoutes from './notificationRoutes.js'

const router = Router()

router.use('/', healthRoutes)
router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/profile', profileRoutes)
router.use('/challenges', challengeRoutes)
router.use('/submissions', submissionRoutes)
router.use('/leaderboard', leaderboardRoutes)
router.use('/achievements', achievementRoutes)
router.use('/statistics', statisticsRoutes)
router.use('/progress', progressRoutes)
router.use('/missions', missionRoutes)
router.use('/ai', aiRoutes)
router.use('/notifications', notificationRoutes)

export default router



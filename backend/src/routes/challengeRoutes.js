import { Router } from 'express'
import { getChallenges, getChallengeByDay, updateChallengeProgress } from '../controllers/challengeController.js'

const router = Router()

router.get('/', getChallenges)
router.get('/:day', getChallengeByDay)
router.put('/:day/progress', updateChallengeProgress)

export default router

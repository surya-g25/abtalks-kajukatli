import { Router } from 'express'
import { getChallenges, getChallengeByDay } from '../controllers/challengeController.js'

const router = Router()

router.get('/', getChallenges)
router.get('/:day', getChallengeByDay)

export default router

import { Router } from 'express'
import { submitChallenge, getSubmissions } from '../controllers/submissionController.js'
import { validateSubmission } from '../validators/submissionValidator.js'

const router = Router()

router.route('/').get(getSubmissions).post(validateSubmission, submitChallenge)

export default router

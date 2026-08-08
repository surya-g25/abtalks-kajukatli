import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as submissionService from '../services/submissionService.js'

export const submitChallenge = asyncHandler(async (req, res) => {
  const submission = await submissionService.createSubmission(req.body)
  return res.status(201).json(new ApiResponse(201, submission, 'Challenge submitted successfully! +150 XP awarded.'))
})

export const getSubmissions = asyncHandler(async (req, res) => {
  const submissions = await submissionService.getSubmissions()
  return res.status(200).json(new ApiResponse(200, submissions, 'Submissions fetched successfully'))
})

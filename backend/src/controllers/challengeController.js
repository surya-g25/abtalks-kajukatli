import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as challengeService from '../services/challengeService.js'

export const getChallenges = asyncHandler(async (req, res) => {
  const challenges = await challengeService.getAllChallenges()
  return res.status(200).json(new ApiResponse(200, challenges, 'Challenges fetched successfully'))
})

export const getChallengeByDay = asyncHandler(async (req, res) => {
  const { day } = req.params
  const challenge = await challengeService.getChallengeByDay(day)
  return res.status(200).json(new ApiResponse(200, challenge, `Challenge day ${day} fetched successfully`))
})

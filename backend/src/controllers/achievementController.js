import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as achievementService from '../services/achievementService.js'

export const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await achievementService.getAchievements()
  return res.status(200).json(new ApiResponse(200, achievements, 'Achievements fetched successfully'))
})

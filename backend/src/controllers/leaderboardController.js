import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as leaderboardService from '../services/leaderboardService.js'

export const getLeaderboard = asyncHandler(async (req, res) => {
  const { sortBy } = req.query
  const leaderboard = await leaderboardService.getLeaderboard(sortBy)
  return res.status(200).json(new ApiResponse(200, leaderboard, 'Leaderboard fetched successfully'))
})

import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as statisticsService from '../services/statisticsService.js'

export const getStatistics = asyncHandler(async (req, res) => {
  const stats = await statisticsService.getStatistics()
  return res.status(200).json(new ApiResponse(200, stats, 'Statistics fetched successfully'))
})

export const getProgress = asyncHandler(async (req, res) => {
  const progress = await statisticsService.getProgress()
  return res.status(200).json(new ApiResponse(200, progress, 'Progress heatmap data fetched successfully'))
})

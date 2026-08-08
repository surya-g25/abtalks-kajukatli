import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as dashboardService from '../services/dashboardService.js'

export const getDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboardData(req.user?._id)
  return res.status(200).json(new ApiResponse(200, data, 'Dashboard data fetched successfully'))
})

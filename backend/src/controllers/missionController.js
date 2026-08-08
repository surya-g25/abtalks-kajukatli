import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as missionService from '../services/missionService.js'

export const getMissions = asyncHandler(async (req, res) => {
  const missions = await missionService.getMissions()
  return res.status(200).json(new ApiResponse(200, missions, 'Missions fetched successfully'))
})

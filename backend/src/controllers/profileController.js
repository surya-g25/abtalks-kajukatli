import asyncHandler from '../middlewares/asyncHandler.js'
import ApiResponse from '../utils/apiResponse.js'
import * as profileService from '../services/profileService.js'

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfile()
  return res.status(200).json(new ApiResponse(200, profile, 'Profile fetched successfully'))
})

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.updateProfile(req.body)
  return res.status(200).json(new ApiResponse(200, profile, 'Profile updated successfully'))
})

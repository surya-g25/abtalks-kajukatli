import { asyncHandler } from '../middlewares/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import * as notificationService from '../services/notificationService.js'

export const getNotifications = asyncHandler(async (req, res) => {
  const data = await notificationService.getUserNotifications(req.user._id)
  return res.status(200).json(new ApiResponse(200, data, 'Notifications fetched successfully'))
})

export const markNotificationRead = asyncHandler(async (req, res) => {
  const data = await notificationService.markAsRead(req.params.id, req.user._id)
  return res.status(200).json(new ApiResponse(200, data, 'Notification marked as read'))
})

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  const data = await notificationService.markAllAsRead(req.user._id)
  return res.status(200).json(new ApiResponse(200, data, 'All notifications marked as read'))
})

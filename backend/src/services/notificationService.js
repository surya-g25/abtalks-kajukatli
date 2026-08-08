import Notification from '../models/Notification.js'
import { ApiError } from '../utils/apiError.js'

export const getUserNotifications = async (studentId) => {
  const notifications = await Notification.find({ studentId }).sort({ createdAt: -1 })
  const unreadCount = await Notification.countDocuments({ studentId, read: false })
  return { notifications, unreadCount }
}

export const markAsRead = async (notificationId, studentId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, studentId },
    { read: true },
    { new: true }
  )
  if (!notification) {
    throw new ApiError(404, 'Notification not found')
  }
  return notification
}

export const markAllAsRead = async (studentId) => {
  await Notification.updateMany({ studentId, read: false }, { read: true })
  return { message: 'All notifications marked as read' }
}

import apiClient from '@/api/apiClient'

export const fetchNotifications = async () => {
  try {
    const response = await apiClient.get('/notifications')
    return response.data.data
  } catch (error) {
    console.warn('Failed to fetch notifications:', error?.message)
    return { notifications: [], unreadCount: 0 }
  }
}

export const markNotificationAsRead = async (id) => {
  try {
    const response = await apiClient.put(`/notifications/${id}/read`)
    return response.data.data
  } catch (error) {
    console.warn('Failed to mark notification as read:', error?.message)
    return null
  }
}

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await apiClient.put('/notifications/read-all')
    return response.data
  } catch (error) {
    console.warn('Failed to mark all notifications as read:', error?.message)
    return null
  }
}

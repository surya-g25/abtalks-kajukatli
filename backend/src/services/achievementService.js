import Achievement from '../models/Achievement.js'
import { mockAchievements } from '../data/seedData.js'

export const getAchievements = async () => {
  try {
    const achievements = await Achievement.find()
    return achievements.length > 0 ? achievements : mockAchievements
  } catch (error) {
    return mockAchievements
  }
}

import Statistics from '../models/Statistics.js'
import Progress from '../models/Progress.js'
import { mockStatistics, mockProgress } from '../data/seedData.js'

export const getStatistics = async () => {
  try {
    const stats = await Statistics.findOne()
    return stats || mockStatistics
  } catch (error) {
    return mockStatistics
  }
}

export const getProgress = async () => {
  try {
    const progress = await Progress.findOne()
    return progress || mockProgress
  } catch (error) {
    return mockProgress
  }
}

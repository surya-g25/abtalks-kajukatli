import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student.js'
import Challenge from '../models/Challenge.js'
import Achievement from '../models/Achievement.js'
import Leaderboard from '../models/Leaderboard.js'
import Statistics from '../models/Statistics.js'
import Progress from '../models/Progress.js'
import {
  mockStudent,
  mockChallengeDay14,
  mockLeaderboard,
  mockAchievements,
  mockStatistics,
  mockProgress,
} from './seedData.js'

dotenv.config()

export const seedDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('Skipping MongoDB seeding (No active DB connection)')
      return
    }

    await Student.deleteMany({})
    await Challenge.deleteMany({})
    await Achievement.deleteMany({})
    await Leaderboard.deleteMany({})
    await Statistics.deleteMany({})
    await Progress.deleteMany({})

    const createdStudent = await Student.create(mockStudent)
    await Challenge.create(mockChallengeDay14)
    await Achievement.insertMany(mockAchievements)
    await Leaderboard.insertMany(mockLeaderboard)
    await Statistics.create(mockStatistics)
    await Progress.create({ ...mockProgress, studentId: createdStudent._id })

    console.log('MongoDB Seeded Successfully!')
  } catch (error) {
    console.error('Error Seeding Database:', error.message)
  }
}

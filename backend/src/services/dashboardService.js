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
} from '../data/seedData.js'

export const getDashboardData = async () => {
  try {
    const student = (await Student.findOne()) || mockStudent
    const todayMission = (await Challenge.findOne({ dayNumber: 14 })) || mockChallengeDay14
    const leaderboard = (await Leaderboard.find().limit(5)) || mockLeaderboard
    const achievements = (await Achievement.find().limit(7)) || mockAchievements
    const statistics = (await Statistics.findOne()) || mockStatistics
    const progress = (await Progress.findOne()) || mockProgress

    return {
      student,
      todayMission,
      leaderboard,
      achievements,
      statistics,
      progress,
    }
  } catch (error) {
    // Fallback if DB query fails
    return {
      student: mockStudent,
      todayMission: mockChallengeDay14,
      leaderboard: mockLeaderboard,
      achievements: mockAchievements,
      statistics: mockStatistics,
      progress: mockProgress,
    }
  }
}

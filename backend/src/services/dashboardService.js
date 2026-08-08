import Student from '../models/Student.js'
import Challenge from '../models/Challenge.js'
import Achievement from '../models/Achievement.js'
import Statistics from '../models/Statistics.js'
import Progress from '../models/Progress.js'
import Mission from '../models/Mission.js'
import { getNextLevelInfo } from '../config/gamification.js'

export const getDashboardData = async () => {
  try {
    let student = await Student.findOne({ email: 'alex.rivera@abtalks.dev' })
    if (!student) {
      student = await Student.findOne()
    }

    if (!student) {
      return null
    }

    const studentId = student._id

    // Fetch Day 14 Challenge
    const todayMission = await Challenge.findOne({ dayNumber: 14 })

    // Get all students sorted by XP for dynamic rankings
    const allStudentsSorted = await Student.find().sort({ xp: -1 })
    const myRankIndex = allStudentsSorted.findIndex((s) => s._id.toString() === studentId.toString())
    const myRank = myRankIndex !== -1 ? myRankIndex + 1 : 4

    if (student.rank !== myRank) {
      student.rank = myRank
      await student.save()
    }

    const leaderboard = allStudentsSorted.map((s, idx) => ({
      rank: idx + 1,
      name: s.name,
      points: s.xp.toLocaleString(),
      avatar: s.avatar,
      weeklyChange: s.weeklyChange || '+0',
      topPercentage: idx === 0 ? 'Top 1%' : idx === 1 ? 'Top 2%' : idx === 2 ? 'Top 3%' : idx === 3 ? 'Top 5%' : 'Top 8%',
      isYou: s.email === 'alex.rivera@abtalks.dev',
    }))

    const achievements = await Achievement.find({ studentId })
    const statistics = await Statistics.findOne({ studentId })
    const progress = await Progress.findOne({ studentId })
    const missions = await Mission.find({ studentId })

    const levelInfo = getNextLevelInfo(student.xp)

    return {
      student: {
        ...student.toObject(),
        xpInCurrentLevel: levelInfo.xpInCurrentLevel,
        xpForNextLevel: levelInfo.xpForNextLevel,
        nextLevelTitle: levelInfo.nextLevel ? levelInfo.nextLevel.title : 'Legend',
        nextLevelReward: levelInfo.nextLevel ? levelInfo.nextLevel.reward : 'N/A',
      },
      todayMission,
      leaderboard,
      achievements,
      statistics,
      progress,
      missions,
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error.message)
    throw error
  }
}

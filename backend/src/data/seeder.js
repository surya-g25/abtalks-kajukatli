import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student.js'
import Challenge from '../models/Challenge.js'
import Achievement from '../models/Achievement.js'
import Leaderboard from '../models/Leaderboard.js'
import Statistics from '../models/Statistics.js'
import Progress from '../models/Progress.js'
import Mission from '../models/Mission.js'
import {
  mockChallengeDay14,
  mockAchievements,
  mockStatistics,
  mockProgress,
} from './seedData.js'

dotenv.config()

// Mock competitors plus the main student
const mockStudentsToSeed = [
  {
    name: 'Sarah Chen',
    email: 'sarah.chen@abtalks.dev',
    avatar: '',
    level: 18,
    xp: 3890,
    currentStreak: 25,
    longestStreak: 30,
    streakFreeze: { active: 0, available: 3 },
    title: 'Elite Architect',
    rank: 1,
    bio: 'Building scalable systems at high performance.',
    github: 'sarahchen',
    linkedin: 'sarahchen',
    lastActiveDate: new Date().toISOString().split('T')[0],
    weeklyXp: 620,
    monthlyXp: 2500,
    consistency: 98,
    weeklyChange: '+1',
  },
  {
    name: 'Marcus Vance',
    email: 'marcus.vance@abtalks.dev',
    avatar: '',
    level: 16,
    xp: 3450,
    currentStreak: 18,
    longestStreak: 25,
    streakFreeze: { active: 0, available: 1 },
    title: 'Master Builder',
    rank: 2,
    bio: 'Frontend enthusiast & UX design fanatic.',
    github: 'marcusv',
    linkedin: 'marcusv',
    lastActiveDate: new Date().toISOString().split('T')[0],
    weeklyXp: 510,
    monthlyXp: 2100,
    consistency: 96,
    weeklyChange: '+0',
  },
  {
    name: 'Devon Lane',
    email: 'devon.lane@abtalks.dev',
    avatar: '',
    level: 15,
    xp: 3120,
    currentStreak: 20,
    longestStreak: 28,
    streakFreeze: { active: 1, available: 2 },
    title: 'System Engineer',
    rank: 3,
    bio: 'DevOps wizard & AWS Cloud certified.',
    github: 'devonl',
    linkedin: 'devonl',
    lastActiveDate: new Date().toISOString().split('T')[0],
    weeklyXp: 380,
    monthlyXp: 1950,
    consistency: 92,
    weeklyChange: '-1',
  },
  {
    name: 'Alex Rivera',
    email: 'alex.rivera@abtalks.dev',
    avatar: '',
    level: 12,
    xp: 2450,
    currentStreak: 14,
    longestStreak: 21,
    streakFreeze: { active: 1, available: 2 },
    title: 'Code Alchemist',
    rank: 4,
    bio: 'Full-stack React & Node.js Developer in ABTalks cohort.',
    github: 'alexrivera',
    linkedin: 'alexrivera',
    lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // active yesterday
    weeklyXp: 450,
    monthlyXp: 1800,
    consistency: 94,
    weeklyChange: '+2',
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@abtalks.dev',
    avatar: '',
    level: 10,
    xp: 2210,
    currentStreak: 12,
    longestStreak: 18,
    streakFreeze: { active: 0, available: 2 },
    title: 'Tech Explorer',
    rank: 5,
    bio: 'Always exploring the bleeding edge of UI tech.',
    github: 'priyas',
    linkedin: 'priyas',
    lastActiveDate: new Date().toISOString().split('T')[0],
    weeklyXp: 320,
    monthlyXp: 1500,
    consistency: 88,
    weeklyChange: '+1',
  },
]

export const seedDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('Skipping MongoDB seeding (No active DB connection)')
      return
    }

    // Clean all collections
    await Student.deleteMany({})
    await Challenge.deleteMany({})
    await Achievement.deleteMany({})
    await Leaderboard.deleteMany({})
    await Statistics.deleteMany({})
    await Progress.deleteMany({})
    await Mission.deleteMany({})

    // Seed students
    const createdStudents = await Student.insertMany(mockStudentsToSeed)
    const alexRivera = createdStudents.find((s) => s.email === 'alex.rivera@abtalks.dev')

    // Seed challenge
    await Challenge.create(mockChallengeDay14)

    // Seed Achievements linked to Alex Rivera
    const achievementsToSeed = mockAchievements.map((ach) => ({
      ...ach,
      studentId: alexRivera._id,
    }))
    await Achievement.insertMany(achievementsToSeed)

    // Seed Statistics linked to Alex Rivera
    await Statistics.create({
      ...mockStatistics,
      studentId: alexRivera._id,
    })

    // Seed Progress linked to Alex Rivera
    await Progress.create({
      ...mockProgress,
      studentId: alexRivera._id,
    })

    // Seed Missions linked to Alex Rivera
    const initialMissions = [
      {
        studentId: alexRivera._id,
        type: 'daily',
        title: "Complete Today's Challenge",
        description: "Submit day 14's custom useAsync hook challenge.",
        target: 1,
        currentProgress: 0,
        completed: false,
        rewardXp: 100,
        deadline: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      {
        studentId: alexRivera._id,
        type: 'weekly',
        title: 'GitHub Active Contributor',
        description: 'Verify 5 commits pushed to your repository this week.',
        target: 5,
        currentProgress: 2,
        completed: false,
        rewardXp: 200,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: alexRivera._id,
        type: 'monthly',
        title: 'LinkedIn Influence Milestone',
        description: 'Publish 5 high-quality learnings reflection posts on LinkedIn.',
        target: 5,
        currentProgress: 3,
        completed: false,
        rewardXp: 500,
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      },
    ]
    await Mission.insertMany(initialMissions)

    // Seed leaderboard mock mapping (legacy fallback safety)
    const leaderboardToSeed = createdStudents
      .map((student) => ({
        rank: student.rank,
        name: student.name,
        points: student.xp.toLocaleString(),
        avatar: student.avatar,
        weeklyChange: student.weeklyChange,
        topPercentage: student.rank === 1 ? 'Top 1%' : student.rank === 2 ? 'Top 2%' : student.rank === 3 ? 'Top 3%' : student.rank === 4 ? 'Top 5%' : 'Top 8%',
        isYou: student.email === 'alex.rivera@abtalks.dev',
      }))
    await Leaderboard.insertMany(leaderboardToSeed)

    console.log('MongoDB Seeded Normalized Successfully!')
  } catch (error) {
    console.error('Error Seeding Database:', error.message)
  }
}

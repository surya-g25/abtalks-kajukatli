import Student from '../models/Student.js'
import XPHistory from '../models/XPHistory.js'
import Notification from '../models/Notification.js'
import Leaderboard from '../models/Leaderboard.js'

export const calculateLevel = (xp = 0) => {
  return Math.floor(xp / 1000) + 1
}

export const calculateXPProgress = (xp = 0) => {
  const xpInCurrentLevel = xp % 1000
  const xpForNextLevel = 1000
  const percentage = Math.min(100, Math.round((xpInCurrentLevel / xpForNextLevel) * 100))
  return {
    xpInCurrentLevel,
    xpForNextLevel,
    percentage,
  }
}

export const awardXP = async (studentId, points, reason, referenceId = null) => {
  const student = await Student.findById(studentId)
  if (!student) return null

  student.xp += points
  student.level = calculateLevel(student.xp)
  student.weeklyXp += points
  student.monthlyXp += points
  await student.save()

  // Log in XPHistory
  await XPHistory.create({
    studentId,
    reason,
    points,
    referenceId,
    runningTotal: student.xp,
  })

  // Create Notification
  await Notification.create({
    studentId,
    title: 'XP Awarded!',
    message: `You earned +${points} XP for ${reason}.`,
    type: 'achievement',
  })

  // Recalculate ranks asynchronously
  await recalculateLeaderboardRanks()

  return student
}

export const recalculateLeaderboardRanks = async () => {
  const students = await Student.find({}).sort({ xp: -1, createdAt: 1 })
  const total = students.length || 1

  await Leaderboard.deleteMany({})

  const leaderboardEntries = []

  for (let index = 0; index < students.length; index++) {
    const s = students[index]
    const rank = index + 1
    s.rank = rank

    let topPercentage = 'Top 10%'
    const percentile = Math.ceil((rank / total) * 100)
    if (rank === 1) topPercentage = 'Top 1%'
    else if (rank <= 3) topPercentage = `Top ${percentile}%`
    else topPercentage = `Top ${percentile}%`

    await s.save()

    leaderboardEntries.push({
      rank,
      name: s.name,
      points: s.xp.toLocaleString(),
      avatar: s.avatar,
      weeklyChange: s.weeklyChange || '+0',
      topPercentage,
      isYou: false, // Handled dynamically in API by consumer studentId match
    })
  }

  if (leaderboardEntries.length > 0) {
    await Leaderboard.insertMany(leaderboardEntries)
  }

  return students
}

export const updateStreak = async (studentId) => {
  const student = await Student.findById(studentId)
  if (!student) return null

  const today = new Date().toISOString().split('T')[0]
  if (student.lastActiveDate === today) {
    return student
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  if (student.lastActiveDate === yesterday) {
    student.currentStreak += 1
    if (student.currentStreak > student.longestStreak) {
      student.longestStreak = student.currentStreak
    }
  } else if (student.lastActiveDate && student.lastActiveDate !== today) {
    // Check streak freeze
    if (student.streakFreeze && student.streakFreeze.active > 0) {
      student.streakFreeze.active -= 1
      await Notification.create({
        studentId,
        title: 'Streak Freeze Used!',
        message: 'Your daily streak was saved by your active Streak Freeze badge.',
        type: 'streak',
      })
    } else {
      student.currentStreak = 1
    }
  }

  student.lastActiveDate = today
  await student.save()
  return student
}

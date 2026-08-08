import Submission from '../models/Submission.js'
import Student from '../models/Student.js'
import Challenge from '../models/Challenge.js'
import Statistics from '../models/Statistics.js'
import Progress from '../models/Progress.js'
import Achievement from '../models/Achievement.js'
import Mission from '../models/Mission.js'
import { XP_REWARDS, getLevelFromXp } from '../config/gamification.js'
import { calculateStreak } from '../utils/streakEngine.js'

export const createSubmission = async (submissionData) => {
  try {
    // 1. Fetch student
    let student = await Student.findOne({ email: 'alex.rivera@abtalks.dev' })
    if (!student) {
      student = await Student.findOne()
    }
    if (!student) {
      throw new Error('Student profile not found')
    }

    const studentId = student._id
    const dayNumber = Number(submissionData.dayNumber || 14)

    // Check if challenge is already submitted
    const existingSubmission = await Submission.findOne({ studentId, dayNumber })
    if (existingSubmission) {
      throw new Error(`Challenge for day ${dayNumber} has already been completed`)
    }

    // 2. Fetch challenge
    const challenge = await Challenge.findOne({ dayNumber })
    const baseChallengeXp = challenge ? challenge.xpReward : XP_REWARDS.CHALLENGE_COMPLETE

    // 3. Calculate XP rewards
    let totalXpEarned = baseChallengeXp
    if (submissionData.githubRepo && submissionData.commitUrl) {
      totalXpEarned += XP_REWARDS.GITHUB_COMMIT
    }
    if (submissionData.linkedinUrl) {
      totalXpEarned += XP_REWARDS.LINKEDIN_POST
    }
    if (submissionData.reflection) {
      totalXpEarned += XP_REWARDS.REFLECTION
    }

    // 4. Update Student streak and XP
    const streakResult = calculateStreak(
      student.lastActiveDate,
      student.currentStreak,
      student.longestStreak,
      student.streakFreeze
    )

    student.xp += totalXpEarned
    student.currentStreak = streakResult.currentStreak
    student.longestStreak = streakResult.longestStreak
    student.streakFreeze = streakResult.streakFreeze
    student.lastActiveDate = streakResult.lastActiveDate
    student.weeklyXp += totalXpEarned
    student.monthlyXp += totalXpEarned

    // Check for level ups
    const newLevel = getLevelFromXp(student.xp)
    student.level = newLevel.level
    student.title = newLevel.title

    await student.save()

    // 5. Create submission document
    const submission = await Submission.create({
      studentId,
      dayNumber,
      githubRepo: submissionData.githubRepo,
      commitUrl: submissionData.commitUrl,
      linkedinUrl: submissionData.linkedinUrl,
      reflection: submissionData.reflection,
      xpEarned: totalXpEarned,
      status: 'approved',
      submittedAt: new Date(),
    })

    // 6. Complete Challenge tasks and mark as completed
    if (challenge) {
      challenge.tasks.forEach((t) => {
        t.completed = true
      })
      challenge.progress = 100
      challenge.isCompleted = true
      await challenge.save()
    }

    // 7. Update Statistics
    let stats = await Statistics.findOne({ studentId })
    if (!stats) {
      stats = new Statistics({ studentId })
    }
    stats.completedChallenges += 1
    stats.githubCommits += 1
    stats.linkedinPosts += 1
    stats.hoursStudied += 2 // add 2 hours study time
    stats.xpEarned += totalXpEarned
    await stats.save()

    // 8. Update Progress (Heatmap + Weekly Activity)
    let progress = await Progress.findOne({ studentId })
    if (!progress) {
      progress = new Progress({ studentId })
    }

    const todayStr = new Date().toISOString().split('T')[0]
    // Update Heatmap
    const heatmapIdx = progress.heatmapData.findIndex((h) => h.date === todayStr)
    if (heatmapIdx !== -1) {
      progress.heatmapData[heatmapIdx].count += 1
      progress.heatmapData[heatmapIdx].level = Math.min(progress.heatmapData[heatmapIdx].count, 4)
    } else {
      progress.heatmapData.push({
        date: todayStr,
        count: 1,
        level: 1,
      })
    }
    progress.currentStreak = student.currentStreak

    // Update Weekly Activity
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayOfWeek = weekdayNames[new Date().getDay()]
    const weeklyIdx = progress.weeklyActivity.findIndex((w) => w.day === dayOfWeek)
    if (weeklyIdx !== -1) {
      progress.weeklyActivity[weeklyIdx].xp += totalXpEarned
      progress.weeklyActivity[weeklyIdx].tasks += 1
      progress.weeklyActivity[weeklyIdx].consistency = Math.min(progress.weeklyActivity[weeklyIdx].consistency + 5, 100)
    } else {
      progress.weeklyActivity.push({
        day: dayOfWeek,
        xp: totalXpEarned,
        tasks: 1,
        consistency: 90,
      })
    }
    await progress.save()

    // 9. Update Missions Progress
    const missions = await Mission.find({ studentId, completed: false })
    for (const mission of missions) {
      if (mission.type === 'daily') {
        mission.currentProgress = 1
        mission.completed = true
        // Award extra XP
        student.xp += mission.rewardXp
        await student.save()
      } else if (mission.type === 'weekly') {
        mission.currentProgress = Math.min(mission.currentProgress + 1, mission.target)
        if (mission.currentProgress >= mission.target) {
          mission.completed = true
          student.xp += mission.rewardXp
          await student.save()
        }
      } else if (mission.type === 'monthly') {
        mission.currentProgress = Math.min(mission.currentProgress + 1, mission.target)
        if (mission.currentProgress >= mission.target) {
          mission.completed = true
          student.xp += mission.rewardXp
          await student.save()
        }
      }
      await mission.save()
    }

    // 10. Check and unlock Achievements
    const achievements = await Achievement.find({ studentId })
    const hours = new Date().getHours()
    const isNightOwlTime = hours >= 0 && hours < 4

    for (const ach of achievements) {
      let shouldUnlock = false

      if (ach.title === 'First Commit' && stats.githubCommits >= 1) {
        shouldUnlock = true
      } else if (ach.title === '7-Day Warrior' && student.longestStreak >= 7) {
        shouldUnlock = true
      } else if (ach.title === '30-Day Legend' && student.longestStreak >= 30) {
        shouldUnlock = true
      } else if (ach.title === 'Consistency King' && stats.completedChallenges >= 25) {
        shouldUnlock = true
      } else if (ach.title === 'Night Owl' && isNightOwlTime) {
        shouldUnlock = true
      } else if (ach.title === 'LinkedIn Creator' && stats.linkedinPosts >= 5) {
        shouldUnlock = true
      } else if (ach.title === 'Open Source Explorer' && stats.githubCommits >= 10) {
        shouldUnlock = true
      }

      // Update progress details
      if (ach.title === 'First Commit') {
        ach.progress = Math.min(stats.githubCommits, 1)
      } else if (ach.title === '7-Day Warrior') {
        ach.progress = Math.min(student.longestStreak, 7)
      } else if (ach.title === '30-Day Legend') {
        ach.progress = Math.min(student.longestStreak, 30)
      } else if (ach.title === 'Consistency King') {
        ach.progress = Math.min(stats.completedChallenges, 25)
      } else if (ach.title === 'Night Owl') {
        ach.progress = isNightOwlTime ? 1 : 0
      } else if (ach.title === 'LinkedIn Creator') {
        ach.progress = Math.min(stats.linkedinPosts, 5)
      } else if (ach.title === 'Open Source Explorer') {
        ach.progress = Math.min(stats.githubCommits, 10)
      }

      if (shouldUnlock && !ach.unlocked) {
        ach.unlocked = true
        ach.unlockedAt = new Date()
        ach.progress = ach.totalTarget
      }

      await ach.save()
    }

    return submission
  } catch (error) {
    console.error('Error creating submission:', error.message)
    throw error
  }
}

export const getSubmissions = async () => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 })
    return submissions
  } catch (error) {
    return []
  }
}

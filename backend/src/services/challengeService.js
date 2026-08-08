import Challenge from '../models/Challenge.js'
import { mockChallengeDay14 } from '../data/seedData.js'

export const getChallengeByDay = async (dayNumber = 14) => {
  try {
    const challenge = await Challenge.findOne({ dayNumber: Number(dayNumber) })
    return challenge || mockChallengeDay14
  } catch (error) {
    return mockChallengeDay14
  }
}

export const getAllChallenges = async () => {
  try {
    const challenges = await Challenge.find().sort({ dayNumber: 1 })
    return challenges.length > 0 ? challenges : [mockChallengeDay14]
  } catch (error) {
    return [mockChallengeDay14]
  }
}

export const updateChallengeProgress = async (dayNumber, tasks) => {
  try {
    const challenge = await Challenge.findOne({ dayNumber: Number(dayNumber) })
    if (!challenge) {
      throw new Error(`Challenge day ${dayNumber} not found`)
    }

    // Sync tasks
    tasks.forEach((updatedTask) => {
      const task = challenge.tasks.find((t) => t.id === updatedTask.id)
      if (task) {
        task.completed = updatedTask.completed
      }
    })

    // Calculate completion percentage
    const completedCount = challenge.tasks.filter((t) => t.completed).length
    const progress = Math.round((completedCount / challenge.tasks.length) * 100)

    challenge.progress = progress
    challenge.isCompleted = progress === 100

    await challenge.save()
    return challenge
  } catch (error) {
    console.error('Error updating challenge progress:', error?.message)
    throw error
  }
}

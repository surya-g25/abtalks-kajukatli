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

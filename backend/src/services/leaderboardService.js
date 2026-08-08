import Leaderboard from '../models/Leaderboard.js'
import { mockLeaderboard } from '../data/seedData.js'

export const getLeaderboard = async () => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 })
    return leaderboard.length > 0 ? leaderboard : mockLeaderboard
  } catch (error) {
    return mockLeaderboard
  }
}

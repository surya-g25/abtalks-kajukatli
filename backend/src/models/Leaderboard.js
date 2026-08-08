import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    name: { type: String, required: true },
    points: { type: String, required: true },
    avatar: { type: String, default: '' },
    weeklyChange: { type: String, default: '+0' },
    topPercentage: { type: String, default: 'Top 10%' },
    isYou: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema)
export default Leaderboard

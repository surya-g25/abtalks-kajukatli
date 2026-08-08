import mongoose from 'mongoose'

const statisticsSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    completedChallenges: { type: Number, default: 28 },
    githubCommits: { type: Number, default: 142 },
    linkedinPosts: { type: Number, default: 18 },
    hoursStudied: { type: Number, default: 64.5 },
    xpEarned: { type: Number, default: 2450 },
    averageCompletionRate: { type: Number, default: 94 },
  },
  { timestamps: true }
)

export const Statistics = mongoose.models.Statistics || mongoose.model('Statistics', statisticsSchema)
export default Statistics

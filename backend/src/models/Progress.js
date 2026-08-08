import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    activeDays: { type: Number, default: 42 },
    missedDays: { type: Number, default: 3 },
    currentStreak: { type: Number, default: 14 },
    weeklyActivity: [
      {
        day: String,
        xp: Number,
        tasks: Number,
        consistency: Number,
      },
    ],
    heatmapData: [
      {
        level: Number,
        count: Number,
        date: String,
      },
    ],
  },
  { timestamps: true }
)

export const Progress = mongoose.models.Progress || mongoose.model('Progress', progressSchema)
export default Progress

import mongoose from 'mongoose'

const missionSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    type: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    target: { type: Number, required: true },
    currentProgress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    rewardXp: { type: Number, default: 100 },
    deadline: { type: Date },
  },
  { timestamps: true }
)

export const Mission = mongoose.models.Mission || mongoose.model('Mission', missionSchema)
export default Mission

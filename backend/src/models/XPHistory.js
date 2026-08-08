import mongoose from 'mongoose'

const xpHistorySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      index: true,
    },
    reason: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    runningTotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export const XPHistory = mongoose.models.XPHistory || mongoose.model('XPHistory', xpHistorySchema)
export default XPHistory

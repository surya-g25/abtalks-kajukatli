import mongoose from 'mongoose'

const aiHistorySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'reflection',
        'linkedin',
        'resume',
        'summary',
        'suggestions',
        'helper',
        'weekly-report',
        'career-coach',
      ],
    },
    prompt: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const AIHistory = mongoose.models.AIHistory || mongoose.model('AIHistory', aiHistorySchema)
export default AIHistory

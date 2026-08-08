import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
})

const challengeSchema = new mongoose.Schema(
  {
    dayNumber: { type: Number, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
    timeEstimate: { type: String, default: '45 mins' },
    xpReward: { type: Number, default: 150 },
    progress: { type: Number, default: 0 },
    description: { type: String, required: true },
    problemStatement: { type: String, required: true },
    expectedOutcome: { type: String, required: true },
    learningGoals: [{ type: String }],
    skillsCovered: [{ type: String }],
    prerequisites: [{ type: String }],
    proTips: { type: String, default: '' },
    resources: [
      {
        title: String,
        type: { type: String },
        url: String,
        description: String,
      },
    ],
    tasks: [taskSchema],
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema)
export default Challenge

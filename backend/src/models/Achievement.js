import mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, default: 'Award' },
    unlocked: { type: Boolean, default: false },
    category: { type: String, default: 'General' },
    rarity: { type: String, enum: ['Common', 'Rare', 'Epic', 'Legendary'], default: 'Common' },
    unlockedAt: { type: Date, default: null },
    progress: { type: Number, default: 0 },
    totalTarget: { type: Number, default: 1 },
  },
  { timestamps: true }
)

export const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema)
export default Achievement

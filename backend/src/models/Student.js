import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    avatar: { type: String, default: '' },
    level: { type: Number, default: 12 },
    xp: { type: Number, default: 2450 },
    currentStreak: { type: Number, default: 14 },
    longestStreak: { type: Number, default: 21 },
    streakFreeze: {
      active: { type: Number, default: 1 },
      available: { type: Number, default: 2 },
    },
    title: { type: String, default: 'Code Alchemist' },
    rank: { type: Number, default: 4 },
    bio: { type: String, default: 'Full-stack React & Node.js Developer in ABTalks cohort.' },
    github: { type: String, default: 'alexrivera' },
    linkedin: { type: String, default: 'alexrivera' },
  },
  { timestamps: true }
)

export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema)
export default Student

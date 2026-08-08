import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
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
    lastActiveDate: { type: String, default: '' },
    weeklyXp: { type: Number, default: 0 },
    monthlyXp: { type: Number, default: 0 },
    consistency: { type: Number, default: 90 },
    weeklyChange: { type: String, default: '+0' },
  },
  { timestamps: true }
)

// Pre-save hook to hash password if modified
studentSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Method to compare candidate password with hashed password
studentSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema)
export default Student


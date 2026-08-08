import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['achievement', 'streak', 'challenge', 'leaderboard', 'system'],
      default: 'system',
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
export default Notification

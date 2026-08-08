import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    dayNumber: { type: Number, required: true },
    githubRepo: { type: String, required: true },
    commitUrl: { type: String, required: true },
    linkedinUrl: { type: String, required: true },
    reflection: { type: String, required: true },
    xpEarned: { type: Number, default: 150 },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema)
export default Submission

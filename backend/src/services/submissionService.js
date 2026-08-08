import Submission from '../models/Submission.js'

export const createSubmission = async (submissionData) => {
  try {
    const submission = await Submission.create({
      ...submissionData,
      xpEarned: 150,
      status: 'approved',
      submittedAt: new Date(),
    })
    return submission
  } catch (error) {
    // In-memory fallback if DB offline
    return {
      id: `sub_${Date.now()}`,
      ...submissionData,
      xpEarned: 150,
      status: 'approved',
      submittedAt: new Date(),
    }
  }
}

export const getSubmissions = async () => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 })
    return submissions
  } catch (error) {
    return []
  }
}

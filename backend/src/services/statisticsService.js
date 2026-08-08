import Statistics from '../models/Statistics.js'
import Progress from '../models/Progress.js'
import Student from '../models/Student.js'

export const getStatistics = async () => {
  try {
    let student = await Student.findOne({ email: 'alex.rivera@abtalks.dev' })
    if (!student) {
      student = await Student.findOne()
    }
    if (!student) {
      return null
    }

    const stats = await Statistics.findOne({ studentId: student._id })
    return stats
  } catch (error) {
    console.error('Error in getStatistics:', error.message)
    return null
  }
}

export const getProgress = async () => {
  try {
    let student = await Student.findOne({ email: 'alex.rivera@abtalks.dev' })
    if (!student) {
      student = await Student.findOne()
    }
    if (!student) {
      return null
    }

    const progress = await Progress.findOne({ studentId: student._id })
    return progress
  } catch (error) {
    console.error('Error in getProgress:', error.message)
    return null
  }
}

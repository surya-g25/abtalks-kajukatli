import Mission from '../models/Mission.js'
import Student from '../models/Student.js'

export const getMissions = async () => {
  try {
    let student = await Student.findOne({ email: 'alex.rivera@abtalks.dev' })
    if (!student) {
      student = await Student.findOne()
    }
    if (!student) {
      return []
    }

    return await Mission.find({ studentId: student._id })
  } catch (error) {
    console.error('Error in getMissions service:', error?.message)
    return []
  }
}

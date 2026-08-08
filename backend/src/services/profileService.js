import Student from '../models/Student.js'
import { mockStudent } from '../data/seedData.js'

export const getProfile = async () => {
  try {
    const student = await Student.findOne()
    return student || mockStudent
  } catch (error) {
    return mockStudent
  }
}

export const updateProfile = async (updateData) => {
  try {
    let student = await Student.findOne()
    if (!student) {
      student = await Student.create({ ...mockStudent, ...updateData })
    } else {
      Object.assign(student, updateData)
      await student.save()
    }
    return student
  } catch (error) {
    return { ...mockStudent, ...updateData }
  }
}

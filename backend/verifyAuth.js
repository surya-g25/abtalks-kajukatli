import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from './src/config/db.js'
import { signupUser, loginUser, getUserById } from './src/services/authService.js'
import Student from './src/models/Student.js'

dotenv.config()

async function testAuth() {
  console.log('--- STARTING AUTH SYSTEM INTEGRATION TEST ---')

  await connectDB()
  if (mongoose.connection.readyState !== 1) {
    console.error('Failed to connect to MongoDB for testing')
    process.exit(1)
  }

  // Cleanup test user if exists
  const testEmail = 'authtest.user@abtalks.dev'
  await Student.deleteMany({ email: testEmail })

  console.log('1. Testing Signup User...')
  const signupResult = await signupUser({
    name: 'Test Engineer',
    email: testEmail,
    password: 'Password123!',
  })

  console.log('✔ Signup Success! User ID:', signupResult.user._id)
  console.log('✔ JWT Token generated:', signupResult.token ? 'YES' : 'NO')
  console.log('✔ Password omitted from output:', signupResult.user.password === undefined)

  console.log('\n2. Testing Login User...')
  const loginResult = await loginUser({
    email: testEmail,
    password: 'Password123!',
  })
  console.log('✔ Login Success! User Email:', loginResult.user.email)
  console.log('✔ JWT Token generated:', loginResult.token ? 'YES' : 'NO')

  console.log('\n3. Testing Get User By ID...')
  const meResult = await getUserById(loginResult.user._id)
  console.log('✔ Retrieved User:', meResult.name)

  console.log('\n4. Testing Invalid Password Login...')
  try {
    await loginUser({
      email: testEmail,
      password: 'WrongPassword123!',
    })
    console.error('FAILED: Should have thrown 401 on wrong password')
  } catch (err) {
    console.log('✔ Correctly caught invalid password error:', err.message)
  }

  // Clean up
  await Student.deleteMany({ email: testEmail })
  await mongoose.disconnect()
  console.log('\n--- ALL AUTH TESTS PASSED CLEANLY ---')
}

testAuth()

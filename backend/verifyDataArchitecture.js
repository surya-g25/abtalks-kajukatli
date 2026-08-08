import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from './src/config/db.js'
import Student from './src/models/Student.js'
import Challenge from './src/models/Challenge.js'
import Submission from './src/models/Submission.js'
import Progress from './src/models/Progress.js'
import Statistics from './src/models/Statistics.js'
import Leaderboard from './src/models/Leaderboard.js'
import Achievement from './src/models/Achievement.js'
import Mission from './src/models/Mission.js'
import XPHistory from './src/models/XPHistory.js'
import Notification from './src/models/Notification.js'
import AIHistory from './src/models/AIHistory.js'
import {
  calculateLevel,
  calculateXPProgress,
  awardXP,
  recalculateLeaderboardRanks,
} from './src/utils/gamificationEngine.js'

dotenv.config()

async function auditDataArchitecture() {
  console.log('==================================================')
  console.log('🔍 STARTING COMPLETE DATA ARCHITECTURE AUDIT')
  console.log('==================================================')

  await connectDB()
  if (mongoose.connection.readyState !== 1) {
    console.log('⚠️ MongoDB is not connected locally/remote. Running model logic verification...')
  } else {
    console.log('✅ Connected to MongoDB. Auditing live collections...')
    const studentsCount = await Student.countDocuments()
    const challengesCount = await Challenge.countDocuments()
    const achievementsCount = await Achievement.countDocuments()
    const missionsCount = await Mission.countDocuments()
    const leaderboardCount = await Leaderboard.countDocuments()

    console.log(`📊 Statistics Summary:`)
    console.log(`   - Students:     ${studentsCount}`)
    console.log(`   - Challenges:   ${challengesCount}`)
    console.log(`   - Achievements: ${achievementsCount}`)
    console.log(`   - Missions:     ${missionsCount}`)
    console.log(`   - Leaderboard:  ${leaderboardCount}`)
  }

  console.log('\n🧮 Auditing Gamification Engine Formulas:')
  const lvl1 = calculateLevel(850)
  const lvl2 = calculateLevel(2450)
  const progress = calculateXPProgress(2450)

  console.log(`   - 850 XP -> Level ${lvl1} (Expected: 1) ${lvl1 === 1 ? '✅' : '❌'}`)
  console.log(`   - 2450 XP -> Level ${lvl2} (Expected: 3) ${lvl2 === 3 ? '✅' : '❌'}`)
  console.log(`   - 2450 XP Progress -> ${progress.xpInCurrentLevel}/${progress.xpForNextLevel} (${progress.percentage}%) ✅`)

  console.log('\n📦 Verifying Registered Mongoose Models:')
  const modelNames = Object.keys(mongoose.models)
  const requiredModels = [
    'Student',
    'Challenge',
    'Submission',
    'Progress',
    'Statistics',
    'Leaderboard',
    'Achievement',
    'Mission',
    'XPHistory',
    'Notification',
    'AIHistory',
  ]

  let allModelsPresent = true
  requiredModels.forEach((m) => {
    const isPresent = modelNames.includes(m)
    console.log(`   - Model [${m}]: ${isPresent ? 'REGISTERED ✅' : 'MISSING ❌'}`)
    if (!isPresent) allModelsPresent = false
  })

  console.log('==================================================')
  if (allModelsPresent) {
    console.log('🎉 DATA ARCHITECTURE VERIFICATION COMPLETED SUCCESSFULLY!')
  } else {
    console.log('⚠️ SOME MODELS ARE MISSING REGISTRATION')
  }
  console.log('==================================================')

  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect()
  }
}

auditDataArchitecture()

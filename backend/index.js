import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import apiRoutes from './src/routes/index.js'
import { connectDB } from './src/config/db.js'
import { seedDatabase } from './src/data/seeder.js'
import { errorHandler } from './src/middlewares/errorHandler.js'
import { notFoundHandler } from './src/middlewares/notFoundHandler.js'


const app = express()
const PORT = process.env.PORT || 5001

// Initialize MongoDB Connection & Seeding
connectDB().then(() => {
  seedDatabase()
})

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true)
      }
      return callback(new Error('CORS policy does not allow this origin'), false)
    },
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// API Routes
app.use('/api', apiRoutes)

// 404 Catch-all Handler
app.use(notFoundHandler)

// Error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
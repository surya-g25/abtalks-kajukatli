import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import apiRoutes from './src/routes/index.js'
import { connectDB } from './src/config/db.js'
import { seedDatabase } from './src/data/seeder.js'
import { errorHandler } from './src/middlewares/errorHandler.js'
import { notFoundHandler } from './src/middlewares/notFoundHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize MongoDB Connection & Seeding
connectDB().then(() => {
  seedDatabase()
})

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
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
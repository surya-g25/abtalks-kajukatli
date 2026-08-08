import dns from 'node:dns'
import mongoose from 'mongoose'

const getMongoDnsServers = () => {
  const configuredServers = process.env.MONGO_DNS_SERVERS
    ?.split(',')
    .map((server) => server.trim())
    .filter(Boolean)

  if (configuredServers?.length) {
    return configuredServers
  }

  const currentServers = dns.getServers()
  const usesLocalDnsProxy = currentServers.some((server) =>
    ['127.0.0.1', '::1'].includes(server)
  )

  return usesLocalDnsProxy ? ['8.8.8.8', '1.1.1.1'] : []
}

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI

  if (!mongoUri) {
    console.error('❌ MONGODB_URI / MONGO_URI is missing in .env')
    throw new Error('MONGODB_URI / MONGO_URI environment variable is required.')
  }

  if (mongoUri.startsWith('mongodb+srv://')) {
    const mongoDnsServers = getMongoDnsServers()
    if (mongoDnsServers.length) {
      dns.setServers(mongoDnsServers)
      console.log(`🌐 Configured MongoDB DNS Servers: ${mongoDnsServers.join(', ')}`)
    }
  }

  console.log(`🔌 Initializing MongoDB Atlas connection...`)
  console.log(`📡 URI detected: ${mongoUri.replace(/:([^@]+)@/, ':****@')}`)

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    })

    const host = conn.connection.host
    const dbName = conn.connection.name
    const readyState = conn.connection.readyState

    console.log('==================================================')
    console.log('✅ MONGODB ATLAS CONNECTED SUCCESSFULLY')
    console.log(`📌 Database Name: ${dbName}`)
    console.log(`🖥️ Host:          ${host}`)
    console.log(`⚡ Ready State:   ${readyState} (1 = Connected)`)
    console.log(`⚙️ Environment:   ${process.env.NODE_ENV || 'development'}`)
    console.log('==================================================')

    return conn
  } catch (error) {
    console.error('==================================================')
    console.error('❌ MONGODB ATLAS CONNECTION FAILURE')
    console.error(`💥 Error Name:    ${error.name}`)
    console.error(`💬 Error Message: ${error.message}`)
    console.error('--------------------------------------------------')
    console.error('💡 TROUBLESHOOTING GUIDE:')
    console.error(' 1. IP Whitelist: Go to https://cloud.mongodb.com -> Network Access -> Add IP Address -> "Allow Access From Anywhere (0.0.0.0/0)".')
    console.error(' 2. Credentials: Verify MongoDB Atlas user & password in .env.')
    console.error(' 3. Database Name: Ensure URI ends with /<dbname>?retryWrites=true&w=majority.')
    console.error('==================================================')
    return null
  }
}

export default connectDB
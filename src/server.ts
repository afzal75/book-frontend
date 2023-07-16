
import mongoose from 'mongoose'
import app from './app'
// import config from './config'
// import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'
import config from './config'

// process.on('uncaughtException', error => {
//   errorLogger.error(error)
//   process.exit(1)
// })

let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database connected successfully`)

    server = app.listen(config.port, () => {
        console.log(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(`Failed to connect database`, err)
  }
//   process.on('unhandledRejection', error => {
//     if (server) {
//       server.close(() => {
//         errorLogger.error(error)
//         process.exit(1)
//       })
//     } else {
//       process.exit(1)
//     }
//   })
}

bootstrap()
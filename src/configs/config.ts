import { z } from 'zod'

import 'dotenv/config'

const envValidation = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number({ description: 'minutes after which access tokens expire' }).default(30),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number({ description: 'days after which refresh tokens expire' }).default(30),
  LOG_FOLDER: z.string(),
  LOG_FILE: z.string(),
  LOG_LEVEL: z.string()
})

const envVar = envValidation.parse(process.env)

export default {
  env: envVar.NODE_ENV,
  port: envVar.PORT,
  jwt: {
    secret: envVar.JWT_SECRET,
    accessExpirationMinutes: envVar.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVar.JWT_REFRESH_EXPIRATION_DAYS
  },
  logConfig: {
    logFolder: envVar.LOG_FOLDER,
    logFile: envVar.LOG_FILE,
    logLevel: envVar.LOG_LEVEL
  }
}

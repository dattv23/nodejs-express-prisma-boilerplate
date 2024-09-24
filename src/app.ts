import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import passport from 'passport'
import httpStatus from 'http-status'
import compression from 'compression'

import config from '@configs/config'
import morgan from '@configs/morgan'
import { jwtStrategy } from '@configs/passport'

import xss from '@middlewares/xss'
import { errorConverter, errorHandler } from '@/middlewares/error'
import { authLimiter } from '@middlewares/rateLimiter'

import routes from '@routes/v1'
import ApiError from '@utils/ApiError'

const app = express()

if (config.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/v1/auth', authLimiter)
}

// v1 api routes
app.use('/api/v1', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app

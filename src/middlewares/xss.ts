import xss from 'xss'

import { NextFunction, Request, Response } from 'express'

/**
 * Clean for xss.
 * @param {string|object} data - The value to sanitize
 * @return {string|object} The sanitized value
 */
export const clean = <T>(data: T): T => {
  if (typeof data === 'string') {
    return xss(data) as T
  } else if (typeof data === 'object' && data !== null) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key as keyof T] = clean(value)
      return acc
    }, {} as T)
  }
  return data
}

const middleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body) req.body = clean(req.body)
    if (req.query) req.query = clean(req.query)
    if (req.params) req.params = clean(req.params)
    next()
  }
}

export default middleware

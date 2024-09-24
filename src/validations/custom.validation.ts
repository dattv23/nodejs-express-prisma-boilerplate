import z from 'zod'

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const passwordSchema = z.string().regex(passwordRegex, 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number')

export { passwordSchema }

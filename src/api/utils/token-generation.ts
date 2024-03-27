import 'dotenv/config'
import jwt from 'jsonwebtoken'
import appConfig from '~/config/app.config'
import { User } from '../models/user.model'

export const tokenGenerator = (payload: User): string => {
  const token = jwt.sign({ email: payload.email, password: payload.password }, appConfig.secret_key, {
    expiresIn: '7d',
    algorithm: 'HS256'
  })
  return token
}

export const verifyToken = (token: string): string | jwt.Jwt | jwt.JwtPayload => {
  return jwt.verify(token, appConfig.secret_key)
}

export const otpGenerator = (length: number): string => {
  const numbers = '0123456789'
  return Array.from({ length }, () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join('')
}

export const passwordGenerator = (length: number): string => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('')
}

import jwt from 'jsonwebtoken'
import appConfig from '~/config/app.config'

export const generateAccessToken = (payload: string | Buffer | object) => {
  return jwt.sign(payload, appConfig.secret_key, { expiresIn: '2 minutes' })
}

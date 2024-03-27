import bcrypt from 'bcrypt'

export const hashCode = (data: string | Buffer): string => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashed = bcrypt.hashSync(data, salt)
  return hashed
}

export const verifyCode = (data: string | Buffer, encrypted: string): boolean => {
  const matched = bcrypt.compareSync(data, encrypted)
  return matched
}

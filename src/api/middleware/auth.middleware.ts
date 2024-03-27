import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import appConfig from '~/config/app.config'
import * as userRoleService from '~/services/user-role.service'
import * as userService from '~/services/user.service'
import { UserRole } from '~/type'

export const checkRole = (roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const username = res.locals.jwtPayload.email
    //Get user role from the database
    try {
      const userFound = await userService.getItemBy({ email: username })
      if (!userFound) return res.formatter.notFound({ message: 'User not found!' })
      const userRolesFound = await userRoleService.getItemsBy({ userID: userFound.id })
      if (!userRolesFound) return res.formatter.notFound({ message: 'User not found' })
      if (!userRolesFound.some((userRole) => roles.includes(userRole.role.role as UserRole)))
        return res.formatter.unauthorized({})
    } catch (error) {
      return res.formatter.unauthorized({ message: `${error}` })
    }

    next()
  }
}

export const isAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const accessTokenFromHeaders = String(req.headers.authorization)
  let jwtPayload
  // const jwtVerified = verifyToken(accessTokenFromHeaders)
  // if (!jwtVerified) res.formatter.unauthorized({ message: '123' })

  try {
    // const userFound = await userService.getItemBy({ accessToken: accessTokenFromHeaders })
    if (!accessTokenFromHeaders) return res.formatter.unauthorized({})
    jwtPayload = <any>jwt.verify(accessTokenFromHeaders, appConfig.secret_key)
    res.locals.jwtPayload = jwtPayload
  } catch (error: any) {
    return res.formatter.unauthorized({})
  }

  const { email, password } = jwtPayload

  try {
    const userFound = await userService.getItemBy({ email: email, password: password })
    if (!userFound) return res.formatter.notFound({ message: 'User not found!' })
  } catch (error) {
    return res.formatter.unauthorized({ message: `${error}` })
  }
  next()
}

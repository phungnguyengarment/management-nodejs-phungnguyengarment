import { Router } from 'express'
import { check } from 'express-validator'
import { validationRules } from '~/api/middleware/request-validator'
import { validators } from '~/api/utils/constant'
import AuthController from '~/controllers/auth/auth.controller'

class AuthRoute {
  router = Router()
  controller = new AuthController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Login chanel
    this.router.post(
      '/login',
      check('username')
        .exists()
        .withMessage(validators.username_IS_EMPTY)
        .isString()
        .withMessage(validators.username_IS_IN_WRONG_FORMAT),
      check('password')
        .exists()
        .withMessage(validators.PASSWORD_IS_EMPTY)
        .isLength({ min: 8 })
        .withMessage(validators.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
      this.controller.login
    )

    this.router.post(
      '/send-email/:email',
      validationRules([{ field: 'email', fieldType: 'string', location: 'params' }]),
      this.controller.sendEmailOTPCode
    )

    this.router.post(
      '/verify-otp/:email',
      validationRules([
        { field: 'email', fieldType: 'string', location: 'params' },
        { field: 'otp', fieldType: 'string', location: 'body' }
      ]),
      this.controller.verifyOTP
    )
  }
}

export default new AuthRoute().router

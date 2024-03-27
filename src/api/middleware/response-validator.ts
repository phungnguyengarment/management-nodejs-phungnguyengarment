import { NextFunction, Request, Response } from 'express'
import { ValidationChain, body, cookie, header, param, query, validationResult } from 'express-validator'

export const requestValidationRules = (validationRules: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Áp dụng các quy tắc xác nhận cho từng trường
    await Promise.all(validationRules.map((rule) => rule.run(req)))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Error validate request',
        data: null,
        meta: {
          errors: errors.array()
        }
      })
    }

    next()
  }
}

export const requestValidationFields = (
  fields: string[],
  type: typeof body | typeof cookie | typeof header | typeof param | typeof query = body
) => {
  const validationRules = fields.map((field) => type(field).notEmpty().withMessage(`${field} không được để trống`))
  return async (req: Request, res: Response, next: NextFunction) => {
    // Áp dụng các quy tắc xác nhận cho từng trường
    await Promise.all(validationRules.map((rule) => rule.run(req)))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Error validate request',
        data: null,
        meta: {
          errors: errors.array()
        }
      })
    }

    next()
  }
}

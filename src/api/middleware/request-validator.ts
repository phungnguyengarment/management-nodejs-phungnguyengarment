import { NextFunction, Request, Response } from 'express'
import { Location, ValidationChain, body, cookie, header, param, query, validationResult } from 'express-validator'
import { validators } from '../utils/constant'

type RuleType = {
  location: Location
  field: string
  fieldType: 'string' | 'int' | 'float' | 'date' | 'boolean' | 'object' | 'array'
  required?: boolean
}

export const validationRules = (rules: RuleType[]) => {
  const smartRenderValidationChain = (rule: RuleType): ValidationChain => {
    switch (rule.location) {
      case 'body':
        return customValidators(rule, body(rule.field))
      case 'cookies':
        return customValidators(rule, cookie(rule.field))
      case 'headers':
        return customValidators(rule, header(rule.field))
      case 'params':
        return customValidators(rule, param(rule.field))
      default:
        return customValidators(rule, query(rule.field))
    }
  }

  const customValidators = (rule: RuleType, validationChain: ValidationChain): ValidationChain => {
    switch (rule.fieldType) {
      case 'string':
        return validationChain
          .exists()
          .withMessage(validators.ROLE_DOES_NOT_EXIST)
          .notEmpty()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE)
      case 'int':
        return validationChain
          .exists()
          .withMessage(validators.ROLE_DOES_NOT_EXIST)
          .notEmpty()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isInt()
          .withMessage(validators.ROLE_MUST_BE_INTEGER_TYPE)
      case 'float':
        return validationChain
          .exists()
          .withMessage(validators.ROLE_DOES_NOT_EXIST)
          .notEmpty()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isFloat()
          .withMessage(validators.ROLE_MUST_BE_FLOAT_TYPE)
      case 'boolean':
        return validationChain
          .exists()
          .withMessage(validators.ROLE_DOES_NOT_EXIST)
          .notEmpty()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_STRING_TYPE)
      case 'date':
        return validationChain
          .exists()
          .withMessage(validators.ROLE_DOES_NOT_EXIST)
          .notEmpty()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isString()
          .withMessage(validators.ROLE_MUST_BE_DATE_TYPE)
      case 'array':
        return validationChain
          .exists()
          .withMessage(validators.ROLE_DOES_NOT_EXIST)
          .notEmpty()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isArray()
          .withMessage(validators.ROLE_MUST_BE_ARRAY_TYPE)
      default:
        return validationChain
          .exists()
          .withMessage(validators.ROLE_DOES_NOT_EXIST)
          .notEmpty()
          .withMessage(validators.ROLE_IS_EMPTY)
          .isObject()
          .withMessage(validators.ROLE_MUST_BE_OBJECT_TYPE)
    }
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    // Áp dụng các quy tắc xác nhận cho từng trường
    await Promise.all(rules.map((rule) => smartRenderValidationChain(rule).run(req)))

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

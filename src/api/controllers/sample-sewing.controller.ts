import { Request, Response } from 'express'
import { SampleSewing } from '~/models/sample-sewing.model'
import * as service from '~/services/sample-sewing.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const NAMESPACE = 'controllers/sample-sewing'

export default class SewingLineController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: SampleSewing = {
      productID: req.body.productID,
      dateSubmissionNPL: req.body.dateSubmissionNPL,
      dateApprovalPP: req.body.dateApprovalPP,
      dateApprovalSO: req.body.dateApprovalSO,
      dateSubmissionFirstTime: req.body.dateSubmissionFirstTime,
      dateSubmissionSecondTime: req.body.dateSubmissionSecondTime,
      dateSubmissionThirdTime: req.body.dateSubmissionThirdTime,
      dateSubmissionForthTime: req.body.dateSubmissionForthTime,
      dateSubmissionFifthTime: req.body.dateSubmissionFifthTime,
      status: req.body.status ?? 'active'
    }
    try {
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.getItemByPk(id)
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const item = await service.getItemBy({ productID: productID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItems = async (req: Request, res: Response) => {
    try {
      const bodyRequest: RequestBodyType = {
        ...req.body
      }
      const items = await service.getItems(bodyRequest)
      const total = await service.getItemsWithStatus(bodyRequest.filter.status)
      return res.formatter.ok({
        data: items.rows,
        length: items.rows.length,
        page: Number(bodyRequest.paginator.page),
        pageSize: Number(bodyRequest.paginator.pageSize),
        total: bodyRequest.search.term.length > 0 ? items.count : total.length,
        message: message.SUCCESS
      })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const itemRequest: SampleSewing = {
      productID: req.body.productID,
      dateSubmissionNPL: req.body.dateSubmissionNPL,
      dateApprovalPP: req.body.dateApprovalPP,
      dateApprovalSO: req.body.dateApprovalSO,
      dateSubmissionFirstTime: req.body.dateSubmissionFirstTime,
      dateSubmissionSecondTime: req.body.dateSubmissionSecondTime,
      dateSubmissionThirdTime: req.body.dateSubmissionThirdTime,
      dateSubmissionForthTime: req.body.dateSubmissionForthTime,
      dateSubmissionFifthTime: req.body.dateSubmissionFifthTime,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    const itemRequest: SampleSewing = {
      dateSubmissionNPL: req.body.dateSubmissionNPL,
      dateApprovalPP: req.body.dateApprovalPP,
      dateApprovalSO: req.body.dateApprovalSO,
      dateSubmissionFirstTime: req.body.dateSubmissionFirstTime,
      dateSubmissionSecondTime: req.body.dateSubmissionSecondTime,
      dateSubmissionThirdTime: req.body.dateSubmissionThirdTime,
      dateSubmissionForthTime: req.body.dateSubmissionForthTime,
      dateSubmissionFifthTime: req.body.dateSubmissionFifthTime,
      status: req.body.status
    }
    try {
      const itemUpdated = await service.updateItemByProductID(productID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated })
      }
      return res.formatter.badRequest({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.deleteItemByPk(id)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByProductID = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const item = await service.deleteItemByPk(id)
      if (item) {
        return res.formatter.ok({ message: `${NAMESPACE} has been deleted` })
      }
      return res.formatter.notFound({})
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}

import { Request, Response } from 'express'
import { Completion } from '~/models/completion.model'
import * as service from '~/services/completion.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const NAMESPACE = 'controllers/completion'

export default class CompletionController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    const itemRequest: Completion = {
      productID: req.body.productID,
      quantityIroned: req.body.quantityIroned,
      quantityCheckPassed: req.body.quantityCheckPassed,
      quantityPackaged: req.body.quantityPackaged,
      exportedDate: req.body.exportedDate,
      passFIDate: req.body.passFIDate,
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

  createOrUpdateItemByPk = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const dataRequest: Completion = {
        productID: req.body.productID,
        quantityIroned: req.body.quantityIroned,
        quantityCheckPassed: req.body.quantityCheckPassed,
        quantityPackaged: req.body.quantityPackaged,
        exportedDate: req.body.exportedDate,
        passFIDate: req.body.passFIDate,
        status: req.body.status ?? 'active'
      }
      const getItem = await service.getItemByPk(id)
      if (getItem) {
        const itemUpdated = await service.updateItemByPk(id!, { ...dataRequest })
        if (itemUpdated) {
          return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
        } else {
          return res.formatter.badRequest({ message: message.UPDATE_FAILED })
        }
      } else {
        const itemCreated = await service.createNewItem({ ...dataRequest })
        if (itemCreated) {
          return res.formatter.created({ data: itemCreated, message: message.CREATED })
        } else {
          return res.formatter.badRequest({ message: message.CREATION_FAILED })
        }
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByPk = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const item = await service.getItemByPk(id)
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByProductID = async (req: Request, res: Response) => {
    try {
      const productID = Number(req.params.productID)
      const item = await service.getItemBy({ productID: productID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
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
        length: items.count,
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
    const itemRequest: Completion = {
      productID: req.body.productID,
      quantityIroned: req.body.quantityIroned,
      quantityCheckPassed: req.body.quantityCheckPassed,
      quantityPackaged: req.body.quantityPackaged,
      exportedDate: req.body.exportedDate,
      passFIDate: req.body.passFIDate,
      status: req.body.status ?? 'active'
    }
    try {
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    const itemRequest: Completion = {
      productID: req.body.productID,
      quantityIroned: req.body.quantityIroned,
      quantityCheckPassed: req.body.quantityCheckPassed,
      quantityPackaged: req.body.quantityPackaged,
      exportedDate: req.body.exportedDate,
      passFIDate: req.body.passFIDate,
      status: req.body.status ?? 'active'
    }
    try {
      const itemUpdated = await service.updateItemByProductID(productID, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const itemDeleted = await service.deleteItemBy({ field: 'id', id: id })
      if (itemDeleted) {
        return res.formatter.ok({ data: itemDeleted, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByProductID = async (req: Request, res: Response) => {
    const productID = Number(req.params.productID)
    try {
      const itemDeleted = await service.deleteItemBy({ field: 'productID', id: productID })
      if (itemDeleted) {
        return res.formatter.ok({ data: itemDeleted, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}

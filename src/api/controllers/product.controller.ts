import { Request, Response } from 'express'
import { Product } from '~/models/product.model'
import * as service from '~/services/product.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const NAMESPACE = 'controllers/product'

class ProductController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    try {
      const dataRequest: Product = {
        productCode: req.body.productCode,
        quantityPO: req.body.quantityPO,
        status: req.body.status ?? 'active',
        dateInputNPL: req.body.dateInputNPL,
        dateOutputFCR: req.body.dateOutputFCR
      }
      const newProd = await service.createNewItem(dataRequest)
      if (newProd) {
        return res.formatter.created({ data: newProd, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  createOrUpdateItemByPk = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const dataRequest: Product = {
        productCode: req.body.productCode,
        quantityPO: req.body.quantityPO,
        status: req.body.status ?? 'active',
        dateInputNPL: req.body.dateInputNPL,
        dateOutputFCR: req.body.dateOutputFCR
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
        return res.formatter.ok({
          data: {
            ...item.dataValues,
            progress: {
              sewing: 1500,
              iron: 1000,
              check: 500,
              pack: 200
            }
          },
          message: message.SUCCESS
        })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByProductCode = async (req: Request, res: Response) => {
    try {
      const productCode = String(req.params.productCode)
      const item = await service.getItemBy({ productCode: productCode })

      if (item) {
        return res.formatter.ok({
          data: {
            ...item.dataValues,
            progress: {
              sewing: 1500,
              iron: 1000,
              check: 500,
              pack: 200
            }
          },
          message: message.SUCCESS
        })
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
    try {
      const id = Number(req.params.id)
      const itemRequest: Product = {
        productCode: req.body.productCode,
        quantityPO: req.body.quantityPO,
        status: req.body.status ?? 'active',
        dateInputNPL: req.body.dateInputNPL,
        dateOutputFCR: req.body.dateOutputFCR
      }
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
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
      const item = await service.deleteItemByPk(id)
      if (item) {
        return res.formatter.ok({ message: message.DELETED })
      }
      return res.formatter.notFound({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}

export default ProductController

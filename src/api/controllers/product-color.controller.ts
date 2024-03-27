import { Request, Response } from 'express'
import { ProductColor } from '~/models/product-color.model'
import * as service from '~/services/product-color.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const NAMESPACE = 'controllers/product-color'

export default class ProductColorController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    try {
      const itemRequest: ProductColor = {
        colorID: req.body.colorID,
        productID: req.body.productID,
        status: req.body.status ?? 'active'
      }
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
    try {
      const id = Number(req.params.id)
      const item = await service.getItemByPk(id)
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      } else {
        return res.formatter.badRequest({ message: message.FAILED })
      }
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
      } else {
        return res.formatter.badRequest({ message: message.FAILED })
      }
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  getItemByColorID = async (req: Request, res: Response) => {
    try {
      const colorID = Number(req.params.colorID)
      const item = await service.getItemBy({ colorID: colorID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      } else {
        return res.formatter.badRequest({ message: message.FAILED })
      }
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
      const itemRequest: ProductColor = {
        colorID: req.body.colorID,
        productID: req.body.productID,
        status: req.body.status ?? 'active'
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

  updateItemByProductID = async (req: Request, res: Response) => {
    try {
      const productID = Number(req.params.productID)
      const itemRequest: ProductColor = {
        colorID: req.body.colorID,
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemBy({ field: 'productID', id: productID }, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  updateItemByColorID = async (req: Request, res: Response) => {
    try {
      const colorID = Number(req.params.colorID)
      const itemRequest: ProductColor = {
        productID: req.body.productID,
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemBy({ field: 'colorID', id: colorID }, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    }
  }

  createOrUpdateItemByPk = async (req: Request, res: Response) => {
    try {
      const itemRequest: ProductColor = {
        id: Number(req.params.id),
        productID: req.body.productID,
        colorID: req.body.colorID,
        status: req.body.status ?? 'active'
      }
      const itemFound = await service.getItemByPk(itemRequest.id!)
      if (itemFound) {
        const itemUpdated = await service.createOrUpdateItemByPk(itemRequest.id!, itemRequest)
        if (itemUpdated) {
          return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
        } else {
          return res.formatter.badRequest({ message: message.UPDATE_FAILED })
        }
      } else {
        const itemCreated = await service.createNewItem(itemRequest)
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

  createOrUpdateItemByProductID = async (req: Request, res: Response) => {
    try {
      const itemRequest: ProductColor = {
        productID: Number(req.params.productID),
        colorID: req.body.colorID,
        status: req.body.status ?? 'active'
      }
      const itemFound = await service.getItemBy({ productID: itemRequest.productID })
      if (itemFound) {
        const itemUpdated = await service.createOrUpdateItemBy(
          { field: 'productID', id: itemRequest.productID! },
          itemRequest
        )
        if (itemUpdated) {
          return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
        } else {
          return res.formatter.badRequest({ message: message.UPDATE_FAILED })
        }
      } else {
        const itemCreated = await service.createNewItem(itemRequest)
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

  createOrUpdateItemByColorID = async (req: Request, res: Response) => {
    try {
      const itemRequest: ProductColor = {
        colorID: Number(req.params.colorID),
        productID: req.body.productID,
        status: req.body.status ?? 'active'
      }
      const itemFound = await service.getItemBy({ colorID: itemRequest.colorID })
      if (itemFound) {
        const itemUpdated = await service.createOrUpdateItemBy(
          { field: 'colorID', id: itemRequest.colorID! },
          itemRequest
        )
        if (itemUpdated) {
          return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
        } else {
          return res.formatter.badRequest({ message: message.UPDATE_FAILED })
        }
      } else {
        const itemCreated = await service.createNewItem(itemRequest)
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

  deleteItemByPk = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
      const itemUpdated = await service.deleteItemByPk(id)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByProductID = async (req: Request, res: Response) => {
    try {
      const productID = Number(req.params.productID)
      const itemUpdated = await service.deleteItemBy({ field: 'productID', id: productID })
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }

  deleteItemByColorID = async (req: Request, res: Response) => {
    try {
      const colorID = Number(req.params.colorID)
      const itemUpdated = await service.deleteItemBy({ field: 'colorID', id: colorID })
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error) {
      return res.formatter.badRequest({ message: `${error}` })
    }
  }
}

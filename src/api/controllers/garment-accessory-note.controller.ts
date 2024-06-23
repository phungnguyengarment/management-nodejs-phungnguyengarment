import { Request, Response } from 'express'
import { GarmentAccessoryNote } from '~/models/garment-accessory-note.model'
import * as service from '~/services/garment-accessory-note.service'
import { RequestBodyType } from '~/type'
import { message } from '../utils/constant'

const NAMESPACE = 'controllers/garment-accessory-note'

export default class GarmentAccessoryNoteController {
  constructor() {}

  createNewItem = async (req: Request, res: Response) => {
    try {
      const itemRequest: GarmentAccessoryNote = {
        productID: req.body.productID,
        accessoryNoteID: req.body.accessoryNoteID,
        garmentAccessoryID: req.body.garmentAccessoryID,
        noteStatus: req.body.noteStatus ?? 'enough',
        status: req.body.status ?? 'active'
      }
      const itemNew = await service.createNewItem(itemRequest)

      if (itemNew) {
        return res.formatter.created({ data: itemNew, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  createNewItems = async (req: Request, res: Response) => {
    try {
      const itemRequest: GarmentAccessoryNote[] = req.body
      const itemNew = await service.createNewItems(itemRequest)
      if (itemNew) {
        return res.formatter.created({ data: itemNew, message: message.CREATED })
      }
      return res.formatter.badRequest({ message: message.CREATION_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  createOrUpdateItemByPk = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const dataRequest: GarmentAccessoryNote = {
        productID: req.body.productID,
        accessoryNoteID: req.body.accessoryNoteID,
        garmentAccessoryID: req.body.garmentAccessoryID,
        noteStatus: req.body.noteStatus ?? 'enough',
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
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  createOrUpdateItemByProductID = async (req: Request, res: Response) => {
    try {
      const productID = Number(req.params.productID)
      const dataRequest: GarmentAccessoryNote = {
        productID: productID,
        accessoryNoteID: req.body.accessoryNoteID,
        garmentAccessoryID: req.body.garmentAccessoryID,
        noteStatus: req.body.noteStatus ?? 'enough',
        status: req.body.status ?? 'active'
      }
      const getItem = await service.getItemBy({ field: 'productID', id: productID })
      if (getItem) {
        const itemUpdated = await service.updateItemBy({ field: 'productID', id: productID }, { ...dataRequest })
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
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
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
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  getItemByProductID = async (req: Request, res: Response) => {
    try {
      const productID = Number(req.params.productID)
      const item = await service.getItemBy({ field: 'productID', id: productID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  getItemByAccessoryNoteID = async (req: Request, res: Response) => {
    try {
      const accessoryNoteID = Number(req.params.accessoryNoteID)
      const item = await service.getItemBy({ field: 'accessoryNoteID', id: accessoryNoteID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  getItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    const garmentAccessoryID = Number(req.params.garmentAccessoryID)
    try {
      const item = await service.getItemBy({ field: 'garmentAccessoryID', id: garmentAccessoryID })
      if (item) {
        return res.formatter.ok({ data: item, message: message.SUCCESS })
      }
      return res.formatter.notFound({ message: message.NOT_FOUND })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
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
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  updateItemsByProductID = async (req: Request, res: Response) => {
    try {
      const productID = Number(req.params.productID)
      const garmentAccessoryNotes: GarmentAccessoryNote[] = req.body.garmentAccessoryNotes
      const itemRequest: GarmentAccessoryNote[] = garmentAccessoryNotes.map((garmentAccessoryNote) => {
        return { ...garmentAccessoryNote, status: 'active', noteStatus: 'enough' }
      })
      // return res.formatter.ok({ data: itemRequest, message: message.UPDATED })
      const itemUpdated = await service.updateItemsBy({ field: 'productID', id: productID }, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  updateItemByPk = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const itemRequest: GarmentAccessoryNote = {
        productID: req.body.productID,
        accessoryNoteID: req.body.accessoryNoteID,
        garmentAccessoryID: req.body.garmentAccessoryID,
        noteStatus: req.body.noteStatus ?? 'enough',
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemByPk(id, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  updateItemByProductID = async (req: Request, res: Response) => {
    try {
      const productID = Number(req.params.productID)
      const itemRequest: GarmentAccessoryNote = {
        productID: req.body.productID,
        garmentAccessoryID: req.body.garmentAccessoryID,
        noteStatus: req.body.noteStatus ?? 'enough',
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemBy({ field: 'productID', id: productID }, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  updateItemByAccessoryNoteID = async (req: Request, res: Response) => {
    try {
      const accessoryNoteID = Number(req.params.accessoryNoteID)
      const itemRequest: GarmentAccessoryNote = {
        productID: req.body.productID,
        garmentAccessoryID: req.body.garmentAccessoryID,
        noteStatus: req.body.noteStatus ?? 'enough',
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemBy({ field: 'accessoryNoteID', id: accessoryNoteID }, itemRequest)
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  updateItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    try {
      const garmentAccessoryID = Number(req.params.garmentAccessoryID)
      const itemRequest: GarmentAccessoryNote = {
        productID: req.body.productID,
        accessoryNoteID: req.body.accessoryNoteID,
        noteStatus: req.body.noteStatus ?? 'enough',
        status: req.body.status ?? 'active'
      }
      const itemUpdated = await service.updateItemBy(
        { field: 'garmentAccessoryID', id: garmentAccessoryID },
        itemRequest
      )
      if (itemUpdated) {
        return res.formatter.ok({ data: itemUpdated, message: message.UPDATED })
      }
      return res.formatter.badRequest({ message: message.UPDATE_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
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
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
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
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  deleteItemByAccessoryNoteID = async (req: Request, res: Response) => {
    const accessoryNoteID = Number(req.params.accessoryNoteID)
    try {
      const itemDeleted = await service.deleteItemBy({ field: 'accessoryNoteID', id: accessoryNoteID })
      if (itemDeleted) {
        return res.formatter.ok({ data: itemDeleted, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }

  deleteItemByGarmentAccessoryID = async (req: Request, res: Response) => {
    const garmentAccessoryID = Number(req.params.garmentAccessoryID)
    try {
      const itemDeleted = await service.deleteItemBy({ field: 'garmentAccessoryID', id: garmentAccessoryID })
      if (itemDeleted) {
        return res.formatter.ok({ data: itemDeleted, message: message.DELETED })
      }
      return res.formatter.badRequest({ message: message.DELETE_FAILED })
    } catch (error: any) {
      return res.formatter.badRequest({ message: `${error.message}` })
    }
  }
}

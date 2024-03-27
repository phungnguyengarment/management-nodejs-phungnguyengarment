import { Router } from 'express'
import GarmentAccessoryNoteController from '~/controllers/garment-accessory-note.controller'
import { validationRules } from '../middleware/request-validator'

class GarmentAccessoryNoteRoute {
  router = Router()
  controller = new GarmentAccessoryNoteController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'accessoryNoteID', fieldType: 'int', location: 'body' },
        { field: 'garmentAccessoryID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    this.router.post('/items', this.controller.createNewItems)

    this.router.post(
      '/createOrUpdate/:id',
      validationRules([
        { field: 'id', fieldType: 'int', location: 'params' },
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'accessoryNoteID', fieldType: 'int', location: 'body' },
        { field: 'garmentAccessoryID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByPk
    )

    this.router.post(
      '/createOrUpdate/productID/:productID',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'params' },
        { field: 'accessoryNoteID', fieldType: 'int', location: 'body' },
        { field: 'garmentAccessoryID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByProductID
    )

    this.router.post(
      '/updateItems/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemsByProductID
    )

    // Get item
    this.router.get(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByPk
    )

    this.router.get(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByProductID
    )

    this.router.get(
      '/accessoryNoteID/:accessoryNoteID',
      validationRules([{ field: 'accessoryNoteID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByAccessoryNoteID
    )

    this.router.get(
      '/garmentAccessoryID/:garmentAccessoryID',
      validationRules([{ field: 'garmentAccessoryID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByGarmentAccessoryID
    )

    // Get items
    this.router.post(
      '/find',
      validationRules([
        { field: 'filter', fieldType: 'object', location: 'body' },
        { field: 'paginator', fieldType: 'object', location: 'body' },
        { field: 'search', fieldType: 'object', location: 'body' },
        { field: 'sorting', fieldType: 'object', location: 'body' }
      ]),
      this.controller.getItems
    )

    // Update item by id
    this.router.put(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByPk
    )

    this.router.put(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByProductID
    )

    this.router.put(
      '/accessoryNoteID/:accessoryNoteID',
      validationRules([{ field: 'accessoryNoteID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByAccessoryNoteID
    )

    this.router.put(
      '/garmentAccessoryID/:garmentAccessoryID',
      validationRules([{ field: 'garmentAccessoryID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByGarmentAccessoryID
    )

    this.router.post(
      '/updateItems/productID/:productID',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'params' },
        { field: 'garmentAccessoryNotes', fieldType: 'array', location: 'body' }
      ]),
      this.controller.updateItemsByProductID
    )

    // Delete item
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByPk
    )

    this.router.delete(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByProductID
    )

    this.router.delete(
      '/accessoryNoteID/:accessoryNoteID',
      validationRules([{ field: 'accessoryNoteID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByAccessoryNoteID
    )

    this.router.delete(
      '/garmentAccessoryID/:garmentAccessoryID',
      validationRules([{ field: 'garmentAccessoryID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByGarmentAccessoryID
    )
  }
}

export default new GarmentAccessoryNoteRoute().router

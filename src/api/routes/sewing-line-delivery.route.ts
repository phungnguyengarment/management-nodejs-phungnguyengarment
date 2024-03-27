import { Router } from 'express'
import SewingLineDeliveryController from '../controllers/sewing-line-delivery.controller'
import { validationRules } from '../middleware/request-validator'

class SewingLineDeliveryRoute {
  router = Router()
  controller = new SewingLineDeliveryController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([
        { field: 'sewingLineID', fieldType: 'int', location: 'body' },
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'quantityOriginal', fieldType: 'float', location: 'body' },
        { field: 'expiredDate', fieldType: 'date', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    this.router.post('/items', this.controller.createNewItems)

    // Get item
    this.router.get(
      '/id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByPk
    )

    // Get item
    this.router.get(
      '/sewingLineID/:sewingLineID',
      validationRules([{ field: 'sewingLineID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemBySewingLineID
    )

    // Get item
    this.router.get(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByProductID
    )

    // Get all items
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

    this.router.post(
      '/updateItems/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemsByProductID
    )

    // Update item by productID and importedID
    this.router.put(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByPk
    )

    // Update item by productID and importedID
    this.router.post(
      '/sewingLineID/:sewingLineID',
      validationRules([{ field: 'sewingLineID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemBySewingLineID
    )

    // Update item by productID and importedID
    this.router.put(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByProductID
    )

    // Delete item by productID
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByPk
    )

    this.router.delete(
      '/sewingLineID/:sewingLineID',
      validationRules([{ field: 'sewingLineID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemBySewingLineID
    )

    this.router.delete(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByProductID
    )
  }
}

export default new SewingLineDeliveryRoute().router

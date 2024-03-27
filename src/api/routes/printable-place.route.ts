import { Router } from 'express'
import PrintablePlaceController from '~/controllers/printable-place.controller'
import { validationRules } from '../middleware/request-validator'

class PrintablePlaceRoute {
  router = Router()
  controller = new PrintablePlaceController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'printID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    // Get item
    this.router.get(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByPk
    )

    // Get item
    this.router.get(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByProductID
    )

    // Get item
    this.router.get(
      '/printID/:printID',
      validationRules([{ field: 'printID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByPrintID
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

    // Update item by productID and importedID
    this.router.put(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByPk
    )

    // Update item by productID and importedID
    this.router.put(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByProductID
    )

    this.router.put(
      '/printID/:printID',
      validationRules([{ field: 'printID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByPrintID
    )

    this.router.post(
      '/createOrUpdate/:id',
      validationRules([
        { field: 'id', fieldType: 'int', location: 'params' },
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'printID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByPk
    )

    this.router.post(
      '/createOrUpdate/productID/:productID',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'params' },
        { field: 'printID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByProductID
    )

    this.router.post(
      '/createOrUpdate/printID/:printID',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'params' },
        { field: 'printID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByPrintID
    )

    // Delete item by productID
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByPk
    )
  }
}

export default new PrintablePlaceRoute().router

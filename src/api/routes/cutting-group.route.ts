import { Router } from 'express'
import CuttingGroupController from '~/controllers/cutting-group.controller'
import { validationRules } from '../middleware/request-validator'

class CuttingGroupRoute {
  router = Router()
  controller = new CuttingGroupController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'body' }
        // { field: 'quantityRealCut', fieldType: 'float', location: 'body' },
        // { field: 'timeCut', fieldType: 'date', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    this.router.post(
      '/createOrUpdate/:id',
      validationRules([
        { field: 'id', fieldType: 'int', location: 'params' },
        { field: 'quantityRealCut', fieldType: 'float', location: 'body' },
        { field: 'timeCut', fieldType: 'date', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    this.router.post(
      '/createOrUpdate/productID/:productID',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'params' },
        { field: 'quantityRealCut', fieldType: 'float', location: 'body' },
        { field: 'timeCut', fieldType: 'date', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    // Get item by productID and importedID
    this.router.get(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByPk
    )

    this.router.get(
      '/productID/:id',
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

    // Delete item by productID
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByPk
    )
  }
}

export default new CuttingGroupRoute().router

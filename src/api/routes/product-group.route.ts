import { Router } from 'express'
import ProductGroupController from '~/controllers/product-group.controller'
import { validationRules } from '../middleware/request-validator'

class ProductGroupRoute {
  router = Router()
  controller = new ProductGroupController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'groupID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    this.router.post(
      '/createOrUpdate/:id',
      validationRules([
        { field: 'id', fieldType: 'int', location: 'params' },
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'groupID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByPk
    )

    this.router.post(
      '/createOrUpdate/productID/:productID',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'params' },
        { field: 'groupID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByProductID
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
      '/groupID/:groupID',
      validationRules([{ field: 'groupID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByGroupID
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

    this.router.put(
      '/productID/:productID',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByProductID
    )

    this.router.put(
      '/groupID/:groupID',
      validationRules([{ field: 'groupID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByGroupID
    )

    // Delete item by productID
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
      '/groupID/:groupID',
      validationRules([{ field: 'groupID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByGroupID
    )
  }
}

export default new ProductGroupRoute().router

import { Router } from 'express'
import ProductColorController from '~/controllers/product-color.controller'
import { validationRules } from '../middleware/request-validator'

class ProductColorRoute {
  router = Router()
  controller = new ProductColorController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'colorID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createNewItem
    )

    this.router.post(
      '/createOrUpdate/:id',
      validationRules([
        { field: 'id', fieldType: 'int', location: 'params' },
        { field: 'productID', fieldType: 'int', location: 'body' },
        { field: 'colorID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByPk
    )

    this.router.post(
      '/createOrUpdate/productID/:productID',
      validationRules([
        { field: 'productID', fieldType: 'int', location: 'params' },
        { field: 'colorID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByProductID
    )

    this.router.post(
      '/createOrUpdate/colorID/:colorID',
      validationRules([
        { field: 'colorID', fieldType: 'int', location: 'params' },
        { field: 'productID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByColorID
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
      '/colorID/:colorID',
      validationRules([{ field: 'colorID', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByColorID
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
      '/colorID/:colorID',
      validationRules([{ field: 'colorID', fieldType: 'int', location: 'params' }]),
      this.controller.updateItemByColorID
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
      '/colorID/:colorID',
      validationRules([{ field: 'colorID', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByColorID
    )
  }
}

export default new ProductColorRoute().router

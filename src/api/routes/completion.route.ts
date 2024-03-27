import { Router } from 'express'
import CompletionController from '~/controllers/completion.controller'
import { validationRules } from '../middleware/request-validator'

class Completion {
  router = Router()
  controller = new CompletionController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([{ field: 'productID', fieldType: 'int', location: 'body' }]),
      this.controller.createNewItem
    )

    this.router.post(
      '/createOrUpdate/:id',
      validationRules([
        { field: 'id', fieldType: 'int', location: 'params' },
        { field: 'productID', fieldType: 'int', location: 'body' }
      ]),
      this.controller.createOrUpdateItemByPk
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
  }
}

export default new Completion().router

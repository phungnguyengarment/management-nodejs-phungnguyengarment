import { Router } from 'express'
import UserRoleController from '../controllers/user-role.controller'
import { validationRules } from '../middleware/request-validator'

class UserRoleRoute {
  router = Router()
  controller = new UserRoleController()

  constructor() {
    this.initialize()
  }

  private initialize() {
    // Create new item
    this.router.post(
      '/',
      validationRules([{ field: 'name', fieldType: 'string', location: 'body' }]),
      this.controller.createNewItem
    )

    this.router.post('/items', this.controller.createNewItems)

    // Get item
    this.router.get(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.getItemByPk
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

    this.router.post(
      '/updateItems/userID/:userID',
      validationRules([
        { field: 'userID', fieldType: 'int', location: 'params' },
        { field: 'roleIDs', fieldType: 'array', location: 'body' }
      ]),
      this.controller.updateItemsByUserID
    )

    // Delete item by productID
    this.router.delete(
      '/:id',
      validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
      this.controller.deleteItemByPk
    )
  }
}

export default new UserRoleRoute().router

import { Router } from 'express'
import * as controller from '~/controllers/product.controller'
import { validationRules } from '../middleware/request-validator'

const router = Router()

router.post(
  '/',
  validationRules([
    { field: 'productCode', fieldType: 'string', location: 'body' },
    { field: 'quantityPO', fieldType: 'int', location: 'body' },
    { field: 'dateInputNPL', fieldType: 'date', location: 'body' },
    { field: 'dateOutputFCR', fieldType: 'date', location: 'body' }
  ]),
  controller.createNewItem
)

// Get item by productID and importedID
router.get('/:id', validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]), controller.getItemByPk)
router.get(
  '/productCode/:productCode',
  validationRules([{ field: 'productCode', fieldType: 'string', location: 'params' }]),
  controller.getItemByProductCode
)

// Get all items
router.post(
  '/find',
  validationRules([
    { field: 'filter', fieldType: 'object', location: 'body' },
    { field: 'paginator', fieldType: 'object', location: 'body' },
    { field: 'search', fieldType: 'object', location: 'body' },
    { field: 'sorting', fieldType: 'object', location: 'body' }
  ]),
  controller.getItems
)

router.put('/', controller.updateItems)

// Update item by productID and importedID
router.patch(
  '/:id',
  validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
  controller.updateItemByPk
)

// Delete item by productID
router.delete(
  '/:id',
  validationRules([{ field: 'id', fieldType: 'int', location: 'params' }]),
  controller.deleteItemByPk
)

export default router

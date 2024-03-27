import { Application } from 'express'
import productRoute from '~/routes/product.route'
import { isAuthentication } from '../middleware/auth.middleware'
import accessoryNoteRoute from './accessory-note.route'
import authRoute from './auth/auth.route'
import colorRoute from './color.route'
import completionRoute from './completion.route'
import cuttingGroupRoute from './cutting-group.route'
import garmentAccessoryNoteRoute from './garment-accessory-note.route'
import garmentAccessoryRoute from './garment-accessory.route'
import groupRoute from './group.route'
import importationRoute from './importation.route'
import printRoute from './print.route'
import printablePlaceRoute from './printable-place.route'
import productColorRoute from './product-color.route'
import productGroupRoute from './product-group.route'
import roleRoute from './role.route'
import sampleSewingRoute from './sample-sewing.route'
import sewingLineDeliveryRoute from './sewing-line-delivery.route'
import sewingLineRoute from './sewing-line.route'
import userRoleRoute from './user-role.route'
import userRoute from './user.route'

export default class AppRoutes {
  constructor(app: Application) {
    app.use('/api/users/auth', authRoute)
    app.use('/api/users', userRoute)
    app.use('/api/roles', [isAuthentication], roleRoute)
    app.use('/api/user-roles', [isAuthentication], userRoleRoute)
    app.use('/api/colors', [isAuthentication], colorRoute)
    app.use('/api/groups', [isAuthentication], groupRoute)
    app.use('/api/prints', [isAuthentication], printRoute)
    app.use('/api/products', [isAuthentication], productRoute)
    app.use('/api/sample-sewings', [isAuthentication], sampleSewingRoute)
    app.use('/api/sewing-lines', [isAuthentication], sewingLineRoute)
    app.use('/api/importations', [isAuthentication], importationRoute)
    app.use('/api/product-groups', [isAuthentication], productGroupRoute)
    app.use('/api/product-colors', [isAuthentication], productColorRoute)
    app.use('/api/accessory-notes', [isAuthentication], accessoryNoteRoute)
    app.use('/api/printable-places', [isAuthentication], printablePlaceRoute)
    app.use('/api/garment-accessories', [isAuthentication], garmentAccessoryRoute)
    app.use('/api/sewing-line-deliveries', [isAuthentication], sewingLineDeliveryRoute)
    app.use('/api/garment-accessory-notes', [isAuthentication], garmentAccessoryNoteRoute)
    app.use('/api/cutting-groups', [isAuthentication], cuttingGroupRoute)
    app.use('/api/completions', [isAuthentication], completionRoute)
  }
}

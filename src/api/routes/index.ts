import { Router } from 'express'
import productRoute from '~/routes/product.route'
// import { isAuthentication } from '../middleware/auth.middleware'
// import accessoryNoteRoute from './accessory-note.route'
// import authRoute from './auth/auth.route'
// import colorRoute from './color.route'
// import completionRoute from './completion.route'
// import cuttingGroupRoute from './cutting-group.route'
// import garmentAccessoryNoteRoute from './garment-accessory-note.route'
// import garmentAccessoryRoute from './garment-accessory.route'
// import groupRoute from './group.route'
// import importationRoute from './importation.route'
// import printRoute from './print.route'
// import printablePlaceRoute from './printable-place.route'
// import productColorRoute from './product-color.route'
// import productGroupRoute from './product-group.route'
// import roleRoute from './role.route'
// import sampleSewingRoute from './sample-sewing.route'
// import sewingLineDeliveryRoute from './sewing-line-delivery.route'
// import sewingLineRoute from './sewing-line.route'
// import userRoleRoute from './user-role.route'
// import userRoute from './user.route'

const router = Router()

// router.use('/users/auth', authRoute)
// router.use('/users', userRoute)
// router.use('/roles', [isAuthentication], roleRoute)
// router.use('/user-roles', [isAuthentication], userRoleRoute)
// router.use('/colors', [isAuthentication], colorRoute)
// router.use('/groups', [isAuthentication], groupRoute)
// router.use('/prints', [isAuthentication], printRoute)
router.use('/products', productRoute)
// router.use('/sample-sewings', [isAuthentication], sampleSewingRoute)
// router.use('/sewing-lines', [isAuthentication], sewingLineRoute)
// router.use('/importations', [isAuthentication], importationRoute)
// router.use('/product-groups', [isAuthentication], productGroupRoute)
// router.use('/product-colors', [isAuthentication], productColorRoute)
// router.use('/accessory-notes', [isAuthentication], accessoryNoteRoute)
// router.use('/printable-places', [isAuthentication], printablePlaceRoute)
// router.use('/garment-accessories', [isAuthentication], garmentAccessoryRoute)
// router.use('/sewing-line-deliveries', [isAuthentication], sewingLineDeliveryRoute)
// router.use('/garment-accessory-notes', [isAuthentication], garmentAccessoryNoteRoute)
// router.use('/cutting-groups', [isAuthentication], cuttingGroupRoute)
// router.use('/completions', [isAuthentication], completionRoute)

export default router

import { Sequelize } from 'sequelize-typescript'
import databaseConfig from '~/config/database.config'
import logging from '~/utils/logging'
import AccessoryNoteSchema from './accessory-note.model'
import ColorSchema from './color.model'
import CompletionSchema from './completion.model'
import CuttingGroupSchema from './cutting-group.model'
import GarmentAccessoryNoteSchema from './garment-accessory-note.model'
import GarmentAccessorySchema from './garment-accessory.model'
import GroupSchema from './group.model'
import ImportationSchema from './importation.model'
import PrintSchema from './print.model'
import PrintablePlaceSchema from './printable-place.model'
import ProductColorSchema from './product-color.model'
import ProductGroupSchema from './product-group.model'
import ProductSchema from './product.model'
import RoleSchema from './role.model'
import SampleSewingSchema from './sample-sewing.model'
import SewingLineDeliverySchema from './sewing-line-delivery.model'
import SewingLineSchema from './sewing-line.model'
import UserRoleSchema from './user-role.model'
import UserSchema from './user.model'

const PATH = 'model/index'

class DBConnection {
  private static instance: DBConnection
  public sequelize: Sequelize | undefined

  constructor() {
    this.createConnection()
  }

  public static getInstance(): DBConnection {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection()
    }
    return DBConnection.instance
  }

  async createConnection() {
    this.sequelize = new Sequelize(databaseConfig)

    this.sequelize?.addModels([
      UserSchema,
      RoleSchema,
      UserRoleSchema,
      ColorSchema,
      GroupSchema,
      PrintSchema,
      ProductSchema,
      SewingLineSchema,
      ImportationSchema,
      SampleSewingSchema,
      ProductColorSchema,
      ProductGroupSchema,
      AccessoryNoteSchema,
      PrintablePlaceSchema,
      GarmentAccessorySchema,
      GarmentAccessoryNoteSchema,
      SewingLineDeliverySchema,
      CuttingGroupSchema,
      CompletionSchema
    ])

    await this.sequelize
      .authenticate()
      .then(() => logging.info(PATH, 'Connection has been established successfully. 👏'))
      .catch((error) => logging.error(PATH, `Unable to connect to the database: ${error}`))
  }

  async closeConnection() {
    if (this.sequelize) {
      await this.sequelize
        .close()
        .then(() => logging.info(PATH, 'Connection has been closed'))
        .catch((error) => logging.error(PATH, `Unable to close the database: ${error}`))
    }
  }
}

export const sequelizeInstance = DBConnection.getInstance().sequelize

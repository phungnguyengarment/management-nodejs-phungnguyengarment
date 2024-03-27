import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType, NoteItemStatusType } from '~/type'
import AccessoryNoteSchema from './accessory-note.model'
import GarmentAccessorySchema from './garment-accessory.model'
import ProductSchema from './product.model'

const { INTEGER, STRING } = DataType

export type GarmentAccessoryNote = {
  id?: number
  productID?: number
  accessoryNoteID?: number
  garmentAccessoryID?: number
  noteStatus?: NoteItemStatusType
  status?: ItemStatusType
}

@Table({
  modelName: 'GarmentAccessoryNote',
  tableName: 'garment_accessory_notes',
  timestamps: true
})
export default class GarmentAccessoryNoteSchema extends Model<GarmentAccessoryNote> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: INTEGER, field: 'accessory_note_id' })
  @ForeignKey(() => AccessoryNoteSchema)
  declare accessoryNoteID: number

  @Column({ type: INTEGER, field: 'garment_accessory_id' })
  @ForeignKey(() => GarmentAccessorySchema)
  declare garmentAccessoryID: number

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @Column({ type: STRING, field: 'note_status' })
  declare noteStatus: NoteItemStatusType

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema

  @BelongsTo(() => AccessoryNoteSchema)
  declare accessoryNote: AccessoryNoteSchema

  @BelongsTo(() => GarmentAccessorySchema)
  declare garmentAccessory: GarmentAccessorySchema
}

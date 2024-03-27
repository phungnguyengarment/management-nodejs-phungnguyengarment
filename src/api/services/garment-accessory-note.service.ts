import GarmentAccessoryNoteSchema, { GarmentAccessoryNote } from '~/models/garment-accessory-note.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import AccessoryNoteSchema from '../models/accessory-note.model'
import GarmentAccessorySchema from '../models/garment-accessory.model'

const NAMESPACE = 'services/garment-accessory-note'

export const createNewItem = async (item: GarmentAccessoryNote): Promise<GarmentAccessoryNoteSchema> => {
  try {
    return await GarmentAccessoryNoteSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

export const createNewItems = async (items: GarmentAccessoryNote[]): Promise<GarmentAccessoryNoteSchema[]> => {
  try {
    return await GarmentAccessoryNoteSchema.bulkCreate(items)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

export const createOrUpdateItemByPk = async (
  id: number,
  item: GarmentAccessoryNote
): Promise<GarmentAccessoryNote | GarmentAccessoryNoteSchema | undefined> => {
  try {
    const affectedRows = await GarmentAccessoryNoteSchema.update(
      {
        ...item
      },
      {
        where: {
          id: id
        }
      }
    )
    if (affectedRows[0] > 0) {
      return item
    } else {
      return await GarmentAccessoryNoteSchema.create({ ...item })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByPk :: ${error}`)
    throw new Error(`createOrUpdateItemByPk :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<GarmentAccessoryNoteSchema | null> => {
  try {
    const item = await GarmentAccessoryNoteSchema.findByPk(id, {
      include: [
        { model: AccessoryNoteSchema, as: 'accessoryNote' },
        { model: GarmentAccessorySchema, as: 'garmentAccessory' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get by id
export const getItemBy = async (query: { field: string; id: number }): Promise<GarmentAccessoryNoteSchema | null> => {
  try {
    const item = await GarmentAccessoryNoteSchema.findOne({
      where: { [query.field]: query.id },
      include: [
        { model: AccessoryNoteSchema, as: 'accessoryNote' },
        { model: GarmentAccessorySchema, as: 'garmentAccessory' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

// Get all
export const getItems = async (
  body: RequestBodyType
): Promise<{ count: number; rows: GarmentAccessoryNoteSchema[] }> => {
  try {
    const items = await GarmentAccessoryNoteSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<GarmentAccessoryNote>(body),
      include: [
        { model: AccessoryNoteSchema, as: 'accessoryNote' },
        { model: GarmentAccessorySchema, as: 'garmentAccessory' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<GarmentAccessoryNoteSchema[]> => {
  try {
    const items = await GarmentAccessoryNoteSchema.findAll({
      where: {
        status: status
      }
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await GarmentAccessoryNoteSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

export const updateItemsBy = async (
  query: { field: string; id: number },
  updatedRecords: GarmentAccessoryNote[]
): Promise<GarmentAccessoryNote[] | undefined | any> => {
  try {
    const existingRecords = await GarmentAccessoryNoteSchema.findAll({
      where: {
        [query.field]: query.id
      }
    })

    // Tìm các bản ghi cần xoá
    const recordsToDelete = existingRecords.filter(
      (existingRecord) =>
        !updatedRecords.some((updatedRecord) => updatedRecord.accessoryNoteID === existingRecord.accessoryNoteID)
    )

    // Tìm các bản ghi cần thêm mới
    const recordsToAdd = updatedRecords.filter(
      (updatedRecord) =>
        !existingRecords.some((existingRecord) => existingRecord.accessoryNoteID === updatedRecord.accessoryNoteID)
    )

    // Xoá các bản ghi không còn trong danh sách
    await GarmentAccessoryNoteSchema.destroy({
      where: {
        accessoryNoteID: recordsToDelete.map((record) => record.accessoryNoteID)
      }
    })

    // Thêm mới các bảng ghi mới
    await GarmentAccessoryNoteSchema.bulkCreate(recordsToAdd)

    // Trả về danh sách cập nhật sau xử lý
    const updatedList = [...existingRecords.filter((record) => recordsToDelete.includes(record), ...recordsToAdd)]
    return updatedList
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Update
export const updateItemByPk = async (
  id: number,
  itemToUpdate: GarmentAccessoryNote
): Promise<GarmentAccessoryNote | undefined> => {
  try {
    const affectedRows = await GarmentAccessoryNoteSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByPk :: ${error}`)
    throw new Error(`updateItemByPk :: ${error}`)
  }
}

export const updateItemBy = async (
  query: { field: string; id: number },
  itemToUpdate: GarmentAccessoryNote
): Promise<GarmentAccessoryNote | undefined> => {
  try {
    const affectedRows = await GarmentAccessoryNoteSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          [query.field]: query.id
        }
      }
    )
    return affectedRows[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByGarmentAccessoryID :: ${error}`)
    throw new Error(`updateItemByGarmentAccessoryID :: ${error}`)
  }
}

// Delete
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await GarmentAccessoryNoteSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPk :: ${error}`)
    throw new Error(`deleteItemByPk :: ${error}`)
  }
}

export const deleteItemBy = async (query: { field: string; id: number }): Promise<number> => {
  try {
    return await GarmentAccessoryNoteSchema.destroy({ where: { [query.field]: query.id } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByAccessoryNoteID :: ${error}`)
    throw new Error(`deleteItemByAccessoryNoteID :: ${error}`)
  }
}

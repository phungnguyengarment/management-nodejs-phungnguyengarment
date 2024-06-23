import AccessoryNoteSchema, { AccessoryNote } from '~/models/accessory-note.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/accessory-note'

export const createNewItem = async (item: AccessoryNote): Promise<AccessoryNoteSchema> => {
  try {
    return await AccessoryNoteSchema.create({ ...item })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<AccessoryNoteSchema | null> => {
  try {
    return await AccessoryNoteSchema.findByPk(id)
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemBy = async (item: AccessoryNote): Promise<AccessoryNoteSchema | null> => {
  try {
    return await AccessoryNoteSchema.findOne({ where: { ...item } })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: AccessoryNoteSchema[] }> => {
  try {
    const items = await AccessoryNoteSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: dynamicQuery<AccessoryNote>(body)
    })
    return items
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<AccessoryNoteSchema[]> => {
  try {
    return await AccessoryNoteSchema.findAll({
      where: {
        status: status
      }
    })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await AccessoryNoteSchema.count()
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, itemToUpdate: AccessoryNote): Promise<AccessoryNote | undefined> => {
  try {
    const affectedRows = await AccessoryNoteSchema.update(
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
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    return await AccessoryNoteSchema.destroy({ where: { id: id } })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

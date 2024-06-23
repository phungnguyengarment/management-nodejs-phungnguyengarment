import SewingLineSchema, { SewingLine } from '~/models/sewing-line.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/sewing-line'

export const createNewItem = async (item: SewingLine): Promise<SewingLineSchema> => {
  try {
    return await SewingLineSchema.create({ ...item })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<SewingLineSchema | null> => {
  try {
    return await SewingLineSchema.findByPk(id)
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemBy = async (item: SewingLine): Promise<SewingLineSchema | null> => {
  try {
    return await SewingLineSchema.findOne({ where: { ...item } })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: SewingLineSchema[] }> => {
  try {
    const items = await SewingLineSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: dynamicQuery<SewingLine>(body)
    })
    return items
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<SewingLineSchema[]> => {
  try {
    const items = await SewingLineSchema.findAll({
      where: {
        status: status
      }
    })
    return items
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await SewingLineSchema.count()
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, itemToUpdate: SewingLine): Promise<SewingLine | undefined> => {
  try {
    const affectedRows = await SewingLineSchema.update(
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
    return await SewingLineSchema.destroy({ where: { id: id } })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

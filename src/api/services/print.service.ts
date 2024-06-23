import PrintSchema, { Print } from '~/models/print.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { dynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/print'

export const createNewItem = async (item: Print): Promise<PrintSchema> => {
  try {
    return await PrintSchema.create({ ...item })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<PrintSchema | null> => {
  try {
    return await PrintSchema.findByPk(id)
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemBy = async (item: Print): Promise<PrintSchema | null> => {
  try {
    return await PrintSchema.findOne({ where: { ...item } })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: PrintSchema[] }> => {
  try {
    const items = await PrintSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: dynamicQuery<Print>(body)
    })
    return items
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<PrintSchema[]> => {
  try {
    return await PrintSchema.findAll({
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
    return await PrintSchema.count()
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: Print): Promise<Print | undefined> => {
  try {
    const affectedRows = await PrintSchema.update(
      {
        ...item
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] > 0 ? item : undefined
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    return await PrintSchema.destroy({ where: { id: id } })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

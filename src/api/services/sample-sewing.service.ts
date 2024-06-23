import SampleSewingSchema, { SampleSewing } from '~/models/sample-sewing.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { dynamicQuery } from '../helpers/query'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'services/sample-sewing'

export const createNewItem = async (item: SampleSewing): Promise<SampleSewingSchema> => {
  try {
    return await SampleSewingSchema.create({ ...item })
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<SampleSewingSchema | null> => {
  try {
    const item = await SampleSewingSchema.findByPk(id, { include: [{ model: ProductSchema, as: 'product' }] })
    return item
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemBy = async (data: SampleSewing): Promise<SampleSewingSchema | null> => {
  try {
    const item = await SampleSewingSchema.findOne({
      where: { ...data },
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return item
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: SampleSewingSchema[] }> => {
  try {
    const items = await SampleSewingSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: dynamicQuery<SampleSewing>(body),
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<SampleSewingSchema[]> => {
  try {
    const items = await SampleSewingSchema.findAll({
      where: {
        status: status
      },
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await SampleSewingSchema.count()
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, itemToUpdate: SampleSewing): Promise<SampleSewing | undefined> => {
  try {
    const affectedRows = await SampleSewingSchema.update(
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

export const updateItemByProductID = async (
  productID: number,
  itemToUpdate: SampleSewing
): Promise<SampleSewing | undefined> => {
  try {
    const affectedRows = await SampleSewingSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] > 0 ? itemToUpdate : undefined
  } catch (error: any) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`updateItemByProductID :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await SampleSewingSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error: any) {
    logging.error(NAMESPACE, `${error.message}`)
    throw new Error(`${error.message}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await SampleSewingSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error: any) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw new Error(`deleteItemByProductID :: ${error}`)
  }
}

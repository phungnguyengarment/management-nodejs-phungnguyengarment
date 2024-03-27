import CompletionSchema, { Completion } from '~/models/completion.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'services/completion'

export const createNewItem = async (item: Completion): Promise<CompletionSchema> => {
  try {
    return await CompletionSchema.create({
      ...item
    })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}
export const createOrUpdateItemByPk = async (
  id: number,
  item: Completion
): Promise<Completion | CompletionSchema | undefined> => {
  try {
    const affectedRows = await CompletionSchema.update(
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
      return await CompletionSchema.create({ ...item })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByPk :: ${error}`)
    throw new Error(`createOrUpdateItemByPk :: ${error}`)
  }
}
// Get by id
export const getItemByPk = async (id: number): Promise<CompletionSchema | null> => {
  try {
    const item = await CompletionSchema.findByPk(id, {
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get by id
export const getItemBy = async (item: Completion): Promise<CompletionSchema | null> => {
  try {
    const itemFound = await CompletionSchema.findOne({
      where: { ...item },
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return itemFound
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: CompletionSchema[] }> => {
  try {
    const items = await CompletionSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Completion>(body),
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<CompletionSchema[]> => {
  try {
    const items = await CompletionSchema.findAll({
      where: {
        status: status
      },
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await ProductSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

// Update
export const updateItemByPk = async (id: number, itemToUpdate: Completion): Promise<Completion | undefined> => {
  try {
    const affectedRows = await CompletionSchema.update(
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

export const updateItemByProductID = async (
  productID: number,
  itemToUpdate: Completion
): Promise<Completion | undefined> => {
  try {
    const affectedRows = await CompletionSchema.update(
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
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`updateItemByProductID :: ${error}`)
  }
}

export const deleteItemBy = async (query: { field: string; id: number }): Promise<number> => {
  try {
    return await CompletionSchema.destroy({ where: { [query.field]: query.id } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemBy :: ${error}`)
    throw new Error(`deleteItemBy :: ${error}`)
  }
}

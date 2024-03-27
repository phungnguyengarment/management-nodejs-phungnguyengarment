import ProductGroupSchema, { ProductGroup } from '~/models/product-group.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import GroupSchema from '../models/group.model'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'services/product-group'

export const createNewItem = async (item: ProductGroup): Promise<ProductGroupSchema> => {
  try {
    return await ProductGroupSchema.create(
      { ...item },
      {
        include: [
          { model: ProductSchema, as: 'product' },
          { model: GroupSchema, as: 'group' }
        ]
      }
    )
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<ProductGroupSchema | null> => {
  try {
    const item = await ProductGroupSchema.findByPk(id, {
      include: [
        { model: ProductSchema, as: 'product' },
        { model: GroupSchema, as: 'group' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemBy = async (productGroup: ProductGroup): Promise<ProductGroupSchema | null> => {
  try {
    const item = await ProductGroupSchema.findOne({
      where: { ...productGroup },
      include: [
        { model: ProductSchema, as: 'product' },
        { model: GroupSchema, as: 'group' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ProductGroupSchema[] }> => {
  try {
    console.log(buildDynamicQuery<ProductGroup>(body))
    const items = await ProductGroupSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<ProductGroup>(body),
      include: [
        { model: ProductSchema, as: 'product' },
        { model: GroupSchema, as: 'group' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<ProductGroupSchema[]> => {
  try {
    const items = await ProductGroupSchema.findAll({
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
    return await ProductGroupSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: ProductGroup): Promise<ProductGroup | undefined> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
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
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const updateItemByProductID = async (
  productID: number,
  item: ProductGroup
): Promise<ProductGroup | undefined> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
      {
        ...item
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] > 0 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`updateItemByProductID :: ${error}`)
  }
}

export const updateItemByGroupID = async (groupID: number, item: ProductGroup): Promise<ProductGroup | undefined> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
      {
        ...item
      },
      {
        where: {
          groupID: groupID
        }
      }
    )
    return affectedRows[0] > 0 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByGroupID :: ${error}`)
    throw new Error(`updateItemByGroupID :: ${error}`)
  }
}

export const createOrUpdateItemByPk = async (
  id: number,
  item: ProductGroup
): Promise<ProductGroup | ProductGroupSchema | undefined> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
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
      return await ProductGroupSchema.create({ ...item })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByPk :: ${error}`)
    throw new Error(`createOrUpdateItemByPk :: ${error}`)
  }
}

export const createOrUpdateItemBy = async (
  query: { field: string; id: number },
  item: ProductGroup
): Promise<ProductGroup | ProductGroupSchema | undefined> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
      {
        ...item
      },
      {
        where: {
          [query.field]: query.id
        }
      }
    )
    if (affectedRows[0] > 0) {
      return item
    } else {
      return await ProductGroupSchema.create({ ...item, [query.field]: query.id })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByProductID :: ${error}`)
    throw new Error(`createOrUpdateItemByProductID :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const deleteItemBy = async (query: { field: string; id: number }): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.destroy({ where: { [query.field]: query.id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemBy :: ${error}`)
    throw new Error(`deleteItemBy :: ${error}`)
  }
}

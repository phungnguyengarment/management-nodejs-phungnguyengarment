import { buildDynamicQuery } from '~/helpers/query'
import ColorSchema from '~/models/color.model'
import ProductColorSchema, { ProductColor } from '~/models/product-color.model'
import ProductSchema from '~/models/product.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'

const NAMESPACE = 'services/product-color'

export const createNewItem = async (item: ProductColor): Promise<ProductColorSchema> => {
  try {
    return await ProductColorSchema.create(
      { ...item },
      {
        include: [
          { model: ProductSchema, as: 'product' },
          { model: ColorSchema, as: 'color' }
        ]
      }
    )
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<ProductColorSchema | null> => {
  try {
    const item = await ProductColorSchema.findByPk(id, {
      include: [
        { model: ProductSchema, as: 'product' },
        { model: ColorSchema, as: 'color' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get by id
export const getItemBy = async (product: ProductColor): Promise<ProductColorSchema | null> => {
  try {
    const item = await ProductColorSchema.findOne({
      where: { ...product },
      include: [
        { model: ProductSchema, as: 'product' },
        { model: ColorSchema, as: 'color' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ProductColorSchema[] }> => {
  try {
    const items = await ProductColorSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<ProductColor>(body),
      include: [
        { model: ProductSchema, as: 'product' },
        { model: ColorSchema, as: 'color' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<ProductColorSchema[]> => {
  try {
    const items = await ProductColorSchema.findAll({
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
    return await ProductSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

// Update
export const updateItemByPk = async (
  id: number,
  itemToUpdate: ProductColor
): Promise<ProductColor | ProductColorSchema | ProductColorSchema[] | undefined> => {
  try {
    const updatedCount = await ProductColorSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return updatedCount[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByPk :: ${error}`)
    throw new Error(`updateItemByPk :: ${error}`)
  }
}

export const updateItemBy = async (
  query: { field: string; id: number },
  itemToUpdate: ProductColor
): Promise<ProductColor | ProductColorSchema | ProductColorSchema[] | undefined> => {
  try {
    const updatedCount = await ProductColorSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          [query.field]: query.id
        }
      }
    )
    return updatedCount[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`updateItemByProductID :: ${error}`)
  }
}

export const createOrUpdateItemByPk = async (
  id: number,
  item: ProductColor
): Promise<ProductColor | ProductColorSchema | ProductColorSchema[] | undefined> => {
  try {
    const getItem = await ProductColorSchema.findByPk(id)
    if (getItem) {
      const updatedCount = await ProductColorSchema.update(
        {
          ...item
        },
        {
          where: {
            id: id
          }
        }
      )
      return updatedCount[0] > 0 ? item : undefined
    } else {
      return await ProductColorSchema.create({ ...item })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByPk :: ${error}`)
    throw new Error(`createOrUpdateItemByPk :: ${error}`)
  }
}

export const createOrUpdateItemBy = async (
  query: { field: string; id: number },
  item: ProductColor
): Promise<ProductColor | ProductColorSchema | undefined> => {
  try {
    const affectedRows = await ProductColorSchema.update(
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
      return await ProductColorSchema.create({ ...item, [query.field]: query.id })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByProductID :: ${error}`)
    throw new Error(`createOrUpdateItemByProductID :: ${error}`)
  }
}

// Delete
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPk :: ${error}`)
    throw new Error(`deleteItemByPk :: ${error}`)
  }
}

export const deleteItemBy = async (query: { field: string; id: number }): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { [query.field]: query.id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByColorID :: ${error}`)
    throw new Error(`deleteItemByColorID :: ${error}`)
  }
}

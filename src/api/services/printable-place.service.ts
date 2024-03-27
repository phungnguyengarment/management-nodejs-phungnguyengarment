import PrintablePlaceSchema, { PrintablePlace } from '~/models/printable-place.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import PrintSchema from '../models/print.model'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'services/printable-place'

export const createNewItem = async (item: PrintablePlace): Promise<PrintablePlaceSchema> => {
  try {
    return await PrintablePlaceSchema.create(
      { ...item },
      {
        include: [
          { model: ProductSchema, as: 'product' },
          { model: PrintSchema, as: 'print' }
        ]
      }
    )
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

export const createOrUpdateItemByPk = async (
  id: number,
  item: PrintablePlace
): Promise<PrintablePlace | PrintablePlaceSchema | undefined> => {
  try {
    const affectedRows = await PrintablePlaceSchema.update(
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
      return await PrintablePlaceSchema.create({ ...item })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByPk :: ${error}`)
    throw new Error(`createOrUpdateItemByPk :: ${error}`)
  }
}

export const createOrUpdateItemByProductID = async (
  productID: number,
  item: PrintablePlace
): Promise<PrintablePlace | PrintablePlaceSchema | undefined> => {
  try {
    const affectedRows = await PrintablePlaceSchema.update(
      {
        ...item
      },
      {
        where: {
          productID: productID
        }
      }
    )
    if (affectedRows[0] > 0) {
      return item
    } else {
      return await PrintablePlaceSchema.create({ ...item, productID: productID })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByProductID :: ${error}`)
    throw new Error(`createOrUpdateItemByProductID :: ${error}`)
  }
}

export const createOrUpdateItemByPrintID = async (
  printID: number,
  item: PrintablePlace
): Promise<PrintablePlace | PrintablePlaceSchema | undefined> => {
  try {
    const affectedRows = await PrintablePlaceSchema.update(
      {
        ...item
      },
      {
        where: {
          printID: printID
        }
      }
    )
    if (affectedRows[0] > 0) {
      return item
    } else {
      return await PrintablePlaceSchema.create({ ...item, printID: printID })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByPrintID :: ${error}`)
    throw new Error(`createOrUpdateItemByPrintID :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<PrintablePlaceSchema | null> => {
  try {
    const item = await PrintablePlaceSchema.findByPk(id, {
      include: [
        { model: ProductSchema, as: 'product' },
        { model: PrintSchema, as: 'print' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get by id
export const getItemBy = async (product: PrintablePlace): Promise<PrintablePlaceSchema | null> => {
  try {
    const item = await PrintablePlaceSchema.findOne({
      where: { ...product },
      include: [
        { model: ProductSchema, as: 'product' },
        { model: PrintSchema, as: 'print' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: PrintablePlaceSchema[] }> => {
  try {
    // console.log(`${NAMESPACE}>>>`, buildDynamicQuery<PrintablePlace>(body))
    const items = await PrintablePlaceSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<PrintablePlace>(body),
      include: [
        { model: ProductSchema, as: 'product' },
        { model: PrintSchema, as: 'print' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<PrintablePlaceSchema[]> => {
  try {
    const items = await PrintablePlaceSchema.findAll({
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
export const updateItemByPk = async (id: number, itemToUpdate: PrintablePlace): Promise<PrintablePlace | undefined> => {
  try {
    const affectedRows = await PrintablePlaceSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] === 1 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByPk :: ${error}`)
    throw new Error(`updateItemByPk :: ${error}`)
  }
}

export const updateItemByProductID = async (
  productID: number,
  itemToUpdate: PrintablePlace
): Promise<PrintablePlace | undefined> => {
  try {
    const affectedRows = await PrintablePlaceSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] === 1 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`updateItemByProductID :: ${error}`)
  }
}

export const updateItemByPrintID = async (
  printID: number,
  itemToUpdate: PrintablePlace
): Promise<PrintablePlace | undefined> => {
  try {
    const affectedRows = await PrintablePlaceSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          printID: printID
        }
      }
    )
    return affectedRows[0] === 1 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByColorID :: ${error}`)
    throw new Error(`updateItemByColorID :: ${error}`)
  }
}

// Delete
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await PrintablePlaceSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPk :: ${error}`)
    throw new Error(`deleteItemByPk :: ${error}`)
  }
}

export const deleteItemByPrintID = async (printID: number): Promise<number> => {
  try {
    const affectedRows = await PrintablePlaceSchema.destroy({ where: { printID: printID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPrintID :: ${error}`)
    throw new Error(`deleteItemByPrintID :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await PrintablePlaceSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw new Error(`deleteItemByProductID :: ${error}`)
  }
}

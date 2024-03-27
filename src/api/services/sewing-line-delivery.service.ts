import SewingLineDeliverySchema, { SewingLineDelivery } from '~/models/sewing-line-delivery.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import ProductSchema from '../models/product.model'
import SewingLineSchema from '../models/sewing-line.model'

const NAMESPACE = 'services/sewing-line-delivery'

export const createNewItem = async (item: SewingLineDelivery): Promise<SewingLineDeliverySchema> => {
  try {
    return await SewingLineDeliverySchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

export const createNewItems = async (items: SewingLineDelivery[]): Promise<SewingLineDeliverySchema[]> => {
  try {
    return await SewingLineDeliverySchema.bulkCreate(items)
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItems :: ${error}`)
    throw `${NAMESPACE} createNewItems :: ${error}`
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<SewingLineDeliverySchema | null> => {
  try {
    const item = await SewingLineDeliverySchema.findByPk(id, {
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

export const getItemBy = async (sewingLineDelivery: SewingLineDelivery): Promise<SewingLineDeliverySchema | null> => {
  try {
    const item = await SewingLineDeliverySchema.findOne({
      where: { ...sewingLineDelivery },
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: SewingLineDeliverySchema[] }> => {
  try {
    const items = await SewingLineDeliverySchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<SewingLineDelivery>(body),
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<SewingLineDeliverySchema[]> => {
  try {
    const items = await SewingLineDeliverySchema.findAll({
      where: {
        status: status
      }
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await SewingLineDeliverySchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

export const updateItemsBy = async (
  query: { field: string; id: number },
  newRecords: SewingLineDelivery[]
): Promise<SewingLineDelivery[] | undefined | any> => {
  try {
    const existingRecords = await SewingLineDeliverySchema.findAll({
      where: {
        [query.field]: query.id
      }
    })

    // Tìm các bản ghi cần thêm mới
    const recordsToAdd = newRecords.filter(
      (newRecord) => !existingRecords.some((existingRecord) => existingRecord.sewingLineID === newRecord.sewingLineID)
    )
    // Tìm các bản ghi cần cập nhật
    const recordsToUpdate = newRecords.filter((newRecord) =>
      existingRecords.some((existingRecord) => existingRecord.sewingLineID === newRecord.sewingLineID)
    )
    // Tìm các bản ghi cần xoá
    const recordsToDelete = existingRecords.filter(
      (existingRecord) =>
        !newRecords.some((updatedRecord) => updatedRecord.sewingLineID === existingRecord.sewingLineID)
    )

    // Thêm mới các bảng ghi mới
    if (recordsToAdd.length > 0) {
      await SewingLineDeliverySchema.bulkCreate(
        recordsToAdd.map((item) => {
          return { ...item, status: 'active' } as SewingLineDelivery
        })
      )
    }

    // Cập nhật các bảng ghi
    if (recordsToUpdate.length > 0) {
      for (const record of recordsToUpdate) {
        const recordFound = await SewingLineDeliverySchema.findOne({
          where: { sewingLineID: record.sewingLineID, productID: record.productID }
        })
        if (recordFound) {
          await recordFound.update(record, { where: { productID: record.productID } })
        }
      }
    }

    // if (recordsToUpdate.length > 0) {
    //   await Promise.all(
    //     recordsToUpdate.map((record) => {
    //       return SewingLineDeliverySchema.update(record, {
    //         where: { sewingLineID: record.sewingLineID },
    //         transaction: t
    //       })
    //     })
    //   )
    // }

    // Xoá các bản ghi không còn trong danh sách
    // if (recordsToDelete.length > 0 && (recordsToAdd.length <= 0 || recordsToUpdate.length <= 0)) {
    //   await SewingLineDeliverySchema.destroy({
    //     where: {
    //       sewingLineID: recordsToDelete.map((record) => record.sewingLineID)
    //     }
    //   })
    // }

    if (recordsToDelete.length > 0) {
      for (const record of recordsToDelete) {
        const recordFound = await SewingLineDeliverySchema.findOne({
          where: { sewingLineID: record.sewingLineID, productID: record.productID }
        })
        if (recordFound) {
          await recordFound.destroy()
        }
      }
    }

    // Trả về danh sách cập nhật sau xử lý
    const updatedList = [
      ...existingRecords.filter((record) => recordsToDelete.includes(record), ...recordsToAdd, ...recordsToUpdate)
    ]
    return updatedList
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

// Update by productID
export const updateItemByPk = async (
  id: number,
  recordToUpdate: SewingLineDelivery
): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        ...recordToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] > 0 ? recordToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

export const updateItemBySewingLineID = async (
  sewingLineID: number,
  recordToUpdate: SewingLineDelivery
): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        ...recordToUpdate
      },
      {
        where: {
          sewingLineID: sewingLineID
        }
      }
    )
    return affectedRows[0] > 0 ? recordToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

export const updateItemByProductID = async (
  productID: number,
  recordToUpdate: SewingLineDelivery
): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        ...recordToUpdate
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] > 0 ? recordToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw `${error}`
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const deleteItemBySewingLineID = async (sewingLineID: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { sewingLineID: sewingLineID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemBySewingLineID :: ${error}`)
    throw `deleteItemBySewingLineID :: ${error}`
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw `deleteItemByProductID :: ${error}`
  }
}

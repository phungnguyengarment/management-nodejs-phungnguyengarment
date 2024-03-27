import UserRoleSchema, { UserRole } from '~/api/models/user-role.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import RoleSchema from '../models/role.model'
import UserSchema from '../models/user.model'

const NAMESPACE = 'services/user-role'

export const createNewItem = async (item: UserRole): Promise<UserRoleSchema> => {
  try {
    return await UserRoleSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const createNewItems = async (items: UserRole[]): Promise<UserRoleSchema[]> => {
  try {
    return await UserRoleSchema.bulkCreate(items)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${NAMESPACE} ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<UserRoleSchema | null> => {
  try {
    return await UserRoleSchema.findByPk(id, {
      include: [
        { model: UserSchema, as: 'user' },
        { model: RoleSchema, as: 'role' }
      ]
    })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemBy = async (item: UserRole): Promise<UserRoleSchema | null> => {
  try {
    return await UserRoleSchema.findOne({
      where: { ...item },
      include: [
        { model: UserSchema, as: 'user' },
        { model: RoleSchema, as: 'role' }
      ]
    })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsBy = async (item: UserRole): Promise<UserRoleSchema[] | null> => {
  try {
    return await UserRoleSchema.findAll({
      where: { ...item },
      include: [
        { model: UserSchema, as: 'user' },
        { model: RoleSchema, as: 'role' }
      ]
    })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: UserRoleSchema[] }> => {
  try {
    const items = await UserRoleSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<UserRole>(body),
      include: [
        { model: UserSchema, as: 'user' },
        { model: RoleSchema, as: 'role' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<UserRoleSchema[]> => {
  try {
    const items = await UserRoleSchema.findAll({
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
    return await UserRoleSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, itemToUpdate: UserRole): Promise<UserRole | undefined> => {
  try {
    const affectedRows = await UserRoleSchema.update(
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
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const updateItemsBy = async (
  query: { field: string; id: number },
  updatedRecords: UserRole[]
): Promise<UserRole[] | undefined | any> => {
  try {
    const existingRecords = await UserRoleSchema.findAll({
      where: {
        [query.field]: query.id
      }
    })

    // Tìm các bản ghi cần xoá
    const recordsToDelete = existingRecords.filter(
      (existingRecord) => !updatedRecords.some((updatedRecord) => updatedRecord.roleID === existingRecord.roleID)
    )

    // Tìm các bản ghi cần thêm mới
    const recordsToAdd = updatedRecords.filter(
      (updatedRecord) => !existingRecords.some((existingRecord) => existingRecord.roleID === updatedRecord.roleID)
    )

    // Xoá các bản ghi không còn trong danh sách
    await UserRoleSchema.destroy({
      where: {
        roleID: recordsToDelete.map((record) => record.roleID)
      }
    })

    // Thêm mới các bảng ghi mới
    await UserRoleSchema.bulkCreate(recordsToAdd)

    // Trả về danh sách cập nhật sau xử lý
    const updatedList = [...existingRecords.filter((record) => recordsToDelete.includes(record), ...recordsToAdd)]
    return updatedList
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const deleteItemsByUserID = async (userID: number): Promise<undefined | UserRoleSchema[]> => {
  try {
    const recordsToDelete = await UserRoleSchema.findAll({
      where: {
        userID: userID
      }
    })
    // Xoá các bản ghi không còn trong danh sách
    await UserRoleSchema.destroy({
      where: {
        userID: recordsToDelete.map((record) => record.userID)
      }
    })
    // Trả về danh sách cập nhật sau xử lý
    return recordsToDelete
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    return await UserRoleSchema.destroy({ where: { id: id } })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}
